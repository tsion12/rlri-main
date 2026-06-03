/** Canada team photos in `public/assets/Team-Canada/`. */
export const MAIN_TEAM_CANADA_BASE = "/assets/Team-Canada";

export const MAIN_TEAM_CANADA_IDS = ["alemagi", "carla", "yousaf", "kyleigh"] as const;

export type MainTeamCanadaId = (typeof MAIN_TEAM_CANADA_IDS)[number];

export const MAIN_TEAM_CANADA_PHOTOS: Record<MainTeamCanadaId, string> = {
  alemagi: `${MAIN_TEAM_CANADA_BASE}/Alemagi.webp`,
  carla: `${MAIN_TEAM_CANADA_BASE}/carla.webp`,
  yousaf: `${MAIN_TEAM_CANADA_BASE}/yousaf.webp`,
  kyleigh: `${MAIN_TEAM_CANADA_BASE}/Kyleigh.webp`,
};

export const MAIN_TEAM_CANADA_INITIALS: Record<MainTeamCanadaId, string> = {
  alemagi: "DA",
  carla: "CO",
  yousaf: "YA",
  kyleigh: "KR",
};
