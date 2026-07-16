"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { au } from "@/components/shared/africa-ui";
import { ThemeToggle } from "@/components/ThemeToggle";
import { useTranslations } from "@/components/main/i18n/LocaleProvider";
import { LanguageSwitcher } from "@/components/main/LanguageSwitcher";
import { MAIN_ABOUT_NAV, MAIN_PRIMARY_NAV } from "@/lib/main-navigation";
import { mainRoutes } from "@/lib/main-routes";
import {
  mainBaseFromPathname,
  mainHref,
  mainLocaleFromPathname,
  navItemActiveMain,
} from "@/lib/i18n/path";
import { MainAboutNavLink } from "./MainAboutNavLink";
import { MainLogo } from "./MainLogo";

const mobileRow =
  "flex w-full items-center rounded-xl px-3 py-2.5 text-left text-sm font-medium text-zinc-700 transition-colors hover:bg-zinc-100 dark:text-zinc-300 dark:hover:bg-zinc-800/80";
const mobileRowActive =
  "bg-zinc-100 text-zinc-900 dark:bg-zinc-800/90 dark:text-white";

function NavLink({
  href,
  children,
  active,
}: {
  href: string;
  children: React.ReactNode;
  active: boolean;
}) {
  const cls = `${au.header.navItem} ${active ? au.header.navItemActive : au.header.navItemIdle}`;

  if (href.startsWith("http")) {
    return (
      <a href={href} className={cls} target="_blank" rel="noopener noreferrer">
        {children}
      </a>
    );
  }

  return (
    <Link href={href} className={cls}>
      {children}
    </Link>
  );
}

export function MainHeader() {
  const pathname = usePathname();
  const base = mainBaseFromPathname(pathname);
  const locale = mainLocaleFromPathname(pathname);
  const t = useTranslations();
  const [mobileOpen, setMobileOpen] = useState(false);
  const [aboutOpen, setAboutOpen] = useState(false);
  const aboutId = useId();
  const aboutRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (aboutRef.current && !aboutRef.current.contains(target)) setAboutOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    return () => document.removeEventListener("click", handleClickOutside);
  }, []);

  const aboutActive =
    navItemActiveMain(pathname, mainRoutes.aboutUs, base, locale) ||
    MAIN_ABOUT_NAV.some((item) => navItemActiveMain(pathname, item.href, base, locale));

  const href = (route: string) => mainHref(route, { base, locale });

  return (
    <header className={au.header.outer}>
      <div className={au.header.inner}>
        <div className="flex min-w-0 shrink items-center gap-2 lg:gap-3">
          <MainLogo />
          <span
            className="hidden h-8 w-px shrink-0 bg-zinc-200/90 lg:block dark:bg-zinc-700/80"
            aria-hidden
          />
        </div>

        <nav className="hidden items-center lg:flex" aria-label="Primary">
          <div className={au.header.navTrack}>
            <NavLink
              href={href(mainRoutes.home)}
              active={navItemActiveMain(pathname, mainRoutes.home, base, locale)}
            >
              {t("nav.home")}
            </NavLink>

            <div
              ref={aboutRef}
              className={`relative inline-flex items-stretch overflow-visible rounded-lg ${
                aboutActive ? au.header.navItemActive : au.header.navItemIdle
              }`}
            >
              <Link
                href={href(mainRoutes.aboutUs)}
                className="inline-flex items-center px-3 py-2 text-sm font-medium tracking-tight transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:focus-visible:ring-offset-zinc-950"
                onClick={() => setAboutOpen(false)}
              >
                {t("nav.aboutUs")}
              </Link>
              <button
                type="button"
                id={`${aboutId}-btn`}
                aria-expanded={aboutOpen}
                aria-controls={`${aboutId}-menu`}
                aria-haspopup="true"
                aria-label={t("nav.aboutSubmenu")}
                className="inline-flex items-center border-l border-zinc-200/80 px-2.5 py-2 text-zinc-600 transition-colors hover:text-zinc-900 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/40 focus-visible:ring-offset-2 focus-visible:ring-offset-white dark:border-zinc-600/80 dark:text-zinc-400 dark:hover:text-zinc-100 dark:focus-visible:ring-offset-zinc-950"
                onClick={(e) => {
                  e.stopPropagation();
                  setAboutOpen((o) => !o);
                }}
              >
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  className={`opacity-70 transition-transform duration-200 ${aboutOpen ? "rotate-180" : ""}`}
                  aria-hidden
                >
                  <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>

              {aboutOpen && (
                <div id={`${aboutId}-menu`} role="menu" className={au.header.dropdown}>
                  {MAIN_ABOUT_NAV.map((item) => (
                    <MainAboutNavLink
                      key={item.href}
                      role="menuitem"
                      href={href(item.href)}
                      className={au.header.dropdownItem}
                      onNavigate={() => setAboutOpen(false)}
                    >
                      {t(item.labelKey)}
                    </MainAboutNavLink>
                  ))}
                </div>
              )}
            </div>

            {MAIN_PRIMARY_NAV.map((item) => (
              <NavLink
                key={item.href}
                href={href(item.href)}
                active={navItemActiveMain(pathname, item.href, base, locale)}
              >
                {t(item.labelKey)}
              </NavLink>
            ))}
          </div>
        </nav>

        <div className="flex shrink-0 items-center gap-1.5 sm:gap-2">
          <LanguageSwitcher />
          <ThemeToggle className="h-10! w-10! rounded-lg! border-zinc-200/80! shadow-sm! dark:border-zinc-700!" />

          <button
            type="button"
            className={`${au.header.iconButton} lg:hidden`}
            aria-expanded={mobileOpen}
            aria-controls="main-mobile-nav"
            aria-label={mobileOpen ? t("nav.closeMenu") : t("nav.openMenu")}
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M6 6l12 12M18 6L6 18" />
              </svg>
            ) : (
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M4 7h16M4 12h16M4 17h16" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <div
          id="main-mobile-nav"
          className="border-t border-zinc-200/70 bg-white/95 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/95 lg:hidden"
        >
          <div className="mx-auto max-w-7xl space-y-4 px-4 py-5 sm:px-6">
            <nav className="flex flex-col gap-1" aria-label="Mobile primary">
              <Link
                href={href(mainRoutes.home)}
                className={`${mobileRow} ${navItemActiveMain(pathname, mainRoutes.home, base, locale) ? mobileRowActive : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {t("nav.home")}
              </Link>
              <Link
                href={href(mainRoutes.aboutUs)}
                className={`${mobileRow} ${navItemActiveMain(pathname, mainRoutes.aboutUs, base, locale) ? mobileRowActive : ""}`}
                onClick={() => setMobileOpen(false)}
              >
                {t("nav.aboutUs")}
              </Link>
              {MAIN_PRIMARY_NAV.map((item) => (
                <Link
                  key={item.href}
                  href={href(item.href)}
                  className={`${mobileRow} ${navItemActiveMain(pathname, item.href, base, locale) ? mobileRowActive : ""}`}
                  onClick={() => setMobileOpen(false)}
                >
                  {t(item.labelKey)}
                </Link>
              ))}
            </nav>
            <div>
              <p className={au.footer.sectionTitle}>{t("nav.aboutUs")}</p>
              <div className="mt-2 flex flex-col gap-0.5">
                {MAIN_ABOUT_NAV.map((item) => (
                  <MainAboutNavLink
                    key={item.href}
                    href={href(item.href)}
                    className={au.header.dropdownItem}
                    onNavigate={() => setMobileOpen(false)}
                  >
                    {t(item.labelKey)}
                  </MainAboutNavLink>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}
