import type { Locale } from "@/lib/i18n/config";
import { getTranslator } from "@/lib/i18n/translate";
import { mainEmails } from "@/lib/main-routes";

type Props = { locale: Locale };

function CardIcon({ variant }: { variant: "impact" | "experience" | "belonging" }) {
  if (variant === "experience") {
    return (
      <svg className="size-7 text-teal-700 dark:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M4 18h16M6 18V9l6-4 6 4v9M9 18v-5h6v5" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  if (variant === "belonging") {
    return (
      <svg className="size-7 text-teal-700 dark:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
        <path d="M16 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2M9.5 11a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7ZM21 21v-2a4 4 0 0 0-3-3.87M14.5 4.13a3.5 3.5 0 0 1 0 6.74" strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  }
  return (
    <svg className="size-7 text-teal-700 dark:text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" aria-hidden>
      <path d="M7 4h10a2 2 0 0 1 2 2v12l-4-3-4 3-4-3-4 3V6a2 2 0 0 1 2-2h2Z" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

function VolunteerHeroIsographic() {
  return (
    <div className="relative aspect-4/3 overflow-hidden rounded-3xl bg-linear-to-br from-sky-50 via-white to-violet-50 shadow-[0_28px_70px_-30px_rgba(15,23,42,0.35)] ring-1 ring-zinc-900/5 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 dark:ring-white/10">
      <div className="pointer-events-none absolute inset-0 opacity-70 bg-[radial-gradient(circle_at_18%_20%,rgba(20,184,166,0.14),transparent_26%),radial-gradient(circle_at_78%_75%,rgba(99,102,241,0.14),transparent_30%)]" aria-hidden />
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 720 540" fill="none" aria-hidden>
        <ellipse cx="490" cy="285" rx="190" ry="155" fill="#E9EAFB" />
        <ellipse cx="490" cy="460" rx="250" ry="44" fill="#DCE0EF" />

        <g transform="translate(350 235)">
          <rect x="0" y="142" width="58" height="120" rx="14" fill="#7C3AED" />
          <rect x="58" y="170" width="28" height="92" rx="12" fill="#6D28D9" />
          <rect x="14" y="88" width="30" height="70" rx="14" fill="#F59E0B" />
          <circle cx="29" cy="72" r="22" fill="#F8B4A0" />
          <path d="M6 140c16-26 38-26 52 0" stroke="#0F766E" strokeWidth="10" strokeLinecap="round" />
        </g>

        <g transform="translate(458 220)">
          <rect x="0" y="152" width="62" height="110" rx="14" fill="#2563EB" />
          <rect x="18" y="90" width="26" height="78" rx="13" fill="#22D3EE" />
          <circle cx="31" cy="72" r="22" fill="#F6C2A9" />
          <path d="M7 138c18-30 40-30 48 0" stroke="#14B8A6" strokeWidth="10" strokeLinecap="round" />
        </g>

        <g transform="translate(562 246)">
          <rect x="0" y="152" width="60" height="108" rx="14" fill="#F97316" />
          <rect x="16" y="94" width="28" height="72" rx="12" fill="#FACC15" />
          <circle cx="30" cy="74" r="22" fill="#F3B79B" />
          <path d="M7 140c16-28 38-28 46 0" stroke="#0EA5E9" strokeWidth="10" strokeLinecap="round" />
        </g>

        <text x="372" y="165" fill="#312E81" fontSize="56" fontWeight="700" letterSpacing="6">VOLUNTEERS</text>
      </svg>
    </div>
  );
}

function VolunteerApplyIsographic() {
  return (
    <div className="relative aspect-5/4 overflow-hidden rounded-3xl bg-linear-to-br from-zinc-50 via-white to-teal-50 shadow-[0_28px_70px_-30px_rgba(15,23,42,0.35)] ring-1 ring-zinc-900/5 dark:from-zinc-900 dark:via-zinc-900 dark:to-zinc-800 dark:ring-white/10">
      <svg className="absolute inset-0 h-full w-full" viewBox="0 0 760 600" fill="none" aria-hidden>
        <ellipse cx="520" cy="520" rx="220" ry="46" fill="#DDE3EF" />

        <rect x="300" y="180" width="196" height="132" rx="16" fill="#EEF2FF" />
        <rect x="328" y="212" width="140" height="16" rx="8" fill="#C7D2FE" />
        <rect x="328" y="242" width="110" height="16" rx="8" fill="#DBEAFE" />
        <rect x="328" y="272" width="82" height="16" rx="8" fill="#E0F2FE" />

        <g transform="translate(436 258)">
          <rect x="0" y="88" width="78" height="170" rx="18" fill="#1D4ED8" />
          <rect x="0" y="88" width="34" height="170" rx="16" fill="#2563EB" />
          <circle cx="39" cy="52" r="28" fill="#F8B4A0" />
          <path d="M10 118h58l-4 36H14l-4-36Z" fill="#0F172A" />
          <rect x="30" y="118" width="18" height="118" rx="8" fill="#F8FAFC" />
        </g>

        <g transform="translate(322 228)">
          <rect x="0" y="112" width="84" height="150" rx="20" fill="#DC2626" />
          <rect x="18" y="78" width="48" height="82" rx="16" fill="#F8FAFC" />
          <circle cx="42" cy="52" r="30" fill="#F3C0A4" />
          <path d="M8 134h68l-4 26H12l-4-26Z" fill="#0F766E" />
          <path d="M42 142v120" stroke="#2563EB" strokeWidth="16" strokeLinecap="round" />
        </g>

        <ellipse cx="280" cy="514" rx="42" ry="22" fill="#A7F3D0" />
        <path d="M266 514c0-30 30-52 30-90" stroke="#16A34A" strokeWidth="6" strokeLinecap="round" />
        <path d="M292 514c0-24-28-44-28-74" stroke="#059669" strokeWidth="6" strokeLinecap="round" />
      </svg>
    </div>
  );
}

export async function MainVolunteerPage({ locale }: Props) {
  const t = await getTranslator(locale);

  const cards = [
    {
      key: "impact" as const,
      title: t("pages.volunteer.impactTitle"),
      body: t("pages.volunteer.impactBody"),
    },
    {
      key: "experience" as const,
      title: t("pages.volunteer.experienceTitle"),
      body: t("pages.volunteer.experienceBody"),
    },
    {
      key: "belonging" as const,
      title: t("pages.volunteer.belongingTitle"),
      body: t("pages.volunteer.belongingBody"),
    },
  ];

  return (
    <div className="bg-[#f7faf9] dark:bg-zinc-950">
      <section className="relative overflow-hidden border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950" aria-labelledby="volunteer-hero-heading">
        <div className="pointer-events-none absolute inset-0 opacity-50 bg-[radial-gradient(circle_at_12%_20%,rgba(20,184,166,0.10),transparent_24%),radial-gradient(circle_at_70%_76%,rgba(168,85,247,0.09),transparent_22%)]" aria-hidden />
        <div className="mx-auto grid max-w-7xl gap-10 px-4 py-16 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8 lg:py-20">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-400">
              {t("pages.volunteer.heroEyebrow")}
            </p>
            <h1 id="volunteer-hero-heading" className="mt-4 font-serif text-4xl font-semibold leading-[1.08] tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
              {t("pages.volunteer.heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("pages.volunteer.heroBody")}
            </p>
            <a
              href={`mailto:${mainEmails.jobsHr}`}
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-teal-700 px-9 text-sm font-bold uppercase tracking-[0.14em] text-white shadow-lg shadow-teal-950/20 transition hover:-translate-y-0.5 hover:bg-teal-600"
            >
              {t("pages.volunteer.applyNow")}
            </a>
          </div>

          <div className="relative">
            <VolunteerHeroIsographic />
          </div>
        </div>
      </section>

      <section className="relative border-b border-zinc-200/80 bg-[#f7faf9] py-14 dark:border-zinc-800 dark:bg-zinc-950 sm:py-16 lg:py-20" aria-labelledby="volunteer-benefits-heading">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 id="volunteer-benefits-heading" className="sr-only">{t("pages.volunteer.benefitsHeading")}</h2>
          <div className="grid gap-5 md:grid-cols-3">
            {cards.map((card) => (
              <article key={card.key} className="rounded-2xl border border-zinc-200/80 bg-white p-7 text-center shadow-sm transition hover:-translate-y-0.5 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/60">
                <div className="mx-auto flex size-12 items-center justify-center rounded-xl bg-teal-50 ring-1 ring-teal-600/20 dark:bg-teal-950/50 dark:ring-teal-500/30">
                  <CardIcon variant={card.key} />
                </div>
                <h3 className="mt-5 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">{card.title}</h3>
                <p className="mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">{card.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="relative bg-white py-14 dark:bg-zinc-950 sm:py-16 lg:py-20" aria-labelledby="volunteer-apply-heading">
        <div className="mx-auto grid max-w-7xl gap-10 px-4 sm:px-6 lg:grid-cols-2 lg:items-center lg:gap-14 lg:px-8">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-400">
              {t("pages.volunteer.applyLabel")}
            </p>
            <h2 id="volunteer-apply-heading" className="mt-4 font-serif text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl dark:text-zinc-50">
              {t("pages.volunteer.applyTitle")}
            </h2>
            <p className="mt-6 max-w-xl text-[17px] leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("pages.volunteer.applyBody")}
            </p>
            <a
              href={`mailto:${mainEmails.jobsHr}`}
              className="mt-8 inline-flex min-h-12 items-center justify-center rounded-full bg-amber-400 px-9 text-sm font-bold uppercase tracking-[0.14em] text-zinc-900 shadow-md transition hover:-translate-y-0.5 hover:bg-amber-300"
            >
              {t("pages.volunteer.applyNow")}
            </a>
          </div>

          <div className="relative">
            <VolunteerApplyIsographic />
          </div>
        </div>
      </section>
    </div>
  );
}
