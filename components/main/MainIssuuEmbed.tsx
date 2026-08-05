"use client";

import { useEffect, useState } from "react";

type Props = {
  title: string;
  summary?: string;
  eyebrow: string;
  embedSrc: string;
  viewUrl: string;
  openLabel: string;
  /** Label for the button that force-mounts the flipbook when the probe failed. */
  loadInlineLabel: string;
  iframeTitle: string;
  /** Cover image shown while loading and if the Issuu iframe cannot load. */
  coverImageUrl?: string;
  /** Smaller embed for stacked lists; default is the full report height. */
  compact?: boolean;
};

type EmbedStatus = "loading" | "ready" | "failed";

export function MainIssuuEmbed({
  title,
  summary,
  eyebrow,
  embedSrc,
  viewUrl,
  openLabel,
  loadInlineLabel,
  iframeTitle,
  coverImageUrl,
  compact = false,
}: Props) {
  const [status, setStatus] = useState<EmbedStatus>("loading");
  // Lets the visitor mount the iframe even if the reachability probe failed —
  // the probe can be a false negative (e.g. a broken IPv6 path to e.issuu.com
  // while the browser can still load the frame over IPv4).
  const [forceLoad, setForceLoad] = useState(false);

  useEffect(() => {
    let cancelled = false;
    const controller = new AbortController();
    const timeoutId = window.setTimeout(() => controller.abort(), 6000);

    // Probe Issuu embed host before mounting the iframe. `e.issuu.com` currently
    // fails on some IPv6 paths while issuu.com view links still work.
    fetch(embedSrc, { mode: "no-cors", cache: "no-store", signal: controller.signal })
      .then(() => {
        if (!cancelled) setStatus("ready");
      })
      .catch(() => {
        if (!cancelled) setStatus("failed");
      })
      .finally(() => {
        window.clearTimeout(timeoutId);
      });

    return () => {
      cancelled = true;
      controller.abort();
      window.clearTimeout(timeoutId);
    };
  }, [embedSrc]);

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
          {status === "ready" || forceLoad ? (
            <iframe
              title={iframeTitle}
              src={embedSrc}
              allow="clipboard-write; fullscreen"
              allowFullScreen
              className="absolute inset-0 size-full border-0"
            />
          ) : (
            <div className="absolute inset-0 flex flex-col items-center justify-center gap-3 bg-zinc-950 px-6 text-center">
              {coverImageUrl ? (
                <img
                  src={coverImageUrl}
                  alt=""
                  className="absolute inset-0 size-full object-cover opacity-80"
                />
              ) : null}
              <span className="absolute inset-0 bg-linear-to-t from-black/70 via-black/25 to-black/10" />
              <button
                type="button"
                onClick={() => setForceLoad(true)}
                className="relative inline-flex items-center gap-2 rounded-full bg-white px-5 py-2.5 text-sm font-semibold text-zinc-900 shadow-lg transition hover:bg-teal-50"
              >
                {loadInlineLabel}
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M8 5v14l11-7z" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
              <a
                href={viewUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="relative inline-flex items-center gap-1.5 text-xs font-semibold text-white/90 underline-offset-4 transition hover:text-white hover:underline"
              >
                {openLabel}
                <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
                  <path d="M14 3h7v7M10 14L21 3M21 14v7h-7M3 10V3h7" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </a>
            </div>
          )}
        </div>
      </div>
    </article>
  );
}
