import Image from "next/image";
import Link from "next/link";
import type { WpPostWithSource } from "@/lib/wp";
import { blogPostPath, stripHtml } from "@/lib/wp";

/* ── Sub-nav ──────────────────────────────────────────────────── */
export const PUB_SUBNAV = [
  { id: "blogs", label: "Blogs / Op-eds", href: "/africa/publications/blogs" },
  { id: "stories", label: "Stories", href: "/africa/publications/stories" },
  { id: "policy-briefs", label: "Policy Briefs", href: "/africa/publications/policy-briefs" },
  { id: "papers", label: "Peer-Reviewed Papers", href: "/africa/publications/peer-reviewed-papers" },
] as const;

export type PubSection = (typeof PUB_SUBNAV)[number]["id"];

export function PubSubNav({ active }: { active: PubSection }) {
  return (
    <div className="border-b border-zinc-200/70 bg-white dark:border-zinc-800/60 dark:bg-zinc-950">
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
        {PUB_SUBNAV.map(({ id, label, href }) => (
          <Link
            key={id}
            href={href}
            className={`shrink-0 border-b-2 px-4 py-3.5 text-[11px] font-bold uppercase tracking-[0.15em] transition-colors ${
              active === id
                ? "border-teal-600 text-teal-700 dark:border-teal-500 dark:text-teal-400"
                : "border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-500 dark:hover:text-zinc-300"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </div>
  );
}

/* ── Starburst ─────────────────────────────────────────────────── */
function Starburst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l1.6 5.3L19 5l-3.4 4.5L21 12l-5.4 1.4L17 19l-5-2.6L12 22l-1.6-5.3L5 19l3.4-4.5L3 12l5.4-1.4L6 5l5 2.6z" />
    </svg>
  );
}

/* ── Featured post ─────────────────────────────────────────────── */
function FeaturedPostCard({ post }: { post: WpPostWithSource }) {
  const title = stripHtml(post.title.rendered);
  const excerpt = post.excerpt ? stripHtml(post.excerpt.rendered).slice(0, 180).trim() : "";
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={blogPostPath(post)}
      className="group relative flex flex-col overflow-hidden rounded-4xl border border-zinc-200/80 bg-white shadow-sm transition duration-300 hover:shadow-2xl hover:shadow-teal-900/10 dark:border-zinc-800/80 dark:bg-zinc-900/60 lg:flex-row"
    >
      {/* Image */}
      {post.featuredImage && (
        <div className="relative h-52 overflow-hidden lg:h-auto lg:w-[42%] lg:shrink-0">
          <Image
            src={post.featuredImage}
            alt=""
            fill
            className="object-cover transition duration-700 group-hover:scale-[1.03]"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
          <div className="absolute inset-0 bg-linear-to-r from-transparent to-white/10 dark:to-black/20" aria-hidden />
        </div>
      )}

      {/* Content */}
      <div className="flex flex-1 flex-col justify-center p-8 sm:p-10 lg:p-12">
        <div className="flex items-center gap-3">
          <span className="inline-block rounded-full border border-teal-200/70 bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-700 dark:border-teal-800/50 dark:bg-teal-950/40 dark:text-teal-400">
            Blog-AP
          </span>
          <span className="text-[11px] text-zinc-400 dark:text-zinc-500">{date}</span>
        </div>
        <h2
          className="mt-4 font-black leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-teal-800 dark:text-zinc-50 dark:group-hover:text-teal-300"
          style={{ fontSize: "clamp(1.25rem, 2.5vw, 1.75rem)" }}
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        {excerpt && (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {excerpt}
          </p>
        )}
        <div className="mt-6 flex items-center gap-2 text-sm font-bold text-teal-700 transition-colors group-hover:text-teal-600 dark:text-teal-400 dark:group-hover:text-teal-300">
          Read article
          <svg className="h-4 w-4 transition-transform group-hover:translate-x-0.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>

      <div aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-teal-500 to-emerald-500 transition-all duration-500 group-hover:w-full" />
    </Link>
  );
}

/* ── Regular post card ─────────────────────────────────────────── */
function BlogCard({ post }: { post: WpPostWithSource }) {
  const excerpt = post.excerpt ? stripHtml(post.excerpt.rendered).slice(0, 110).trim() : "";
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={blogPostPath(post)}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200/60 hover:shadow-xl hover:shadow-teal-900/8 dark:border-zinc-800/70 dark:bg-zinc-900/60 dark:hover:border-teal-800/50"
    >
      <div aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-teal-500 to-emerald-500 transition-all duration-500 group-hover:w-full" />
      {post.featuredImage && (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={post.featuredImage}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex items-center gap-2">
          <span className="inline-block rounded-full border border-teal-200/70 bg-teal-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-teal-700 dark:border-teal-800/50 dark:bg-teal-950/40 dark:text-teal-400">
            Blog-AP
          </span>
          <p className="text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">{date}</p>
        </div>
        <h3
          className="mt-2 flex-1 text-sm font-bold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-teal-800 dark:text-zinc-50 dark:group-hover:text-teal-300"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        {excerpt && (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {excerpt}
          </p>
        )}
        <span className="mt-4 flex items-center gap-1.5 text-xs font-bold text-teal-700 transition-colors group-hover:text-teal-600 dark:text-teal-400">
          Read more
          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

/* ── Empty state ───────────────────────────────────────────────── */
function EmptyState() {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center">
      <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500">
        <svg className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
          <path fillRule="evenodd" d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Zm3.293 1.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 1 1-1.414-1.414L7.586 11H5a1 1 0 1 1 0-2h2.586L5.293 7.707a1 1 0 0 1 0-1.414ZM11 9a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Z" clipRule="evenodd" />
        </svg>
      </div>
      <h3 className="mt-5 text-base font-bold text-zinc-900 dark:text-zinc-50">No posts found</h3>
      <p className="mt-2 max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
        Blog posts will appear here once they&apos;re published to the journal feed.
      </p>
      <Link
        href="/africa/publications"
        className="mt-6 inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-600 transition hover:border-teal-300 hover:text-teal-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
      >
        Publications hub
      </Link>
    </div>
  );
}

/* ── Main page ─────────────────────────────────────────────────── */
export function AfricaBlogsPage({ posts }: { posts: WpPostWithSource[] }) {
  const [featured, ...rest] = posts;

  return (
    <>
      {/* Sub-nav */}
      <PubSubNav active="blogs" />

      {/* ── Hero ── */}
      <section
        className="relative isolate overflow-hidden bg-linear-to-br from-teal-950 via-[#0b2d2a] to-zinc-950 pb-0"
        aria-labelledby="blogs-heading"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[400px] w-[700px] -translate-x-1/2 rounded-full bg-teal-400/8 blur-[120px]" />
        <Starburst className="pointer-events-none absolute right-[8%] top-10 h-10 w-10 text-teal-400/15" />
        <Starburst className="pointer-events-none absolute left-[6%] bottom-6 h-7 w-7 rotate-22 text-amber-400/15" />

        <div className="relative mx-auto max-w-7xl px-4 pb-14 pt-16 sm:px-6 sm:pt-20 sm:pb-16 lg:px-8 lg:pt-24">
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-teal-500/50" />
            <Link href="/africa/publications" className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-400/70 transition hover:text-teal-400">
              Publications
            </Link>
          </div>
          <h1
            id="blogs-heading"
            className="mt-6 font-black leading-none tracking-tighter text-white"
            style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
          >
            Blogs &{" "}
            <span className="bg-linear-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
              Op-eds.
            </span>
          </h1>
          <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400">
            Research insights, field perspectives, and expert commentary from our team across Africa.
          </p>

          <div className="mt-4 flex items-center gap-3">
            <span className="rounded-full border border-teal-700/50 bg-teal-900/30 px-3 py-1 text-[11px] font-bold text-teal-400">
              {posts.length} article{posts.length !== 1 ? "s" : ""}
            </span>
            <span className="h-px w-16 bg-teal-800/50" />
            <span className="text-[11px] text-zinc-500">Live from Africa Programs</span>
          </div>
        </div>

        <div aria-hidden className="h-px w-full bg-linear-to-r from-transparent via-teal-800/50 to-transparent" />
      </section>

      {/* ── Posts ── */}
      <section className="bg-[#f7faf9] py-16 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <EmptyState />
          ) : (
            <>
              {/* Featured */}
              {featured && (
                <div className="mb-10">
                  <FeaturedPostCard post={featured} />
                </div>
              )}

              {/* Rest grid */}
              {rest.length > 0 && (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <BlogCard key={`${post.source}-${post.id}`} post={post} />
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </section>
    </>
  );
}
