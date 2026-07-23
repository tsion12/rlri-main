import type { TranslationKey } from "@/lib/i18n/messages/en";
import { mainGallerySrc } from "@/lib/main-gallery";
import { mainRoutes } from "@/lib/main-routes";

export type MainHeroSlideCta = {
  labelKey: TranslationKey;
  href: string;
  external?: boolean;
};

export type MainHeroSlide = {
  id: string;
  image: string;
  imageAltKey: TranslationKey;
  eyebrowKey: TranslationKey;
  titleKey: TranslationKey;
  subtitleKey: TranslationKey;
  primaryCta: MainHeroSlideCta;
  secondaryCta?: MainHeroSlideCta;
};

// Hero "Empowering Young Minds for a Secure Future" — curated 8-picture set.
const MAIN_HERO_IMAGE_FILES = [
  "Rethinking Arctic Security from Iqaluit-conference.jpeg",
  "WhatsApp-Image-2025-07-23-at-11.01.17.webp",
  "RUNNING-11.jpg",
  "WhatsApp Image 2025-08-23 at 19.07.55.jpeg",
  "RUNNING-1.jpg",
  "REAL LIFE INSTITUTE-12.jpg",
  "REAL LIFE INSTITUTE 1-18.jpg",
  "WhatsApp Image 2025-08-23 at 15.19.35 (12).jpeg",
] as const;

const MAIN_HERO_COPY = {
  imageAltKey: "home.heroSlides.primary.imageAlt",
  eyebrowKey: "home.heroSlides.primary.eyebrow",
  titleKey: "home.heroSlides.primary.title",
  subtitleKey: "home.heroSlides.primary.subtitle",
  primaryCta: { labelKey: "home.heroSlides.primary.ctaEvents", href: mainRoutes.events },
} as const satisfies Omit<MainHeroSlide, "id" | "image">;

/**
 * Hero carousel slides — update images in this file when assets change.
 * Copy lives in `lib/i18n/messages/{en,fr,iu}.ts` under `home.heroSlides`.
 */
export const MAIN_HERO_SLIDES: MainHeroSlide[] = MAIN_HERO_IMAGE_FILES.map((file, index) => ({
  id: `hero-${index}`,
  image: mainGallerySrc(file),
  ...MAIN_HERO_COPY,
}));

export const MAIN_HERO_INTERVAL_MS = 2800;
