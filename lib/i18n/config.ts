/** Active locales for the main institute site (language switcher + routing). */
export const locales = ["en", "fr"] as const;

export type Locale = (typeof locales)[number];

export const defaultLocale: Locale = "en";

export function isLocale(value: string): value is Locale {
  return (locales as readonly string[]).includes(value);
}

/** Display names for the language switcher. */
export const localeLabels: Record<Locale, string> = {
  en: "English",
  fr: "Français",
};

/** Compact labels for the header language switcher. */
export const localeShortLabels: Record<Locale, string> = {
  en: "EN",
  fr: "FR",
};
