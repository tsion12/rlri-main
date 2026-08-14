import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { getTranslator } from "@/lib/i18n/translate";
import { mainEmails, mainRoutes } from "@/lib/main-routes";
import {
  CONFERENCE_REGISTER_ANCHOR,
  MAIN_CONFERENCE_DAYS,
  MINDS_LOGO_SRC,
} from "@/lib/main-conference";
import { MainConferenceRegistrationForm } from "@/components/main/MainConferenceRegistrationForm";
import { MainImagePlaceholder } from "@/components/main/MainImagePlaceholder";
import { MainLink } from "@/components/main/MainLink";

type Props = { locale: Locale };

/** Card treatment per agenda day, matching the order of `MAIN_CONFERENCE_DAYS`. */
const DAY_CARD_THEMES = [
  {
    surface: "bg-linear-to-br from-teal-800 via-teal-900 to-emerald-950",
    label: "text-teal-300",
    date: "text-teal-200/80",
    body: "text-teal-50/85",
    rule: "border-teal-300/25",
  },
  {
    surface: "bg-linear-to-br from-slate-900 via-slate-950 to-zinc-950",
    label: "text-amber-300",
    date: "text-amber-200/80",
    body: "text-slate-200/85",
    rule: "border-amber-300/25",
  },
  {
    surface: "bg-linear-to-br from-sky-800 via-sky-950 to-indigo-950",
    label: "text-sky-300",
    date: "text-sky-200/80",
    body: "text-sky-50/85",
    rule: "border-sky-300/25",
  },
] as const;

