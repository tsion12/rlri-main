export type MainSiteLocale = "en" | "fr";

export type WpSource = "main" | "africa";
import { request as httpsRequest } from "node:https";


export type WpPost = {
  id: number;
  slug: string;
  /** ISO 8601 from WordPress REST API */
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  featuredImage?: string | null;
  theme?: string | null;
  programKey?: string | null;
  programLabel?: string | null;
  authorName?: string | null;
  authorBio?: string | null;
  authorAvatar?: string | null;
  /** Main-site policy category posts (reallifeinstitute.org). */
  isPolicy?: boolean;
  /** First PDF link found in post content, when `isPolicy`. */
  downloadUrl?: string | null;
  /** Main-site publication posts (reallifeinstitute.org). */
  isPublication?: boolean;
  /** External “Find it” URL from WordPress `link` / `_links_to` meta. */
  externalUrl?: string | null;
};

export type WpPostWithSource = WpPost & { source: WpSource };

export type WpPageHighlight = {
  title: string;
  excerpt: string;
  link: string;
  modified: string;
  featuredImage?: string | null;
  /** Set when the title/excerpt come from a parsed Elementor countdown block (scheduled event). */
  eventDateISO?: string | null;
};

type WpApiPost = Omit<WpPost, "featuredImage"> & {
  categories?: number[];
  _embedded?: {
    author?: Array<{
      name?: string;
      description?: string;
      avatar_urls?: Record<string, string>;
    }>;
    "wp:term"?: Array<
      Array<{
        id?: number;
        taxonomy?: string;
        name?: string;
        slug?: string;
      }>
    >;
  };
  yoast_head_json?: {
    og_image?: Array<{
      url?: string;
    }>;
  };
  /** WP permalink; for publications this is often the external publisher URL. */
  link?: string;
  meta?: {
    _links_to?: string;
    _links_to_target?: string;
  };
};

type WpApiPage = {
  title: { rendered: string };
  excerpt?: { rendered: string };
  content: { rendered: string };
  link: string;
  modified: string;
  yoast_head_json?: {
    og_image?: Array<{
      url?: string;
    }>;
  };
};

type WpApiCategory = {
  id: number;
  name?: string;
  slug?: string;
};

const API = {
  main: "https://reallifeinstitute.org/wp-json/wp/v2",
} as const;

const WP_REVALIDATE_SECONDS = 300;
const WP_TIMEOUT_MS = 12000;
const WP_POSTS_PER_PAGE = 50;
const WP_RETRY_DELAYS_MS = [350, 900];
const WP_FETCH_HEADERS = {
  accept: "application/json",
  "User-Agent": "RLRI-Site/1.0 (+https://reallifeinstitute.org)",
} as const;

export function sourceDisplay(source: WpSource): string {
  return source === "main" ? "Main" : "Africa";
}

export function isWpSource(s: string): s is WpSource {
  return s === "main" || s === "africa";
}

/**
 * WordPress sometimes stores slugs as percent-encoded syllabics (e.g. `%e1%96%83…`).
 * Decode for URLs and API queries so we do not double-encode `%` via URLSearchParams.
 */
export function normalizeWpSlug(slug: string): string {
  let value = slug.trim();
  for (let i = 0; i < 3; i += 1) {
    if (!value.includes("%")) break;
    try {
      const decoded = decodeURIComponent(value);
      if (decoded === value) break;
      value = decoded;
    } catch {
      break;
    }
  }
  return value;
}

/** Slug variants to try when resolving a post (route param vs WP storage). */
function wpSlugLookupCandidates(slug: string): string[] {
  const trimmed = slug.trim();
  const normalized = normalizeWpSlug(trimmed);
  const out: string[] = [];
  for (const candidate of [normalized, trimmed]) {
    if (candidate && !out.includes(candidate)) out.push(candidate);
  }
  return out;
}

/**
 * Internal URL for a journal post.
 */
export function blogPostPath(post: WpPostWithSource): string {
  return `/blog/${post.source}/${encodeURIComponent(normalizeWpSlug(post.slug))}`;
}

