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
  authorName?: string | null;
  authorBio?: string | null;
  authorAvatar?: string | null;
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
      }>
    >;
  };
  yoast_head_json?: {
    og_image?: Array<{
      url?: string;
    }>;
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

const API: Record<WpSource, string> = {
  main: "https://reallifeinstitute.org/wp-json/wp/v2",
  africa: "https://africa-programs.reallifeinstitute.org/wp-json/wp/v2",
};

const WP_REVALIDATE_SECONDS = 300;
const WP_TIMEOUT_MS = 12000;
const WP_POSTS_PER_PAGE = 50;

export function sourceDisplay(source: WpSource): string {
  return source === "main" ? "Main" : "Africa";
}

export function isWpSource(s: string): s is WpSource {
  return s === "main" || s === "africa";
}

/**
 * Internal URL for a journal post. Encodes the slug so literal `%` (common on
 * some WP installs) and other reserved characters survive path parsing.
 */
export function blogPostPath(post: WpPostWithSource): string {
  return `/blog/${post.source}/${encodeURIComponent(post.slug)}`;
}

/** Plain text from WordPress HTML fields */
export function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, "").replace(/&nbsp;/g, " ").replace(/\s+/g, " ").trim();
}

function normalizePost(source: WpSource, post: WpApiPost): WpPostWithSource {
  const terms = post._embedded?.["wp:term"] ?? [];
  const allTerms = terms.flatMap((group) => group ?? []);
  const author = post._embedded?.author?.[0];
  const avatarCandidates = author?.avatar_urls ? Object.values(author.avatar_urls) : [];
  const category = allTerms.find(
    (term) =>
      term.taxonomy === "category" &&
      term.name &&
      term.name.trim().length > 0 &&
      term.name.toLowerCase() !== "uncategorized",
  );
  return {
    id: post.id,
    slug: post.slug,
    date: post.date,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    featuredImage: post.yoast_head_json?.og_image?.[0]?.url ?? null,
    theme: category?.name?.trim() ?? null,
    authorName: author?.name?.trim() ?? null,
    authorBio: author?.description?.trim() ?? null,
    authorAvatar: avatarCandidates[0] ?? null,
    source,
  };
}

