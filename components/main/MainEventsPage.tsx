import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { TranslationKey } from "@/lib/i18n/messages/en";
import { getTranslator } from "@/lib/i18n/translate";
import { MainEventsHero } from "@/components/main/MainEventsHero";
import { MainIssuuEmbed } from "@/components/main/MainIssuuEmbed";
import { MainLink } from "@/components/main/MainLink";
import { MainRecentMulticulturalismSection } from "@/components/main/MainRecentMulticulturalismSection";
import {
  getMainInstituteUpcomingEvents,
  MAIN_PAST_GATHERING,
  MULTICULTURALISM_GALLERY_IMAGES,
  EVENTS_HERO_IMAGES,
  type MainInstituteEvent,
} from "@/lib/main-events";
import { mainGallerySrc } from "@/lib/main-gallery";
import {
  getMainEventReports,
  mainIssuuEmbedSrc,
  mainIssuuViewUrl,
} from "@/lib/main-issuu";
import { mainRoutes } from "@/lib/main-routes";

type Props = { locale: Locale };

function EventCard({
  event,
  t,
  featured,
}: {
  event: MainInstituteEvent;
  t: (key: TranslationKey) => string;
  featured?: boolean;
}) {
  const content = (
    <>
      <div className={`relative overflow-hidden ${featured ? "aspect-21/9 sm:aspect-24/9" : "aspect-16/10"}`}>
        <Image
          src={mainGallerySrc(event.image)}
          alt=""
          fill
          className="object-cover transition duration-700 group-hover:scale-105"
          sizes={featured ? "(max-width: 768px) 100vw, 56rem" : "(max-width: 768px) 100vw, 24rem"}
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-zinc-950/20 to-transparent"
          aria-hidden
        />
        {featured ? (
          <span className="absolute left-5 top-5 rounded-full border border-white/25 bg-white/15 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-white backdrop-blur-sm">
            {t("pages.events.featuredLabel")}
          </span>
        ) : null}
      </div>
      <div className={`${featured ? "p-6 sm:p-8" : "flex flex-1 flex-col p-5"}`}>
        <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">
          {t(event.programKey)}
        </p>
        <h3
          className={`mt-2 font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 ${
            featured ? "text-2xl sm:text-3xl" : "text-lg leading-snug"
          }`}
        >
          {t(event.titleKey)}
        </h3>
        <p className={`mt-3 leading-relaxed text-zinc-600 dark:text-zinc-400 ${featured ? "text-base" : "text-sm"}`}>
          {t(event.summaryKey)}
        </p>
        <dl className={`mt-4 grid gap-2 text-sm ${featured ? "sm:grid-cols-2" : ""}`}>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              When
            </dt>
            <dd className="mt-0.5 font-medium text-zinc-800 dark:text-zinc-200">{t(event.whenKey)}</dd>
          </div>
          <div>
            <dt className="text-[10px] font-semibold uppercase tracking-[0.16em] text-zinc-500 dark:text-zinc-400">
              Where
            </dt>
            <dd className="mt-0.5 font-medium text-zinc-800 dark:text-zinc-200">{t(event.whereKey)}</dd>
          </div>
        </dl>
        <div className="mt-4 flex flex-wrap gap-2">
          {event.tagKeys.map((tagKey) => (
            <span
              key={tagKey}
              className="rounded-full border border-zinc-200 bg-zinc-50 px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300"
            >
              {t(tagKey)}
            </span>
          ))}
        </div>
        {event.href ? (
          <div className="mt-5">
            <MainLink
              href={event.href}
              className={`inline-flex min-h-10 items-center justify-center rounded-lg font-semibold transition ${
                featured
                  ? "bg-teal-700 px-6 text-sm text-white hover:bg-teal-600"
                  : "border border-zinc-200 bg-white px-4 text-xs text-zinc-800 hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
              }`}
            >
              {t("pages.events.learnMore")}
            </MainLink>
          </div>
        ) : null}
      </div>
    </>
  );

  if (featured) {
    return (
      <article className="group overflow-hidden rounded-4xl border border-zinc-200/80 bg-white shadow-[0_24px_55px_-24px_rgba(15,23,42,0.2)] dark:border-zinc-800 dark:bg-zinc-900/60">
        {content}
      </article>
    );
  }

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200/80 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-teal-800/50">
      {content}
    </article>
  );
}