function decodeHtmlEntities(input: string): string {
  const namedEntities: Record<string, string> = {
    amp: "&",
    nbsp: " ",
    quot: '"',
    apos: "'",
    lt: "<",
    gt: ">",
    ndash: "–",
    mdash: "—",
  };

  return input
    .replace(/&#(\d+);/g, (_, dec: string) => {
      const codePoint = Number.parseInt(dec, 10);
      return Number.isNaN(codePoint) ? _ : String.fromCodePoint(codePoint);
    })
    .replace(/&#x([0-9a-fA-F]+);/g, (_, hex: string) => {
      const codePoint = Number.parseInt(hex, 16);
      return Number.isNaN(codePoint) ? _ : String.fromCodePoint(codePoint);
    })
    .replace(/&([a-zA-Z]+);/g, (_, name: string) => namedEntities[name] ?? _);
}

/** Plain text from WordPress HTML fields */
export function stripHtml(html: string): string {
  return decodeHtmlEntities(html.replace(/<[^>]*>/g, ""))
    .replace(/[–—−]/g, "-")
    .replace(/\s+/g, " ")
    .trim();
}

function decodeBasicEntities(input: string): string {
  return input
    .replaceAll("&amp;", "&")
    .replaceAll("&#038;", "&")
    .replaceAll("&quot;", '"')
    .replaceAll("&#039;", "'");
}

function normCategoryName(input: string): string {
  return decodeBasicEntities(input)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, " ")
    .trim();
}

/** Bucket / system categories — skip when picking a post theme label. */
const GENERIC_CATEGORY_NAMES = new Set([
  "uncategorized",
  "blog",
  "blog iu",
  "blog ap",
  "stories ap",
  "stories africa",
  "publication",
  "publications",
  "publication en",
  "policy",
  "policies",
  "policy en",
  "policy fr",
  "policies africa",
  "research",
  "development",
]);

const MAIN_PUBLICATION_EXTERNAL_FALLBACK: Record<string, string> = {
  "women-and-peacebuilding":
    "https://www.tandfonline.com/doi/full/10.1080/14678802.2025.2510675",
  "investments-you-must-make-before-40":
    "https://www.amazon.ca/Investments-You-Must-Make-Before/dp/B0DNT618ZZ",
};

function isExternalMainSiteUrl(url: string): boolean {
  try {
    const host = new URL(url).hostname.toLowerCase();
    return !host.endsWith("reallifeinstitute.org");
  } catch {
    return false;
  }
}

function resolveMainExternalUrl(post: WpApiPost): string | null {
  const candidates = [post.meta?._links_to, post.link].filter((v): v is string =>
    Boolean(v?.trim()),
  );
  for (const raw of candidates) {
    const url = raw.replace(/&amp;/g, "&");
    if (isExternalMainSiteUrl(url)) return url;
  }
  return MAIN_PUBLICATION_EXTERNAL_FALLBACK[post.slug] ?? null;
}

function normalizePost(source: WpSource, post: WpApiPost): WpPostWithSource {
  const terms = post._embedded?.["wp:term"] ?? [];
  const allTerms = terms.flatMap((group) => group ?? []);
  const author = post._embedded?.author?.[0];
  const avatarCandidates = author?.avatar_urls ? Object.values(author.avatar_urls) : [];
  const categories = allTerms
    .filter((term) => term.taxonomy === "category" && term.name && term.name.trim().length > 0)
    .map((term) => ({
      id: term.id,
      name: decodeBasicEntities(term.name!.trim()),
      slug: term.slug?.trim(),
    }));
  const programKey = null;
  const programLabel = null;
  const category = categories.find((cat) => !GENERIC_CATEGORY_NAMES.has(normCategoryName(cat.name)));
  const isPolicy =
    source === "main" &&
    categories.some((cat) => {
      const name = normCategoryName(cat.name);
      const slug = cat.slug ? normCategoryName(cat.slug) : "";
      return MAIN_POLICY_CATEGORY_NAME_UNION.has(name) || MAIN_POLICY_CATEGORY_NAME_UNION.has(slug);
    });
  const downloadUrl = isPolicy ? extractPolicyDownloadUrl(post.content.rendered) : null;
  const isPublication =
    source === "main" &&
    categories.some((cat) => {
      const name = normCategoryName(cat.name);
      const slug = cat.slug ? normCategoryName(cat.slug) : "";
      return MAIN_PUBLICATION_CATEGORY_NAMES.has(name) || MAIN_PUBLICATION_CATEGORY_NAMES.has(slug);
    });
  const externalUrl = isPublication ? resolveMainExternalUrl(post) : null;

  return {
    id: post.id,
    slug: post.slug,
    date: post.date,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    featuredImage: post.yoast_head_json?.og_image?.[0]?.url ?? null,
    theme: isPolicy ? "Policy" : programLabel ?? category?.name?.trim() ?? null,
    programKey,
    programLabel,
    authorName: author?.name?.trim() ?? null,
    authorBio: author?.description?.trim() ?? null,
    authorAvatar: avatarCandidates[0] ?? null,
    source,
    isPolicy,
    downloadUrl,
    isPublication,
    externalUrl,
  };
}

