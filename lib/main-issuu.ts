/** Issuu flipbook embedded on the main About Us page. */
export const MAIN_ABOUT_ISSUU_EMBED_SRC =
  "https://e.issuu.com/embed.html?u=rlresearchinstitute&d=rlri_about_us_a_propos_de_nous.pptx";

export const MAIN_ABOUT_ISSUU_VIEW_URL =
  "https://issuu.com/rlresearchinstitute/docs/rlri_about_us_a_propos_de_nous.pptx";

export const MAIN_ABOUT_ISSUU_COVER_URL =
  "https://image.isu.pub/251220025547-c92d531a4b4e4e7d4f067d2283f6212c/jpg/page_1.jpg";

const ISSUU_USER = "rlresearchinstitute";

export function mainIssuuEmbedSrc(documentId: string) {
  // Match Issuu oEmbed param order: u then d
  return `https://e.issuu.com/embed.html?u=${encodeURIComponent(ISSUU_USER)}&d=${encodeURIComponent(documentId)}`;
}

export function mainIssuuViewUrl(documentId: string) {
  return `https://issuu.com/${ISSUU_USER}/docs/${encodeURIComponent(documentId)}`;
}

/** Past event reports (Issuu flipbooks) from the legacy WordPress events page. */
export const MAIN_EVENT_REPORTS = [
  {
    id: "celebrating-canada",
    sortDate: "2026-07-31",
    documentId: "celebrating_canada_c_l_bration_du_c_a4e5cf9631a864",
    coverImageUrl:
      "https://image.isu.pub/260731154014-207421dd6fac7666ca87b8731e03e885/jpg/page_1.jpg",
    titleKey: "pages.events.reports.celebratingCanada.title",
    summaryKey: "pages.events.reports.celebratingCanada.summary",
  },
  {
    id: "couples-night",
    sortDate: "2025-01-01",
    documentId: "couples_camp_ppt_3_",
    coverImageUrl:
      "https://image.isu.pub/251009100015-1c8dc0c41a0a6d61a0f3449d68ea2ead/jpg/page_1.jpg",
    titleKey: "pages.events.reports.couplesNight.title",
    summaryKey: "pages.events.reports.couplesNight.summary",
  },
  {
    id: "ssdic",
    sortDate: "2024-01-01",
    documentId: "ssdic_ppt_1_1_",
    coverImageUrl:
      "https://image.isu.pub/251009104648-0ad4e2db17b98e81f52d7a6fe4237b29/jpg/page_1.jpg",
    titleKey: "pages.events.reports.ssdic.title",
    summaryKey: "pages.events.reports.ssdic.summary",
  },
] as const;

export type MainEventReport = (typeof MAIN_EVENT_REPORTS)[number];

export function getMainEventReports() {
  return [...MAIN_EVENT_REPORTS].sort((a, b) => b.sortDate.localeCompare(a.sortDate));
}
