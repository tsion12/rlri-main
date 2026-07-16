"use client";

import { useCallback, useState, type MouseEvent } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { au } from "@/components/main/main-ui";
import { useTranslations } from "@/components/main/i18n/LocaleProvider";

const WORLD_GEO_URL = "/assets/maps/world-countries-110m.json";
const CANADA_GEO_URL = "/assets/maps/canada-provinces.geojson";

/** Natural Earth / world-atlas numeric id for Canada. */
const CANADA_COUNTRY_ID = "124";

const OCEAN = "#f4f7f8";
const LAND_FILL = "#cfd5d8";
const LAND_HOVER = "#9aa5ab";
const LAND_STROKE = "#f8fafb";
const NUNAVUT_FILL = "#0f766e";
const NUNAVUT_HOVER = "#0d9488";
const NUNAVUT_STROKE = "#115e59";

type TooltipState = {
  name: string;
  x: number;
  y: number;
};

function isCanadaCountry(geo: { id?: string | number }): boolean {
  return String(geo.id) === CANADA_COUNTRY_ID;
}

function isNunavut(geo: { properties?: { name?: string } }): boolean {
  return geo.properties?.name === "Nunavut";
}

function geoName(geo: { properties?: { name?: string } }): string {
  return geo.properties?.name?.trim() || "";
}

function landStyle(fill: string, hoverFill: string, stroke: string, strokeWidth: number) {
  return {
    default: {
      fill,
      stroke,
      strokeWidth,
      outline: "none" as const,
      transition: "fill 180ms ease, stroke 180ms ease",
      cursor: "pointer",
    },
    hover: {
      fill: hoverFill,
      stroke,
      strokeWidth,
      outline: "none" as const,
      cursor: "pointer",
    },
    pressed: {
      fill: hoverFill,
      stroke,
      strokeWidth,
      outline: "none" as const,
      cursor: "pointer",
    },
  };
}

export function MainRegionsMap() {
  const t = useTranslations();
  const [tooltip, setTooltip] = useState<TooltipState | null>(null);

  const showTooltip = useCallback((name: string, event: MouseEvent) => {
    if (!name) return;
    const rect = (event.currentTarget.closest("[data-map-stage]") as HTMLElement | null)?.getBoundingClientRect();
    if (!rect) return;
    setTooltip({
      name,
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    });
  }, []);

  const hideTooltip = useCallback(() => setTooltip(null), []);

  return (
    <section
      id="main-regions"
      className={`border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950 ${au.home.sectionPad}`}
      aria-labelledby="main-regions-heading"
    >
      <div className={au.home.section}>
        <header className="mx-auto max-w-3xl text-center">
          <p className={au.home.eyebrow}>{t("home.regions.eyebrow")}</p>
          <h2
            id="main-regions-heading"
            className="mt-3 text-balance text-3xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
          >
            {t("home.regions.title")}
          </h2>
          <p className="mx-auto mt-3 max-w-2xl text-lg text-zinc-500 dark:text-zinc-400">
            {t("home.regions.lead")}
          </p>
        </header>

        <div
          data-map-stage
          className="relative mx-auto mt-10 max-w-5xl overflow-hidden rounded-3xl border border-zinc-200/80 bg-[#f4f7f8] shadow-[0_20px_50px_-28px_rgba(15,23,42,0.35)] dark:border-zinc-800 dark:bg-zinc-900/50 sm:mt-12"
          onMouseLeave={hideTooltip}
        >
          <div className="pointer-events-none absolute inset-x-0 top-0 h-24 bg-linear-to-b from-white/70 to-transparent dark:from-zinc-950/40" />

          <div className="relative mx-auto aspect-[2/1] w-full max-w-[920px] px-2 pt-4 pb-2 sm:px-4 sm:pt-6 sm:pb-4">
            <ComposableMap
              projection="geoNaturalEarth1"
              projectionConfig={{
                scale: 155,
                center: [0, 8],
              }}
              width={920}
              height={460}
              className="h-full w-full"
              style={{ width: "100%", height: "100%" }}
            >
              <rect x={0} y={0} width={920} height={460} fill={OCEAN} />

              <Geographies geography={WORLD_GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    if (isCanadaCountry(geo)) return null;
                    const name = geoName(geo);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={landStyle(LAND_FILL, LAND_HOVER, LAND_STROKE, 0.45)}
                        onMouseEnter={(event) => showTooltip(name, event)}
                        onMouseMove={(event) => showTooltip(name, event)}
                        onMouseLeave={hideTooltip}
                      />
                    );
                  })
                }
              </Geographies>

              <Geographies geography={CANADA_GEO_URL}>
                {({ geographies }) =>
                  geographies.map((geo) => {
                    const highlighted = isNunavut(geo);
                    const name = highlighted
                      ? t("home.regions.nunavutLabel")
                      : geoName(geo);
                    return (
                      <Geography
                        key={geo.rsmKey}
                        geography={geo}
                        style={
                          highlighted
                            ? landStyle(NUNAVUT_FILL, NUNAVUT_HOVER, NUNAVUT_STROKE, 0.7)
                            : landStyle(LAND_FILL, LAND_HOVER, LAND_STROKE, 0.4)
                        }
                        onMouseEnter={(event) => showTooltip(name, event)}
                        onMouseMove={(event) => showTooltip(name, event)}
                        onMouseLeave={hideTooltip}
                      />
                    );
                  })
                }
              </Geographies>
            </ComposableMap>
          </div>

          {tooltip ? (
            <div
              className="pointer-events-none absolute z-20 -translate-x-1/2 -translate-y-[120%] rounded-lg bg-zinc-900 px-3 py-1.5 text-xs font-semibold tracking-wide text-white shadow-lg ring-1 ring-white/10 dark:bg-zinc-100 dark:text-zinc-900"
              style={{ left: tooltip.x, top: tooltip.y }}
              role="tooltip"
            >
              {tooltip.name}
            </div>
          ) : null}

          <div className="flex items-center justify-center gap-2 border-t border-zinc-200/70 bg-white/70 px-4 py-3 text-sm text-zinc-600 backdrop-blur-sm dark:border-zinc-800 dark:bg-zinc-950/40 dark:text-zinc-400">
            <span
              className="inline-block size-2.5 rounded-sm"
              style={{ backgroundColor: NUNAVUT_FILL }}
              aria-hidden
            />
            {t("home.regions.legend")}
          </div>
        </div>
      </div>
    </section>
  );
}
