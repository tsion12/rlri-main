import Image from "next/image";
import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import type { WpPostWithSource } from "@/lib/wp";
import { stripHtml } from "@/lib/wp";

/* ── Publication types ───────────────────────────────────────── */
const PUB_TYPES = [
  {
    id: "blogs",
    href: "/africa/publications/blogs",
    label: "Blogs & Op-eds",
    description:
      "Research insights, field perspectives, and expert commentary on Africa's most pressing development challenges.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Zm3.293 1.293a1 1 0 0 1 1.414 0l3 3a1 1 0 0 1 0 1.414l-3 3a1 1 0 1 1-1.414-1.414L7.586 11H5a1 1 0 1 1 0-2h2.586L5.293 7.707a1 1 0 0 1 0-1.414ZM11 9a1 1 0 1 0 0 2h2a1 1 0 1 0 0-2h-2Z" clipRule="evenodd" />
      </svg>
    ),
    accent: "from-teal-600 to-teal-800",
    pill: "bg-teal-50 text-teal-700 border-teal-200/70 dark:bg-teal-950/40 dark:text-teal-400 dark:border-teal-800/50",
    divider: "bg-teal-500",
    countLabel: "8+ articles",
  },
  {
    id: "stories",
    href: "/africa/publications/stories",
    label: "Stories",
    description:
      "First-hand accounts and field stories illustrating the human impact of our programs across Africa.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 4.804A7.968 7.968 0 0 0 5.354 8H4a2 2 0 0 0-2 2v1a2 2 0 0 0 2 2h.585A8 8 0 0 0 9 16.197V17h2v-.803A8 8 0 0 0 15.415 13H16a2 2 0 0 0 2-2v-1a2 2 0 0 0-2-2h-1.354A7.968 7.968 0 0 0 11 4.804V4H9v.804Z" />
      </svg>
    ),
    accent: "from-violet-600 to-purple-800",
    pill: "bg-violet-50 text-violet-700 border-violet-200/70 dark:bg-violet-950/40 dark:text-violet-400 dark:border-violet-800/50",
    divider: "bg-violet-500",
    countLabel: "1 story",
  },
  {
    id: "policy-briefs",
    href: "/africa/publications/policy-briefs",
    label: "Policy Briefs",
    description:
      "Concise, evidence-based analyses of critical issues designed to inform policy decisions and drive real-world change.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path fillRule="evenodd" d="M6 2a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h8a2 2 0 0 0 2-2V7.414A2 2 0 0 0 15.414 6L12 2.586A2 2 0 0 0 10.586 2H6Zm2 10a1 1 0 1 0 0 2h4a1 1 0 1 0 0-2H8Zm0-3a1 1 0 0 0 0 2h4a1 1 0 0 0 0-2H8ZM9 5a1 1 0 0 1 2 0v3h3l-4-4v1Z" clipRule="evenodd" />
      </svg>
    ),
    accent: "from-amber-600 to-orange-700",
    pill: "bg-amber-50 text-amber-700 border-amber-200/70 dark:bg-amber-950/40 dark:text-amber-400 dark:border-amber-800/50",
    divider: "bg-amber-500",
    countLabel: "Coming soon",
  },
  {
    id: "peer-reviewed-papers",
    href: "/africa/publications/peer-reviewed-papers",
    label: "Peer-Reviewed Papers",
    description:
      "Rigorous scholarly research articles connecting African voices to global academic and policy conversations.",
    icon: (
      <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
        <path d="M9 3.5a5.5 5.5 0 1 0 0 11 5.5 5.5 0 0 0 0-11ZM2 9a7 7 0 1 1 12.452 4.391l3.328 3.329a.75.75 0 1 1-1.06 1.06l-3.329-3.328A7 7 0 0 1 2 9Z" />
      </svg>
    ),
    accent: "from-sky-600 to-cyan-700",
    pill: "bg-sky-50 text-sky-700 border-sky-200/70 dark:bg-sky-950/40 dark:text-sky-400 dark:border-sky-800/50",
    divider: "bg-sky-500",
    countLabel: "2 papers",
  },
] as const;

