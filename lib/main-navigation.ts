import type { TranslationKey } from "@/lib/i18n/messages";
import { mainAboutSectionHref, mainEmails, mainRoutes } from "@/lib/main-routes";

export type MainNavItem = {
  labelKey: TranslationKey;
  href: string;
  external?: boolean;
};

/** About dropdown items in the main header. */
export const MAIN_ABOUT_NAV: MainNavItem[] = [
  { labelKey: "nav.ourStory", href: mainAboutSectionHref("whoWeAre") },
  { labelKey: "nav.missionVision", href: mainAboutSectionHref("missionVision") },
  { labelKey: "nav.policies", href: mainAboutSectionHref("policies") },
  { labelKey: "nav.publications", href: mainRoutes.publications },
];

/** Primary header links (excluding About). */
export const MAIN_PRIMARY_NAV: MainNavItem[] = [
  { labelKey: "nav.blogs", href: mainRoutes.blogs },
  { labelKey: "nav.arcticSecurity", href: mainRoutes.arcticSecurity },
  { labelKey: "nav.mentalHealth", href: mainRoutes.mentalHealth },
  { labelKey: "nav.volunteer", href: mainRoutes.volunteer },
  { labelKey: "nav.faq", href: mainRoutes.faq },
];

/** Footer quick links (matches reallifeinstitute.org footer). */
export const MAIN_FOOTER_NAV: MainNavItem[] = [
  { labelKey: "nav.home", href: mainRoutes.home },
  { labelKey: "footer.about", href: mainRoutes.aboutUs },
  { labelKey: "footer.contact", href: `mailto:${mainEmails.info}`, external: true },
  { labelKey: "footer.programs", href: "#main-home-focus" },
  { labelKey: "footer.mediaCenter", href: mainRoutes.blogs },
  { labelKey: "footer.getInvolved", href: mainRoutes.volunteer },
  { labelKey: "footer.careers", href: mainRoutes.volunteer },
];
