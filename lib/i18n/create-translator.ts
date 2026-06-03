import type { Messages, TranslationKey } from "./messages/en";

function resolve(messages: Messages, key: string): string {
  const parts = key.split(".");
  let cur: unknown = messages;
  for (const part of parts) {
    if (cur === null || cur === undefined || typeof cur !== "object") {
      return key;
    }
    cur = (cur as Record<string, unknown>)[part];
  }
  return typeof cur === "string" ? cur : key;
}

export type TranslateFn = (key: TranslationKey) => string;

export function createTranslator(messages: Messages): TranslateFn {
  return (key) => resolve(messages, key);
}
