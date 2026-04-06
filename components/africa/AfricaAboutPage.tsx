import Image from "next/image";
import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import { africaStock } from "./africa-stock";

const TICKER_ITEMS = [
  "Pan-African",
  "Youth-Led Research",
  "Community First",
  "Locally Grounded",
  "Evidence-Based",
  "Impact-Oriented",
  "Inclusive Development",
  "Resilient Communities",
];

const STATS = [
  { value: "Pan-African", label: "Regional scope" },
  { value: "8+", label: "Policy frameworks" },
  { value: "4", label: "Core focus areas" },
  { value: "1 mission", label: "Empower & transform" },
] as const;

const VALUES = [
  {
    n: "01",
    label: "Our vision",
    title: "A just, inclusive, resilient Africa",
    body: "A just, inclusive, and resilient Africa where marginalized individuals and communities are empowered through education, research, and community-driven solutions to shape their own development and contribute to sustainable peace and prosperity.",
    span: true,
    dark: true,   // teal background
  },
  {
    n: "02",
    label: "Our mission",
    title: "Skills, research, and care",
    body: "Our mission is to empower individuals with real-life skills, advance inclusive research, and support vulnerable communities.",
    span: false,
    dark: false,
  },
  {
    n: "03",
    label: "Theory of change",
    title: "Youth and communities lead",
    body: "Africa's development is strongest when young people and communities are empowered to solve their own challenges—connecting youth and supporting locally led research.",
    span: false,
    dark: false,
  },
  {
    n: "04",
    label: "Our impact",
    title: "Evidence that improves everyday life",
    body: "Using evidence from communities, research, and lived experiences, we address climate change, insecurity, energy poverty, gender inequality, and food insecurity—strengthening institutions and building resilient communities.",
    span: true,
    dark: false,
    ink: true,    // zinc-900 background
  },
] as const;

const POLICIES = [
  { date: "Aug 23", name: "Finance Management Policy", excerpt: "High standards of financial accountability across all programs." },
  { date: "Aug 23", name: "Anti-racism Policy", excerpt: "Safe, inclusive, respectful environment free from racism in all its forms." },
  { date: "Aug 5", name: "Screening and Background Check Policy", excerpt: "Reliable hiring through thorough candidate screening and verification." },
  { date: "Aug 5", name: "Equity, Diversity, and Inclusion (EDI) Policy", excerpt: "Promoting equity, diversity, and inclusion across all programs." },
  { date: "Aug 5", name: "Anti-corruption and Whistleblowing Policy", excerpt: "Zero tolerance for fraud, bribery, and corruption at every level." },
  { date: "Aug 5", name: "Anti-harassment and Discrimination Policy", excerpt: "A safe, flexible, respectful environment for everyone." },
  { date: "Aug 5", name: "Sexual Exploitation, Abuse, and Harassment (SEAH) Policy", excerpt: "Zero tolerance toward sexual exploitation, abuse, and harassment." },
  { date: "Aug 5", name: "Safeguarding and Protection Policy", excerpt: "Everyone treated with dignity and protected from all forms of harm." },
] as const;

