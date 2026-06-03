import Image from "next/image";
import Link from "next/link";
import type { Locale } from "@/lib/i18n/config";
import { getTranslator } from "@/lib/i18n/translate";
import { getMainBlogPosts, blogPostPath, stripHtml, type WpPostWithSource } from "@/lib/wp";

type Props = { locale: Locale };

function themeBadge(post: WpPostWithSource) {
  const t = post.theme?.trim();
  if (t && t.toLowerCase() !== "uncategorized") return t;
  return "Blog";
}

function FeaturedPostCard({
  post,
  readArticle,
}: {
  post: WpPostWithSource;
  readArticle: string;
}) {
  const excerpt = post.excerpt ? stripHtml(post.excerpt.rendered).slice(0, 180).trim() : "";
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <Link
      href={blogPostPath(post)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition-colors hover:border-teal-200/80 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-teal-800/40 lg:flex-row"
    >
      {post.featuredImage && (
        <div className="relative h-52 w-full shrink-0 overflow-hidden lg:h-auto lg:min-h-[280px] lg:w-[42%]">
          <Image
            src={post.featuredImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 1024px) 100vw, 42vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col justify-center p-6 sm:p-8 lg:p-10">
        <div className="flex flex-wrap items-center gap-2 gap-y-1">
          <span className="inline-block rounded-full border border-zinc-200/90 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400">
            {themeBadge(post)}
          </span>
          <span className="text-xs text-zinc-500 dark:text-zinc-500">{date}</span>
        </div>
        <h2 className="mt-4 text-xl font-semibold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-teal-800 dark:text-zinc-50 dark:group-hover:text-teal-300 sm:text-2xl">
          {stripHtml(post.title.rendered)}
        </h2>
        {excerpt ? (
          <p className="mt-4 line-clamp-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {excerpt}
          </p>
        ) : null}
        <span className="mt-6 inline-flex items-center gap-2 text-sm font-semibold text-teal-800 dark:text-teal-300">
          {readArticle}
          <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

function BlogCard({ post, readMore }: { post: WpPostWithSource; readMore: string }) {
  const excerpt = post.excerpt ? stripHtml(post.excerpt.rendered).slice(0, 110).trim() : "";
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={blogPostPath(post)}
      className="group flex flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition-colors hover:border-teal-200/80 dark:border-zinc-800 dark:bg-zinc-900/50 dark:hover:border-teal-800/40"
    >
      {post.featuredImage && (
        <div className="relative h-44 overflow-hidden">
          <Image
            src={post.featuredImage}
            alt=""
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, (max-width: 1280px) 50vw, 33vw"
          />
        </div>
      )}
      <div className="flex flex-1 flex-col p-6">
        <div className="flex flex-wrap items-center gap-2">
          <span className="inline-block rounded-full border border-zinc-200/90 bg-zinc-50 px-2 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400">
            {themeBadge(post)}
          </span>
          <p className="text-[10px] font-medium text-zinc-400 dark:text-zinc-500">{date}</p>
        </div>
        <h3 className="mt-3 flex-1 text-sm font-semibold leading-snug text-zinc-900 transition-colors group-hover:text-teal-800 dark:text-zinc-50 dark:group-hover:text-teal-300">
          {stripHtml(post.title.rendered)}
        </h3>
        {excerpt ? (
          <p className="mt-3 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
            {excerpt}
          </p>
        ) : null}
        <span className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-800 dark:text-teal-300">
          {readMore}
          <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
            <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </Link>
  );
}

export async function MainBlogsPage({ locale }: Props) {
  const [t, posts] = await Promise.all([getTranslator(locale), getMainBlogPosts(locale)]);
  const [featured, ...rest] = posts;
  const countLabel = t("pages.blogs.articleCount").replace("{count}", String(posts.length));

  return (
    <div className="bg-white dark:bg-zinc-950">
      <section
        className="border-b border-zinc-200/80 bg-linear-to-br from-teal-50/80 via-white to-zinc-50 dark:border-zinc-800 dark:from-teal-950/30 dark:via-zinc-950 dark:to-zinc-950"
        aria-labelledby="main-blogs-heading"
      >
        <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600 dark:text-teal-400">
            {t("nav.blogs")}
          </p>
          <h1
            id="main-blogs-heading"
            className="mt-4 font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-[2.35rem] dark:text-zinc-50"
          >
            {t("pages.blogs.pageTitle")}
          </h1>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-600 sm:text-lg dark:text-zinc-400">
            {t("pages.blogs.pageSubtitle")}
          </p>
          {posts.length > 0 ? (
            <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">{countLabel}</p>
          ) : null}
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-zinc-50/50 py-12 dark:border-zinc-800 dark:bg-zinc-950/80 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {posts.length === 0 ? (
            <p className="rounded-2xl border border-dashed border-zinc-200/90 bg-white px-6 py-12 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
              {t("pages.blogs.empty")}
            </p>
          ) : (
            <>
              {featured ? (
                <div className="mb-10">
                  <FeaturedPostCard post={featured} readArticle={t("pages.blogs.readArticle")} />
                </div>
              ) : null}
              {rest.length > 0 ? (
                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {rest.map((post) => (
                    <BlogCard key={post.id} post={post} readMore={t("pages.blogs.readMore")} />
                  ))}
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </div>
  );
}
