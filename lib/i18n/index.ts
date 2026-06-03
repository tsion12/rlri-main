export { locales, defaultLocale, isLocale, localeLabels, localeShortLabels, type Locale } from "./config";
export { getMessages, type Messages, type TranslationKey } from "./messages";
export { createTranslator, type TranslateFn } from "./create-translator";
export { getTranslator } from "./translate";
export { localizedTitleMetadata } from "./page-metadata";
export {
  mainHref,
  mainHrefForLocale,
  mainLocaleFromPathname,
  mainBaseFromPathname,
  parseMainPath,
  navItemActiveMain,
  localePathPrefix,
  type MainPathBase,
  type ParsedMainPath,
} from "./path";
