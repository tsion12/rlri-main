import Image from "next/image";
import Link from "next/link";
import type { WpPostWithSource } from "@/lib/wp";
import { blogPostPath, stripHtml } from "@/lib/wp";
import { africaRoutes } from "@/lib/africa-routes";
import { PubSubNav } from "./AfricaBlogsPage";

/* ── Starburst decoration ─────────────────────────────────────── */
function Starburst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l1.6 5.3L19 5l-3.4 4.5L21 12l-5.4 1.4L17 19l-5-2.6L12 22l-1.6-5.3L5 19l3.4-4.5L3 12l5.4-1.4L6 5l5 2.6z" />
    </svg>
  );
}

/* ── Shared sub-page hero ─────────────────────────────────────── */
function SubPageHero({
  eyebrow,
  heading,
  accentWord,
  description,
  count,
  countLabel,
}: {
  eyebrow: string;
  heading: string;
  accentWord: string;
  description: string;
  count: string;
  countLabel: string;
}) {
  return (
    <section className="relative isolate overflow-hidden bg-linear-to-br from-teal-950 via-[#0b2d2a] to-zinc-950 pb-0">
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
          className="mt-6 font-black leading-none tracking-tighter text-white"
          style={{ fontSize: "clamp(2.75rem, 7vw, 5.5rem)" }}
        >
          {heading}{" "}
          <span className="bg-linear-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
            {accentWord}
          </span>
        </h1>
        <p className="mt-5 max-w-lg text-base leading-relaxed text-zinc-400">{description}</p>
        <div className="mt-4 flex items-center gap-3">
          <span className="rounded-full border border-teal-700/50 bg-teal-900/30 px-3 py-1 text-[11px] font-bold text-teal-400">
            {count}
          </span>
          <span className="h-px w-16 bg-teal-800/50" />
          <span className="text-[11px] text-zinc-500">{countLabel}</span>
        </div>
      </div>
      <div aria-hidden className="h-px w-full bg-linear-to-r from-transparent via-teal-800/50 to-transparent" />
    </section>
  );
}

/* ══════════════════════════════════════════════════════════════
   STORIES PAGE
══════════════════════════════════════════════════════════════ */
function StoryCard({ post }: { post: WpPostWithSource }) {
  const excerpt = post.excerpt ? stripHtml(post.excerpt.rendered).slice(0, 150).trim() : "";
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={blogPostPath(post)}
      className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm transition duration-300 hover:-translate-y-1 hover:border-violet-200/70 hover:shadow-xl hover:shadow-violet-900/8 dark:border-zinc-800/70 dark:bg-zinc-900/60 dark:hover:border-violet-800/50"
    >
      <div aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-violet-500 to-purple-500 transition-all duration-500 group-hover:w-full" />
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
      <div className="flex flex-1 flex-col p-7">
        <div className="flex items-center gap-2">
          <span className="inline-block rounded-full border border-violet-200/70 bg-violet-50 px-2 py-0.5 text-[9px] font-bold uppercase tracking-[0.15em] text-violet-700 dark:border-violet-800/50 dark:bg-violet-950/40 dark:text-violet-400">
            Stories-AP
          </span>
          <span className="text-[10px] text-zinc-400 dark:text-zinc-500">{date}</span>
        </div>
        <h3
          className="mt-3 flex-1 text-sm font-bold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-violet-800 dark:text-zinc-50 dark:group-hover:text-violet-300"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
        {excerpt && (
          <p className="mt-3 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
            {excerpt}
          </p>
        )}
        <div className="mt-5 flex items-center gap-1.5 text-xs font-bold text-violet-700 transition-colors group-hover:text-violet-600 dark:text-violet-400">
          Read story
          <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>
      </div>
    </Link>
  );
}

