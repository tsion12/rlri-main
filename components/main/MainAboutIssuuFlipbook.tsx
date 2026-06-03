import { MAIN_ABOUT_ISSUU_EMBED_SRC, MAIN_ABOUT_ISSUU_VIEW_URL } from "@/lib/main-issuu";

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  iframeTitle: string;
  openExternal: string;
  hint: string;
};

export function MainAboutIssuuFlipbook({
  eyebrow,
  title,
  lead,
  iframeTitle,
  openExternal,
  hint,
}: Props) {
  return (
    <section
      id="about-flipbook"
      className="relative scroll-mt-24 overflow-hidden border-b border-zinc-200/80 bg-linear-to-b from-white via-zinc-50/80 to-white dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-900/50 dark:to-zinc-950"
      aria-labelledby="about-flipbook-heading"
    >
      <div
        className="pointer-events-none absolute left-1/2 top-0 h-64 w-[min(100%,48rem)] -translate-x-1/2 rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-600/10"
        aria-hidden
      />

      <div className="relative mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600 dark:text-teal-400">
            {eyebrow}
          </p>
          <h2
            id="about-flipbook-heading"
            className="mt-4 text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
          >
            {title}
          </h2>
          <p className="mt-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">{lead}</p>
        </div>

        <div className="relative mt-12 lg:mt-14">
          <div
            className="pointer-events-none absolute -inset-1 rounded-[1.75rem] bg-linear-to-br from-teal-300/30 via-transparent to-violet-300/20 blur-md dark:from-teal-700/25 dark:to-violet-800/20"
            aria-hidden
          />

          <div className="relative overflow-hidden rounded-3xl bg-zinc-900 shadow-[0_32px_80px_-28px_rgba(15,23,42,0.45)] ring-1 ring-zinc-900/10 dark:ring-white/10">
            <div className="flex flex-wrap items-center justify-between gap-3 border-b border-white/10 bg-zinc-900/95 px-4 py-3 sm:px-6">
              <div className="flex items-center gap-2">
                <span className="flex size-2.5 rounded-full bg-red-500/90" aria-hidden />
                <span className="flex size-2.5 rounded-full bg-amber-400/90" aria-hidden />
                <span className="flex size-2.5 rounded-full bg-emerald-500/90" aria-hidden />
              </div>
              <p className="min-w-0 flex-1 truncate text-center text-xs font-medium text-zinc-400 sm:text-sm">
                {hint}
              </p>
              <a
                href={MAIN_ABOUT_ISSUU_VIEW_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex shrink-0 items-center gap-1.5 rounded-full border border-white/15 bg-white/5 px-3 py-1.5 text-xs font-semibold text-zinc-200 transition hover:border-teal-400/40 hover:bg-teal-500/15 hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50"
              >
                {openExternal}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M14 3h7v7M10 14L21 3M21 14v7h-7M3 10V3h7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>

            <div
              className="relative w-full bg-zinc-950"
              style={{ paddingTop: "max(60%, 326px)" }}
            >
              <iframe
                title={iframeTitle}
                src={MAIN_ABOUT_ISSUU_EMBED_SRC}
                allow="clipboard-write; autoplay; encrypted-media; fullscreen; picture-in-picture"
                sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
                allowFullScreen
                className="absolute inset-0 size-full border-0"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
