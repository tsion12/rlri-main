"use client";

import { au } from "@/components/main/main-ui";
import { useTranslations } from "@/components/main/i18n/LocaleProvider";
import { MainLink } from "@/components/main/MainLink";
import { mainEmails, mainPhones, mainRoutes } from "@/lib/main-routes";

const contactCard =
  "group flex items-start gap-4 rounded-2xl border border-white/20 bg-white/10 p-5 backdrop-blur-sm transition hover:border-white/35 hover:bg-white/15";

function PhoneIcon() {
  return (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        d="M5 4h3l2 5-2 1a13 13 0 0 0 6 6l1-2 5 2v3a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2Z"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg className="size-5 shrink-0" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        d="M4 7h16v10H4V7Zm0 0 8 6 8-6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}

export function MainJoinUs() {
  const t = useTranslations();

  return (
    <section
      id="main-join-us"
      className={`relative border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950 ${au.home.sectionPad}`}
      aria-labelledby="main-join-us-heading"
    >
      <div className={`${au.home.section} relative`}>
        <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-teal-700 via-teal-600 to-emerald-700 shadow-[0_24px_64px_-24px_rgba(13,148,136,0.55)] ring-1 ring-teal-500/30 dark:from-teal-800 dark:via-teal-700 dark:to-emerald-800">
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_100%_0%,rgba(255,255,255,0.14),transparent_50%)]"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -left-20 bottom-0 h-64 w-64 rounded-full bg-violet-500/20 blur-3xl"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute -right-10 top-0 h-48 w-48 rounded-full bg-emerald-300/25 blur-2xl"
            aria-hidden
          />

          <div className="relative grid gap-10 p-8 sm:p-10 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-14 lg:p-12 xl:p-14">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-100/90">
                {t("home.joinUs.eyebrow")}
              </p>
              <h2
                id="main-join-us-heading"
                className="mt-4 text-balance font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl lg:text-[2.35rem] lg:leading-[1.12]"
              >
                {t("home.joinUs.title")}
              </h2>
              <p className="mt-5 max-w-xl text-lg leading-relaxed text-teal-50/95">{t("home.joinUs.body")}</p>

              <MainLink
                href={mainRoutes.volunteer}
                className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-white px-10 text-sm font-bold uppercase tracking-[0.14em] text-teal-800 shadow-lg shadow-teal-950/20 ring-1 ring-white/80 transition hover:-translate-y-0.5 hover:bg-teal-50 hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/60 focus-visible:ring-offset-2 focus-visible:ring-offset-teal-700"
              >
                {t("home.joinUs.cta")}
              </MainLink>
            </div>

            <div className="flex flex-col gap-4">
              <a href={`tel:${mainPhones.primaryTel}`} className={contactCard}>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20">
                  <PhoneIcon />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-100/80">
                    {t("home.joinUs.phoneLabel")}
                  </span>
                  <span className="mt-1 block text-lg font-semibold text-white transition group-hover:text-teal-50">
                    {mainPhones.primary}
                  </span>
                </span>
              </a>

              <a href={`mailto:${mainEmails.info}`} className={contactCard}>
                <span className="flex size-11 shrink-0 items-center justify-center rounded-xl bg-white/15 text-white ring-1 ring-white/20">
                  <MailIcon />
                </span>
                <span className="min-w-0">
                  <span className="block text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-100/80">
                    {t("home.joinUs.emailLabel")}
                  </span>
                  <span className="mt-1 block break-all text-lg font-semibold text-white transition group-hover:text-teal-50 sm:break-normal">
                    {mainEmails.info}
                  </span>
                </span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
