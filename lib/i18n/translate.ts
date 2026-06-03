import "server-only";

import type { Locale } from "./config";
import { createTranslator, type TranslateFn } from "./create-translator";
import { getMessages } from "./messages";

export type { TranslateFn } from "./create-translator";
export { createTranslator } from "./create-translator";

export async function getTranslator(locale: Locale): Promise<TranslateFn> {
  return createTranslator(await getMessages(locale));
}
