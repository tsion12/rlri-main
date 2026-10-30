import Image from "next/image";
import type { ReactNode } from "react";
import type { Locale } from "@/lib/i18n/config";
import type { TranslationKey } from "@/lib/i18n/messages/en";
import { getTranslator } from "@/lib/i18n/translate";
import { MAIN_LOGO_SRC } from "@/lib/main-assets";
import {
  CONFERENCE_HERO_IMAGE,
  CONFERENCE_REGISTER_ANCHOR,
  MAIN_CONFERENCE_DAYS,
  MINDS_LOGO_SRC,
  conferenceDirectionsHref,
  type ConferenceDirectionMode,
} from "@/lib/main-conference";
import { mainEmails, mainRoutes } from "@/lib/main-routes";
import { MainConferenceMap } from "@/components/main/MainConferenceMap";
import { MainConferenceRegistrationForm } from "@/components/main/MainConferenceRegistrationForm";
import { MainLink } from "@/components/main/MainLink";

type Props = { locale: Locale };

const DIRECTIONS: readonly {
  mode: ConferenceDirectionMode;
  labelKey: TranslationKey;
}[] = [
  { mode: "driving", labelKey: "pages.conference.listing.driving" },
  { mode: "transit", labelKey: "pages.conference.listing.transit" },
  { mode: "bicycling", labelKey: "pages.conference.listing.cycling" },
  { mode: "walking", labelKey: "pages.conference.listing.walking" },
];

function Icon({ children }: { children: ReactNode }) {
  return (
    <svg
      className="size-5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.75"
      aria-hidden
    >
      {children}
    </svg>
  );
}

function PinIcon() {
  return (
    <Icon>
      <path d="M12 21s7-6.2 7-11a7 7 0 1 0-14 0c0 4.8 7 11 7 11z" />
      <circle cx="12" cy="10" r="2.25" />
    </Icon>
  );
}

function CalendarIcon() {
  return (
    <Icon>
      <rect x="3.5" y="5" width="17" height="15.5" rx="2" />
      <path d="M8 3.5V7M16 3.5V7M3.5 10h17" />
    </Icon>
  );
}

function ClockIcon() {
  return (
    <Icon>
      <circle cx="12" cy="12" r="8.25" />
      <path d="M12 8v4.5l3 2" />
    </Icon>
  );
}

function PeopleIcon() {
  return (
    <Icon>
      <circle cx="9" cy="8" r="2.25" />
      <circle cx="16" cy="9" r="1.75" />
      <path d="M4.5 18.5c.6-2.6 2.5-4 4.5-4s3.9 1.4 4.5 4" />
      <path d="M14 14.6c1.3-.4 2.5-.2 3.6.8.7.6 1.2 1.5 1.5 2.6" />
    </Icon>
  );
}

function DirectionIcon({ mode }: { mode: ConferenceDirectionMode }) {
  if (mode === "driving") {
    return (
      <Icon>
        <path d="M4 16.5 6.2 8.8A2 2 0 0 1 8.1 7.5h7.8a2 2 0 0 1 1.9 1.3L20 16.5" />
        <path d="M4 16.5h16v2.2a1.3 1.3 0 0 1-1.3 1.3H5.3A1.3 1.3 0 0 1 4 18.7z" />
        <circle cx="7.5" cy="16.5" r="0.9" fill="currentColor" stroke="none" />
        <circle cx="16.5" cy="16.5" r="0.9" fill="currentColor" stroke="none" />
      </Icon>
    );
  }
  if (mode === "transit") {
    return (
      <Icon>
        <rect x="4" y="4.5" width="16" height="12" rx="2" />
        <path d="M4 11h16M8 16.5v2.5M16 16.5v2.5M7.5 14h.01M16.5 14h.01" />
      </Icon>
    );
  }
  if (mode === "bicycling") {
    return (
      <Icon>
        <circle cx="6.5" cy="16" r="3" />
        <circle cx="17.5" cy="16" r="3" />
        <path d="M6.5 16 10 9h3l2 3h2.5M10 9l1.5 7M13 12h3" />
        <circle cx="13" cy="7" r="1.2" />
      </Icon>
    );
  }
  return (
    <Icon>
      <circle cx="13" cy="5" r="1.6" />
      <path d="M10 21l1.5-6L9 12.5 11 9.5h3.2l2.3 3.2L15 15l1.2 6" />
    </Icon>
  );
}