async function fetchJsonViaHttpsIpv4<T>(url: string): Promise<T | null> {
  return new Promise((resolve) => {
    const req = httpsRequest(
      url,
      {
        family: 4,
        timeout: WP_TIMEOUT_MS,
        headers: { accept: "application/json" },
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

async function wpFetchJson<T>(url: string): Promise<T | null> {
  try {
    const res = await fetch(url, {
      next: { revalidate: WP_REVALIDATE_SECONDS },
    });
    if (!res.ok) return null;
    return (await res.json()) as T;
  } catch {
    // Fallback path for environments where undici fetch intermittently times out
    // on dual-stack DNS routes; forcing IPv4 is typically more reliable.
    return fetchJsonViaHttpsIpv4<T>(url);
  }
}

async function fetchPostsForSource(source: WpSource): Promise<WpPostWithSource[]> {
  const url = new URL(`${API[source]}/posts`);
  url.searchParams.set("per_page", String(WP_POSTS_PER_PAGE));
  url.searchParams.set("_embed", "author,wp:term");
  const posts = await wpFetchJson<WpApiPost[]>(url.toString());
  if (!Array.isArray(posts)) return [];
  return posts.map((p) => normalizePost(source, p));
}

/** Merged posts from both WordPress sites. If one site fails, posts from the other are still returned. */
export async function getPosts(): Promise<WpPostWithSource[]> {
  const [mainPosts, africaPosts] = await Promise.all([
    fetchPostsForSource("main"),
    fetchPostsForSource("africa"),
  ]);
  return [...mainPosts, ...africaPosts];
}

/** Category IDs on the Africa Programs WordPress site. */
const AFRICA_CAT = {
  blogAp: 42,     // "Blog AP"
  storiesAp: 43,  // "Stories AP"
} as const;

/** Africa "Blog-AP" category posts, newest first. Safe on fetch failure (empty list). */
export async function getAfricaPosts(): Promise<WpPostWithSource[]> {
  const url = new URL(`${API.africa}/posts`);
  url.searchParams.set("categories", String(AFRICA_CAT.blogAp));
  url.searchParams.set("per_page", "50");
  url.searchParams.set("_embed", "author,wp:term");
  const posts = await wpFetchJson<WpApiPost[]>(url.toString());
  if (!Array.isArray(posts)) return [];
  return posts
    .map((p) => normalizePost("africa", p))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}

/** Africa "Stories-AP" category posts, newest first. Safe on fetch failure (empty list). */
export async function getAfricaStories(): Promise<WpPostWithSource[]> {
  const url = new URL(`${API.africa}/posts`);
  url.searchParams.set("categories", String(AFRICA_CAT.storiesAp));
  url.searchParams.set("per_page", "50");
  url.searchParams.set("_embed", "author,wp:term");
  const posts = await wpFetchJson<WpApiPost[]>(url.toString());
  if (!Array.isArray(posts)) return [];
  return posts
    .map((p) => normalizePost("africa", p))
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
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
  const url = new URL(`${API[source]}/posts`);
  url.searchParams.set("slug", slug);
  url.searchParams.set("_embed", "author,wp:term");

  const posts = await wpFetchJson<WpApiPost[]>(url.toString());
  if (!Array.isArray(posts)) return null;
  const post = posts[0];
  if (!post) return null;

  return normalizePost(source, post);
}

/** Headings that are UI chrome, not webinar titles (Elementor / ElementsKit). */
const ELEMENTOR_TITLE_SKIP =
  /^(venue|access the virtual webinar|connect via google meet|next webinar)$/i;

type ParsedCountdownEvent = {
  title: string;
  excerpt: string;
  at: Date;
};

/**
 * Parse ElementsKit countdown widgets and associated titles from the upcoming-events page HTML.
 */
function parseElementorCountdownEvents(html: string): ParsedCountdownEvent[] {
  const results: ParsedCountdownEvent[] = [];
  const countdownRe = /data-ekit-countdown="([^"]+)"/g;
  let m: RegExpExecArray | null;
  while ((m = countdownRe.exec(html)) !== null) {
    const pos = m.index;
    const dateStr = m[1].trim();
    const before = html.slice(0, pos);

    const titleMatches = [
      ...before.matchAll(/class="ekit-heading--title[^"]*"[^>]*>([^<]+)<\/h2>/gi),
    ].map((x) => stripHtml(x[1]).trim());
    const titles = titleMatches.filter(
      (t) => t.length >= 12 && !ELEMENTOR_TITLE_SKIP.test(t),
    );
    const title = titles[titles.length - 1];
    if (!title) continue;

    const isoLike = dateStr.includes("T") ? dateStr : dateStr.replace(" ", "T");
    const at = new Date(isoLike);
    if (Number.isNaN(at.getTime())) continue;

    const descMatch = [...before.matchAll(/<div[^>]*ekit-heading__description[^>]*>([\s\S]*?)<\/div>/gi)];
    const rawDesc = descMatch.length > 0 ? descMatch[descMatch.length - 1][1] : "";
    const excerpt = stripHtml(rawDesc).slice(0, 280).trim();

    results.push({ title, excerpt, at });
  }
  return results;
}

/**
 * Prefer the next upcoming event (soonest at/after start of today). If none, use the most recent past event.
 */
function pickHeroCountdownEvent(events: ParsedCountdownEvent[]): ParsedCountdownEvent | null {
  if (events.length === 0) return null;
  const start = new Date();
  start.setHours(0, 0, 0, 0);
  const startMs = start.getTime();

  const upcoming = events.filter((e) => e.at.getTime() >= startMs);
  if (upcoming.length > 0) {
    return upcoming.sort((a, b) => a.at.getTime() - b.at.getTime())[0];
  }
  return events.sort((a, b) => b.at.getTime() - a.at.getTime())[0];
}

/**
 * Returns the Africa upcoming-events page, with the hero preferring the most relevant parsed webinar
 * (ElementsKit countdown + heading) when present.
 */
export async function getUpcomingEventsPage(): Promise<WpPageHighlight | null> {
  const url = new URL(`${API.africa}/pages`);
  url.searchParams.set("slug", "upcoming-events");

  const pages = await wpFetchJson<WpApiPage[]>(url.toString());
  if (!Array.isArray(pages) || pages.length === 0) return null;

  const candidates = pages.map((page) => {
    const parsed = parseElementorCountdownEvents(page.content.rendered);
    const selected = pickHeroCountdownEvent(parsed);
    return { page, selected };
  });

  const now = new Date();
  now.setHours(0, 0, 0, 0);
  const todayMs = now.getTime();

  const withUpcoming = candidates
    .filter((c) => c.selected && c.selected.at.getTime() >= todayMs)
    .sort((a, b) => a.selected!.at.getTime() - b.selected!.at.getTime());

  const withAnyEvent = candidates
    .filter((c) => c.selected)
    .sort((a, b) => b.selected!.at.getTime() - a.selected!.at.getTime());

  const preferredCandidate =
    withUpcoming[0] ??
    withAnyEvent[0] ??
    (candidates.find((c) => c.page.link.includes("/events/upcoming-events/")) ??
      [...candidates].sort(
        (a, b) => new Date(b.page.modified).getTime() - new Date(a.page.modified).getTime(),
      )[0]);

  const preferred = preferredCandidate.page;
  const selected = preferredCandidate.selected;

  const rawPageExcerpt = preferred.excerpt?.rendered || preferred.content.rendered;
  const pageExcerpt = stripHtml(rawPageExcerpt).slice(0, 220).trim();

  const pageTitle = stripHtml(preferred.title.rendered) || "Upcoming Events";

  if (selected) {
    return {
      title: selected.title,
      excerpt: selected.excerpt || pageExcerpt,
      link: preferred.link,
      modified: preferred.modified,
      featuredImage: preferred.yoast_head_json?.og_image?.[0]?.url ?? null,
      eventDateISO: selected.at.toISOString(),
    };
  }

  return {
    title: pageTitle,
    excerpt: pageExcerpt,
    link: preferred.link,
    modified: preferred.modified,
    featuredImage: preferred.yoast_head_json?.og_image?.[0]?.url ?? null,
    eventDateISO: null,
  };
}
