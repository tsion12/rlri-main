"use client";

import dynamic from "next/dynamic";
import { au } from "@/components/main/main-ui";
import { useTranslations } from "@/components/main/i18n/LocaleProvider";
import { MAIN_SERVED_COUNTRIES, WORLD_MAP_COLORS } from "@/lib/world-map";

const WorldRegionsMap = dynamic(
  () => import("@/components/shared/WorldRegionsMap").then((m) => m.WorldRegionsMap),
  {
    ssr: false,
    loading: () => (
      <div
        className="flex h-[min(440px,55vw)] min-h-[300px] w-full animate-pulse items-center justify-center text-sm text-zinc-400"
        aria-hidden
      >
        Loading map…
      </div>
    ),
  },
);

export function MainRegionsMap() {
  const t = useTranslations();

  return (
    <section
      id="main-regions-map"
      className={`relative overflow-hidden border-b border-zinc-200/80 bg-linear-to-b from-zinc-50 via-white to-zinc-50 dark:border-zinc-800 dark:from-zinc-950 dark:via-zinc-950 dark:to-zinc-900 ${au.home.sectionPad}`}
      aria-labelledby="main-regions-map-heading"
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_50%_at_50%_0%,rgba(20,184,166,0.08),transparent_60%)]"
        aria-hidden
      />

      <div className={`${au.home.section} relative`}>
        <header className="mx-auto max-w-3xl text-center">
          <p className={au.home.eyebrow}>{t("home.regionsMap.eyebrow")}</p>
          <h2
            id="main-regions-map-heading"
            className="mt-4 font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-[2.35rem] lg:leading-[1.12] dark:text-zinc-50"
          >
            {t("home.regionsMap.title")}
          </h2>
          <p className={`${au.home.lead} mx-auto mt-4`}>{t("home.regionsMap.lead")}</p>
        </header>

        <div className="relative mx-auto mt-12 max-w-6xl sm:mt-14">
          <div
            className="pointer-events-none absolute -inset-4 rounded-[2rem] bg-linear-to-br from-teal-200/30 via-transparent to-violet-200/20 blur-2xl dark:from-teal-900/25 dark:to-violet-900/15"
            aria-hidden
          />

          <div className="relative overflow-hidden rounded-3xl border border-zinc-200/90 bg-white shadow-[0_20px_60px_-28px_rgba(15,23,42,0.18)] ring-1 ring-zinc-900/5 dark:border-zinc-800/90 dark:bg-zinc-900/60 dark:ring-white/5">
            <div className="border-b border-zinc-100 px-5 py-4 sm:px-8 dark:border-zinc-800">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div className="flex items-center gap-3">
                  <span
                    className="size-3 rounded-full ring-2 ring-white shadow-sm dark:ring-zinc-900"
                    style={{ backgroundColor: WORLD_MAP_COLORS.highlight }}
                    aria-hidden
                  />
                  <div className="text-left">
                    <p className="text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                      {t("home.regionsMap.legendCountry")}
                    </p>
                    <p className="text-xs text-zinc-500 dark:text-zinc-400">
                      {t("home.regionsMap.legendDetail")}
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-xs font-medium uppercase tracking-[0.18em] text-zinc-400">
                  <span className="flex items-center gap-1.5">
                    <span
                      className="size-2.5 rounded-sm"
                      style={{ backgroundColor: WORLD_MAP_COLORS.base }}
                      aria-hidden
                    />
                    Global
                  </span>
                  <span className="flex items-center gap-1.5">
                    <span
                      className="size-2.5 rounded-sm"
                      style={{ backgroundColor: WORLD_MAP_COLORS.highlight }}
                      aria-hidden
                    />
                    Served
                  </span>
                </div>
              </div>
            </div>

            <div className="relative px-2 pb-2 pt-4 sm:px-6 sm:pb-6 sm:pt-6">
              <div
                className="pointer-events-none absolute inset-x-8 top-8 h-32 bg-[radial-gradient(ellipse_at_center,rgba(90,158,168,0.12),transparent_70%)]"
                aria-hidden
              />
              <WorldRegionsMap
                highlightedCountries={MAIN_SERVED_COUNTRIES}
                projection="main"
                className="relative"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
