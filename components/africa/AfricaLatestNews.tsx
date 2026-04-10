import Image from "next/image";
import Link from "next/link";
import { blogPostPath, stripHtml, type WpPostWithSource } from "@/lib/wp";
import { africaStock } from "./africa-stock";
import { au } from "./africa-ui";

function formatPostDate(iso: string): string {
  try {
    const d = new Date(iso);
    return new Intl.DateTimeFormat("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    }).format(d);
  } catch {
    return "";
  }
}

function excerptFor(post: WpPostWithSource): string {
  const fromExcerpt = post.excerpt?.rendered;
  if (fromExcerpt) {
    const t = stripHtml(fromExcerpt);
    if (t.length > 0) return t.length > 180 ? `${t.slice(0, 177)}…` : t;
  }
  const t = stripHtml(post.content.rendered);
  return t.length > 180 ? `${t.slice(0, 177)}…` : t;
}

function ThemeBadge({ theme }: { theme?: string | null }) {
  if (!theme) return null;
  return <span className={au.home.badgeAfrica}>{theme}</span>;
}

type Props = {
  posts: WpPostWithSource[];
};

export function AfricaLatestNews({ posts }: Props) {
  const recentPosts = posts.slice(0, 3);
  return (
    <section className={`${au.home.section} ${au.home.sectionPad}`} aria-labelledby="africa-latest-heading">
      <div className="flex flex-col justify-between gap-6 sm:flex-row sm:items-end">
        <div className="max-w-2xl">
          <p className={au.home.eyebrow}>Journal</p>
          <h2 id="africa-latest-heading" className={au.home.title}>
            Latest news &amp; stories
          </h2>
          <p className={au.home.lead}>
            Updates from our Africa program and the wider institute—research notes, events, and community
            voices.
          </p>
        </div>
        <Link href="/blog" className={au.home.linkAll}>
          View all posts
          <span aria-hidden> →</span>
        </Link>
      </div>

      {recentPosts.length === 0 ? (
        <p className="mt-12 rounded-2xl border border-dashed border-zinc-300/80 bg-white/60 px-6 py-12 text-center text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900/40 dark:text-zinc-400">
          We couldn&apos;t load posts right now. Please try again later or visit the{" "}
          <Link href="/blog" className="font-semibold text-teal-700 underline-offset-4 hover:underline dark:text-teal-400">
            journal
          </Link>
          .
        </p>
      ) : (
        <ul className={au.home.newsGrid}>
          {recentPosts.map((post, index) => {
            const stockFallback = africaStock.programs[index % africaStock.programs.length];
            const imageSrc = post.featuredImage ?? stockFallback.src;
            const imageAlt = post.featuredImage ? stripHtml(post.title.rendered) : stockFallback.alt;

            return (
              <li
                key={`${post.source}-${post.id}`}
                className="home-fade-up"
                style={{ animationDelay: `${index * 80}ms` }}
              >
                <Link href={blogPostPath(post)} className={au.home.newsCard}>
                  <div className={au.home.newsMedia}>
                    <Image
                      src={imageSrc}
                      alt={imageAlt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={au.home.newsImage}
                    />
                    {!post.featuredImage && <div className={au.home.newsMediaFallback} aria-hidden />}
                  </div>
                  <div className={au.home.newsBody}>
                    <div className="flex flex-wrap items-center gap-2">
                      <ThemeBadge theme={post.theme} />
                      <time className={au.home.newsDate} dateTime={post.date}>
                        {formatPostDate(post.date)}
                      </time>
                    </div>
                    <h3
                      className={au.home.newsTitle}
                      dangerouslySetInnerHTML={{ __html: post.title.rendered }}
                    />
                    <p className={au.home.newsExcerpt}>{excerptFor(post)}</p>
                    <span className={au.home.newsRead}>
                      Read article <span aria-hidden>→</span>
                    </span>
                  </div>
                </Link>
              </li>
            );
          })}
        </ul>
      )}
    </section>
  );
}
