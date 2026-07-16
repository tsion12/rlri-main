import Image from "next/image";
import Link from "next/link";
import { au } from "@/components/shared/africa-ui";
import { MainLink } from "@/components/main/MainLink";
import { mainAboutSectionHref } from "@/lib/main-routes";
import type { WpPostWithSource } from "@/lib/wp";
import { blogPostPath, formatWpPostDate, wpPostExcerpt, wpPostTitle } from "@/lib/wp";

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  readPolicy: string;
  viewAll: string;
  empty: string;
  posts: WpPostWithSource[];
  locale: string;
};

function PolicyIcon() {
  return (
    <svg className="size-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path
        fillRule="evenodd"
        d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.589 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.563 2 12.162 2 7a11.973 11.973 0 0 1 .104-1.589.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.749Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z"
        clipRule="evenodd"
      />
    </svg>
  );
}

export function MainAboutPolicies({
  eyebrow,
  title,
  lead,
  readPolicy,
  viewAll,
  empty,
  posts,
  locale,
}: Props) {
  const dateLocale = locale === "fr" ? "fr-CA" : "en-CA";

  return (
    <section
      id="institute-policies"
      className="relative border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950 scroll-mt-24"
      aria-labelledby="about-policies-heading"
    >
      <div className={au.footer.mesh} aria-hidden />

      <div className={`${au.about.section} relative py-14 sm:py-16 lg:py-20`}>
        <div className="mb-10 flex flex-col gap-6 sm:mb-12 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl">
            <div className="flex flex-wrap items-center gap-3">
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600 dark:text-teal-400">
                {eyebrow}
              </p>
              {posts.length > 0 && (
                <span className="rounded-full border border-teal-200/80 bg-teal-50 px-2.5 py-0.5 text-[11px] font-semibold text-teal-800 dark:border-teal-800/60 dark:bg-teal-950/50 dark:text-teal-300">
                  {String(posts.length).padStart(2, "0")}
                </span>
              )}
            </div>
            <h2
              id="about-policies-heading"
              className="mt-3 font-serif text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50"
            >
              {title}
            </h2>
            <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">{lead}</p>
          </div>

          {posts.length > 0 && (
            <MainLink
              href={mainAboutSectionHref("policies")}
              className="inline-flex shrink-0 items-center gap-2 rounded-full border border-zinc-200/90 bg-zinc-50 px-4 py-2 text-sm font-semibold text-zinc-800 transition hover:border-teal-300/80 hover:bg-teal-50 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-teal-800 dark:hover:text-teal-300"
            >
              {viewAll}
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </MainLink>
          )}
        </div>

        {posts.length === 0 ? (
          <p className="rounded-2xl border border-dashed border-zinc-200/90 bg-zinc-50/80 px-6 py-10 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
            {empty}
          </p>
        ) : (
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => {
              const href = blogPostPath(post);
              const titleText = wpPostTitle(post);
              const excerpt = wpPostExcerpt(post, 120);
              const dateLabel = formatWpPostDate(post.date, dateLocale);

              return (
                <li key={post.id} className="flex">
                  <Link
                    href={href}
                    className="group flex w-full flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm transition duration-300 hover:-translate-y-0.5 hover:border-teal-300/70 hover:shadow-md dark:border-zinc-800/90 dark:bg-zinc-900/60 dark:hover:border-teal-800/50"
                  >
                    {post.featuredImage ? (
                      <div className="relative aspect-16/10 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                        <Image
                          src={post.featuredImage}
                          alt=""
                          fill
                          className="object-cover transition duration-500 group-hover:scale-[1.03]"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                        />
                        <div
                          className="absolute inset-0 bg-linear-to-t from-zinc-950/35 via-transparent to-transparent"
                          aria-hidden
                        />
                      </div>
                    ) : (
                      <div className="flex aspect-16/10 items-center justify-center bg-linear-to-br from-teal-50 via-white to-zinc-50 dark:from-teal-950/40 dark:via-zinc-900 dark:to-zinc-950">
                        <div className="flex size-12 items-center justify-center rounded-xl bg-teal-600/10 text-teal-700 ring-1 ring-teal-600/15 dark:bg-teal-500/15 dark:text-teal-400">
                          <PolicyIcon />
                        </div>
                      </div>
                    )}

                    <div className="flex flex-1 flex-col p-4 sm:p-5">
                      {dateLabel ? (
                        <time
                          dateTime={post.date}
                          className="text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500"
                        >
                          {dateLabel}
                        </time>
                      ) : null}
                      <h3 className="mt-2 line-clamp-3 text-sm font-bold leading-snug text-zinc-900 transition-colors group-hover:text-teal-800 dark:text-zinc-50 dark:group-hover:text-teal-300">
                        {titleText}
                      </h3>
                      {excerpt ? (
                        <p className="mt-2 line-clamp-3 flex-1 text-xs leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {excerpt}
                        </p>
                      ) : null}
                      <span className="mt-4 inline-flex items-center gap-1 text-[11px] font-semibold text-teal-700 dark:text-teal-400">
                        {readPolicy}
                        <svg
                          className="size-3 transition-transform group-hover:translate-x-0.5"
                          viewBox="0 0 24 24"
                          fill="none"
                          stroke="currentColor"
                          strokeWidth="2.5"
                          aria-hidden
                        >
                          <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </span>
                    </div>
                  </Link>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </section>
  );
}