export async function MainConferencePage({ locale }: Props) {
  const t = await getTranslator(locale);
  const contactHref = `mailto:${mainEmails.info}`;
  const registerHref = `#${CONFERENCE_REGISTER_ANCHOR}`;

  return (
    <div className="bg-white dark:bg-zinc-950">
      <div className="mx-auto max-w-6xl px-4 pt-6 sm:px-6 lg:px-8">
        <div className="relative aspect-[2.15/1] overflow-hidden rounded-2xl bg-slate-900">
          <Image
            src={CONFERENCE_HERO_IMAGE}
            alt={t("pages.conference.heroImageAlt")}
            fill
            priority
            sizes="(min-width: 1152px) 1152px, 100vw"
            className="object-cover object-[center_30%]"
          />
        </div>
      </div>

      <div className="mx-auto grid max-w-6xl gap-10 px-4 pb-20 pt-8 sm:px-6 lg:grid-cols-[minmax(0,1fr)_20.5rem] lg:items-start lg:gap-14 lg:px-8">
        <div className="order-2 min-w-0 lg:order-1">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-sky-700 dark:text-sky-400">
            {t("pages.conference.heroEyebrow")}
          </p>
          <h1 className="mt-3 font-serif text-3xl font-semibold leading-tight tracking-tight text-zinc-950 sm:text-4xl dark:text-zinc-50">
            {t("pages.conference.title")}
          </h1>
          <p className="mt-4 text-lg leading-snug text-zinc-700 dark:text-zinc-300">
            {t("pages.conference.heroTitle")}
          </p>
          <p className="mt-4 text-sm text-zinc-500 dark:text-zinc-400">
            {t("pages.conference.listing.by")}{" "}
            <span className="font-semibold text-zinc-900 dark:text-zinc-100">
              {t("common.siteName")}
            </span>
          </p>

          <ul className="mt-6 space-y-3 text-sm text-zinc-800 dark:text-zinc-200">
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-zinc-500 dark:text-zinc-400">
                <PinIcon />
              </span>
              <span>
                <span className="font-semibold">{t("pages.conference.hostName")}</span>
                <span className="text-zinc-500 dark:text-zinc-400">
                  {" "}
                  · {t("pages.conference.listing.cityLine")}
                </span>
              </span>
            </li>
            <li className="flex items-start gap-3">
              <span className="mt-0.5 text-zinc-500 dark:text-zinc-400">
                <CalendarIcon />
              </span>
              <span className="font-semibold">{t("pages.conference.heroWhen")}</span>
            </li>
          </ul>

          <section className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800" aria-labelledby="conference-overview-heading">
            <h2 id="conference-overview-heading" className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              {t("pages.conference.listing.overview")}
            </h2>
            <div className="mt-4 space-y-4 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              <p>{t("pages.conference.rescheduleBody")}</p>
              <p>{t("pages.conference.rescheduleQuestions")}</p>
              <p>{t("pages.conference.rescheduleClosing")}</p>
            </div>
            <div className="mt-6 rounded-2xl border border-sky-200 bg-sky-50 px-5 py-4 dark:border-sky-900/60 dark:bg-sky-950/40">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-800 dark:text-sky-300">
                {t("pages.conference.rescheduleEyebrow")}
              </p>
              <p className="mt-2 font-semibold text-zinc-950 dark:text-zinc-50">
                {t("pages.conference.rescheduleTitle")}
              </p>
              <p className="mt-1 text-sm text-zinc-700 dark:text-zinc-300">
                {t("pages.conference.rescheduleVenue")}
              </p>
            </div>
          </section>

          <section className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800" aria-labelledby="conference-know-heading">
            <h2 id="conference-know-heading" className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              {t("pages.conference.listing.goodToKnow")}
            </h2>
            <div className="mt-5 grid gap-6 rounded-2xl border border-zinc-200 p-5 sm:grid-cols-2 dark:border-zinc-800">
              <div>
                <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                  {t("pages.conference.listing.highlights")}
                </h3>
                <ul className="mt-3 space-y-2.5 text-sm text-zinc-700 dark:text-zinc-300">
                  <li className="flex items-center gap-2.5">
                    <span className="text-zinc-500">
                      <ClockIcon />
                    </span>
                    {t("pages.conference.listing.duration")}
                  </li>
                  <li className="flex items-center gap-2.5">
                    <span className="text-zinc-500">
                      <PeopleIcon />
                    </span>
                    {t("pages.conference.heroFormat")}
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="text-sm font-semibold text-zinc-950 dark:text-zinc-50">
                  {t("pages.conference.listing.venueLabel")}
                </h3>
                <p className="mt-3 text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
                  {t("pages.conference.rescheduleVenue")}
                </p>
                <p className="mt-1 text-sm font-medium text-zinc-900 dark:text-zinc-100">
                  {t("pages.conference.hostName")}
                </p>
              </div>
            </div>
          </section>

          <section className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800" aria-labelledby="conference-location-heading">
            <h2 id="conference-location-heading" className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              {t("pages.conference.listing.location")}
            </h2>
            <h3 className="mt-4 text-base font-semibold text-zinc-950 dark:text-zinc-50">
              {t("pages.conference.hostName")}
            </h3>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {t("pages.conference.listing.street")}
            </p>
            <p className="text-sm text-zinc-600 dark:text-zinc-400">
              {t("pages.conference.listing.cityLine")}
            </p>
            <h4 className="mt-6 text-sm font-semibold text-zinc-950 dark:text-zinc-50">
              {t("pages.conference.listing.directions")}
            </h4>
            <ul className="mt-3 flex flex-wrap gap-2">
              {DIRECTIONS.map(({ mode, labelKey }) => (
                <li key={mode}>
                  <a
                    href={conferenceDirectionsHref(mode)}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 rounded-full border border-zinc-200 bg-white px-3.5 py-2 text-sm font-medium text-zinc-800 transition hover:border-zinc-300 hover:bg-zinc-50 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:bg-zinc-800"
                  >
                    <DirectionIcon mode={mode} />
                    {t(labelKey)}
                  </a>
                </li>
              ))}
            </ul>
            <MainConferenceMap
              showLabel={t("pages.conference.listing.showMap")}
              hideLabel={t("pages.conference.listing.hideMap")}
              title={t("pages.conference.listing.mapTitle")}
            />
          </section>

          <section className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800" aria-labelledby="conference-agenda-heading">
            <div className="flex flex-wrap items-center gap-3">
              <h2 id="conference-agenda-heading" className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
                {t("pages.conference.listing.agenda")}
              </h2>
              <span className="inline-flex items-center rounded-full border border-sky-200 bg-sky-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-sky-800 dark:border-sky-900/50 dark:bg-sky-950/40 dark:text-sky-300">
                {t("pages.conference.agendaTentativeBadge")}
              </span>
            </div>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("pages.conference.agendaLead")}
            </p>
            <ol className="mt-8 space-y-8">
              {MAIN_CONFERENCE_DAYS.map((day) => (
                <li key={day.id} className="border-t border-zinc-100 pt-6 first:border-t-0 first:pt-0 dark:border-zinc-800/80">
                  <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                    {t(day.labelKey)} · {t(day.dateKey)}
                  </p>
                  <h3 className="mt-1 text-lg font-semibold leading-snug text-zinc-950 dark:text-zinc-50">
                    {t(day.themeKey)}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                    {t(day.bodyKey)}
                  </p>
                  <p className="mt-3 text-sm text-zinc-500 dark:text-zinc-400">
                    <span className="font-semibold text-zinc-700 dark:text-zinc-300">
                      {t("pages.conference.agendaResourceLabel")}
                    </span>
                    {" · "}
                    {day.resourceKey
                      ? t(day.resourceKey)
                      : t("pages.conference.agendaResourceTbc")}
                  </p>
                </li>
              ))}
            </ol>
          </section>

          <section className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800" aria-labelledby="conference-students-heading">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-400">
              {t("pages.conference.studentEyebrow")}
            </p>
            <h2 id="conference-students-heading" className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              {t("pages.conference.studentTitle")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("pages.conference.studentBody")}
            </p>
            <a
              href={registerHref}
              className="mt-5 inline-flex text-sm font-semibold text-sky-800 underline-offset-2 hover:underline dark:text-sky-300"
            >
              {t("pages.conference.studentCta")}
            </a>
          </section>

          <section className="mt-10 border-t border-zinc-200 pt-8 dark:border-zinc-800" aria-labelledby="conference-organizer-heading">
            <h2 id="conference-organizer-heading" className="text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              {t("pages.conference.listing.organizedBy")}
            </h2>
            <div className="mt-5 flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-4">
                <Image
                  src={MAIN_LOGO_SRC}
                  alt=""
                  width={56}
                  height={56}
                  className="size-14 rounded-full border border-zinc-200 bg-white object-contain p-1.5 dark:border-zinc-700"
                />
                <div>
                  <p className="font-semibold text-zinc-950 dark:text-zinc-50">
                    {t("common.siteName")}
                  </p>
                  <a
                    href={contactHref}
                    className="mt-1 inline-flex text-sm font-semibold text-sky-800 underline-offset-2 hover:underline dark:text-sky-300"
                  >
                    {t("pages.conference.listing.contact")}
                  </a>
                </div>
              </div>
            </div>
            <div className="mt-8">
              <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                {t("pages.conference.funderLabel")}
              </p>
              <p className="mt-2 text-sm font-semibold text-zinc-900 dark:text-zinc-100">
                {t("pages.conference.funderName")}
              </p>
              <Image
                src={MINDS_LOGO_SRC}
                alt={t("pages.conference.mindsLogoAlt")}
                width={1183}
                height={264}
                sizes="280px"
                className="mt-4 h-auto w-56 rounded-lg"
              />
            </div>
          </section>

          <section
            id={CONFERENCE_REGISTER_ANCHOR}
            className="mt-10 scroll-mt-24 border-t border-zinc-200 pt-8 dark:border-zinc-800"
            aria-labelledby="conference-register-heading"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-sky-700 dark:text-sky-400">
              {t("pages.conference.register.eyebrow")}
            </p>
            <h2 id="conference-register-heading" className="mt-2 text-xl font-semibold text-zinc-950 dark:text-zinc-50">
              {t("pages.conference.register.title")}
            </h2>
            <p className="mt-3 max-w-2xl text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("pages.conference.register.lead")}
            </p>
            <div className="mt-6">
              <MainConferenceRegistrationForm />
            </div>
            <MainLink
              href={mainRoutes.events}
              className="mt-6 inline-flex text-sm font-semibold text-sky-800 underline-offset-2 hover:underline dark:text-sky-300"
            >
              {t("pages.conference.ctaEvents")}
            </MainLink>
          </section>
        </div>

        <aside className="order-1 lg:sticky lg:top-24 lg:order-2 lg:self-start">
          <div className="rounded-2xl border border-zinc-200 bg-white p-5 shadow-[0_16px_40px_-24px_rgba(15,23,42,0.35)] dark:border-zinc-800 dark:bg-zinc-900">
            <p className="text-base font-semibold text-zinc-950 dark:text-zinc-50">
              {t("pages.conference.heroWhen")}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {t("pages.conference.heroFormat")}
            </p>
            <p className="mt-1 text-sm text-zinc-600 dark:text-zinc-400">
              {t("pages.conference.hostName")}
            </p>
            <a
              href={registerHref}
              className="mt-5 flex w-full items-center justify-center rounded-lg bg-sky-700 px-4 py-3.5 text-sm font-semibold text-white transition hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500"
            >
              {t("pages.conference.heroRegisterCta")}
            </a>
            <a
              href={contactHref}
              className="mt-3 flex w-full items-center justify-center rounded-lg border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-800 transition hover:bg-zinc-50 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
            >
              {t("pages.conference.heroNotifyCta")}
            </a>
          </div>
        </aside>
      </div>
    </div>
  );
}
