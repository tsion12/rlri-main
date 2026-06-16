import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { getTranslator } from "@/lib/i18n/translate";
import {
  formatWpPostDateBadge,
  getMainPublicationPosts,
  publicationFindItUrl,
  wpPostAuthorSlug,
  wpPostExcerpt,
  wpPostTitle,
} from "@/lib/wp";

type Props = { locale: Locale };

function UserIcon() {
  return (
    <svg className="size-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M10 9a3 3 0 1 0 0-6 3 3 0 0 0 0 6ZM6 16.5v-.75A4 4 0 0 1 10 12h0a4 4 0 0 1 4 4.5v.75H6Z" />
    </svg>
  );
}

function FolderIcon() {
  return (
    <svg className="size-3.5 shrink-0" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
      <path d="M3.5 6A1.5 1.5 0 0 1 5 4.5h2.879a1.5 1.5 0 0 1 1.06.44l1.122 1.12A1.5 1.5 0 0 0 11.12 6.5H15A1.5 1.5 0 0 1 16.5 8v7.5A1.5 1.5 0 0 1 15 17H5A1.5 1.5 0 0 1 3.5 15.5V6Z" />
    </svg>
  );
}

export async function MainPublicationsPage({ locale }: Props) {
  const [t, posts] = await Promise.all([getTranslator(locale), getMainPublicationPosts()]);
  const dateLocale = locale === "fr" ? "fr-CA" : "en-CA";

  return (
    <div className="bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <header className="mx-auto max-w-3xl text-center">
          <h1 className="font-serif text-3xl font-bold tracking-tight text-zinc-900 sm:text-4xl lg:text-[2.35rem] dark:text-zinc-50">
            {t("pages.publications.pageTitle")}
          </h1>
          <div
            className="mx-auto mt-4 h-0 w-14 border-t-2 border-dashed border-sky-500/70 dark:border-sky-400/60"
            aria-hidden
          />
          <p className="mt-5 text-base text-zinc-600 sm:text-lg dark:text-zinc-400">
            {t("pages.publications.pageSubtitle")}
          </p>
        </header>

        {posts.length === 0 ? (
          <p className="mx-auto mt-14 max-w-xl rounded-2xl border border-dashed border-zinc-200/90 bg-zinc-50/80 px-6 py-12 text-center text-sm text-zinc-500 dark:border-zinc-800 dark:bg-zinc-900/40 dark:text-zinc-400">
            {t("pages.publications.empty")}
          </p>
        ) : (
          <ul className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {posts.map((post) => {
              const findItHref = publicationFindItUrl(post);
              const isExternal = Boolean(post.externalUrl);
              const titleText = wpPostTitle(post);
              const excerpt = wpPostExcerpt(post, 200);
              const badge = formatWpPostDateBadge(post.date, dateLocale);
              const authorSlug = wpPostAuthorSlug(post);

              return (
                <li key={post.id} className="flex">
                  <article className="flex w-full flex-col overflow-hidden rounded-sm bg-white shadow-[0_2px_14px_-4px_rgba(15,23,42,0.12)] ring-1 ring-zinc-200/80 dark:bg-zinc-900/80 dark:ring-zinc-800/90">
                    <a
                      href={findItHref}
                      className="group block"
                      {...(isExternal
                        ? { target: "_blank", rel: "noopener noreferrer" }
                        : {})}
                    >
                      <div className="relative aspect-4/3 overflow-hidden bg-zinc-100 dark:bg-zinc-800">
                        {post.featuredImage ? (
                          <Image
                            src={post.featuredImage}
                            alt=""
                            fill
                            className="object-cover transition duration-500 group-hover:scale-[1.02]"
                            sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                          />
                        ) : (
                          <div className="flex h-full items-center justify-center bg-linear-to-br from-teal-50 to-zinc-100 dark:from-teal-950/50 dark:to-zinc-900">
                            <span className="text-sm font-semibold text-teal-800/60 dark:text-teal-400/50">
                              RLRI
                            </span>
                          </div>
                        )}
                        <span className="absolute left-0 top-3 bg-teal-700 px-2.5 py-1 text-[11px] font-bold uppercase tracking-wide text-white dark:bg-teal-600">
                          {t("pages.publications.categoryLabel")}
                        </span>
                        {badge ? (
                          <div
                            className="absolute -bottom-5 left-4 flex size-[4.25rem] flex-col items-center justify-center rounded-full bg-teal-700 text-center text-white shadow-md ring-4 ring-white dark:ring-zinc-900"
                            aria-hidden
                          >
                            <span className="text-2xl font-bold leading-none">{badge.day}</span>
                            <span className="mt-0.5 text-[11px] font-semibold uppercase tracking-wide">
                              {badge.month}
                            </span>
                          </div>
                        ) : null}
                      </div>
                    </a>

                    <div className="flex flex-1 flex-col px-4 pb-5 pt-9 sm:px-5">
                      <h2 className="text-center text-base font-bold leading-snug text-zinc-900 dark:text-zinc-50">
                        <a
                          href={findItHref}
                          className="transition-colors hover:text-teal-800 dark:hover:text-teal-300"
                          {...(isExternal
                            ? { target: "_blank", rel: "noopener noreferrer" }
                            : {})}
                        >
                          {titleText}
                        </a>
                      </h2>

                      <div className="mt-3 flex flex-wrap items-center justify-center gap-x-4 gap-y-1 text-[13px] font-medium text-sky-700 dark:text-sky-400">
                        <span className="inline-flex items-center gap-1.5">
                          <UserIcon />
                          {authorSlug}
                        </span>
                        <span className="inline-flex items-center gap-1.5">
                          <FolderIcon />
                          {t("pages.publications.categoryLabel")}
                        </span>
                      </div>

                      {excerpt ? (
                        <p className="mt-4 flex-1 text-center text-[13px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                          {excerpt}
                        </p>
                      ) : null}

                      <a
                        href={findItHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-5 inline-flex w-full items-center justify-center rounded-md bg-teal-700 px-4 py-2.5 text-sm font-semibold text-white transition hover:bg-teal-600 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-teal-600 dark:bg-teal-600 dark:hover:bg-teal-500"
                      >
                        {t("pages.publications.findIt")}
                      </a>
                    </div>
                  </article>
                </li>
              );
            })}
          </ul>
        )}
      </div>
    </div>
  );
}