export function AfricaStoriesPage({ posts }: { posts: WpPostWithSource[] }) {
  const count = posts.length;
  return (
    <>
      <PubSubNav active="stories" />
      <SubPageHero
        eyebrow="Publications"
        heading="Field"
        accentWord="Stories."
        description="First-hand accounts and field narratives illustrating the human impact of our programs across Africa."
        count={`${count} ${count === 1 ? "story" : "stories"}`}
        countLabel="From the field"
      />
      <section className="bg-[#f7faf9] py-16 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {count === 0 ? (
            <div className="flex flex-col items-center py-24 text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-violet-50 text-violet-400 dark:bg-violet-950/30 dark:text-violet-500">
                <svg className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                  <path d="M9 4.804A7.968 7.968 0 0 0 5.354 8H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h.585A8 8 0 0 0 9 16.197V17h2v-.803A8 8 0 0 0 15.415 13H16a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1.354A7.968 7.968 0 0 0 11 4.804V4H9v.804Z" />
                </svg>
              </div>
              <h3 className="mt-5 text-base font-bold text-zinc-900 dark:text-zinc-50">No stories yet</h3>
              <p className="mt-2 max-w-xs text-sm text-zinc-500 dark:text-zinc-400">
                Stories from the field will appear here once published.
              </p>
              <Link
                href={africaRoutes.stories}
                className="mt-6 inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                Browse stories
              </Link>
            </div>
          ) : (
            <>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {posts.map((post) => (
                  <StoryCard key={`${post.source}-${post.id}`} post={post} />
                ))}
              </div>
              <div className="mt-10 text-center">
                <Link
                  href={africaRoutes.publications}
                  className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-600 transition hover:border-violet-300 hover:text-violet-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  Back to publications hub
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </>
          )}
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   POLICY BRIEFS PAGE
══════════════════════════════════════════════════════════════ */
export function AfricaPolicyBriefsPage() {
  return (
    <>
      <PubSubNav active="policy-briefs" />
      <SubPageHero
        eyebrow="Publications"
        heading="Policy"
        accentWord="Briefs."
        description="Concise, evidence-based analyses of critical issues designed to inform policy decisions and drive real-world change."
        count="Coming soon"
        countLabel="First brief in preparation"
      />
      <section className="bg-[#f7faf9] py-16 dark:bg-zinc-950 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          {/* Decorative empty state illustration */}
          <div className="relative mx-auto h-48 w-48">
            <div aria-hidden className="absolute inset-0 rounded-full bg-amber-400/10 blur-2xl dark:bg-amber-900/20" />
            <div className="relative flex h-48 w-48 items-center justify-center rounded-full border border-amber-200/60 bg-amber-50 dark:border-amber-800/40 dark:bg-amber-950/30">
              <svg className="h-16 w-16 text-amber-500/60" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.414A2 2 0 0 0 15.414 6L12 2.586A2 2 0 0 0 10.586 2H6Zm2 10a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H8Zm0-3a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2H8ZM9 5a1 1 0 0 1 2 0v3h3l-4-4v1Z" clipRule="evenodd" />
              </svg>
            </div>
          </div>

          <h2 className="mt-8 text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50">
            Policy briefs coming soon
          </h2>
          <p className="mx-auto mt-4 max-w-md text-base leading-relaxed text-zinc-500 dark:text-zinc-400">
            Our team is currently preparing concise policy analyses on topics including climate adaptation, ocean governance, digital rights, and peacebuilding. Check back soon.
          </p>

          {/* Topics preview chips */}
          <div className="mt-8 flex flex-wrap items-center justify-center gap-2">
            {["Climate Adaptation", "Ocean Governance", "Digital Rights", "Peacebuilding", "Gender Equality", "Food Security"].map((topic) => (
              <span
                key={topic}
                className="rounded-full border border-amber-200/70 bg-amber-50 px-3 py-1 text-[11px] font-semibold text-amber-700 dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-400"
              >
                {topic}
              </span>
            ))}
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <Link
              href={africaRoutes.media}
              className="inline-flex items-center gap-2 rounded-xl border border-amber-200 bg-amber-50 px-6 py-3 text-sm font-semibold text-amber-700 transition hover:bg-amber-100 dark:border-amber-800/50 dark:bg-amber-950/30 dark:text-amber-400"
            >
              Publications &amp; media
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href="/africa/publications"
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-600 transition hover:border-teal-300 hover:text-teal-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              ← Back to publications
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}

/* ══════════════════════════════════════════════════════════════
   PEER-REVIEWED PAPERS PAGE
══════════════════════════════════════════════════════════════ */
const PAPERS = [
  {
    title: "Women and Peacebuilding",
    description:
      "A scholarly exploration of the critical and often under-recognised roles that women play in peace processes, conflict resolution, and post-conflict reconstruction across Africa.",
    tags: ["Gender", "Peacebuilding", "Conflict Resolution"],
    href: africaRoutes.papers,
  },
  {
    title: "Financial Literacy & Investments",
    description:
      "An analysis of financial literacy levels among youth and marginalized communities and the relationship between financial education, investment behaviour, and economic resilience.",
    tags: ["Financial Literacy", "Youth", "Economic Empowerment"],
    href: africaRoutes.papers,
  },
] as const;

export function AfricaPapersPage() {
  return (
    <>
      <PubSubNav active="papers" />
      <SubPageHero
        eyebrow="Publications"
        heading="Peer-Reviewed"
        accentWord="Papers."
        description="Rigorous scholarly research connecting African voices to global academic and policy conversations."
        count={`${PAPERS.length} papers`}
        countLabel="Peer-reviewed scholarship"
      />
      <section className="bg-[#f7faf9] py-16 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {PAPERS.map(({ title, description, tags, href }, i) => (
              <Link
                key={title}
                href={href}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-sky-200/70 hover:shadow-xl hover:shadow-sky-900/8 dark:border-zinc-800/70 dark:bg-zinc-900/60 dark:hover:border-sky-800/50"
              >
                <div aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-sky-500 to-cyan-500 transition-all duration-500 group-hover:w-full" />
                {/* Watermark number */}
                <span
                  aria-hidden
                  className="pointer-events-none absolute right-6 top-5 select-none text-8xl font-black leading-none text-zinc-100 transition-colors duration-300 group-hover:text-sky-100/80 dark:text-zinc-800 dark:group-hover:text-sky-950"
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div className="flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br from-sky-600 to-cyan-700 text-white shadow-lg">
                  <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" />
                  </svg>
                </div>
                <span className="mt-4 inline-block w-fit rounded-full border border-sky-200/70 bg-sky-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-sky-700 dark:border-sky-800/50 dark:bg-sky-950/40 dark:text-sky-400">
                  Peer-reviewed
                </span>
                <h3 className="relative mt-4 text-lg font-black tracking-tight text-zinc-900 dark:text-zinc-50">
                  {title}
                </h3>
                <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {description}
                </p>
                <div className="mt-5 flex flex-wrap gap-1.5">
                  {tags.map((tag) => (
                    <span
                      key={tag}
                      className="rounded-full border border-zinc-200/80 bg-zinc-50 px-2.5 py-0.5 text-[10px] font-semibold text-zinc-500 dark:border-zinc-700/60 dark:bg-zinc-800/50 dark:text-zinc-400"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-sky-700 transition-colors group-hover:text-sky-600 dark:text-sky-400">
                  Read paper
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>

          <div className="mt-10 text-center">
            <Link
              href={africaRoutes.publications}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-600 transition hover:border-sky-300 hover:text-sky-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
            >
              Back to publications hub
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
