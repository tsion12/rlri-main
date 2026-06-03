import { redirect } from "next/navigation";
import type { Locale } from "@/lib/i18n/config";
import { mainHref } from "@/lib/i18n/path";
import { mainAboutSectionHref, type MainAboutSection } from "@/lib/main-routes";

/** Send legacy `/about/*` routes to the matching About Us section. */
export function redirectToMainAboutSection(locale: Locale, section: MainAboutSection): never {
  redirect(mainHref(mainAboutSectionHref(section), { base: "", locale }));
}