export async function MainConferencePage({ locale }: Props) {
  const t = await getTranslator(locale);
  const contactHref = `mailto:${mainEmails.info}`;
  const registerHref = `#${CONFERENCE_REGISTER_ANCHOR}`;

  return (
    <div className="bg-[#f4f8fb] dark:bg-zinc-950">
      {/* Hero */}
      <section
        className="relative flex min-h-dvh items-center justify-center overflow-hidden"
        aria-labelledby="conference-hero-heading"
      >
        {/* Conference not held yet — designed placeholder in place of a photo. */}
        <MainImagePlaceholder accent="sky" variant="overlay" />
        <div
          className="absolute inset-0 bg-linear-to-b from-slate-950/70 via-slate-950/45 to-slate-950/85"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_15%,rgba(56,189,248,0.18),transparent_50%),radial-gradient(ellipse_60%_50%_at_85%_85%,rgba(99,102,241,0.12),transparent_45%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-28 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.3em] text-sky-300/95">
            {t("pages.conference.heroEyebrow")}
          </p>
          <h1
            id="conference-hero-heading"
            className="mt-6 font-serif text-3xl font-semibold leading-[1.12] tracking-tight text-white sm:text-4xl lg:text-5xl"
          >
            {t("pages.conference.heroTitle")}
          </h1>

          <dl className="mx-auto mt-10 flex max-w-3xl flex-wrap items-stretch justify-center gap-4">
            {(
              [
                { labelKey: "pages.conference.heroWhenLabel", valueKey: "pages.conference.heroWhen" },
                { labelKey: "pages.conference.heroWhereLabel", valueKey: "pages.conference.heroWhere" },
                { labelKey: "pages.conference.heroFormatLabel", valueKey: "pages.conference.heroFormat" },
              ] as const
            ).map(({ labelKey, valueKey }) => (
              <div
                key={labelKey}
                className="min-w-48 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-sm"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-200/90">
                  {t(labelKey)}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-white">{t(valueKey)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={contactHref}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-sky-50"
            >
              {t("pages.conference.heroNotifyCta")}
            </a>
            <a
              href={registerHref}
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {t("pages.conference.heroRegisterCta")}
            </a>
          </div>
        </div>
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-[#f4f8fb] to-transparent dark:from-zinc-950"
          aria-hidden
        />
      </section>

      {/* Host institution & funding partner */}
      <section
        className="border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        aria-label={t("pages.conference.hostLabel")}
      >
        <div className="mx-auto flex max-w-5xl flex-col items-center gap-8 px-4 py-12 sm:px-6 lg:flex-row lg:justify-between lg:gap-12 lg:px-8">
          <dl className="grid gap-6 text-center sm:grid-cols-2 sm:text-left">
            {(
              [
                { labelKey: "pages.conference.hostLabel", valueKey: "pages.conference.hostName" },
                { labelKey: "pages.conference.funderLabel", valueKey: "pages.conference.funderName" },
              ] as const
            ).map(({ labelKey, valueKey }) => (
              <div key={labelKey}>
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-400">
                  {t(labelKey)}
                </dt>
                <dd className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                  {t(valueKey)}
                </dd>
              </div>
            ))}
          </dl>
          <Image
            src={MINDS_LOGO_SRC}
            alt={t("pages.conference.mindsLogoAlt")}
            width={1183}
            height={264}
            sizes="(min-width: 1024px) 320px, 260px"
            className="h-auto w-64 rounded-lg lg:w-80"
          />
        </div>
      </section>

      {/* Agenda */}
      <section
        className="border-b border-zinc-200/80 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900/40"
        aria-labelledby="conference-agenda-heading"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700 dark:text-sky-400">
            {t("pages.conference.agendaEyebrow")}
          </p>
          <h2
            id="conference-agenda-heading"
            className="mt-4 text-center font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
          >
            {t("pages.conference.agendaTitle")}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t("pages.conference.agendaLead")}
          </p>
          <p className="mt-6 flex justify-center">
            <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-4 py-1.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-800 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-300">
              {t("pages.conference.agendaTentativeBadge")}
            </span>
          </p>

          <ol className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {MAIN_CONFERENCE_DAYS.map((day, index) => {
              const theme = DAY_CARD_THEMES[index % DAY_CARD_THEMES.length];
              return (
                <li
                  key={day.id}
                  className={`flex flex-col rounded-3xl p-8 shadow-[0_28px_64px_-32px_rgba(15,23,42,0.55)] ${theme.surface}`}
                >
                  <p
                    className={`text-xs font-semibold uppercase tracking-[0.24em] ${theme.label}`}
                  >
                    {t(day.labelKey)}
                  </p>
                  <p
                    className={`mt-2 text-[11px] font-semibold uppercase tracking-[0.22em] ${theme.date}`}
                  >
                    {t(day.dateKey)}
                  </p>
                  <h3 className="mt-5 font-serif text-2xl font-semibold leading-snug text-white">
                    {t(day.themeKey)}
                  </h3>
                  <p className={`mt-5 flex-1 text-sm leading-relaxed ${theme.body}`}>
                    {t(day.bodyKey)}
                  </p>
                  <p className={`mt-8 border-t pt-5 text-xs ${theme.rule} ${theme.body}`}>
                    <span className="font-semibold uppercase tracking-[0.18em]">
                      {t("pages.conference.agendaResourceLabel")}
                    </span>
                    <span className="ml-2">
                      {day.resourceKey
                        ? t(day.resourceKey)
                        : t("pages.conference.agendaResourceTbc")}
                    </span>
                  </p>
                </li>
              );
            })}
          </ol>
        </div>
      </section>

      {/* Student volunteers */}
      <section
        className="border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        aria-labelledby="conference-students-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700 dark:text-sky-400">
            {t("pages.conference.studentEyebrow")}
          </p>
          <h2
            id="conference-students-heading"
            className="mt-4 font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
          >
            {t("pages.conference.studentTitle")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t("pages.conference.studentBody")}
          </p>
          <div className="mt-8">
            <a
              href={registerHref}
              className="inline-flex items-center justify-center rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500"
            >
              {t("pages.conference.studentCta")}
            </a>
          </div>
        </div>
      </section>

      {/* Registration form */}
      <section
        id={CONFERENCE_REGISTER_ANCHOR}
        className="scroll-mt-24 border-b border-zinc-200/80 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900/40"
        aria-labelledby="conference-register-heading"
      >
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700 dark:text-sky-400">
            {t("pages.conference.register.eyebrow")}
          </p>
          <h2
            id="conference-register-heading"
            className="mt-4 font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
          >
            {t("pages.conference.register.title")}
          </h2>
          <p className="mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t("pages.conference.register.lead")}
          </p>
          <div className="mt-10">
            <MainConferenceRegistrationForm />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden bg-linear-to-br from-slate-900 via-slate-800 to-sky-950"
        aria-labelledby="conference-cta-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(14,165,233,0.2),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-300/90">
            {t("pages.conference.ctaEyebrow")}
          </p>
          <h2
            id="conference-cta-heading"
            className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            {t("pages.conference.ctaTitle")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-sky-100/85">
            {t("pages.conference.ctaBody")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={contactHref}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-sky-50"
            >
              {t("pages.conference.ctaContact")}
            </a>
            <MainLink
              href={mainRoutes.events}
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {t("pages.conference.ctaEvents")}
            </MainLink>
          </div>
        </div>
      </section>
    </div>
  );
}