/* ── Starburst ─────────────────────────────────────────────────── */
function Starburst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l1.6 5.3L19 5l-3.4 4.5L21 12l-5.4 1.4L17 19l-5-2.6L12 22l-1.6-5.3L5 19l3.4-4.5L3 12l5.4-1.4L6 5l5 2.6z" />
    </svg>
  );
}

/* ── Post card ─────────────────────────────────────────────────── */
function LatestPostCard({ post }: { post: WpPostWithSource }) {
  const title = stripHtml(post.title.rendered);
  const excerpt = post.excerpt ? stripHtml(post.excerpt.rendered).slice(0, 120).trim() : "";
  const date = new Date(post.date).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <Link
      href={`/blog/${post.source}/${post.slug}`}
      className="group relative flex flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm transition duration-300 hover:-translate-y-1 hover:border-teal-200/70 hover:shadow-xl hover:shadow-teal-900/8 dark:border-zinc-800/70 dark:bg-zinc-900/60 dark:hover:border-teal-800/50"
    >
      <div aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-teal-500 to-emerald-500 transition-all duration-500 group-hover:w-full" />
      {post.featuredImage && (
        <div className="relative mb-4 h-40 overflow-hidden rounded-xl">
          <Image
            src={post.featuredImage}
            alt=""
            fill
            className="object-cover transition duration-500 group-hover:scale-105"
            sizes="(max-width: 768px) 100vw, 33vw"
          />
        </div>
      )}
      <span className="mb-3 inline-block w-fit rounded-full border border-teal-200/70 bg-teal-50 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.18em] text-teal-700 dark:border-teal-800/50 dark:bg-teal-950/40 dark:text-teal-400">
        Blog-AP
      </span>
      <h3
        className="flex-1 text-sm font-bold leading-snug text-zinc-900 transition-colors group-hover:text-teal-800 dark:text-zinc-50 dark:group-hover:text-teal-300"
        dangerouslySetInnerHTML={{ __html: post.title.rendered }}
      />
      {excerpt && (
        <p className="mt-2 line-clamp-2 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
          {excerpt}
        </p>
      )}
      <p className="mt-4 text-[10px] font-semibold text-zinc-400 dark:text-zinc-500">{date}</p>
    </Link>
  );
}

