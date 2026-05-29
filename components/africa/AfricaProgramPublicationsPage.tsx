import Link from "next/link";
import type { AfricaProgramKey } from "@/lib/wp";
import { getAfricaProgramLabel } from "@/lib/wp";
import type { WpPostWithSource } from "@/lib/wp";
import { africaRoutes } from "@/lib/africa-routes";
import type { AfricaPolicyBrief } from "@/lib/africa-policy-briefs";
import { PolicyBriefTrackingLinks } from "@/components/africa/PolicyBriefTrackingLinks";
import { FeaturedPostCard, BlogCard } from "@/components/africa/AfricaBlogsPage";

type Props = {
  program: AfricaProgramKey;
  posts: WpPostWithSource[];
  briefs: AfricaPolicyBrief[];
};

function PolicyBriefCard({ brief }: { brief: AfricaPolicyBrief }) {
  return (
    <article className="rounded-2xl border border-zinc-200/90 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-7">
      <div className="flex flex-wrap items-center gap-2">
        <span className="rounded-full border border-zinc-200/90 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-semibold uppercase tracking-[0.12em] text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-400">
          {brief.format}
        </span>
        <span className="text-xs text-zinc-500 dark:text-zinc-400">{brief.date}</span>
      </div>
      <h2 className="mt-3 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{brief.title}</h2>
      <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{brief.description}</p>
      <PolicyBriefTrackingLinks href={brief.href} briefTitle={brief.title} />
    </article>
  );
}

export function AfricaProgramPublicationsPage({ program, posts, briefs }: Props) {
  const programLabel = getAfricaProgramLabel(program);
  const [featured, ...rest] = posts;
  const totalCount = posts.length + briefs.length;

  return (
    <>
      <section
        className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20"
        aria-labelledby="program-publications-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
            <Link href={africaRoutes.publications} className="transition hover:text-teal-600">
              Publications
            </Link>
            <span className="text-zinc-400"> · </span>
            <Link href={africaRoutes.programs} className="transition hover:text-teal-600">
              Programs
            </Link>
          </p>
          <h1 id="program-publications-heading" className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            {programLabel}
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Blogs, op-eds, and policy briefs from the {programLabel} program.
          </p>
          <p className="mt-4 text-sm text-zinc-600 dark:text-zinc-400">
            <span className="font-medium text-zinc-900 dark:text-zinc-200">{totalCount}</span> item
            {totalCount !== 1 ? "s" : ""} in this program
            <span className="text-zinc-400"> · </span>
            <Link href={africaRoutes.programs} className="font-medium text-teal-800 hover:underline dark:text-teal-300">
              Back to programs
            </Link>
          </p>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-zinc-50/80 py-12 dark:border-zinc-800 dark:bg-zinc-950 sm:py-16">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {totalCount === 0 ? (
            <div className="rounded-2xl border border-dashed border-zinc-300/80 bg-white/60 px-6 py-16 text-center dark:border-zinc-700 dark:bg-zinc-900/40">
              <h2 className="text-base font-semibold text-zinc-900 dark:text-zinc-50">No publications yet</h2>
              <p className="mx-auto mt-2 max-w-md text-sm text-zinc-600 dark:text-zinc-400">
                New blogs and policy briefs for this program will appear here as they are published.
              </p>
              <Link
                href={africaRoutes.publications}
                className="mt-6 inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-600"
              >
                Publications hub
              </Link>
            </div>
          ) : (
            <>
              {briefs.length > 0 ? (
                <div className="mb-14">
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                    Policy briefs
                  </h2>
                  <div className="mt-5 space-y-4">
                    {briefs.map((brief) => (
                      <PolicyBriefCard key={brief.href} brief={brief} />
                    ))}
                  </div>
                </div>
              ) : null}

              {posts.length > 0 ? (
                <div>
                  <h2 className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                    Blogs &amp; op-eds
                  </h2>
                  <div className="mt-5">
                    {featured ? (
                      <div className="mb-10">
                        <FeaturedPostCard post={featured} />
                      </div>
                    ) : null}
                    {rest.length > 0 ? (
                      <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                        {rest.map((post) => (
                          <BlogCard key={`${post.source}-${post.id}`} post={post} />
                        ))}
                      </div>
                    ) : null}
                  </div>
                </div>
              ) : null}
            </>
          )}
        </div>
      </section>
    </>
  );
}
