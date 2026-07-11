/**
 * User-facing routes for the main institute site (reallifeinstitute.org).
 * Middleware rewrites these paths to `/main/*` internally.
 */
export const mainRoutes = {
  home: "/",
  aboutUs: "/aboutus",
  ourStory: "/about/our-story",
  missionVision: "/about/mission-vision",
  policies: "/about/policies",
  publications: "/about/publications",
  blogs: "/blogs",
  arcticSecurity: "/arctic-security",
  mentalHealth: "/mental-health",
  volunteer: "/volunteer",
  faq: "/faq",
  /** Main institute community events in Iqaluit and across Canada. */
  events: "/events",
  /** Flagship RLRI conference — placeholder until details are announced. */
  conference: "/conference",
  /** Donations (shared with Africa Program until a main-site flow exists). */
  donate: "/africa/donate",
  africaProgram: "https://africa-programs.reallifeinstitute.org/",
} as const;

/** In-page anchors on the About Us page (`/aboutus`). */
export const mainAboutAnchors = {
  whoWeAre: "who-we-are",
  missionVision: "mission-vision",
  flipbook: "about-flipbook",
  policies: "institute-policies",
} as const;

export type MainAboutSection = keyof typeof mainAboutAnchors;

/** Public path to a section on About Us, e.g. `/aboutus#who-we-are`. */
export function mainAboutSectionHref(section: MainAboutSection): string {
  return `${mainRoutes.aboutUs}#${mainAboutAnchors[section]}`;
}

/** Home page past-events gallery (`MainEventsGallery`). */
export const mainEventsGalleryHash = "main-events-gallery";

export const mainEmails = {
  contact: "contact@reallifeinstitute.org",
  info: "info@reallifeinstitute.org",
  jobsHr: "jobs_hr@reallifeinstitute.org",
} as const;

export const mainPhones = {
  primary: "+1 (613) 858-2668",
  /** `tel:` href (E.164, no spaces). */
  primaryTel: "+16138582668",
} as const;

export const mainAddresses = [
  {
    line1: "304-4104 Road to Nowhere",
    line2: "Iqaluit, NU X0A 2H0",
    country: "Canada",
  },
  {
    line1: "96 Ontario Street",
    line2: "Ottawa, ON K1K 1K9",
    country: "Canada",
  },
] as const;
