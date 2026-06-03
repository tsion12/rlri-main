"use client";

import { createContext, useContext, useEffect, useMemo } from "react";
import type { Locale } from "@/lib/i18n/config";
import { createTranslator, type TranslateFn } from "@/lib/i18n/create-translator";
import type { Messages, TranslationKey } from "@/lib/i18n/messages/en";

type LocaleContextValue = {
  locale: Locale;
  messages: Messages;
  t: TranslateFn;
};

const LocaleContext = createContext<LocaleContextValue | null>(null);

export function LocaleProvider({
  locale,
  messages,
  children,
}: {
  locale: Locale;
  messages: Messages;
  children: React.ReactNode;
}) {
  const value = useMemo(
    () => ({
      locale,
      messages,
      t: createTranslator(messages),
    }),
    [locale, messages]
  );

  useEffect(() => {
    document.documentElement.lang = locale;
  }, [locale]);

  return <LocaleContext.Provider value={value}>{children}</LocaleContext.Provider>;
}

export function useLocale(): Locale {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useLocale must be used within LocaleProvider");
  return ctx.locale;
}

export function useTranslations(): TranslateFn {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useTranslations must be used within LocaleProvider");
  return ctx.t;
}

export function useMessages(): Messages {
  const ctx = useContext(LocaleContext);
  if (!ctx) throw new Error("useMessages must be used within LocaleProvider");
  return ctx.messages;
}

/** Type-safe translation key helper for editors. */
export function tk(key: TranslationKey): TranslationKey {
  return key;
}
