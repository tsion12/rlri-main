import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { LocaleProvider } from "@/components/main/i18n/LocaleProvider";
import { MainPageShell } from "@/components/main/MainPageShell";
import { MAIN_LOGO_SRC } from "@/lib/main-assets";
import { locales, isLocale, type Locale } from "@/lib/i18n/config";
import { getMessages } from "@/lib/i18n/messages";
import { getTranslator } from "@/lib/i18n/translate";

type Props = {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Pick<Props, "params">): Promise<Metadata> {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) return {};
  const t = await getTranslator(localeParam);
  return {
    title: {
      default: t("common.siteName"),
      template: `%s | ${t("common.siteName")}`,
    },
    description: t("meta.defaultDescription"),
    icons: {
      icon: [{ url: MAIN_LOGO_SRC, sizes: "512x512", type: "image/png" }],
      apple: [{ url: MAIN_LOGO_SRC, sizes: "180x180", type: "image/png" }],
      shortcut: [MAIN_LOGO_SRC],
    },
  };
}

export default async function MainLocaleLayout({ children, params }: Props) {
  const { locale: localeParam } = await params;
  if (!isLocale(localeParam)) notFound();

  const locale: Locale = localeParam;
  const messages = await getMessages(locale);

  return (
    <LocaleProvider locale={locale} messages={messages}>
      <MainPageShell>{children}</MainPageShell>
    </LocaleProvider>
  );
}
