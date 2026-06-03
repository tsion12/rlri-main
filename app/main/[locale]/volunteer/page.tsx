import type { Metadata } from "next";
import { MainVolunteerPage } from "@/components/main/MainVolunteerPage";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { localizedTitleMetadata } from "@/lib/i18n/page-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return localizedTitleMetadata(params, "pages.volunteer.title");
}

export default async function VolunteerPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  return <MainVolunteerPage locale={locale} />;
}
