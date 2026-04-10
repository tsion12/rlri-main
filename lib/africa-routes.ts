/**
 * Internal Next.js routes for the Africa Program section.
 * Use these instead of linking to wordpress (reallifeinstitute.org or africa-programs subdomain).
 */
export const africaRoutes = {
  home: "/",
  about: "/africa/about",
  aboutPolicies: "/africa/about#policies",
  team: "/africa/team",
  /** Volunteering information (standalone page; do not use /team#volunteers). */
  volunteers: "/africa/volunteers",
  career: "/africa/career",
  events: "/africa/events",
  eventNextWebinar: "/africa/events/tensions-middle-east-security-digital-infrastructure",
  programs: "/africa/programs",
  publications: "/africa/publications",
  blogs: "/africa/publications/blogs",
  stories: "/africa/publications/stories",
  policyBriefs: "/africa/publications/policy-briefs",
  faq: "/africa/faq",
  donate: "/africa/donate",
  /** Gallery / media hub (publications & stories). */
  media: "/africa/publications",
  getInvolved: "/africa/donate",
  /** Main institute marketing home (this app’s root). */
  institute: "/",
  /** Canadian / global institute program (main RLRI site). */
  canadianProgram: "https://reallifeinstitute.org",
} as const;

/** Inboxes for volunteering vs careers—use in mailto links on those pages. */
export const africaEmails = {
  programsCoord: "programs_coord@reallifeinstitute.org",
  jobsHr: "jobs_hr@reallifeinstitute.org",
} as const;

export function programsAnchor(programOrdinal: string) {
  return `${africaRoutes.programs}#${programOrdinal}`;
}
