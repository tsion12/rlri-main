import type { Metadata } from "next";
import { MainEventsPage } from "@/components/main/MainEventsPage";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { localizedTitleMetadata } from "@/lib/i18n/page-metadata";

type Props = { params: Promise<{ locale: string }> };

/**
 * The upcoming/past split is computed from the render date, so re-render daily
 * rather than freezing whatever was true at build time.
 */
export const revalidate = 86400;

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return localizedTitleMetadata(params, "pages.events.title");
}

export default async function EventsPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  return <MainEventsPage locale={locale} />;
}
