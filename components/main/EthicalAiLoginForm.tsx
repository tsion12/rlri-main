"use client";

import { useActionState } from "react";
import type { Locale } from "@/lib/i18n/config";
import { useTranslations } from "@/components/main/i18n/LocaleProvider";
import { signInToEthicalAi, type EthicalAiLoginState } from "@/lib/ethical-ai-actions";

const INITIAL: EthicalAiLoginState = { status: "idle" };

export function EthicalAiLoginForm({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const [state, formAction, pending] = useActionState(signInToEthicalAi, INITIAL);
  const error =
    state.status === "invalid"
      ? t("pages.ethicalAi.loginInvalid")
      : state.status === "unavailable"
        ? t("pages.ethicalAi.loginUnavailable")
        : null;

  return (
    <form action={formAction} className="mt-6 space-y-4" noValidate>
      <input type="hidden" name="locale" value={locale} />
      <div>
        <label
          htmlFor="ethical-ai-password"
          className="text-[11px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400"
        >
          {t("pages.ethicalAi.passwordLabel")}
        </label>
        <input
          id="ethical-ai-password"
          name="password"
          type="password"
          autoComplete="current-password"
          required
          aria-invalid={error ? true : undefined}
          aria-describedby={error ? "ethical-ai-password-error" : undefined}
          className="mt-2 w-full rounded-xl border border-zinc-200 bg-white px-4 py-3 text-base text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-teal-600 focus:ring-2 focus:ring-teal-600/20 dark:border-zinc-700 dark:bg-zinc-950 dark:text-zinc-50"
        />
      </div>
      {error ? (
        <p id="ethical-ai-password-error" role="alert" className="text-sm text-red-700 dark:text-red-400">
          {error}
        </p>
      ) : null}
      <button
        type="submit"
        disabled={pending}
        className="inline-flex min-h-12 w-full items-center justify-center rounded-full bg-teal-700 px-8 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500 focus-visible:ring-offset-2 disabled:opacity-70 dark:focus-visible:ring-offset-zinc-950"
      >
        {pending ? t("pages.ethicalAi.loginPending") : t("pages.ethicalAi.loginCta")}
      </button>
    </form>
  );
}
