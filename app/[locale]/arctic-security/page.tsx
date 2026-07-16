import type { Metadata } from "next";
import { MainArcticSecurityPage } from "@/components/main/MainArcticSecurityPage";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { localizedTitleMetadata } from "@/lib/i18n/page-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return localizedTitleMetadata(params, "pages.arcticSecurity.title");
}

export default async function ArcticSecurityPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  return <MainArcticSecurityPage locale={locale} />;
}