/* ── Ticker strip used twice ──────────────────────────────────────────── */
function TickerStrip({ bg = "bg-teal-600", text = "text-white/75", dot = "bg-white/35" }: {
  bg?: string; text?: string; dot?: string;
}) {
  return (
    <div className={`overflow-hidden ${bg} py-3.5`}>
      <div
        className={`flex whitespace-nowrap animate-[marquee-scroll_32s_linear_infinite]`}
        aria-hidden
      >
        {[0, 1].map((i) => (
          <span key={i} className="flex shrink-0 items-center">
            {TICKER_ITEMS.map((item) => (
              <span key={item} className={`flex items-center gap-5 pr-5 text-[11px] font-semibold uppercase tracking-[0.2em] ${text}`}>
                {item}
                <span className={`h-1 w-1 rounded-full ${dot}`} />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Main component ───────────────────────────────────────────────────── */
export function AfricaAboutPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative isolate overflow-hidden bg-linear-to-br from-teal-950 via-[#0b2d2a] to-zinc-950"
        aria-labelledby="about-heading"
      >
        {/* Dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.055)_1px,transparent_1px)] bg-size-[40px_40px]" />
        {/* Top bloom */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[560px] w-[900px] -translate-x-1/2 rounded-full bg-teal-400/8 blur-[130px]" />
        {/* Side accent */}
        <div aria-hidden className="pointer-events-none absolute -right-32 top-1/4 h-[360px] w-[360px] rounded-full bg-emerald-400/5 blur-[80px]" />
        {/* Concentric rings */}
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-[500px] w-[500px] rounded-full border border-teal-500/8" />
        <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-[360px] w-[360px] rounded-full border border-teal-500/5" />

        <div className="relative mx-auto max-w-7xl px-4 pt-20 pb-16 sm:px-6 sm:pt-24 sm:pb-20 lg:px-8 lg:pt-32 lg:pb-24">
          {/* Eyebrow */}
          <div className="flex items-center gap-3">
            <span className="h-px w-8 bg-teal-500/50" />
            <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-400/80">
              Real Life Research Institute · Africa Programs
            </p>
          </div>

          {/* Main heading */}
          <h1
            id="about-heading"
            className="mt-8 font-black leading-[0.85] tracking-tighter"
            style={{ fontSize: "clamp(4rem, 13vw, 10rem)" }}
          >
            <span className="block text-white">About</span>
            <span className="block bg-linear-to-r from-teal-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
              Us.
            </span>
          </h1>

          {/* Bottom row: tagline + stat pills */}
          <div className="mt-10 flex flex-col gap-8 sm:flex-row sm:items-end sm:justify-between">
            <p className="max-w-xs text-base leading-relaxed text-zinc-400">
              Pan-African programs that connect youth, researchers, and communities—grounded in local knowledge and practical impact.
            </p>

            <div className="flex flex-wrap gap-x-8 gap-y-5">
              {STATS.map(({ value, label }) => (
                <div key={value} className="flex flex-col border-l-2 border-teal-700/60 pl-4">
                  <span className="text-lg font-extrabold tracking-tight text-white">{value}</span>
                  <span className="text-[11px] text-zinc-500">{label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Ticker strip */}
        <TickerStrip bg="border-t border-teal-800/50 bg-teal-950/60" text="text-teal-400/60" dot="bg-teal-700/60" />
      </section>

      {/* ══════════════════════════════════════════════════════
          NUMBERS STRIP
      ══════════════════════════════════════════════════════ */}
      <div className="border-b border-teal-100/70 bg-[#f0f7f5] dark:border-zinc-800/50 dark:bg-zinc-900/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <dl className="grid grid-cols-2 divide-x divide-teal-100/80 dark:divide-zinc-800/60 lg:grid-cols-4">
            {STATS.map(({ value, label }) => (
              <div key={value} className="px-6 py-7 first:pl-0 last:pr-0 lg:px-8">
                <dt className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-700/70 dark:text-teal-400/60">
                  {label}
                </dt>
                <dd className="mt-2 text-2xl font-black tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                  {value}
                </dd>
              </div>
            ))}
          </dl>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          WHO WE ARE
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#f7faf9] py-24 dark:bg-zinc-950 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_400px] xl:grid-cols-[1fr_440px] xl:gap-24">

            {/* ── Copy ── */}
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
                Who we are
              </p>
              <h2 className="mt-5 font-black leading-[1.02] tracking-tight text-zinc-900 dark:text-zinc-50"
                  style={{ fontSize: "clamp(2.25rem, 5vw, 3.5rem)" }}>
                Rooted in community,{" "}
                <em className="not-italic text-teal-600 dark:text-teal-400">built for impact.</em>
              </h2>

              <div className="mt-10 space-y-5 text-[1.025rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
                <p>
                  The Real Life Research Institute – Africa Programs shares the same vision as its parent organization,{" "}
                  <Link
                    href={africaRoutes.institute}
                    className="font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
                  >
                    Real Life Research Institute
                  </Link>
                  , to empower marginalized individuals and communities through education, research, and community-driven solutions.
                </p>
                <p>
                  Rooted in a Pan-African approach, our work connects youth, researchers, and communities across the continent to generate locally grounded knowledge and practical impact.
                </p>
                <p>
                  Our approach centers African voices, values local knowledge, and ensures that research is not only produced, but used—to inform policies, strengthen institutions, and improve everyday lives.
                </p>
              </div>

              {/* Pull-quote card */}
              <div className="mt-10 flex gap-4 rounded-2xl border border-teal-200/60 bg-white px-6 py-5 shadow-sm shadow-teal-900/5 dark:border-teal-800/50 dark:bg-zinc-900">
                <div className="mt-0.5 shrink-0">
                  <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-teal-600 text-white">
                    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor">
                      <path d="M3.5 6.5A3.5 3.5 0 0 1 7 3v1.5A2 2 0 0 0 5 6.5v.25a.75.75 0 0 0 .75.75H7v3H3.5V6.5Zm5.5 0A3.5 3.5 0 0 1 12.5 3V4.5A2 2 0 0 0 10.5 6.5v.25a.75.75 0 0 0 .75.75H13v3H9V6.5Z" />
                    </svg>
                  </div>
                </div>
                <div>
                  <p className="text-base font-semibold leading-snug text-zinc-800 dark:text-zinc-100">
                    Research is not only produced, but used—to strengthen institutions and improve everyday lives.
                  </p>
                  <p className="mt-1.5 text-xs font-medium text-zinc-400 dark:text-zinc-500">Core principle · RLRI Africa Programs</p>
                </div>
              </div>
            </div>

            {/* ── Image frame ── */}
            <div className="relative mx-auto w-full max-w-[420px] lg:mx-0">
              {/* Teal glow behind the image */}
              <div aria-hidden className="pointer-events-none absolute -inset-4 rounded-[2.5rem] bg-teal-400/10 blur-2xl" />

              <div className="relative aspect-3/4 overflow-hidden rounded-4xl shadow-[0_32px_80px_-20px_rgba(13,148,136,0.3)]">
                <Image
                  src={africaStock.programs[1].src}
                  alt={africaStock.programs[1].alt}
                  fill
                  className="object-cover transition duration-700 hover:scale-[1.04]"
                  sizes="(max-width: 1024px) 100vw, 440px"
                  priority
                />
                <div className="absolute inset-0 bg-linear-to-t from-teal-950/65 via-teal-950/10 to-transparent" aria-hidden />

                {/* Caption overlay */}
                <div className="absolute bottom-0 left-0 right-0 p-6">
                  <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-300/80">
                    Community first
                  </p>
                  <p className="mt-1 text-sm font-medium leading-snug text-white/90">
                    Locally grounded knowledge, practical impact
                  </p>
                </div>
              </div>

              {/* Glassmorphism floating card */}
              <div className="absolute -left-6 top-12 rounded-2xl border border-white/80 bg-white/90 px-4 py-3.5 shadow-xl shadow-zinc-900/10 backdrop-blur-xl dark:border-zinc-700/80 dark:bg-zinc-900/90 sm:-left-10">
                <div className="flex items-center gap-3">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-teal-600 text-white">
                    <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                      <path d="M9 6a3 3 0 11-6 0 3 3 0 016 0zM17 6a3 3 0 11-6 0 3 3 0 016 0zM12.93 17c.046-.327.07-.66.07-1a6.97 6.97 0 00-1.5-4.33A5 5 0 0119 16v1h-6.07zM6 11a5 5 0 015 5v1H1v-1a5 5 0 015-5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs font-bold text-zinc-900 dark:text-zinc-50">Pan-African</p>
                    <p className="text-[11px] text-zinc-400 dark:text-zinc-500">Community network</p>
                  </div>
                </div>
              </div>

              {/* Live pulse badge */}
              <div className="absolute -bottom-3 -right-3 flex items-center gap-2 rounded-full bg-teal-600 py-2 pl-3 pr-4 text-[11px] font-bold text-white shadow-lg shadow-teal-900/30">
                <span className="relative flex h-2 w-2">
                  <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-teal-300 opacity-75" />
                  <span className="relative inline-flex h-2 w-2 rounded-full bg-teal-200" />
                </span>
                Impact-oriented
              </div>

              {/* Decorative rings */}
              <div aria-hidden className="absolute -right-5 -top-5 h-28 w-28 rounded-full border-2 border-teal-200/50" />
              <div aria-hidden className="absolute -right-2 -top-2 h-16 w-16 rounded-full border border-teal-300/30" />
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          VALUES — BENTO GRID
      ══════════════════════════════════════════════════════ */}
      <section className="bg-white py-24 dark:bg-zinc-950 lg:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {/* Header row */}
          <div className="mb-14 flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
                Our value
              </p>
              <h2 className="mt-4 font-black tracking-tight text-zinc-900 dark:text-zinc-50"
                  style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)" }}>
                What sets us apart
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400 lg:text-right">
              Four pillars that define our approach to research, community, and lasting change.
            </p>
          </div>

          {/* Bento */}
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">

            {/* 01 Vision — teal, spans 2 on lg */}
            <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-teal-600 to-teal-800 p-8 sm:col-span-2 sm:p-10 lg:col-span-2">
              <div aria-hidden className="pointer-events-none absolute -right-10 -top-10 h-52 w-52 rounded-full bg-white/5" />
              <div aria-hidden className="pointer-events-none absolute bottom-8 right-16 h-28 w-28 rounded-full bg-white/5" />
              <span className="block select-none font-black leading-none text-white/10"
                    style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}>
                01
              </span>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-200">
                Our vision
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                A just, inclusive, resilient Africa
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-teal-100/75">
                A just, inclusive, and resilient Africa where marginalized individuals and communities are empowered through education, research, and community-driven solutions to shape their own development and contribute to sustainable peace and prosperity.
              </p>
            </div>

            {/* 02 Mission */}
            <div className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-50/80 p-8 transition duration-300 hover:border-teal-200 hover:bg-white hover:shadow-xl hover:shadow-zinc-900/6 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-teal-800/60 dark:hover:bg-zinc-800/80">
              <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 rounded-full bg-teal-50 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:bg-teal-900/30" />
              <span className="block select-none font-black leading-none text-zinc-100 transition-colors duration-300 group-hover:text-teal-100/80 dark:text-zinc-800 dark:group-hover:text-teal-900/50"
                    style={{ fontSize: "clamp(4rem, 8vw, 6rem)" }}>
                02
              </span>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
                Our mission
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Skills, research, and care
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Empower individuals with real-life skills, advance inclusive research, and support vulnerable communities.
              </p>
              <div aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 bg-teal-500 transition-all duration-500 group-hover:w-full" />
            </div>

            {/* 03 Theory */}
            <div className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-zinc-50/80 p-8 transition duration-300 hover:border-teal-200 hover:bg-white hover:shadow-xl hover:shadow-zinc-900/6 dark:border-zinc-800/80 dark:bg-zinc-900/60 dark:hover:border-teal-800/60 dark:hover:bg-zinc-800/80">
              <div aria-hidden className="pointer-events-none absolute bottom-0 right-0 h-32 w-32 rounded-full bg-teal-50 blur-2xl opacity-0 transition-opacity duration-500 group-hover:opacity-100 dark:bg-teal-900/30" />
              <span className="block select-none font-black leading-none text-zinc-100 transition-colors duration-300 group-hover:text-teal-100/80 dark:text-zinc-800 dark:group-hover:text-teal-900/50"
                    style={{ fontSize: "clamp(4rem, 8vw, 6rem)" }}>
                03
              </span>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
                Theory of change
              </p>
              <h3 className="mt-2 text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">
                Youth and communities lead
              </h3>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Africa&apos;s development is strongest when young people and communities are empowered to solve their own challenges through locally led research.
              </p>
              <div aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 bg-teal-500 transition-all duration-500 group-hover:w-full" />
            </div>

            {/* 04 Impact — dark, spans 2 on lg */}
            <div className="relative overflow-hidden rounded-3xl bg-zinc-900 p-8 sm:col-span-2 sm:p-10 lg:col-span-2">
              <div aria-hidden className="pointer-events-none absolute -left-10 bottom-0 h-52 w-52 rounded-full bg-teal-500/10 blur-[60px]" />
              <div aria-hidden className="pointer-events-none absolute right-10 top-10 h-28 w-28 rounded-full bg-teal-500/5 blur-2xl" />
              <span className="block select-none font-black leading-none text-white/8"
                    style={{ fontSize: "clamp(4rem, 10vw, 7rem)" }}>
                04
              </span>
              <p className="mt-3 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-400">
                Our impact
              </p>
              <h3 className="mt-2 text-2xl font-bold tracking-tight text-white sm:text-3xl">
                Evidence that improves everyday life
              </h3>
              <p className="mt-4 max-w-lg text-sm leading-relaxed text-zinc-400">
                Using evidence from communities, research, and lived experiences, we address climate change, insecurity, energy poverty, gender inequality, and food insecurity—strengthening institutions and building resilient communities.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          MARQUEE STRIP (teal)
      ══════════════════════════════════════════════════════ */}
      <TickerStrip bg="bg-teal-600" text="text-white/70" dot="bg-white/30" />

      {/* ══════════════════════════════════════════════════════
          IMAGE BAND
      ══════════════════════════════════════════════════════ */}
      <div className="relative h-[45vh] min-h-[300px] max-h-[460px] overflow-hidden">
        <Image
          src={africaStock.hero.src}
          alt={africaStock.hero.alt}
          fill
          className="object-cover object-center"
          sizes="100vw"
        />
        {/* Gradient overlay left-to-right */}
        <div className="absolute inset-0 bg-linear-to-r from-zinc-950/90 via-zinc-950/55 to-zinc-950/10" aria-hidden />
        {/* Bottom vignette */}
        <div className="absolute inset-x-0 bottom-0 h-24 bg-linear-to-t from-zinc-950/40 to-transparent" aria-hidden />

        <div className="relative flex h-full w-full items-center">
          <div className="mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
            <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-400">
              Our commitment
            </p>
            <p className="mt-3 max-w-xl font-bold leading-tight text-white"
               style={{ fontSize: "clamp(1.75rem, 5vw, 3.25rem)" }}>
              Empowering young minds,{" "}
              <span className="text-teal-300">building brighter futures.</span>
            </p>
          </div>
        </div>
      </div>

      {/* ══════════════════════════════════════════════════════
          POLICIES
      ══════════════════════════════════════════════════════ */}
      <section id="policies" className="relative isolate overflow-hidden bg-[#f2f8f6] py-24 dark:bg-zinc-900 lg:py-32">
        {/* Soft background blooms */}
        <div aria-hidden className="pointer-events-none absolute -left-32 -top-32 h-[500px] w-[500px] rounded-full bg-teal-200/20 blur-[100px] dark:bg-teal-900/15" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -right-32 h-[500px] w-[500px] rounded-full bg-emerald-200/20 blur-[100px] dark:bg-emerald-900/12" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* ── Header ── */}
          <div className="mb-14 grid gap-8 lg:grid-cols-[1fr_320px] lg:items-end">
            <div>
              <div className="flex items-center gap-3">
                <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-400">
                  Policies
                </p>
                <span className="rounded-full border border-teal-200 bg-teal-100 px-2.5 py-0.5 text-[11px] font-bold text-teal-700 dark:border-teal-800/60 dark:bg-teal-900/40 dark:text-teal-400">
                  {String(POLICIES.length).padStart(2, "0")}
                </span>
              </div>
              <h2
                className="mt-4 font-black tracking-tight text-zinc-900 dark:text-zinc-50"
                style={{ fontSize: "clamp(2.25rem, 5vw, 3.25rem)" }}
              >
                Policies that put{" "}
                <span className="bg-linear-to-r from-teal-600 to-emerald-600 bg-clip-text text-transparent dark:from-teal-400 dark:to-emerald-400">
                  community first.
                </span>
              </h2>
            </div>
            <p className="max-w-xs text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
              Our policies reflect the values we live by. Summaries and policy themes are listed below; contact us for full policy documents.
            </p>
          </div>

          {/* ── Card grid ── */}
          <ul className="grid gap-4 sm:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4">
            {POLICIES.map(({ date, name, excerpt }, i) => (
              <li key={name} className="flex">
                <Link
                  href={africaRoutes.aboutPolicies}
                  className="group relative flex w-full flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm shadow-zinc-900/4 transition duration-300 hover:-translate-y-1 hover:border-teal-300/70 hover:shadow-xl hover:shadow-teal-900/10 dark:border-zinc-800/80 dark:bg-zinc-950 dark:hover:border-teal-800/60"
                >
                  {/* Decorative number watermark */}
                  <span
                    className="pointer-events-none absolute right-4 top-3 select-none font-black leading-none text-zinc-100 transition-colors duration-300 group-hover:text-teal-100/80 dark:text-zinc-800 dark:group-hover:text-teal-900/50"
                    style={{ fontSize: "clamp(3.5rem, 6vw, 5rem)" }}
                    aria-hidden
                  >
                    {String(i + 1).padStart(2, "0")}
                  </span>

                  {/* Top: date badge */}
                  <span className="inline-flex w-fit rounded-full bg-zinc-100 px-2.5 py-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-zinc-500 transition-colors group-hover:bg-teal-50 group-hover:text-teal-700 dark:bg-zinc-800 dark:text-zinc-400 dark:group-hover:bg-teal-900/40 dark:group-hover:text-teal-400">
                    {date}
                  </span>

                  {/* Shield icon */}
                  <div className="mt-5 flex h-10 w-10 items-center justify-center rounded-2xl bg-teal-50 text-teal-600 ring-1 ring-teal-200/60 transition group-hover:bg-teal-600 group-hover:text-white group-hover:ring-teal-600 dark:bg-teal-900/40 dark:text-teal-400 dark:ring-teal-800/50 dark:group-hover:bg-teal-600 dark:group-hover:text-white dark:group-hover:ring-teal-600">
                    <svg className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor" aria-hidden>
                      <path fillRule="evenodd" d="M9.661 2.237a.531.531 0 0 1 .678 0 11.947 11.947 0 0 0 7.078 2.749.5.5 0 0 1 .479.425c.069.52.104 1.05.104 1.589 0 5.162-3.26 9.563-7.834 11.256a.48.48 0 0 1-.332 0C5.26 16.563 2 12.162 2 7a11.973 11.973 0 0 1 .104-1.589.5.5 0 0 1 .48-.425 11.947 11.947 0 0 0 7.077-2.749Zm4.196 5.954a.75.75 0 0 0-1.214-.882l-3.483 4.79-1.88-1.88a.75.75 0 1 0-1.06 1.061l2.5 2.5a.75.75 0 0 0 1.137-.089l4-5.5Z" clipRule="evenodd" />
                    </svg>
                  </div>

                  {/* Name */}
                  <h3 className="relative mt-4 text-sm font-bold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-teal-800 dark:text-zinc-50 dark:group-hover:text-teal-300">
                    {name}
                  </h3>

                  {/* Excerpt */}
                  <p className="mt-2 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                    {excerpt}
                  </p>

                  {/* Bottom CTA */}
                  <div className="mt-5 flex items-center gap-1.5 text-xs font-semibold text-teal-700 transition-colors group-hover:text-teal-800 dark:text-teal-400 dark:group-hover:text-teal-300">
                    Read policy
                    <svg className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-0.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>

                  {/* Bottom accent line */}
                  <div aria-hidden className="absolute bottom-0 left-0 h-[2px] w-0 bg-linear-to-r from-teal-500 to-emerald-500 transition-all duration-500 group-hover:w-full" />
                </Link>
              </li>
            ))}
          </ul>

        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-teal-700 via-teal-600 to-emerald-600 py-24 lg:py-32">
        {/* Dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[32px_32px]" />
        {/* Glows */}
        <div aria-hidden className="pointer-events-none absolute -right-48 -top-48 h-[560px] w-[560px] rounded-full bg-white/5 blur-[80px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-48 -left-48 h-[560px] w-[560px] rounded-full bg-teal-900/40 blur-[80px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-[1fr_380px]">

            {/* Left: text + CTAs */}
            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-200/70">
                Get involved
              </p>
              <h2
                className="mt-5 font-black leading-[0.9] tracking-tighter text-white"
                style={{ fontSize: "clamp(3rem, 8vw, 5.5rem)" }}
              >
                Work<br />with us.
              </h2>
              <p className="mt-6 max-w-md text-lg leading-relaxed text-teal-100/70">
                Explore programs, upcoming events, or reach out to collaborate on research and community-driven solutions across Africa.
              </p>
              <div className="mt-10 flex flex-wrap gap-4">
                <Link
                  href={africaRoutes.home}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-white px-8 text-sm font-bold text-teal-800 shadow-2xl shadow-teal-900/20 transition hover:bg-teal-50"
                >
                  Back to home
                </Link>
                <Link
                  href={africaRoutes.donate}
                  className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/30 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Get involved
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
                <a
                  href="mailto:contact-africa@reallifeinstitute.org"
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-white/30 bg-white/10 px-7 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/20"
                >
                  Contact us
                </a>
              </div>
            </div>

            {/* Right: decorative feature mini-cards */}
            <div className="hidden lg:block">
              <div className="grid grid-cols-2 gap-3">
                {(
                  [
                    { title: "Education", desc: "Empowering through learning", icon: "📚" },
                    { title: "Research", desc: "Evidence-based solutions", icon: "🔬" },
                    { title: "Community", desc: "Locally grounded impact", icon: "🤝" },
                    { title: "Policy", desc: "Driving systemic change", icon: "📋" },
                  ] as const
                ).map(({ title, desc, icon }) => (
                  <div
                    key={title}
                    className="rounded-2xl border border-white/15 bg-white/8 p-5 backdrop-blur-sm transition hover:bg-white/12"
                  >
                    <span className="text-2xl" aria-hidden>{icon}</span>
                    <p className="mt-3 font-bold text-white">{title}</p>
                    <p className="mt-1 text-xs text-teal-200/60">{desc}</p>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
