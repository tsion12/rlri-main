type Props = {
  title: string;
  summary?: string;
  eyebrow: string;
  embedSrc: string;
  viewUrl: string;
  openLabel: string;
  iframeTitle: string;
  /** Smaller embed for stacked lists; default is the full report height. */
  compact?: boolean;
};

export function MainIssuuEmbed({
  title,
  summary,
  eyebrow,
  embedSrc,
  viewUrl,
  openLabel,
  iframeTitle,
  compact = false,
}: Props) {
  return (
    <article className="overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-[0_24px_60px_-28px_rgba(15,23,42,0.28)] dark:border-zinc-800 dark:bg-zinc-900/60">
      <div className="border-b border-zinc-200/80 px-5 py-5 sm:px-8 sm:py-6 dark:border-zinc-800">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
          <div className="max-w-2xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
              {eyebrow}
            </p>
            <h3 className="mt-2 font-serif text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
              {title}
            </h3>
            {summary ? (
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-base">
                {summary}
              </p>
            ) : null}
          </div>
          <a
            href={viewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex shrink-0 items-center gap-1.5 self-start rounded-full border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-700 transition hover:border-teal-300 hover:bg-teal-50 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-teal-700 dark:hover:bg-teal-950/40 dark:hover:text-teal-300"
          >
            {openLabel}
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
              <path d="M14 3h7v7M10 14L21 3M21 14v7h-7M3 10V3h7" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </a>
        </div>
      </div>

      <div className="relative overflow-hidden bg-zinc-950">
        <div className="flex items-center gap-2 border-b border-white/10 px-4 py-2.5 sm:px-6">
          <span className="size-2 rounded-full bg-red-500/90" aria-hidden />
          <span className="size-2 rounded-full bg-amber-400/90" aria-hidden />
          <span className="size-2 rounded-full bg-emerald-500/90" aria-hidden />
          <p className="ml-2 truncate text-xs text-zinc-500">{title}</p>
        </div>
        <div
          className="relative w-full"
          style={{ paddingTop: compact ? "min(75%, 420px)" : "min(62%, 650px)" }}
        >
          <iframe
            title={iframeTitle}
            src={embedSrc}
            allow="clipboard-write; autoplay; encrypted-media; fullscreen; picture-in-picture"
            sandbox="allow-top-navigation allow-top-navigation-by-user-activation allow-downloads allow-scripts allow-same-origin allow-popups allow-modals allow-popups-to-escape-sandbox allow-forms"
            allowFullScreen
            className="absolute inset-0 size-full border-0"
            loading="lazy"
          />
        </div>
      </div>
    </article>
  );
}
