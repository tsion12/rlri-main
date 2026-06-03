"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { FormEvent, useState } from "react";
import {
  IconMail,
  IconMap,
  IconPhone,
  SocialFacebook,
  SocialInstagram,
  SocialLinkedIn,
  SocialX,
  SocialYouTube,
} from "@/components/africa/africa-icons";
import { useTranslations } from "@/components/main/i18n/LocaleProvider";
import { MAIN_FOOTER_NAV } from "@/lib/main-navigation";
import { mainAboutSectionHref, mainAddress, mainEmails, mainPhones, mainRoutes } from "@/lib/main-routes";
import { MAIN_SOCIAL_LINKS } from "@/lib/main-social";
import { mainBaseFromPathname, mainHref, mainLocaleFromPathname } from "@/lib/i18n/path";
import { MainLogo } from "./MainLogo";

const social = [
  { label: "Facebook", href: MAIN_SOCIAL_LINKS.facebook, icon: SocialFacebook },
  { label: "Instagram", href: MAIN_SOCIAL_LINKS.instagram, icon: SocialInstagram },
  { label: "X (Twitter)", href: MAIN_SOCIAL_LINKS.x, icon: SocialX },
  { label: "LinkedIn", href: MAIN_SOCIAL_LINKS.linkedin, icon: SocialLinkedIn },
  { label: "YouTube", href: MAIN_SOCIAL_LINKS.youtube, icon: SocialYouTube },
] as const;

const socialBtnClass =
  "flex size-10 items-center justify-center rounded-full bg-teal-600 text-white shadow-sm transition hover:-translate-y-0.5 hover:bg-teal-500 hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 dark:bg-teal-700 dark:hover:bg-teal-600";

const iconTile =
  "flex size-9 shrink-0 items-center justify-center rounded-lg bg-teal-600 text-white dark:bg-teal-700";

function resolveFooterHref(
  linkHref: string,
  external: boolean | undefined,
  homeHref: string,
  localized: (route: string) => string,
) {
  if (external || linkHref.startsWith("mailto:")) return linkHref;
  if (linkHref.startsWith("#")) return `${homeHref}${linkHref}`;
  return localized(linkHref);
}

