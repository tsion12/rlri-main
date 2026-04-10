import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import { au } from "./africa-ui";

const ITEMS = [
  {
    title: "Programs",
    body: "Field projects, training, and partnerships that turn research into lasting impact.",
    href: africaRoutes.programs,
    cta: "Explore programs",
    visual: "programs",
  },
  {
    title: "Webinars",
    body: "Upcoming sessions, event highlights, and expert conversations on Africa-focused priorities.",
    href: africaRoutes.events,
    cta: "View webinars",
    visual: "webinars",
  },
  {
    title: "Get involved",
    body: "Volunteer, collaborate, or support the next generation of African researchers.",
    href: africaRoutes.getInvolved,
    cta: "See how to help",
    visual: "involved",
  },
] as const;

export function AfricaHomePrograms() {
  return (
    <section
      className={`${au.home.sectionMuted} ${au.home.sectionPad}`}
      aria-labelledby="africa-programs-heading"
    >
      <div className={`${au.home.section}`}>
        <p className={au.home.eyebrow}>Explore</p>
        <h2 id="africa-programs-heading" className={au.home.title}>
          Programs &amp; resources
        </h2>
        <p className={au.home.lead}>
          Explore programs, publications, and ways to support the Africa Program from this site.
        </p>

        <ul className={au.home.programsGrid}>
          {ITEMS.map(({ title, body, href, cta, visual }) => {
            return (
              <li key={title}>
                <article className={`${au.home.programCard} group`}>
                  <div className={au.home.programMedia}>
                    <ProgramInfographic kind={visual} />
                    <p className={au.home.programCredit}>Program insights</p>
                  </div>
                  <div className={au.home.programBodyWrap}>
                    <h3 className={au.home.programTitle}>{title}</h3>
                    <p className={au.home.programBody}>{body}</p>
                    <Link href={href} className={au.home.programLink}>
                      {cta}
                      <span aria-hidden> →</span>
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

function ProgramInfographic({ kind }: { kind: "programs" | "webinars" | "involved" }) {
  if (kind === "programs") {
    return (
      <div className="flex h-full items-end gap-2 px-4 pb-5 pt-6" aria-hidden>
        <div className="h-10 w-1/5 rounded-t-md bg-teal-300/80 dark:bg-teal-600/70" />
        <div className="h-16 w-1/5 rounded-t-md bg-teal-400/80 dark:bg-teal-500/70" />
        <div className="h-24 w-1/5 rounded-t-md bg-emerald-400/80 dark:bg-emerald-500/70" />
        <div className="h-14 w-1/5 rounded-t-md bg-emerald-300/80 dark:bg-emerald-600/70" />
        <div className="h-20 w-1/5 rounded-t-md bg-teal-500/80 dark:bg-teal-400/70" />
      </div>
    );
  }

  if (kind === "webinars") {
    return (
      <div className="relative flex h-full items-center justify-center" aria-hidden>
        <div className="absolute h-20 w-20 rounded-full border-4 border-teal-400/60 dark:border-teal-500/60" />
        <div className="absolute h-32 w-32 rounded-full border border-emerald-300/70 dark:border-emerald-600/70" />
        <div className="flex items-center gap-2 rounded-full bg-white/85 px-3 py-1.5 text-xs font-semibold text-teal-800 shadow-sm dark:bg-zinc-900/80 dark:text-teal-300">
          <span className="inline-block h-2 w-2 rounded-full bg-teal-500 dark:bg-teal-400" />
          Live webinar
        </div>
      </div>
    );
  }

  return (
    <div className="flex h-full items-center justify-center px-5" aria-hidden>
      <div className="grid w-full max-w-44 grid-cols-3 gap-2">
        <div className="h-8 rounded-md bg-teal-300/80 dark:bg-teal-600/70" />
        <div className="h-8 rounded-md bg-emerald-300/80 dark:bg-emerald-600/70" />
        <div className="h-8 rounded-md bg-cyan-300/80 dark:bg-cyan-600/70" />
        <div className="col-span-3 h-2 rounded-full bg-zinc-300/80 dark:bg-zinc-700/80" />
        <div className="col-span-2 h-2 rounded-full bg-zinc-300/70 dark:bg-zinc-700/70" />
        <div className="h-2 rounded-full bg-zinc-300/70 dark:bg-zinc-700/70" />
      </div>
    </div>
  );
}
