/**
 * Partner logos for the main homepage carousel.
 * Replace `logoSrc` with image paths under `public/assets/main-site/partners/` when ready.
 */
export type MainPartner = {
  id: string;
  name: string;
  logoSrc?: string;
};

export const MAIN_PARTNER_PLACEHOLDERS: MainPartner[] = [
  { id: "partner-1", name: "Partner 1" },
  { id: "partner-2", name: "Partner 2" },
  { id: "partner-3", name: "Partner 3" },
  { id: "partner-4", name: "Partner 4" },
  { id: "partner-5", name: "Partner 5" },
  { id: "partner-6", name: "Partner 6" },
  { id: "partner-7", name: "Partner 7" },
  { id: "partner-8", name: "Partner 8" },
];

export const MAIN_PARTNERS_AUTOPLAY_MS = 4500;