export async function MainEventsPage({ locale }: Props) {
  const t = await getTranslator(locale);
  const upcoming = getMainInstituteUpcomingEvents();
  const reports = getMainEventReports();

  return (
    <div className="bg-[#f7faf9] dark:bg-zinc-950">
      <MainEventsHero
        images={EVENTS_HERO_IMAGES}
        eyebrow={t("pages.events.heroEyebrow")}
        title={t("pages.events.heroTitle")}
        lead={t("pages.events.heroLead")}
        recentLabel={t("pages.events.recentEventsLabel")}
        upcomingLabel={t("pages.events.upcomingLabel")}
        pastLabel={t("pages.events.pastLabel")}
        exploreLabel={t("pages.events.heroExplore")}
      />

      <section
        id="recent"
        className="border-b border-zinc-200/80 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-amber-700 dark:text-amber-400">
              {t("pages.events.recentEventsLabel")}
            </p>
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <MainRecentMulticulturalismSection t={t} />
        </div>
      </section>

      <section
        id="upcoming"
        className="border-b border-zinc-200/80 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:py-24 lg:py-28"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
              {t("pages.events.upcomingLabel")}
            </p>
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>

          {upcoming.length > 0 ? (
            <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
              {upcoming.map((event) => (
                <li key={event.id}>
                  <EventCard event={event} t={t} />
                </li>
              ))}
            </ul>
          ) : (
            <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {t("pages.events.emptyUpcomingTitle")}
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                {t("pages.events.emptyUpcomingBody")}
              </p>
            </div>
          )}
        </div>
      </section>

      <section id="past" className="border-b border-zinc-200/80 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-10 flex items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
              {t("pages.events.pastLabel")}
            </p>
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className="mb-12">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
              {t("pages.events.pastUnityRunLabel")}
            </p>
            <div className="mt-6">
              <EventCard event={MAIN_PAST_GATHERING} t={t} featured />
            </div>
          </div>

          <div className="mb-8 max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
              {t("pages.events.pastReportsLabel")}
            </p>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("pages.events.pastReportsLead")}
            </p>
          </div>
          <div className="space-y-10">
            {reports.map((report) => (
              <MainIssuuEmbed
                key={report.id}
                eyebrow={t("pages.events.reportEyebrow")}
                title={t(report.titleKey)}
                summary={t(report.summaryKey)}
                embedSrc={mainIssuuEmbedSrc(report.documentId)}
                viewUrl={mainIssuuViewUrl(report.documentId)}
                openLabel={t("pages.events.openReport")}
                iframeTitle={`${t("pages.events.reportIframeTitle")}: ${t(report.titleKey)}`}
              />
            ))}
          </div>

          <div className="mt-10 text-center">
            <MainLink
              href={`${mainRoutes.home}#main-events-gallery`}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 shadow-sm transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
            >
              {t("pages.events.viewPhotos")}
            </MainLink>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
            {t("pages.events.howItWorksEyebrow")}
          </p>
          <h2 className="mt-3 max-w-2xl font-serif text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl">
            {t("pages.events.howItWorksTitle")}
          </h2>
          <p className="mt-4 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t("pages.events.howItWorksLead")}
          </p>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {(
              [
                { titleKey: "pages.events.step1Title", bodyKey: "pages.events.step1Body" },
                { titleKey: "pages.events.step2Title", bodyKey: "pages.events.step2Body" },
                { titleKey: "pages.events.step3Title", bodyKey: "pages.events.step3Body" },
              ] as const
            ).map(({ titleKey, bodyKey }) => (
              <article
                key={titleKey}
                className="rounded-2xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <h3 className="text-lg font-semibold text-zinc-900 dark:text-zinc-50">{t(titleKey)}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{t(bodyKey)}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative overflow-hidden bg-linear-to-br from-teal-900 via-teal-950 to-zinc-950 py-16 sm:py-20">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(45,212,191,0.15),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-300/90">
            {t("pages.events.ctaEyebrow")}
          </p>
          <h2 className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
            {t("pages.events.ctaTitle")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-teal-100/85">
            {t("pages.events.ctaBody")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <MainLink
              href={mainRoutes.volunteer}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-teal-900 shadow-lg transition hover:bg-teal-50"
            >
              {t("pages.events.ctaVolunteer")}
            </MainLink>
            <MainLink
              href={mainRoutes.arcticSecurity}
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {t("pages.events.ctaArctic")}
            </MainLink>
          </div>
        </div>
      </section>
    </div>
  );
}
