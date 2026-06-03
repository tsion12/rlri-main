/** Supported locales for the main institute site. */
export const locales = ["en", "fr", "iu"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Display names for the language switcher. */
export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
  iu: "Inuktitut",
};

/** Compact labels for the header language switcher. */
export const localeShortLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
  iu: "IU",
};
