"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { localeLabels, localeShortLabels, locales } from "@/lib/i18n/config";
import { mainHrefForLocale, mainLocaleFromPathname } from "@/lib/i18n/path";
import { useTranslations } from "./i18n/LocaleProvider";

export function LanguageSwitcher() {
  const pathname = usePathname();
  const currentLocale = mainLocaleFromPathname(pathname);
  const t = useTranslations();
  const [open, setOpen] = useState(false);
  const menuId = useId();
  const rootRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node;
      if (rootRef.current && !rootRef.current.contains(target)) {
        setOpen(false);
      }
    }
    function handleEscape(e: KeyboardEvent) {
      if (e.key === "Escape") setOpen(false);
    }
    document.addEventListener("click", handleClickOutside);
    document.addEventListener("keydown", handleEscape);
    return () => {
      document.removeEventListener("click", handleClickOutside);
      document.removeEventListener("keydown", handleEscape);
    };
  }, []);

  return (
    <div className="relative" ref={rootRef}>
      <button
        type="button"
        id={`${menuId}-button`}
        aria-label={t("common.selectLanguage")}
        aria-expanded={open}
        aria-controls={`${menuId}-menu`}
        aria-haspopup="true"
        onClick={() => setOpen((v) => !v)}
        className="inline-flex h-10 items-center gap-2 rounded-lg border border-zinc-200/80 bg-white px-3 text-xs font-semibold uppercase tracking-wide text-zinc-700 shadow-sm transition hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:bg-zinc-800"
      >
        {localeShortLabels[currentLocale]}
        <svg
          width="14"
          height="14"
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          aria-hidden
          className={`transition-transform ${open ? "rotate-180" : ""}`}
        >
          <path d="M6 9l6 6 6-6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      {open && (
        <div
          id={`${menuId}-menu`}
          role="menu"
          aria-labelledby={`${menuId}-button`}
          className="absolute right-0 top-[calc(100%+0.5rem)] z-50 min-w-44 overflow-hidden rounded-xl border border-zinc-200/80 bg-white/95 p-1 shadow-lg shadow-zinc-900/10 ring-1 ring-zinc-900/5 backdrop-blur-xl dark:border-zinc-800 dark:bg-zinc-950/95 dark:ring-white/5"
        >
          {locales.map((locale) => {
            const active = locale === currentLocale;
            const href = mainHrefForLocale(pathname, locale);

            return (
              <Link
                key={locale}
                href={href}
                hrefLang={locale}
                lang={locale}
                role="menuitem"
                onClick={() => setOpen(false)}
                className={`flex items-center justify-between rounded-lg px-3 py-2.5 text-sm transition-colors ${
                  active
                    ? "bg-zinc-100 text-zinc-900 dark:bg-zinc-800 dark:text-white"
                    : "text-zinc-700 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-300 dark:hover:bg-zinc-800/80 dark:hover:text-white"
                }`}
                aria-current={active ? "page" : undefined}
              >
                <span>{localeLabels[locale]}</span>
                {active ? <span className="text-xs font-semibold">{localeShortLabels[locale]}</span> : null}
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
