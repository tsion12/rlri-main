import type { Metadata } from "next";
import { MainMentalHealthPage } from "@/components/main/MainMentalHealthPage";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { localizedTitleMetadata } from "@/lib/i18n/page-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return localizedTitleMetadata(params, "pages.mentalHealth.title");
}

export default async function MentalHealthPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  return <MainMentalHealthPage locale={locale} />;
}
