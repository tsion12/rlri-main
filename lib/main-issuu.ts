/** Issuu flipbook embedded on the main About Us page. */
export const MAIN_ABOUT_ISSUU_EMBED_SRC =
  "https://e.issuu.com/embed.html?d=rlri_about_us_a_propos_de_nous.pptx&u=rlresearchinstitute";

export const MAIN_ABOUT_ISSUU_VIEW_URL =
  "https://issuu.com/rlresearchinstitute/docs/rlri_about_us_a_propos_de_nous.pptx";

const ISSUU_USER = "rlresearchinstitute";

export function mainIssuuEmbedSrc(documentId: string) {
  return `https://e.issuu.com/embed.html?d=${encodeURIComponent(documentId)}&u=${ISSUU_USER}`;
}

export function mainIssuuViewUrl(documentId: string) {
  return `https://issuu.com/${ISSUU_USER}/docs/${encodeURIComponent(documentId)}`;
}

/** Past event reports (Issuu flipbooks) from the legacy WordPress events page. */
export const MAIN_EVENT_REPORTS = [
  {
    id: "couples-night",
    sortDate: "2025-01-01",
    documentId: "couples_camp_ppt_3_",
    titleKey: "pages.events.reports.couplesNight.title",
    summaryKey: "pages.events.reports.couplesNight.summary",
  },
  {
    id: "ssdic",
    sortDate: "2024-01-01",
    documentId: "ssdic_ppt_1_1_",
    titleKey: "pages.events.reports.ssdic.title",
    summaryKey: "pages.events.reports.ssdic.summary",
  },
] as const;

export type MainEventReport = (typeof MAIN_EVENT_REPORTS)[number];

export function getMainEventReports() {
  return [...MAIN_EVENT_REPORTS].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
}
