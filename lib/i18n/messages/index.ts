import "server-only";

import type { Locale } from "../config";
import type { Messages } from "./en";

const loaders: Record<Locale, () => Promise<Messages>> = {
  en: async () => (await import("./en")).en,
  fr: async () => (await import("./fr")).fr,
};

export async function getMessages(locale: Locale): Promise<Messages> {
  return loaders[locale]();
}

export type { Messages, TranslationKey } from "./en";
export { en } from "./en";
