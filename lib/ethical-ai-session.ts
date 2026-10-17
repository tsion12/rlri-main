import "server-only";

import { createHmac, timingSafeEqual } from "node:crypto";
import { cookies } from "next/headers";

const COOKIE_NAME = "rlri_ethical_ai";
/** 30 days. The shared password, not an individual account, is what grants access. */
const SESSION_MAX_AGE_SECONDS = 60 * 60 * 24 * 30;

function accessPassword(): string {
  return process.env.ETHICAL_AI_MASTERCLASS_PASSWORD?.trim() ?? "";
}

function sessionToken(password: string): string {
  return createHmac("sha256", password).update("rlri-ethical-ai-masterclass-v1").digest("hex");
}

function tokensMatch(a: string, b: string): boolean {
  const left = Buffer.from(a);
  const right = Buffer.from(b);
  if (left.length !== right.length) return false;
  return timingSafeEqual(left, right);
}

/** Compare a submitted password without leaking the expected value through timing. */
export function passwordMatches(attempt: string): boolean {
  const expected = accessPassword();
  const given = attempt.trim();
  if (!expected || !given) return false;
  const left = createHmac("sha256", "rlri-ethical-ai").update(given).digest();
  const right = createHmac("sha256", "rlri-ethical-ai").update(expected).digest();
  return timingSafeEqual(left, right);
}

export function masterclassSignInConfigured(): boolean {
  return accessPassword().length > 0;
}

export async function hasEthicalAiAccess(): Promise<boolean> {
  const password = accessPassword();
  if (!password) return false;
  const store = await cookies();
  const token = store.get(COOKIE_NAME)?.value;
  if (!token) return false;
  return tokensMatch(token, sessionToken(password));
}

export async function grantEthicalAiAccess(): Promise<void> {
  const password = accessPassword();
  if (!password) return;
  const store = await cookies();
  store.set(COOKIE_NAME, sessionToken(password), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE_SECONDS,
  });
}

export async function revokeEthicalAiAccess(): Promise<void> {
  const store = await cookies();
  store.delete(COOKIE_NAME);
}
