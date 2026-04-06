/**
 * Internal Next.js routes for the Africa Program section.
 * Use these instead of linking to wordpress (reallifeinstitute.org or africa-programs subdomain).
 */
export const africaRoutes = {
  home: "/",
  about: "/africa/about",
  aboutPolicies: "/africa/about#policies",
  events: "/africa/events",
  programs: "/africa/programs",
  publications: "/africa/publications",
  blogs: "/africa/publications/blogs",
  stories: "/africa/publications/stories",
  policyBriefs: "/africa/publications/policy-briefs",
  papers: "/africa/publications/peer-reviewed-papers",
  faq: "/africa/faq",
  donate: "/africa/donate",
  /** Gallery / media hub (publications & stories). */
  media: "/africa/publications",
  getInvolved: "/africa/donate",
  /** Main institute marketing home (this app’s root). */
  institute: "/",
} as const;

export function programsAnchor(programOrdinal: string) {
  return `${africaRoutes.programs}#${programOrdinal}`;
}
