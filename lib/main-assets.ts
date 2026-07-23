import { mainGallerySrc } from "@/lib/main-gallery";

/** Main institute lockup (`public/assets/main-site/logo_RLRI.png`). */
export const MAIN_LOGO_SRC = "/assets/main-site/logo_RLRI.png";

/** Home “Who we are” section — “we don’t do average, we do awesome” dialogue photo. */
export const MAIN_WHO_WE_ARE_IMAGE = {
  src: mainGallerySrc("Research & Northern – Southern Dialogue.webp"),
  alt: "RLRI team gathered in front of a “we don’t do average, we do awesome” banner",
} as const;
