"use client";

import { useEffect, useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import {
  countryMapFill,
  countryMapStroke,
  countryMapStrokeWidth,
  isCountryHighlighted,
  WORLD_MAP_GEO_PATH,
  WORLD_MAP_PROJECTIONS,
  type WorldMapProjection,
} from "@/lib/world-map";

type Topology = object;

type WorldRegionsMapProps = {
  highlightedCountries: Set<string>;
  projection?: WorldMapProjection;
  showHoverLabel?: boolean;
  className?: string;
};

function MapSkeleton({ className }: { className: string }) {
  return (
    <div
      className={`flex animate-pulse items-center justify-center rounded-2xl bg-zinc-100 text-sm text-zinc-400 dark:bg-zinc-800/60 dark:text-zinc-500 ${className}`}
      aria-hidden
    >
      Loading map…
    </div>
  );
}

export function WorldRegionsMap({
  highlightedCountries,
  projection = "global",
  showHoverLabel = false,
  className = "",
}: WorldRegionsMapProps) {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);
  const [geography, setGeography] = useState<Topology | null>(null);
  const [loadError, setLoadError] = useState(false);
  const config = WORLD_MAP_PROJECTIONS[projection];

  useEffect(() => {
    let cancelled = false;

    async function loadMap() {
      setLoadError(false);
      try {
        const res = await fetch(WORLD_MAP_GEO_PATH);
        if (!res.ok) throw new Error(`Map fetch failed: ${res.status}`);
        const data = (await res.json()) as Topology;
        if (!cancelled) setGeography(data);
      } catch {
        if (!cancelled) {
          setGeography(null);
          setLoadError(true);
        }
      }
    }

    loadMap();
    return () => {
      cancelled = true;
    };
  }, []);

  if (loadError) {
    return (
      <div
        className={`flex min-h-[280px] flex-col items-center justify-center gap-3 rounded-2xl border border-dashed border-zinc-300 bg-zinc-50 px-6 text-center dark:border-zinc-700 dark:bg-zinc-900/50 ${className}`}
        role="status"
      >
        <p className="text-sm text-zinc-600 dark:text-zinc-400">Map could not be loaded.</p>
        <button
          type="button"
          className="rounded-full bg-teal-700 px-4 py-2 text-sm font-semibold text-white transition hover:bg-teal-600"
          onClick={() => {
            setLoadError(false);
            setGeography(null);
            fetch(WORLD_MAP_GEO_PATH)
              .then((r) => (r.ok ? r.json() : Promise.reject()))
              .then((data) => setGeography(data as Topology))
              .catch(() => setLoadError(true));
          }}
        >
          Try again
        </button>
      </div>
    );
  }

  if (!geography) {
    return <MapSkeleton className={`${config.heightClass} w-full ${config.mapBg} ${className}`} />;
  }

  return (
    <div className={`relative ${className}`}>
      {showHoverLabel && (
        <div className="pointer-events-none absolute right-4 top-4 z-10 rounded-full bg-white/95 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm ring-1 ring-zinc-200/80 dark:bg-zinc-900/90 dark:text-zinc-200 dark:ring-zinc-700">
          {hoveredCountry ?? "Hover a country"}
        </div>
      )}

      <ComposableMap
        projection={config.projection}
        projectionConfig={config.projectionConfig}
        className={`w-full ${config.heightClass} ${config.mapBg}`}
      >
        <Geographies geography={geography}>
          {({ geographies }) =>
            geographies.map((geo) => {
              const country = String(geo.properties.name ?? "");
              const isHovered = hoveredCountry === country;

              return (
                <Geography
                  key={geo.rsmKey}
                  geography={geo}
                  fill={countryMapFill(country, highlightedCountries, isHovered)}
                  stroke={countryMapStroke(country, highlightedCountries)}
                  strokeWidth={countryMapStrokeWidth(country, highlightedCountries)}
                  aria-label={country}
                  onMouseEnter={() => setHoveredCountry(country)}
                  onMouseLeave={() => setHoveredCountry(null)}
                  style={{
                    default: { outline: "none", transition: "fill 180ms ease" },
                    hover: {
                      outline: "none",
                      cursor: isCountryHighlighted(country, highlightedCountries)
                        ? "pointer"
                        : "default",
                    },
                    pressed: { outline: "none" },
                  }}
                >
                  <title>{country}</title>
                </Geography>
              );
            })
          }
        </Geographies>
      </ComposableMap>
    </div>
  );
}
