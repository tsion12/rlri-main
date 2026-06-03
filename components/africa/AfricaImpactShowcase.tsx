"use client";

import dynamic from "next/dynamic";
import { AFRICAN_COUNTRIES } from "@/lib/world-map";
import { au } from "./africa-ui";

const WorldRegionsMap = dynamic(
  () => import("@/components/shared/WorldRegionsMap").then((m) => m.WorldRegionsMap),
  {
    ssr: false,
    loading: () => (
      <div className="flex h-[420px] w-full animate-pulse items-center justify-center rounded-2xl bg-zinc-100 text-sm text-zinc-400">
        Loading map…
      </div>
    ),
  },
);

export function AfricaImpactShowcase() {
  return (
    <section className={`${au.home.section} ${au.home.sectionPad}`} aria-labelledby="africa-impact-map-heading">
      <p className={au.home.eyebrow}>Impact map</p>
      <h2 id="africa-impact-map-heading" className={au.home.title}>
        Africa footprint
      </h2>

      <div className="relative mt-8 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 p-3 shadow-sm ring-1 ring-zinc-900/5 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:ring-white/5">
        <WorldRegionsMap
          highlightedCountries={AFRICAN_COUNTRIES}
          projection="africa"
          showHoverLabel
        />
      </div>
    </section>
  );
}
