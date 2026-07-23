import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import { getTranslator } from "@/lib/i18n/translate";
import { CONFERENCE_HERO_IMAGE } from "@/lib/main-conference";
import { mainEmails, mainRoutes } from "@/lib/main-routes";
import { MainLink } from "@/components/main/MainLink";

type Props = { locale: Locale };

const EXPECT_CARDS = [
  { titleKey: "pages.conference.expect1Title", bodyKey: "pages.conference.expect1Body" },
  { titleKey: "pages.conference.expect2Title", bodyKey: "pages.conference.expect2Body" },
  { titleKey: "pages.conference.expect3Title", bodyKey: "pages.conference.expect3Body" },
] as const;

export async function MainConferencePage({ locale }: Props) {
  const t = await getTranslator(locale);
  const contactHref = `mailto:${mainEmails.info}`;

  return (
    <div className="bg-[#f4f8fb] dark:bg-zinc-950">
      {/* Hero */}
      <section
        className="relative flex min-h-dvh items-center justify-center overflow-hidden"
        aria-labelledby="conference-hero-heading"
      >
        <Image
          src={CONFERENCE_HERO_IMAGE}
          alt={t("pages.conference.heroImageAlt")}
          fill
          preload
          className="object-cover"
          sizes="100vw"
        />
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
          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-slate-200/90 sm:text-lg">
            {t("pages.conference.heroLead")}
          </p>

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
            <MainLink
              href={mainRoutes.events}
              className="inline-flex items-center justify-center rounded-full border border-white/40 bg-white/10 px-6 py-3 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
            >
              {t("pages.conference.heroEventsCta")}
            </MainLink>
          </div>
        </div>
        <div
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-[#f4f8fb] to-transparent dark:from-zinc-950"
          aria-hidden
        />
      </section>

      {/* Thematic focus */}
      <section
        className="border-b border-zinc-200/80 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900/40"
        aria-labelledby="conference-focus-heading"
      >
        <div className="mx-auto max-w-6xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700 dark:text-sky-400">
            {t("pages.conference.focusEyebrow")}
          </p>
          <h2
            id="conference-focus-heading"
            className="mt-4 text-center font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
          >
            {t("pages.conference.focusTitle")}
          </h2>
          <p className="mx-auto mt-5 max-w-3xl text-center text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t("pages.conference.focusLead")}
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-2 lg:gap-8">
            {(
              [
                { titleKey: "pages.conference.focus1Title", bodyKey: "pages.conference.focus1Body" },
                { titleKey: "pages.conference.focus2Title", bodyKey: "pages.conference.focus2Body" },
              ] as const
            ).map(({ titleKey, bodyKey }, index) => (
              <article
                key={titleKey}
                className="rounded-3xl border border-sky-100 bg-white p-8 shadow-[0_24px_60px_-28px_rgba(15,23,42,0.18)] dark:border-sky-900/40 dark:bg-zinc-900/60"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-sky-600 to-indigo-500 font-serif text-lg font-semibold text-white shadow-lg shadow-sky-900/20">
                  {String(index + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-6 font-serif text-xl font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
                  {t(titleKey)}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {t(bodyKey)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Format */}
      <section
        className="border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        aria-labelledby="conference-format-heading"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700 dark:text-sky-400">
            {t("pages.conference.expectEyebrow")}
          </p>
          <h2
            id="conference-format-heading"
            className="mt-4 max-w-2xl font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
          >
            {t("pages.conference.expectTitle")}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t("pages.conference.expectLead")}
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {EXPECT_CARDS.map(({ titleKey, bodyKey }) => (
              <article
                key={titleKey}
                className="rounded-3xl border border-zinc-200/80 bg-slate-50/70 p-8 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <h3 className="font-serif text-xl font-semibold leading-snug text-zinc-900 dark:text-zinc-50">
                  {t(titleKey)}
                </h3>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {t(bodyKey)}
                </p>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* Partners */}
      <section
        className="border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        aria-labelledby="conference-partners-heading"
      >
        <div className="mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-sky-700 dark:text-sky-400">
            {t("pages.conference.partnersEyebrow")}
          </p>
          <h2
            id="conference-partners-heading"
            className="mt-4 font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
          >
            {t("pages.conference.partnersTitle")}
          </h2>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t("pages.conference.partnersBody")}
          </p>
          <div className="mt-8">
            <a
              href={contactHref}
              className="inline-flex items-center justify-center rounded-full bg-sky-700 px-6 py-3 text-sm font-semibold text-white transition hover:bg-sky-600 dark:bg-sky-600 dark:hover:bg-sky-500"
            >
              {t("pages.conference.partnersCta")}
            </a>
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
