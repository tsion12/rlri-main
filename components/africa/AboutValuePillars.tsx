/**
 * Vision / Mission / Theory of Change — three cards overlapping a dark hero band (header-style layout).
 */
function IconVision({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M24 10v4M18 14l-2 2M30 14l2 2M16 22c0-4 3.5-7 8-7s8 3 8 7v2H16v-2z"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M18 28h12v6c0 2-2 4-6 4s-6-2-6-4v-6z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path
        d="M24 6v3"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path d="M21 9h6l-1 3h-4l-1-3z" fill="currentColor" opacity="0.85" />
    </svg>
  );
}

function IconMission({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="10" stroke="currentColor" strokeWidth="1.5" />
      <circle cx="24" cy="24" r="4" fill="currentColor" />
    </svg>
  );
}

function IconTheory({ className }: { className?: string }) {
  return (
    <svg className={className} viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="22" stroke="currentColor" strokeWidth="1.5" />
      <path
        d="M14 32c2-4 6-6 10-6s8 2 10 6"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
      />
      <path
        d="M18 28l4-10h4l4 10M22 22h4"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
      <path d="M21 18h6v4h-6v-4z" stroke="currentColor" strokeWidth="1.5" />
    </svg>
  );
}

const pillars = [
  {
    key: "vision",
    title: "Our Vision",
    body:
      "A more equitable and resilient world where no one is left behind.",
    variant: "light" as const,
    Icon: IconVision,
  },
  {
    key: "mission",
    title: "Our Mission",
    body:
      "Our mission is to advance Africa-led research, innovation and technology to strengthen global connections and bridge policy and practice for inclusive development.",
    variant: "teal" as const,
    Icon: IconMission,
  },
  {
    key: "theory",
    title: "Our Theory of Change",
    body:
      "We believe that when African-led research is connected to global knowledge systems and translated into policy and practice, it leads to more effective, context-sensitive and inclusive outcomes.",
    variant: "light" as const,
    Icon: IconTheory,
  },
];

export function AboutValuePillars() {
  return (
    <section className="relative isolate border-b border-zinc-200/80 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950" aria-labelledby="value-pillars-heading">
      {/* Soft hero band */}
      <div className="relative overflow-hidden bg-linear-to-b from-zinc-100 via-zinc-50 to-zinc-50 pb-28 pt-14 dark:from-zinc-900 dark:via-zinc-950 dark:to-zinc-950 sm:pb-36 sm:pt-16 lg:pb-40 lg:pt-20">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_50%_at_50%_0%,rgba(20,184,166,0.16),transparent_58%)]"
          aria-hidden
        />

        <div className="relative z-10 mx-auto max-w-3xl px-4 text-center sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">Our value</p>
          <h2
            id="value-pillars-heading"
            className="mt-4 font-bold tracking-tight text-zinc-900 dark:text-zinc-50"
            style={{ fontSize: "clamp(1.85rem, 5vw, 3rem)" }}
          >
            What Sets Us Apart
          </h2>
        </div>
      </div>

      {/* Three cards — overlap hero */}
      <div className="relative z-20 -mt-24 mx-auto max-w-6xl px-4 sm:px-6 lg:px-8">
        <ul className="grid gap-6 md:grid-cols-3 md:items-stretch">
          {pillars.map(({ key, title, body, variant, Icon }) => (
            <li key={key}>
              <article
                className={`group flex h-full flex-col rounded-2xl border p-8 text-center shadow-sm transition duration-300 hover:-translate-y-0.5 hover:shadow-md ${
                  variant === "teal"
                    ? "border-teal-300/70 bg-white text-zinc-800 hover:bg-teal-700 hover:text-white dark:border-teal-800/60 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-teal-900/70"
                    : "border-zinc-200/80 bg-white text-zinc-800 hover:bg-teal-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-teal-950/40"
                }`}
              >
                <div
                  className={`mx-auto flex h-16 w-16 items-center justify-center rounded-full ${
                    variant === "teal"
                      ? "bg-teal-700/10 text-teal-700 group-hover:bg-white/20 group-hover:text-white dark:bg-teal-500/15 dark:text-teal-300 dark:group-hover:bg-white/20 dark:group-hover:text-white"
                      : "bg-teal-700/10 text-teal-700 dark:bg-teal-500/15 dark:text-teal-400"
                  }`}
                >
                  <Icon className="h-10 w-10" />
                </div>
                <h3
                  className={`mt-5 text-lg font-bold tracking-tight sm:text-xl ${
                    variant === "teal"
                      ? "text-zinc-900 group-hover:text-white dark:text-zinc-50"
                      : "text-zinc-900 dark:text-zinc-50"
                  }`}
                >
                  {title}
                </h3>
                <p
                  className={`mt-3 flex-1 text-sm leading-relaxed sm:text-[0.95rem] ${
                    variant === "teal"
                      ? "text-zinc-600 group-hover:text-white/90 dark:text-zinc-300"
                      : "text-zinc-600 dark:text-zinc-400"
                  }`}
                >
                  {body}
                </p>
              </article>
            </li>
          ))}
        </ul>
      </div>

      {/* Our impact — full width below */}
      <div className="mx-auto mt-16 max-w-6xl px-4 pb-20 sm:px-6 sm:pb-24 lg:px-8">
        <div className="rounded-2xl border border-zinc-200/80 bg-white px-6 py-8 text-center shadow-sm dark:border-zinc-700 dark:bg-zinc-900 sm:px-10 sm:py-10">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">Our impact</p>
          <h3 className="mt-3 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-2xl">
            Sustainable solutions to emerging challenges
          </h3>
          <p className="mx-auto mt-4 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            We translate African-led research into policy and practice and connect African and global expertise to deliver
            sustainable solutions to emerging challenges.
          </p>
        </div>
      </div>
    </section>
  );
}