async function fetchJsonViaHttpsIpv4<T>(url: string): Promise<T | null> {
  return new Promise((resolve) => {
    const req = httpsRequest(
      url,
      {
        family: 4,
        timeout: WP_TIMEOUT_MS,
        headers: WP_FETCH_HEADERS,
      },
      (res) => {
        if (!res.statusCode || res.statusCode < 200 || res.statusCode >= 300) {
          res.resume();
          resolve(null);
          return;
        }
        let raw = "";
        res.setEncoding("utf8");
        res.on("data", (chunk) => {
          raw += chunk;
        });
        res.on("end", () => {
          try {
            resolve(JSON.parse(raw) as T);
          } catch {
            resolve(null);
          }
        });
      },
    );

    req.on("timeout", () => {
      req.destroy(new Error("timeout"));
    });
    req.on("error", () => {
      resolve(null);
    });
    req.end();
  });
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

async function fetchWithRetry(url: string): Promise<Response | null> {
  for (let attempt = 0; attempt <= WP_RETRY_DELAYS_MS.length; attempt += 1) {
    try {
      const res = await fetch(url, {
        next: { revalidate: WP_REVALIDATE_SECONDS },
        headers: WP_FETCH_HEADERS,
      });
      if (res.ok) return res;

      // Retry transient infra/CMS responses like 5xx/429/408.
      if (![408, 429].includes(res.status) && (res.status < 500 || res.status >= 600)) {
        return null;
      }
    } catch {
      // handled below by IPv4 fallback and retry delay
    }

    if (attempt < WP_RETRY_DELAYS_MS.length) {
      await sleep(WP_RETRY_DELAYS_MS[attempt]);
    }
  }
  return null;
}

async function wpFetchJson<T>(url: string): Promise<T | null> {
  const res = await fetchWithRetry(url);
  if (res?.ok) {
    try {
      return (await res.json()) as T;
    } catch {
      return null;
    }
  }
  // Fallback path for environments where undici fetch intermittently times out
  // on dual-stack DNS routes; forcing IPv4 is typically more reliable.
  return fetchJsonViaHttpsIpv4<T>(url);
}

async function fetchPostsForSource(source: WpSource): Promise<WpPostWithSource[]> {
  if (source !== "main") return [];
  const url = new URL(`${API.main}/posts`);
  url.searchParams.set("per_page", String(WP_POSTS_PER_PAGE));
  url.searchParams.set("_embed", "author,wp:term");
  const posts = await wpFetchJson<WpApiPost[]>(url.toString());
  if (!Array.isArray(posts)) return [];
  return posts.map((p) => normalizePost(source, p));
}

/** Main-site WordPress posts. Safe on fetch failure (empty list). */
export async function getPosts(): Promise<WpPostWithSource[]> {
  return fetchPostsForSource("main");
}

function getPostCategoryTerms(post: WpApiPost) {
  const terms = post._embedded?.["wp:term"] ?? [];
  return terms
    .flatMap((group) => group ?? [])
    .filter((term) => term.taxonomy === "category");
}

function postHasCategory(
  post: WpApiPost,
  { id, names }: { id?: number; names?: ReadonlySet<string> },
) {
  if (typeof id === "number") {
    if (Array.isArray(post.categories) && post.categories.includes(id)) return true;
    if (getPostCategoryTerms(post).some((term) => term.id === id)) return true;
  }
  if (!names || names.size === 0) return false;
  return getPostCategoryTerms(post).some((term) => {
    const normName = term.name ? normCategoryName(term.name) : "";
    const normSlug = term.slug ? normCategoryName(term.slug) : "";
    return names.has(normName) || names.has(normSlug);
  });
}

function dedupePosts(posts: WpApiPost[]) {
  const seen = new Set<number>();
  return posts.filter((post) => {
    if (seen.has(post.id)) return false;
    seen.add(post.id);
    return true;
  });
}

function categoryMatchesNames(category: WpApiCategory, names: ReadonlySet<string>) {
  const normalizedName = category.name ? normCategoryName(category.name) : "";
  const normalizedSlug = category.slug ? normCategoryName(category.slug) : "";
  return names.has(normalizedName) || names.has(normalizedSlug);
}

const MAIN_POLICY_CATEGORY_ID = 28;
const MAIN_POLICY_CATEGORY_NAMES = new Set(["policy", "policies", "policy en"]);
const MAIN_POLICY_FR_CATEGORY_NAMES = new Set(["policy fr", "policy-fr"]);
const MAIN_POLICY_CATEGORY_NAME_UNION = new Set([
  ...MAIN_POLICY_CATEGORY_NAMES,
  ...MAIN_POLICY_FR_CATEGORY_NAMES,
]);

/** First PDF hyperlink in WordPress post HTML (policy documents). */
export function extractPolicyDownloadUrl(html: string): string | null {
  const urls: string[] = [];
  const hrefRe = /href=["'](https?:\/\/[^"']+\.pdf[^"']*)["']/gi;
  let match: RegExpExecArray | null;
  while ((match = hrefRe.exec(html)) !== null) {
    urls.push(match[1].replace(/&amp;/g, "&"));
  }
  return urls[0] ?? null;
}

export function postIsMainPolicy(post: Pick<WpPostWithSource, "source" | "isPolicy">): boolean {
  return post.source === "main" && post.isPolicy === true;
}
const MAIN_CATEGORY_PAGE_SIZE = 100;
const MAIN_POST_MAX_PAGES = 4;
const mainCategoryIdCache = new Map<string, number | null>();

async function fetchMainCategories(): Promise<WpApiCategory[]> {
  const all: WpApiCategory[] = [];
  for (let page = 1; page <= MAIN_POST_MAX_PAGES; page += 1) {
    const url = new URL(`${API.main}/categories`);
    url.searchParams.set("per_page", String(MAIN_CATEGORY_PAGE_SIZE));
    url.searchParams.set("page", String(page));
    const categories = await wpFetchJson<WpApiCategory[]>(url.toString());
    if (!Array.isArray(categories) || categories.length === 0) break;
    all.push(...categories);
    if (categories.length < MAIN_CATEGORY_PAGE_SIZE) break;
  }
  return all;
}

async function fetchMainPostsRaw(categoryId?: number | number[]): Promise<WpApiPost[]> {
  const all: WpApiPost[] = [];
  const categoryParam =
    typeof categoryId === "number"
      ? String(categoryId)
      : Array.isArray(categoryId) && categoryId.length > 0
        ? categoryId.join(",")
        : null;

  for (let page = 1; page <= MAIN_POST_MAX_PAGES; page += 1) {
    const url = new URL(`${API.main}/posts`);
    if (categoryParam) {
      url.searchParams.set("categories", categoryParam);
    }
    url.searchParams.set("per_page", "50");
    url.searchParams.set("page", String(page));
    url.searchParams.set("_embed", "author,wp:term");
    const posts = await wpFetchJson<WpApiPost[]>(url.toString());
    if (!Array.isArray(posts) || posts.length === 0) break;
    all.push(...posts);
    if (posts.length < 50) break;
  }
  return dedupePosts(all);
}

async function resolveMainCategoryId(names: ReadonlySet<string>): Promise<number | null> {
  const cacheKey = `main:${Array.from(names).sort().join(",")}`;
  if (mainCategoryIdCache.has(cacheKey)) {
    return mainCategoryIdCache.get(cacheKey) ?? null;
  }

  const categories = await fetchMainCategories();
  const matched = categories.find((category) => categoryMatchesNames(category, names));
  const resolved = matched?.id ?? null;
  mainCategoryIdCache.set(cacheKey, resolved);
  return resolved;
}

const MAIN_PUBLICATION_CATEGORY_ID = 31;
const MAIN_PUBLICATION_CATEGORY_NAMES = new Set([
  "publication",
  "publications",
  "publication en",
]);

const MAIN_BLOG_CATEGORY_ID = 1;
const MAIN_BLOG_CATEGORY_NAMES = new Set(["blog"]);

const MAIN_BLOG_IU_CATEGORY_ID = 39;
const MAIN_BLOG_IU_CATEGORY_NAMES = new Set(["blog iu", "blog-iu"]);

function sortMainPostsNewest(posts: WpPostWithSource[]): WpPostWithSource[] {
  return posts.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

function filterMainPostsByCategories(
  posts: WpApiPost[],
  include: { categoryIds: number[]; names: ReadonlySet<string>[] },
  exclude?: { id: number; names: ReadonlySet<string> },
): WpApiPost[] {
  return posts.filter((post) => {
    const included = include.categoryIds.some((id, index) =>
      postHasCategory(post, { id, names: include.names[index] }),
    );
    if (!included) return false;
    if (exclude && postHasCategory(post, exclude)) return false;
    return true;
  });
}

async function fetchMainBlogPostsFiltered(options: {
  categoryIds: number[];
  names: ReadonlySet<string>[];
  exclude?: { id: number; names: ReadonlySet<string> };
}): Promise<WpPostWithSource[]> {
  const primaryId = options.categoryIds[0];

  let posts =
    options.categoryIds.length === 1
      ? await fetchMainPostsRaw(primaryId)
      : await fetchMainPostsRaw(options.categoryIds);

  posts = filterMainPostsByCategories(
    posts,
    { categoryIds: options.categoryIds, names: options.names },
    options.exclude,
  );

  if (posts.length === 0) {
    posts = filterMainPostsByCategories(
      await fetchMainPostsRaw(),
      { categoryIds: options.categoryIds, names: options.names },
      options.exclude,
    );
  }

  return sortMainPostsNewest(posts.map((p) => normalizePost("main", p)));
}

/**
 * Main site journal posts by locale:
 * - `en`: WordPress category **Blog** only
 * - `fr`: **Blog-IU** only
 */
export async function getMainBlogPosts(locale: MainSiteLocale): Promise<WpPostWithSource[]> {
  try {
    const blogCategoryId =
      (await resolveMainCategoryId(MAIN_BLOG_CATEGORY_NAMES)) ?? MAIN_BLOG_CATEGORY_ID;
    const blogIuCategoryId =
      (await resolveMainCategoryId(MAIN_BLOG_IU_CATEGORY_NAMES)) ?? MAIN_BLOG_IU_CATEGORY_ID;

    if (locale === "fr") {
      return fetchMainBlogPostsFiltered({
        categoryIds: [blogIuCategoryId],
        names: [MAIN_BLOG_IU_CATEGORY_NAMES],
      });
    }

    return fetchMainBlogPostsFiltered({
      categoryIds: [blogCategoryId],
      names: [MAIN_BLOG_CATEGORY_NAMES],
      exclude: { id: blogIuCategoryId, names: MAIN_BLOG_IU_CATEGORY_NAMES },
    });
  } catch {
    return [];
  }
}

/** Main site posts in the WordPress "Publication" category, newest first. */
export async function getMainPublicationPosts(): Promise<WpPostWithSource[]> {
  try {
    const resolvedCategory =
      (await resolveMainCategoryId(MAIN_PUBLICATION_CATEGORY_NAMES)) ??
      MAIN_PUBLICATION_CATEGORY_ID;
    let posts = await fetchMainPostsRaw(resolvedCategory);
    if (posts.length === 0) {
      posts = (await fetchMainPostsRaw()).filter((post) =>
        postHasCategory(post, { id: resolvedCategory, names: MAIN_PUBLICATION_CATEGORY_NAMES }),
      );
    }
    return posts
      .map((p) => normalizePost("main", p))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

/** Main site posts in the WordPress Policy category for the locale, newest first. */
export async function getMainPolicyPosts(locale: MainSiteLocale = "en"): Promise<WpPostWithSource[]> {
  try {
    if (locale === "fr") {
      const frenchPosts = await fetchMainPolicyPostsForNames(MAIN_POLICY_FR_CATEGORY_NAMES, null);
      if (frenchPosts.length > 0) return frenchPosts;
    }

    return fetchMainPolicyPostsForNames(MAIN_POLICY_CATEGORY_NAMES, MAIN_POLICY_CATEGORY_ID);
  } catch {
    return [];
  }
}

async function fetchMainPolicyPostsForNames(
  names: ReadonlySet<string>,
  fallbackId: number | null,
): Promise<WpPostWithSource[]> {
  const resolvedCategory = (await resolveMainCategoryId(names)) ?? fallbackId;
  if (resolvedCategory === null) return [];

  let posts = await fetchMainPostsRaw(resolvedCategory);
  posts = posts.filter((post) => postHasCategory(post, { id: resolvedCategory, names }));
  if (posts.length === 0) {
    posts = (await fetchMainPostsRaw()).filter((post) =>
      postHasCategory(post, { id: resolvedCategory, names }),
    );
  }
  return posts
    .map((p) => normalizePost("main", p))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

export function formatWpPostDate(iso: string, locale = "en-CA"): string {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return "";
  return d.toLocaleDateString(locale, { year: "numeric", month: "short", day: "numeric" });
}

/** Day + short month for publication card badges (e.g. 31 / Jul). */
export function formatWpPostDateBadge(
  iso: string,
  locale = "en-CA",
): { day: string; month: string } | null {
  const d = new Date(iso);
  if (Number.isNaN(d.getTime())) return null;
  return {
    day: d.toLocaleDateString(locale, { day: "numeric" }),
    month: d.toLocaleDateString(locale, { month: "short" }),
  };
}

/** External publisher URL for publication cards; falls back to journal path. */
export function publicationFindItUrl(post: Pick<WpPostWithSource, "slug" | "source" | "externalUrl">): string {
  if (post.externalUrl) return post.externalUrl;
  if (post.source === "main" && MAIN_PUBLICATION_EXTERNAL_FALLBACK[post.slug]) {
    return MAIN_PUBLICATION_EXTERNAL_FALLBACK[post.slug];
  }
  return blogPostPath(post as WpPostWithSource);
}

export function wpPostAuthorSlug(post: Pick<WpPostWithSource, "authorName">): string {
  const name = post.authorName?.trim();
  if (!name) return "real-life-institute";
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

export function wpPostExcerpt(post: WpPost, maxLength = 160): string {
  const raw = post.excerpt?.rendered || post.content.rendered || "";
  const text = stripHtml(raw);
  if (text.length <= maxLength) return text;
  const trimmed = text.slice(0, maxLength);
  const lastSpace = trimmed.lastIndexOf(" ");
  return `${(lastSpace > 40 ? trimmed.slice(0, lastSpace) : trimmed).trim()}…`;
}

export function wpPostTitle(post: WpPost): string {
  return stripHtml(post.title.rendered || "");
}

/** Newest first, merged from both sites. Safe on fetch failure (empty list). */
export async function getLatestPosts(limit = 6): Promise<WpPostWithSource[]> {
  try {
    const posts = await getPosts();
    return posts
      .filter((p) => p.date)
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, limit);
  } catch {
    return [];
  }
}

export async function getPost(
  source: WpSource,
  slug: string,
): Promise<WpPostWithSource | null> {
  if (source !== "main") return null;

  for (const candidate of wpSlugLookupCandidates(slug)) {
    const url = new URL(`${API.main}/posts`);
    url.searchParams.set("slug", candidate);
    url.searchParams.set("_embed", "author,wp:term");

    const posts = await wpFetchJson<WpApiPost[]>(url.toString());
    if (!Array.isArray(posts) || !posts[0]) continue;

    return normalizePost(source, posts[0]);
  }

  return null;
}

