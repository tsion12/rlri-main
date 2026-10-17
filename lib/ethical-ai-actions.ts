"use server";

import { redirect } from "next/navigation";
import { isLocale } from "@/lib/i18n/config";
import { mainRoutes } from "@/lib/main-routes";
import {
  grantEthicalAiAccess,
  masterclassSignInConfigured,
  passwordMatches,
  revokeEthicalAiAccess,
} from "@/lib/ethical-ai-session";

function masterclassPath(localeValue: FormDataEntryValue | null): string {
  const locale = typeof localeValue === "string" && isLocale(localeValue) ? localeValue : "en";
  return `/${locale}${mainRoutes.ethicalAi}`;
}

export type EthicalAiLoginState = {
  status: "idle" | "invalid" | "unavailable";
};

export async function signInToEthicalAi(
  _previous: EthicalAiLoginState,
  formData: FormData,
): Promise<EthicalAiLoginState> {
  if (!masterclassSignInConfigured()) return { status: "unavailable" };
  const password = String(formData.get("password") ?? "");
  if (!passwordMatches(password)) return { status: "invalid" };
  await grantEthicalAiAccess();
  redirect(masterclassPath(formData.get("locale")));
}

export async function signOutOfEthicalAi(formData: FormData): Promise<void> {
  await revokeEthicalAiAccess();
  redirect(masterclassPath(formData.get("locale")));
}