/* ── Main component ──────────────────────────────────────────── */
export function AfricaPublicationsHub({ latestPosts }: { latestPosts: WpPostWithSource[] }) {
  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative isolate overflow-hidden bg-linear-to-br from-teal-950 via-[#0b2d2a] to-zinc-950"
        aria-labelledby="publications-heading"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-teal-400/8 blur-[130px]" />
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full border border-teal-500/8" />

        <Starburst className="pointer-events-none absolute right-[9%] top-14 h-11 w-11 text-teal-400/15" />
        <Starburst className="pointer-events-none absolute left-[7%] top-20 h-7 w-7 rotate-12 text-amber-400/20" />
        <Starburst className="pointer-events-none absolute left-[20%] bottom-10 h-8 w-8 text-emerald-400/12" />

        <div className="relative mx-auto max-w-7xl px-4 pb-20 pt-20 sm:px-6 sm:pt-24 sm:pb-24 lg:px-8 lg:pt-32 lg:pb-28">
          <div className="grid items-end gap-12 lg:grid-cols-2">

            {/* Left: heading */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-teal-500/50" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-400/80">
                  Africa Programs
                </p>
              </div>

              <h1
                id="publications-heading"
                className="mt-8 font-black leading-[0.88] tracking-tighter text-white"
                style={{ fontSize: "clamp(4rem, 11vw, 9rem)" }}
              >
                <span className="block">Pub</span>
                <span className="block bg-linear-to-r from-teal-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                  lications.
                </span>
              </h1>

              <p className="mt-8 max-w-md text-base leading-relaxed text-zinc-400">
                Research insights, field stories, policy analyses, and peer-reviewed scholarship from the Real Life Research Institute – Africa Programs.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="/africa/publications/blogs"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-teal-600 px-6 text-sm font-bold text-white shadow-xl shadow-teal-900/30 transition hover:bg-teal-500"
                >
                  Browse all blogs
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <Link
                  href={africaRoutes.home}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/15 bg-white/8 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                >
                  ← Africa home
                </Link>
              </div>
            </div>

            {/* Right: 2×2 pub type grid */}
            <div className="grid grid-cols-2 gap-3">
              {PUB_TYPES.map(({ id, href, label, countLabel, icon, accent }) => (
                <Link
                  key={id}
                  href={href}
                  className="group relative overflow-hidden rounded-2xl border border-white/8 bg-white/5 p-5 backdrop-blur-sm transition hover:bg-white/10"
                >
                  <span
                    aria-hidden
                    className="pointer-events-none absolute right-3 top-2 select-none text-5xl font-black leading-none text-white/5"
                  >
                    {String(PUB_TYPES.findIndex(p => p.id === id) + 1).padStart(2, "0")}
                  </span>
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl bg-linear-to-br ${accent} text-white`}>
                    {icon}
                  </div>
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                    {countLabel}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white leading-snug">{label}</p>
                  <div aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-teal-500 to-emerald-400 transition-all duration-500 group-hover:w-full" />
                </Link>
              ))}
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PUBLICATION TYPE CARDS
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#f7faf9] py-20 dark:bg-zinc-950 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          <div className="mb-12 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-400">
                Explore
              </p>
              <h2
                className="mt-3 font-black tracking-tight text-zinc-900 dark:text-zinc-50"
                style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
              >
                Publication types
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Four ways we share knowledge from the field to the world.
            </p>
          </div>

          <div className="grid gap-5 sm:grid-cols-2 xl:grid-cols-4">
            {PUB_TYPES.map(({ id, href, label, description, icon, accent, pill, divider, countLabel }) => (
              <Link
                key={id}
                href={href}
                className="group relative flex flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-7 transition duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-zinc-900/8 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:shadow-black/30"
              >
                <div aria-hidden className={`absolute bottom-0 left-0 h-[3px] w-0 ${divider} transition-all duration-500 group-hover:w-full`} />

                <div className={`flex h-11 w-11 items-center justify-center rounded-2xl bg-linear-to-br ${accent} text-white shadow-lg`}>
                  {icon}
                </div>

                <span className={`mt-4 inline-block w-fit rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] ${pill}`}>
                  {countLabel}
                </span>

                <h3 className="mt-3 text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {label}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                  {description}
                </p>

                <div className="mt-6 flex items-center gap-1.5 text-xs font-bold text-zinc-400 transition-colors group-hover:text-teal-700 dark:group-hover:text-teal-400">
                  Browse
                  <svg className="h-3.5 w-3.5 transition-transform group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          LATEST FROM THE BLOG
      ══════════════════════════════════════════════════════ */}
      {latestPosts.length > 0 && (
        <section className="bg-white py-20 dark:bg-zinc-900 sm:py-24">
          <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

            <div className="mb-10 flex items-end justify-between">
              <div>
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-400">
                  Latest
                </p>
                <h2
                  className="mt-3 font-black tracking-tight text-zinc-900 dark:text-zinc-50"
                  style={{ fontSize: "clamp(1.75rem, 4vw, 2.75rem)" }}
                >
                  From the blog
                </h2>
              </div>
              <Link
                href="/africa/publications/blogs"
                className="hidden items-center gap-1.5 rounded-xl border border-zinc-200/80 bg-white px-5 py-2.5 text-sm font-semibold text-zinc-600 transition hover:border-teal-300 hover:text-teal-700 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-teal-700 dark:hover:text-teal-400 sm:flex"
              >
                View all
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>

            <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {latestPosts.slice(0, 3).map((post) => (
                <LatestPostCard key={`${post.source}-${post.id}`} post={post} />
              ))}
            </div>

            <div className="mt-8 text-center sm:hidden">
              <Link
                href="/africa/publications/blogs"
                className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-600 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
              >
                View all blogs
                <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </Link>
            </div>
          </div>
        </section>
      )}
    </>
  );
}
