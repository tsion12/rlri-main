import Image from "next/image";
import Link from "next/link";
import { BlogEngagement } from "@/components/blog/BlogEngagement";
import { BlogSourceBadge } from "@/components/blog/BlogSourceBadge";
import { stripBlogWordPressHtml } from "@/lib/strip-blog-html";
import { stripHtml, type WpPostWithSource } from "@/lib/wp";

function formatPostDate(iso: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(new Date(iso));
}

function estimateReadingMinutes(html: string) {
  const text = stripHtml(html);
  const words = text.split(/\s+/).filter(Boolean).length;
  return Math.max(1, Math.round(words / 200));
}

export function BlogPostArticle({ post }: { post: WpPostWithSource }) {
  const dateLabel = formatPostDate(post.date);
  const bodyHtml = stripBlogWordPressHtml(post.content.rendered);
  const minutes = estimateReadingMinutes(bodyHtml);
  const excerptPlain = post.excerpt?.rendered ? stripHtml(post.excerpt.rendered) : null;
  const titlePlain = stripHtml(post.title.rendered);

  return (
    <article className="relative mx-auto max-w-3xl px-4 pb-28 pt-6 sm:px-6 sm:pt-8">
      {/* Ambient accents */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-24 top-0 h-72 w-72 rounded-full bg-amber-400/8 blur-3xl dark:bg-amber-500/6"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 top-40 h-64 w-64 rounded-full bg-stone-400/10 blur-3xl dark:bg-violet-500/5"
      />

      <nav className="relative mb-10" aria-label="Breadcrumb">
        <Link
          href="/blog"
          className="group inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white/90 px-4 py-2.5 text-sm font-medium text-stone-600 shadow-sm ring-1 ring-stone-950/5 transition-all hover:border-amber-300/80 hover:bg-amber-50/80 hover:text-stone-900 dark:border-zinc-800 dark:bg-zinc-900/90 dark:text-zinc-400 dark:ring-white/5 dark:hover:border-zinc-600 dark:hover:bg-zinc-800/80 dark:hover:text-zinc-100"
        >
          <span aria-hidden className="transition-transform group-hover:-translate-x-0.5">
            ←
          </span>
          All posts
        </Link>
      </nav>

      <header className="relative">
        <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-amber-700 dark:text-amber-400/90">
          Journal
        </p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <BlogSourceBadge source={post.source} />
          <span className="text-sm text-stone-500 dark:text-zinc-500">
            {post.source === "africa" ? "Africa Program" : "Real Life Institute"}
          </span>
        </div>

        <h1
          className="mt-6 text-balance text-3xl font-semibold leading-[1.12] tracking-tight text-stone-900 dark:text-zinc-50 sm:mt-8 sm:text-4xl sm:leading-[1.08] lg:text-[2.5rem]"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />

        <div className="mt-5 flex flex-wrap items-center gap-x-3 gap-y-1 text-sm text-stone-500 dark:text-zinc-500">
          <time dateTime={post.date} className="font-medium text-stone-700 dark:text-zinc-300">
            {dateLabel}
          </time>
          <span aria-hidden className="text-stone-300 dark:text-zinc-600">
            ·
          </span>
          <span>{minutes} min read</span>
        </div>

        {post.featuredImage ? (
          <div className="relative mt-10 overflow-hidden rounded-2xl border border-stone-200/80 shadow-2xl shadow-stone-950/10 ring-1 ring-stone-950/5 dark:border-zinc-800 dark:shadow-black/40 dark:ring-white/5 sm:rounded-3xl">
            <div className="relative aspect-video w-full sm:aspect-2/1">
              <Image
                src={post.featuredImage}
                alt={titlePlain || "Article cover image"}
                fill
                priority
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 48rem"
              />
              <div
                aria-hidden
                className="absolute inset-0 bg-linear-to-t from-stone-950/40 via-transparent to-transparent dark:from-zinc-950/50"
              />
            </div>
          </div>
        ) : (
          <div
            aria-hidden
            className="mt-10 h-px w-full max-w-md bg-linear-to-r from-amber-500/50 via-amber-400/20 to-transparent"
          />
        )}
      </header>

      {excerptPlain ? (
        <p className="relative mt-10 border-l-[3px] border-amber-500/90 pl-5 text-lg font-medium leading-relaxed text-stone-700 dark:border-amber-400/80 dark:text-zinc-300">
          {excerptPlain}
        </p>
      ) : null}

      <div
        className={`blog-article-body rounded-2xl border border-stone-200/70 bg-white/50 px-5 py-8 shadow-inner shadow-stone-950/5 sm:rounded-3xl sm:px-8 sm:py-10 dark:border-zinc-800/70 dark:bg-zinc-950/35 dark:shadow-none ${
          excerptPlain ? "mt-10" : "mt-12"
        }`}
      >
        <div
          className="wp-post-content"
          dangerouslySetInnerHTML={{ __html: bodyHtml }}
        />
      </div>

      <BlogEngagement slug={post.slug} source={post.source} title={titlePlain} />

      <footer className="relative mt-14 flex flex-col gap-4 border-t border-stone-200/80 pt-10 dark:border-zinc-800 sm:flex-row sm:items-center sm:justify-between">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 text-sm font-semibold text-amber-800 transition hover:text-amber-950 dark:text-amber-400 dark:hover:text-amber-200"
        >
          <span aria-hidden>←</span>
          Back to all posts
        </Link>
        <p className="text-xs text-stone-500 dark:text-zinc-500">{titlePlain}</p>
      </footer>
    </article>
  );
}
