import type { Metadata } from "next";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { localizedTitleMetadata } from "@/lib/i18n/page-metadata";
import { redirectToMainAboutSection } from "@/lib/main-about-redirect";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return localizedTitleMetadata(params, "pages.missionVision.title");
}

export default async function MissionVisionPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  redirectToMainAboutSection(locale, "missionVision");
}
