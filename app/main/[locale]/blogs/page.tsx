import type { Metadata } from "next";
import { MainBlogsPage } from "@/components/main/MainBlogsPage";
import { isLocale, type Locale } from "@/lib/i18n/config";
import { localizedTitleMetadata } from "@/lib/i18n/page-metadata";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  return localizedTitleMetadata(params, "pages.blogs.title");
}

export default async function BlogsPage({ params }: Props) {
  const { locale: localeParam } = await params;
  const locale = (isLocale(localeParam) ? localeParam : "en") as Locale;
  return <MainBlogsPage locale={locale} />;
}
