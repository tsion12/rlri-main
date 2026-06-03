import type { Metadata } from "next";
import { isLocale } from "./config";
import type { TranslationKey } from "./messages";
import { getTranslator } from "./translate";

type LocaleParams = Promise<{ locale: string }>;

/** Reusable page metadata helper for locale-scoped main-site pages. */
export async function localizedTitleMetadata(
  params: LocaleParams,
  titleKey: TranslationKey
): Promise<Metadata> {
  const { locale } = await params;
  if (!isLocale(locale)) return {};
  const t = await getTranslator(locale);
  return { title: t(titleKey) };
}