export function MainFooter() {
  const pathname = usePathname();
  const base = mainBaseFromPathname(pathname);
  const locale = mainLocaleFromPathname(pathname);
  const t = useTranslations();
  const [newsletterEmail, setNewsletterEmail] = useState("");
  const [newsletterDone, setNewsletterDone] = useState(false);

  const localized = (route: string) => mainHref(route, { base, locale });
  const homeHref = localized(mainRoutes.home);

  const onNewsletterSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (!newsletterEmail.trim()) return;
    setNewsletterDone(true);
    setNewsletterEmail("");
  };

  return (
    <footer className="mt-auto border-t border-zinc-200/80 bg-zinc-50 dark:border-zinc-800 dark:bg-zinc-950">
      <div className="mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
        <div className="grid gap-12 lg:grid-cols-12 lg:gap-10 xl:gap-12">
          {/* Brand + social */}
          <div className="lg:col-span-4">
            <MainLogo variant="footer" />
            <p className="mt-5 max-w-sm text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("footer.tagline")}
            </p>
            <ul className="mt-6 flex flex-wrap gap-2.5">
              {social.map(({ label, href: socialHref, icon: Icon }) => (
                <li key={label}>
                  <a
                    href={socialHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className={socialBtnClass}
                    aria-label={label}
                  >
                    <Icon className="size-[18px]" />
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick links */}
          <div className="lg:col-span-2">
            <h2 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {t("footer.quickLinks")}
            </h2>
            <ul className="mt-5 space-y-2.5">
              {MAIN_FOOTER_NAV.map(({ labelKey, href: linkHref, external }) => {
                const resolved = resolveFooterHref(linkHref, external, homeHref, localized);
                const isExternal = external || linkHref.startsWith("mailto:");
                return (
                  <li key={labelKey}>
                    {isExternal ? (
                      <a
                        href={resolved}
                        className="text-sm text-zinc-600 transition hover:text-teal-700 dark:text-zinc-400 dark:hover:text-teal-400"
                        {...(linkHref.startsWith("mailto:")
                          ? {}
                          : { target: "_blank", rel: "noopener noreferrer" })}
                      >
                        {t(labelKey)}
                      </a>
                    ) : (
                      <Link
                        href={resolved}
                        className="text-sm text-zinc-600 transition hover:text-teal-700 dark:text-zinc-400 dark:hover:text-teal-400"
                      >
                        {t(labelKey)}
                      </Link>
                    )}
                  </li>
                );
              })}
            </ul>
          </div>

          {/* Get in touch */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {t("footer.getInTouch")}
            </h2>
            <ul className="mt-5 space-y-4">
              <li className="flex gap-3">
                <span className={iconTile} aria-hidden>
                  <IconMap className="size-4" />
                </span>
                <address className="not-italic text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {mainAddress.line1}
                  <br />
                  {mainAddress.line2}
                  <br />
                  {mainAddress.country}
                </address>
              </li>
              <li className="flex gap-3">
                <span className={iconTile} aria-hidden>
                  <IconMail className="size-4" />
                </span>
                <a
                  href={`mailto:${mainEmails.info}`}
                  className="text-sm font-medium text-zinc-700 transition hover:text-teal-700 dark:text-zinc-300 dark:hover:text-teal-400"
                >
                  {mainEmails.info}
                </a>
              </li>
              <li className="flex gap-3">
                <span className={iconTile} aria-hidden>
                  <IconPhone className="size-4" />
                </span>
                <a
                  href={`tel:${mainPhones.primaryTel}`}
                  className="text-sm font-medium text-zinc-700 transition hover:text-teal-700 dark:text-zinc-300 dark:hover:text-teal-400"
                >
                  {mainPhones.primary}
                </a>
              </li>
            </ul>
          </div>

          {/* Newsletter */}
          <div className="lg:col-span-3">
            <h2 className="text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {t("footer.newsletterTitle")}
            </h2>
            <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("footer.newsletterLead")}
            </p>
            {newsletterDone ? (
              <p className="mt-5 rounded-xl border border-teal-200/80 bg-teal-50/80 px-4 py-3 text-sm font-medium text-teal-800 dark:border-teal-800/50 dark:bg-teal-950/40 dark:text-teal-200">
                {t("footer.newsletterSuccess")}
              </p>
            ) : (
              <form className="mt-5" onSubmit={onNewsletterSubmit}>
                <div className="flex overflow-hidden rounded-full border border-zinc-200 bg-white shadow-sm ring-1 ring-zinc-900/5 dark:border-zinc-700 dark:bg-zinc-900 dark:ring-white/5">
                  <label htmlFor="footer-newsletter-email" className="sr-only">
                    {t("footer.newsletterPlaceholder")}
                  </label>
                  <input
                    id="footer-newsletter-email"
                    type="email"
                    name="email"
                    required
                    autoComplete="email"
                    value={newsletterEmail}
                    onChange={(e) => setNewsletterEmail(e.target.value)}
                    placeholder={t("footer.newsletterPlaceholder")}
                    className="min-w-0 flex-1 border-0 bg-transparent px-4 py-3 text-sm text-zinc-800 placeholder:text-zinc-400 focus:outline-none focus:ring-0 dark:text-zinc-100 dark:placeholder:text-zinc-500"
                  />
                  <button
                    type="submit"
                    className="shrink-0 bg-teal-600 px-5 text-xs font-bold uppercase tracking-[0.12em] text-white transition hover:bg-teal-500 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/50 focus-visible:ring-offset-2 dark:bg-teal-700 dark:hover:bg-teal-600"
                  >
                    {t("footer.newsletterCta")}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      </div>

      <div className="border-t border-teal-700/20 bg-teal-700 dark:border-teal-800 dark:bg-teal-800">
        <div className="mx-auto flex max-w-7xl flex-col items-center justify-between gap-4 px-4 py-5 text-center text-sm text-white/95 sm:flex-row sm:text-left lg:px-8">
          <p>Copyright © {new Date().getFullYear()} {t("footer.copyright")}</p>
          <nav
            aria-label="Legal"
            className="flex flex-wrap items-center justify-center gap-x-2 gap-y-1 text-white/90"
          >
            <Link
              href={localized(mainAboutSectionHref("policies"))}
              className="transition hover:text-white"
            >
              {t("footer.termsOfService")}
            </Link>
            <span className="text-white/50" aria-hidden>
              ·
            </span>
            <Link
              href={localized(mainAboutSectionHref("policies"))}
              className="transition hover:text-white"
            >
              {t("footer.privacyPolicy")}
            </Link>
            <span className="text-white/50" aria-hidden>
              ·
            </span>
            <Link
              href={localized(mainAboutSectionHref("policies"))}
              className="transition hover:text-white"
            >
              {t("footer.cookiePolicy")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  );
}
