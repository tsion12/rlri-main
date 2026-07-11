import Image from "next/image";
import type { Locale } from "@/lib/i18n/config";
import type { TranslationKey } from "@/lib/i18n/messages/en";
import { getTranslator } from "@/lib/i18n/translate";
import { mainGallerySrc } from "@/lib/main-gallery";
import { mainEmails, mainRoutes } from "@/lib/main-routes";
import { MainLink } from "@/components/main/MainLink";

type Props = { locale: Locale };

const HERO_IMAGE = mainGallerySrc("REAL LIFE INSTITUTE-1.jpg");

const THEME_KEYS: TranslationKey[] = [
  "pages.conference.themes.arctic",
  "pages.conference.themes.resilience",
  "pages.conference.themes.multiculturalism",
  "pages.conference.themes.mentalHealth",
  "pages.conference.themes.dialogue",
  "pages.conference.themes.youth",
];

const EXPECT_CARDS = [
  { titleKey: "pages.conference.expect1Title", bodyKey: "pages.conference.expect1Body" },
  { titleKey: "pages.conference.expect2Title", bodyKey: "pages.conference.expect2Body" },
  { titleKey: "pages.conference.expect3Title", bodyKey: "pages.conference.expect3Body" },
] as const;

function ComingSoonCard({
  eyebrow,
  title,
  body,
  action,
}: {
  eyebrow: string;
  title: string;
  body: string;
  action?: React.ReactNode;
}) {
  return (
    <article className="flex h-full flex-col rounded-3xl border border-dashed border-zinc-300 bg-white/70 p-8 text-center dark:border-zinc-700 dark:bg-zinc-900/50">
      <p className="text-[11px] font-semibold uppercase tracking-[0.24em] text-indigo-700 dark:text-indigo-400">
        {eyebrow}
      </p>
      <h3 className="mt-4 font-serif text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
        {title}
      </h3>
      <p className="mx-auto mt-4 max-w-md flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {body}
      </p>
      {action ? <div className="mt-6">{action}</div> : null}
    </article>
  );
}

