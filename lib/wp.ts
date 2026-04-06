export type WpSource = "main" | "africa";

export type WpPost = {
  id: number;
  slug: string;
  /** ISO 8601 from WordPress REST API */
  date: string;
  title: { rendered: string };
  content: { rendered: string };
  excerpt?: { rendered: string };
  featuredImage?: string | null;
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
  return {
    id: post.id,
    slug: post.slug,
    date: post.date,
    title: post.title,
    content: post.content,
    excerpt: post.excerpt,
    featuredImage: post.yoast_head_json?.og_image?.[0]?.url ?? null,
    source,
  };
}

export async function getPosts(): Promise<WpPostWithSource[]> {
  const [mainRes, africaRes] = await Promise.all([
    fetch(`${API.main}/posts`, { cache: "no-store" }),
    fetch(`${API.africa}/posts`, { cache: "no-store" }),
  ]);

  if (!mainRes.ok || !africaRes.ok) {
    throw new Error("Failed to fetch posts");
  }

  const mainPosts = (await mainRes.json()) as WpApiPost[];
  const africaPosts = (await africaRes.json()) as WpApiPost[];

  const taggedMain = mainPosts.map((p) => normalizePost("main", p));
  const taggedAfrica = africaPosts.map((p) => normalizePost("africa", p));

  return [...taggedMain, ...taggedAfrica];
}

/** Category IDs on the Africa Programs WordPress site. */
const AFRICA_CAT = {
  blogAp: 42,     // "Blog AP"
  storiesAp: 43,  // "Stories AP"
} as const;

/** Africa "Blog-AP" category posts, newest first. Safe on fetch failure (empty list). */
export async function getAfricaPosts(): Promise<WpPostWithSource[]> {
  try {
    const res = await fetch(
      `${API.africa}/posts?categories=${AFRICA_CAT.blogAp}&per_page=50`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const posts = (await res.json()) as WpApiPost[];
    return posts
      .map((p) => normalizePost("africa", p))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
}

/** Africa "Stories-AP" category posts, newest first. Safe on fetch failure (empty list). */
export async function getAfricaStories(): Promise<WpPostWithSource[]> {
  try {
    const res = await fetch(
      `${API.africa}/posts?categories=${AFRICA_CAT.storiesAp}&per_page=50`,
      { cache: "no-store" },
    );
    if (!res.ok) return [];
    const posts = (await res.json()) as WpApiPost[];
    return posts
      .map((p) => normalizePost("africa", p))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  } catch {
    return [];
  }
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

  const res = await fetch(url.toString(), { cache: "no-store" });
  if (!res.ok) return null;

  const posts = (await res.json()) as WpApiPost[];
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
      (t) => t.length >= 24 && !ELEMENTOR_TITLE_SKIP.test(t),
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
  try {
    const url = new URL(`${API.africa}/pages`);
    url.searchParams.set("slug", "upcoming-events");

    const res = await fetch(url.toString(), { cache: "no-store" });
    if (!res.ok) return null;

    const pages = (await res.json()) as WpApiPage[];
    if (pages.length === 0) return null;

    const preferred =
      pages.find((page) => page.link.includes("/events/upcoming-events/")) ??
      [...pages].sort((a, b) => new Date(b.modified).getTime() - new Date(a.modified).getTime())[0];

    const html = preferred.content.rendered;
    const parsed = parseElementorCountdownEvents(html);
    const selected = pickHeroCountdownEvent(parsed);

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
  } catch {
    return null;
  }
}
