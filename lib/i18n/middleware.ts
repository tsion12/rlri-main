import { NextRequest, NextResponse } from "next/server";
import { defaultLocale, isLocale } from "./config";

/**
 * Rewrite public main-site URLs to `/main/{locale}/…` for the App Router.
 * English uses unprefixed paths (`/about` → `/main/en/about`).
 */
export function rewriteMainSitePath(pathname: string, requestUrl: string): NextResponse {
  const segments = pathname.split("/").filter(Boolean);
  const first = segments[0];
  const hasLocalePrefix = first !== undefined && isLocale(first);

  const locale = hasLocalePrefix ? first : defaultLocale;
  const restSegments = hasLocalePrefix ? segments.slice(1) : segments;
  const restPath = restSegments.length ? `/${restSegments.join("/")}` : "";

  const internal = `/main/${locale}${restPath}`;
  return NextResponse.rewrite(new URL(internal, requestUrl));
}