export async function MainConferencePage({ locale }: Props) {
  const t = await getTranslator(locale);
  const contactHref = `mailto:${mainEmails.info}`;

  return (
    <div className="bg-[#f6f7fb] dark:bg-zinc-950">
      {/* Hero */}
      <section
        className="relative flex min-h-[90dvh] items-center justify-center overflow-hidden"
        aria-labelledby="conference-hero-heading"
      >
        <Image
          src={HERO_IMAGE}
          alt={t("pages.conference.heroImageAlt")}
          fill
          priority
          className="object-cover"
          sizes="100vw"
        />
        <div
          className="absolute inset-0 bg-linear-to-b from-slate-950/90 via-slate-900/75 to-slate-950/95"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_90%_70%_at_50%_15%,rgba(129,140,248,0.2),transparent_50%),radial-gradient(ellipse_60%_50%_at_85%_85%,rgba(56,189,248,0.12),transparent_45%)]"
          aria-hidden
        />
        <div className="relative z-10 mx-auto max-w-5xl px-4 py-28 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.34em] text-indigo-300/95">
            {t("pages.conference.heroEyebrow")}
          </p>
          <h1
            id="conference-hero-heading"
            className="mt-6 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-white sm:text-5xl lg:text-6xl"
          >
            {t("pages.conference.heroTitle")}
          </h1>
          <p className="mt-5 font-serif text-xl font-medium italic text-indigo-100/90 sm:text-2xl">
            {t("pages.conference.heroTheme")}
          </p>
          <p className="mx-auto mt-8 max-w-3xl text-base leading-relaxed text-slate-200/90 sm:text-lg">
            {t("pages.conference.heroLead")}
          </p>

          <dl className="mx-auto mt-10 flex max-w-2xl flex-wrap items-stretch justify-center gap-4">
            {(
              [
                { labelKey: "pages.conference.heroWhenLabel", valueKey: "pages.conference.heroWhen" },
                { labelKey: "pages.conference.heroWhereLabel", valueKey: "pages.conference.heroWhere" },
              ] as const
            ).map(({ labelKey, valueKey }) => (
              <div
                key={labelKey}
                className="min-w-56 rounded-2xl border border-white/15 bg-white/10 px-6 py-4 backdrop-blur-sm"
              >
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-indigo-200/90">
                  {t(labelKey)}
                </dt>
                <dd className="mt-1 text-sm font-semibold text-white">{t(valueKey)}</dd>
              </div>
            ))}
          </dl>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={contactHref}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-indigo-50"
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
          className="pointer-events-none absolute bottom-0 left-0 right-0 h-28 bg-linear-to-t from-[#f6f7fb] to-transparent dark:from-zinc-950"
          aria-hidden
        />
      </section>

      {/* About */}
      <section
        className="border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        aria-labelledby="conference-about-heading"
      >
        <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-center text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-700 dark:text-indigo-400">
            {t("pages.conference.aboutEyebrow")}
          </p>
          <h2
            id="conference-about-heading"
            className="mt-4 text-center font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
          >
            {t("pages.conference.aboutTitle")}
          </h2>
          <p className="mt-8 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[17px]">
            {t("pages.conference.aboutP1")}
          </p>
          <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[17px]">
            {t("pages.conference.aboutP2")}
          </p>
        </div>
      </section>

      {/* Themes */}
      <section
        className="border-b border-zinc-200/80 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900/40"
        aria-labelledby="conference-themes-heading"
      >
        <div className="mx-auto max-w-5xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-700 dark:text-indigo-400">
            {t("pages.conference.themesEyebrow")}
          </p>
          <h2
            id="conference-themes-heading"
            className="mt-4 font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
          >
            {t("pages.conference.themesTitle")}
          </h2>
          <ul className="mt-10 flex flex-wrap items-center justify-center gap-3">
            {THEME_KEYS.map((key) => (
              <li
                key={key}
                className="rounded-full border border-indigo-200 bg-white px-5 py-2.5 text-sm font-semibold text-indigo-900 shadow-sm dark:border-indigo-900/50 dark:bg-zinc-900 dark:text-indigo-200"
              >
                {t(key)}
              </li>
            ))}
          </ul>
        </div>
      </section>

      {/* What to expect */}
      <section
        className="border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        aria-labelledby="conference-expect-heading"
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-700 dark:text-indigo-400">
            {t("pages.conference.expectEyebrow")}
          </p>
          <h2
            id="conference-expect-heading"
            className="mt-4 max-w-2xl font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
          >
            {t("pages.conference.expectTitle")}
          </h2>
          <p className="mt-5 max-w-3xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
            {t("pages.conference.expectLead")}
          </p>
          <div className="mt-12 grid gap-6 lg:grid-cols-3 lg:gap-8">
            {EXPECT_CARDS.map(({ titleKey, bodyKey }, index) => (
              <article
                key={titleKey}
                className="rounded-3xl border border-zinc-200/80 bg-slate-50/70 p-8 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-linear-to-br from-indigo-500 to-sky-400 font-serif text-lg font-semibold text-white shadow-lg shadow-indigo-900/20">
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

      {/* Speakers / Agenda / Partners — coming soon */}
      <section
        className="border-b border-zinc-200/80 bg-slate-50 dark:border-zinc-800 dark:bg-zinc-900/40"
        aria-label={t("pages.conference.comingSoonBadge")}
      >
        <div className="mx-auto max-w-7xl px-4 py-16 sm:px-6 sm:py-20 lg:px-8 lg:py-24">
          <div className="mb-10 flex items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-indigo-700 dark:text-indigo-400">
              {t("pages.conference.comingSoonBadge")}
            </p>
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>
          <div className="grid gap-6 lg:grid-cols-3 lg:gap-8">
            <ComingSoonCard
              eyebrow={t("pages.conference.speakersEyebrow")}
              title={t("pages.conference.speakersTitle")}
              body={t("pages.conference.speakersBody")}
            />
            <ComingSoonCard
              eyebrow={t("pages.conference.agendaEyebrow")}
              title={t("pages.conference.agendaTitle")}
              body={t("pages.conference.agendaBody")}
            />
            <ComingSoonCard
              eyebrow={t("pages.conference.partnersEyebrow")}
              title={t("pages.conference.partnersTitle")}
              body={t("pages.conference.partnersBody")}
              action={
                <a
                  href={contactHref}
                  className="inline-flex items-center justify-center rounded-full bg-indigo-700 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-indigo-600 dark:bg-indigo-600 dark:hover:bg-indigo-500"
                >
                  {t("pages.conference.partnersCta")}
                </a>
              }
            />
          </div>
        </div>
      </section>

      {/* CTA */}
      <section
        className="relative overflow-hidden bg-linear-to-br from-slate-900 via-indigo-950 to-slate-950"
        aria-labelledby="conference-cta-heading"
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_30%_50%,rgba(129,140,248,0.2),transparent)]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-3xl px-4 py-16 text-center sm:px-6 sm:py-20 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-indigo-300/90">
            {t("pages.conference.ctaEyebrow")}
          </p>
          <h2
            id="conference-cta-heading"
            className="mt-4 font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl"
          >
            {t("pages.conference.ctaTitle")}
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-indigo-100/85">
            {t("pages.conference.ctaBody")}
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={contactHref}
              className="inline-flex items-center justify-center rounded-full bg-white px-6 py-3 text-sm font-semibold text-slate-900 shadow-lg transition hover:bg-indigo-50"
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
