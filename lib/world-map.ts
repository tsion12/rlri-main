/**
 * Local world map (TopoJSON, ~110m resolution).
 * Source: world-atlas `countries-110m` via jsDelivr — served from `/public/geo/`.
 */
export const WORLD_MAP_GEO_PATH = "/geo/countries-110m.json";

/** @deprecated Use {@link WORLD_MAP_GEO_PATH} — remote GeoJSON often fails to load in the browser. */
export const WORLD_MAP_GEO_URL = WORLD_MAP_GEO_PATH;

/** TopoJSON `properties.name` → names used in {@link AFRICAN_COUNTRIES} / highlight sets. */
export const TOPO_COUNTRY_ALIASES: Record<string, string> = {
  "W. Sahara": "Western Sahara",
  "Dem. Rep. Congo": "Democratic Republic of the Congo",
  "Central African Rep.": "Central African Republic",
  "S. Sudan": "South Sudan",
  eSwatini: "Eswatini",
};

/** Muted teal + light gray palette (matches reallifeinstitute.org map section). */
export const WORLD_MAP_COLORS = {
  base: "#e2e8f0",
  baseHover: "#cbd5e1",
  highlight: "#5a9ea8",
  highlightHover: "#14b8a6",
  strokeBase: "#d1d5db",
  strokeHighlight: "#0f766e",
} as const;

export const AFRICAN_COUNTRIES = new Set([
  "Algeria",
  "Angola",
  "Benin",
  "Botswana",
  "Burkina Faso",
  "Burundi",
  "Cabo Verde",
  "Cameroon",
  "Central African Republic",
  "Chad",
  "Comoros",
  "Congo",
  "Democratic Republic of the Congo",
  "Djibouti",
  "Egypt",
  "Equatorial Guinea",
  "Eritrea",
  "Eswatini",
  "Ethiopia",
  "Gabon",
  "Gambia",
  "Ghana",
  "Guinea",
  "Guinea-Bissau",
  "Ivory Coast",
  "Côte d'Ivoire",
  "Kenya",
  "Lesotho",
  "Liberia",
  "Libya",
  "Madagascar",
  "Malawi",
  "Mali",
  "Mauritania",
  "Mauritius",
  "Morocco",
  "Mozambique",
  "Namibia",
  "Niger",
  "Nigeria",
  "Rwanda",
  "Sao Tome and Principe",
  "Senegal",
  "Seychelles",
  "Sierra Leone",
  "Somalia",
  "South Africa",
  "South Sudan",
  "Sudan",
  "Tanzania",
  "Togo",
  "Tunisia",
  "Uganda",
  "Zambia",
  "Zimbabwe",
  "Western Sahara",
]);

/** Main institute home map — Canada (HQ in Iqaluit, Nunavut). */
export const MAIN_SERVED_COUNTRIES = new Set(["Canada"]);

export type WorldMapProjection = "global" | "main" | "africa";

export const WORLD_MAP_PROJECTIONS = {
  global: {
    projection: "geoMercator" as const,
    projectionConfig: { scale: 118, center: [10, 18] as [number, number] },
    heightClass: "h-[min(420px,52vw)] min-h-[280px]",
    mapBg: "bg-white",
  },
  main: {
    projection: "geoMercator" as const,
    projectionConfig: { scale: 128, center: [-25, 38] as [number, number] },
    heightClass: "h-[min(440px,55vw)] min-h-[300px]",
    mapBg: "bg-transparent",
  },
  africa: {
    projection: "geoMercator" as const,
    projectionConfig: { scale: 160, center: [20, 8] as [number, number] },
    heightClass: "h-[420px]",
    mapBg:
      "bg-linear-to-br from-teal-50 via-emerald-50 to-cyan-50 dark:from-teal-950/60 dark:via-zinc-950 dark:to-emerald-950/40",
  },
} as const;

export function resolveCountryName(topoName: string): string {
  return TOPO_COUNTRY_ALIASES[topoName] ?? topoName;
}

export function isCountryHighlighted(country: string, highlighted: Set<string>): boolean {
  if (highlighted.has(country)) return true;
  const canonical = TOPO_COUNTRY_ALIASES[country];
  return canonical ? highlighted.has(canonical) : false;
}

export function countryMapFill(
  country: string,
  highlighted: Set<string>,
  hovered: boolean,
): string {
  const active = isCountryHighlighted(country, highlighted);
  if (active) return hovered ? WORLD_MAP_COLORS.highlightHover : WORLD_MAP_COLORS.highlight;
  return hovered ? WORLD_MAP_COLORS.baseHover : WORLD_MAP_COLORS.base;
}

export function countryMapStroke(country: string, highlighted: Set<string>): string {
  return isCountryHighlighted(country, highlighted)
    ? WORLD_MAP_COLORS.strokeHighlight
    : WORLD_MAP_COLORS.strokeBase;
}

export function countryMapStrokeWidth(country: string, highlighted: Set<string>): number {
  return isCountryHighlighted(country, highlighted) ? 0.5 : 0.35;
}
