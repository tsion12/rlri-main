"use client";

import { useState } from "react";
import { ComposableMap, Geographies, Geography } from "react-simple-maps";
import { au } from "./africa-ui";

const GEO_URL = "https://raw.githubusercontent.com/datasets/geo-countries/master/data/countries.geojson";

const AFRICAN_COUNTRIES = new Set([
  "Algeria", "Angola", "Benin", "Botswana", "Burkina Faso", "Burundi", "Cabo Verde",
  "Cameroon", "Central African Republic", "Chad", "Comoros", "Congo", "Democratic Republic of the Congo",
  "Djibouti", "Egypt", "Equatorial Guinea", "Eritrea", "Eswatini", "Ethiopia", "Gabon", "Gambia",
  "Ghana", "Guinea", "Guinea-Bissau", "Ivory Coast", "Côte d'Ivoire", "Kenya", "Lesotho", "Liberia",
  "Libya", "Madagascar", "Malawi", "Mali", "Mauritania", "Mauritius", "Morocco", "Mozambique",
  "Namibia", "Niger", "Nigeria", "Rwanda", "Sao Tome and Principe", "Senegal", "Seychelles",
  "Sierra Leone", "Somalia", "South Africa", "South Sudan", "Sudan", "Tanzania", "Togo", "Tunisia",
  "Uganda", "Zambia", "Zimbabwe", "Western Sahara",
]);

export function AfricaImpactShowcase() {
  const [hoveredCountry, setHoveredCountry] = useState<string | null>(null);

  return (
    <section className={`${au.home.section} ${au.home.sectionPad}`} aria-labelledby="africa-impact-map-heading">
      <p className={au.home.eyebrow}>Impact map</p>
      <h2 id="africa-impact-map-heading" className={au.home.title}>
        Africa footprint
      </h2>

      <div className="relative mt-8 overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 p-3 shadow-sm ring-1 ring-zinc-900/5 dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:ring-white/5">
        <div className="pointer-events-none absolute right-5 top-5 z-10 rounded-full bg-white/90 px-3 py-1 text-xs font-medium text-zinc-700 shadow-sm backdrop-blur dark:bg-zinc-900/85 dark:text-zinc-200">
          {hoveredCountry ?? "Hover a country"}
        </div>
        <ComposableMap
          projection="geoMercator"
          projectionConfig={{ scale: 160, center: [20, 8] }}
          className="h-[420px] w-full bg-linear-to-br from-teal-50 via-emerald-50 to-cyan-50 dark:from-teal-950/60 dark:via-zinc-950 dark:to-emerald-950/40"
        >
          <Geographies geography={GEO_URL}>
            {({ geographies }) =>
              geographies.map((geo) => {
                const country = String(geo.properties.name ?? "");
                const isAfrica = AFRICAN_COUNTRIES.has(country);
                const isHovered = hoveredCountry === country;

                const fill = isAfrica
                  ? isHovered
                    ? "#2dd4bf"
                    : "#14b8a6"
                  : isHovered
                    ? "#cbd5e1"
                    : "#e5e7eb";

                return (
                  <Geography
                    key={geo.rsmKey}
                    geography={geo}
                    fill={fill}
                    stroke={isAfrica ? "#0f766e" : "#94a3b8"}
                    strokeWidth={isAfrica ? 0.6 : 0.3}
                    aria-label={country}
                    onMouseEnter={() => setHoveredCountry(country)}
                    onMouseLeave={() => setHoveredCountry(null)}
                    style={{
                      default: { outline: "none", transition: "fill 180ms ease" },
                      hover: { outline: "none", cursor: "pointer" },
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
    </section>
  );
}
