import type { Metadata } from "next";
import { MainAboutUsPage } from "@/components/main/MainAboutUsPage";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { localizedTitleMetadata } from "@/lib/i18n/page-metadata";

/** Always fetch fresh WordPress policies on About Us. */
export const dynamic = "force-dynamic";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return localizedTitleMetadata(params, "pages.aboutUs.title");
}

export default async function AboutUsPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  return <MainAboutUsPage locale={locale} />;
}
