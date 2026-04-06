import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import { EventCountdown } from "./EventCountdown";

/* ── Data ─────────────────────────────────────────────────────────── */

const FEATURED = {
  title: "Tensions in the Middle East: Implications for African Economies, Security, and Politics",
  description:
    "This webinar examines how escalating tensions in the Middle East are affecting African economies, regional security, and global trade routes. Experts will explore the economic impact of disrupted maritime corridors, regional political dynamics, and the consequences for African migrant workers in the Gulf.",
  day: "27",
  month: "APR",
  year: "2026",
  time: "9:00 – 10:30 AM EST",
  format: "Online Webinar",
  /** ISO string used by the countdown timer */
  isoDate: "2026-04-27T09:00:00-05:00",
  href: africaRoutes.events,
  /**
   * Registration link — set to a URL string to enable the "Register Now" button.
   * Leave as null to show a "Registration Coming Soon" state instead.
   */
  registerHref: null as string | null,
} as const;

const PAST_EVENTS = [
  {
    title: "Closing the Justice Gap: Strengthening Legal Protection Systems for Women and Girls in Africa",
    description:
      "This webinar explored why progressive legal frameworks across Africa often fail to translate into real justice for women and girls, examining institutional weaknesses, gender-responsive budgeting, survivor support systems, and accountability mechanisms.",
    day: "27",
    month: "MAR",
    year: "2026",
    format: "Online Webinar",
    tags: ["Gender Justice", "Legal Frameworks"],
    accent: "from-violet-700 to-violet-900",
    accentLight: "text-violet-300",
    href: africaRoutes.events,
    cta: "Read More" as const,
    /**
     * Recording / recap link for past events.
     * Set to a URL string to enable the "Watch Recording" button.
     */
    recordingHref: null as string | null,
  },
  {
    title: "Assuring Sustainable Water Availability and Safe Sanitation Systems in Africa",
    description:
      "This Pan-African webinar brought together researchers, policy practitioners, and civil society actors to discuss governance, sustainability, and financing challenges affecting water availability and sanitation systems across Africa.",
    day: "—",
    month: "2025",
    year: "",
    format: "Pan-African Webinar",
    tags: ["Water & Sanitation", "Governance"],
    accent: "from-sky-700 to-sky-900",
    accentLight: "text-sky-300",
    href: africaRoutes.events,
    cta: "Watch Webinar" as const,
    /** Recording link — set this to the webinar replay URL */
    recordingHref: null as string | null,
  },
] as const;

const TICKER_ITEMS = [
  { label: "Upcoming Webinars", color: "text-amber-400/80" },
  { label: "Research Events", color: "text-teal-400/70" },
  { label: "Policy Dialogues", color: "text-emerald-400/70" },
  { label: "Community Engagements", color: "text-amber-400/80" },
  { label: "Pan-African Conferences", color: "text-teal-400/70" },
  { label: "Youth Forums", color: "text-emerald-400/70" },
  { label: "Expert Panels", color: "text-amber-400/80" },
];

/* ── Starburst SVG ────────────────────────────────────────────────── */
function Starburst({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {Array.from({ length: 8 }).map((_, i) => {
        const angle = (i * Math.PI * 2) / 8;
        const x2 = 40 + 38 * Math.cos(angle);
        const y2 = 40 + 38 * Math.sin(angle);
        return (
          <line
            key={i}
            x1="40" y1="40"
            x2={x2} y2={y2}
            stroke="currentColor"
            strokeWidth="2.5"
            strokeLinecap="round"
          />
        );
      })}
      <circle cx="40" cy="40" r="6" fill="currentColor" />
    </svg>
  );
}

/* ── Ticker strip ─────────────────────────────────────────────────── */
function TickerStrip() {
  return (
    <div className="overflow-hidden border-t border-teal-800/50 bg-teal-950/60 py-3.5">
      <div
        className="flex whitespace-nowrap animate-[marquee-scroll_32s_linear_infinite]"
        aria-hidden
      >
        {[0, 1].map((row) => (
          <span key={row} className="flex shrink-0 items-center">
            {TICKER_ITEMS.map(({ label, color }, i) => (
              <span
                key={`${row}-${i}`}
                className={`flex items-center gap-5 pr-5 text-[11px] font-semibold uppercase tracking-[0.2em] ${color}`}
              >
                {label}
                <span className="h-1 w-1 rounded-full bg-amber-500/40" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────────── */
export function AfricaEventsPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative isolate overflow-hidden bg-linear-to-br from-teal-950 via-[#0b2d2a] to-zinc-950"
        aria-labelledby="events-heading"
      >
        {/* Dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[40px_40px]" />
        {/* Blooms */}
        <div aria-hidden className="pointer-events-none absolute left-1/4 top-0 h-[500px] w-[700px] -translate-x-1/2 rounded-full bg-teal-400/8 blur-[130px]" />
        <div aria-hidden className="pointer-events-none absolute right-0 top-0 h-[500px] w-[500px] rounded-full bg-amber-400/6 blur-[120px]" />
        <div aria-hidden className="pointer-events-none absolute bottom-0 left-0 h-[300px] w-[400px] rounded-full bg-emerald-400/5 blur-[100px]" />

        {/* Rings */}
        <div aria-hidden className="pointer-events-none absolute -right-12 -top-12 h-[380px] w-[380px] rounded-full border border-amber-400/8" />
        <div aria-hidden className="pointer-events-none absolute -left-20 -bottom-20 h-[320px] w-[320px] rounded-full border border-teal-500/6" />

        {/* Scattered starbursts */}
        <Starburst className="pointer-events-none absolute left-[6%] top-20 h-10 w-10 rotate-12 text-amber-400/15" />
        <Starburst className="pointer-events-none absolute left-[8%] bottom-16 h-6 w-6 -rotate-6 text-teal-400/15" />
        <Starburst className="pointer-events-none absolute left-[40%] bottom-8 h-5 w-5 rotate-30 text-emerald-400/12" />

        {/* Scattered dots */}
        {[
          "left-[16%] top-14 h-2.5 w-2.5 bg-amber-400/35",
          "left-[30%] top-24 h-1.5 w-1.5 bg-emerald-400/30",
          "left-[52%] top-10 h-2 w-2 bg-teal-300/25",
          "left-[22%] bottom-16 h-3 w-3 bg-amber-300/25",
          "left-[45%] bottom-10 h-1.5 w-1.5 bg-emerald-300/20",
        ].map((cls, i) => (
          <div key={i} aria-hidden className={`pointer-events-none absolute rounded-full ${cls}`} />
        ))}

        <div className="relative mx-auto max-w-7xl px-4 pb-0 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="grid items-center gap-12 pb-16 sm:pb-20 lg:grid-cols-[1fr_380px] lg:gap-16 lg:pb-24 xl:grid-cols-[1fr_420px]">

            {/* ── Left: copy ── */}
            <div>
              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span className="flex items-center gap-2 rounded-full border border-amber-400/30 bg-amber-400/10 px-3.5 py-1.5">
                  <span className="relative flex h-1.5 w-1.5">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-amber-400" />
                  </span>
                  <span className="text-[10px] font-bold uppercase tracking-[0.28em] text-amber-300">
                    Live Events &amp; Webinars
                  </span>
                </span>
              </div>

              {/* Heading */}
              <h1
                id="events-heading"
                className="mt-7 font-black leading-[0.88] tracking-tighter"
                style={{ fontSize: "clamp(4rem, 10vw, 8rem)" }}
              >
                <span className="block text-white">Africa</span>
                <span className="block bg-linear-to-r from-amber-300 via-yellow-200 to-amber-300 bg-clip-text text-transparent">
                  Events.
                </span>
              </h1>

              {/* Tagline */}
              <p className="mt-7 max-w-sm text-base leading-relaxed text-zinc-400">
                Bringing together researchers, policy leaders, and communities to tackle Africa&apos;s development challenges through dialogue, evidence, and collective action.
              </p>

              {/* Mini stats */}
              <div className="mt-8 flex flex-wrap gap-3">
                {[
                  { n: "1", label: "Upcoming event" },
                  { n: "2+", label: "Past webinars" },
                  { n: "Pan-African", label: "Audience" },
                ].map(({ n, label }) => (
                  <div key={label} className="flex items-center gap-2 rounded-xl border border-white/8 bg-white/5 px-4 py-2.5">
                    <span className="text-base font-black text-white">{n}</span>
                    <span className="text-[11px] text-zinc-500">{label}</span>
                  </div>
                ))}
              </div>

              {/* CTAs */}
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href="#upcoming"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-400 px-6 text-sm font-bold text-amber-950 shadow-lg shadow-amber-900/20 transition hover:bg-amber-300"
                >
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                    <path d="M11 1.5a.5.5 0 0 1 .5.5v1h1a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H3.5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h1V2a.5.5 0 0 1 1 0v1h5V2a.5.5 0 0 1 .5-.5ZM3.5 4.5A.5.5 0 0 0 3 5v1h10V5a.5.5 0 0 0-.5-.5h-9ZM3 7h10v6a.5.5 0 0 1-.5.5h-9A.5.5 0 0 1 3 13V7Z" />
                  </svg>
                  Upcoming events
                </Link>
                <Link
                  href="#past"
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-white/20 bg-white/8 px-6 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
                >
                  Past events
                </Link>
              </div>
            </div>

            {/* ── Right: featured event preview card ── */}
            <div className="relative">
              {/* Glow behind card */}
              <div aria-hidden className="pointer-events-none absolute -inset-4 rounded-4xl bg-amber-400/6 blur-2xl" />

              <div className="relative overflow-hidden rounded-3xl border border-white/10 bg-white/6 backdrop-blur-xl">
                {/* Card header */}
                <div className="flex items-center justify-between border-b border-white/8 px-5 py-3.5">
                  <div className="flex items-center gap-2">
                    <span className="relative flex h-2 w-2">
                      <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                      <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                    </span>
                    <span className="text-[10px] font-bold uppercase tracking-[0.25em] text-amber-400">
                      Next event
                    </span>
                  </div>
                  <span className="rounded-full bg-emerald-500/15 px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] text-emerald-400">
                    Upcoming
                  </span>
                </div>

                {/* Date block */}
                <div className="bg-linear-to-br from-teal-800/80 to-teal-900/80 px-5 py-6 text-center">
                  <Starburst className="mx-auto mb-3 h-8 w-8 text-amber-400/30" />
                  <p className="text-[10px] font-bold uppercase tracking-[0.25em] text-teal-300/70">
                    {FEATURED.month} · {FEATURED.year}
                  </p>
                  <p
                    className="font-black leading-none tracking-tighter text-white"
                    style={{ fontSize: "clamp(4.5rem, 10vw, 6rem)" }}
                  >
                    {FEATURED.day}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-teal-200/80">{FEATURED.time}</p>
                  <span className="mt-3 inline-block rounded-full border border-white/15 bg-white/8 px-3 py-1 text-[10px] font-semibold text-white/70">
                    {FEATURED.format}
                  </span>
                </div>

                {/* Event title */}
                <div className="px-5 py-4">
                  <p className="text-sm font-bold leading-snug text-white line-clamp-3">
                    {FEATURED.title}
                  </p>

                  {/* Registration CTA */}
                  <div className="mt-4">
                    {FEATURED.registerHref ? (
                      <a
                        href={FEATURED.registerHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex w-full items-center justify-center gap-2 rounded-xl bg-amber-400 py-2.5 text-sm font-bold text-amber-950 shadow-lg transition hover:bg-amber-300"
                      >
                        Register Now
                        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </a>
                    ) : (
                      <div className="flex w-full items-center justify-center gap-2 rounded-xl border border-amber-400/25 bg-amber-400/8 py-2.5 text-sm font-semibold text-amber-400/70">
                        <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                          <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2Zm3 4V3a3 3 0 0 0-6 0v2H3.5a1 1 0 0 0-1 1v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V6a1 1 0 0 0-1-1H11Z" />
                        </svg>
                        Registration Opening Soon
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>

        <TickerStrip />
      </section>

      {/* ══════════════════════════════════════════════════════
          FEATURED UPCOMING EVENT
      ══════════════════════════════════════════════════════ */}
      <section id="upcoming" className="bg-white py-20 dark:bg-zinc-950 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section label */}
          <div className="mb-10 flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-emerald-50 py-1 pl-3 pr-4 dark:border-emerald-800/60 dark:bg-emerald-900/30">
              <span className="relative flex h-2 w-2">
                <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-emerald-400 opacity-75" />
                <span className="relative inline-flex h-2 w-2 rounded-full bg-emerald-500" />
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-emerald-700 dark:text-emerald-400">
                Upcoming
              </span>
            </div>
            <span className="h-px flex-1 bg-zinc-100 dark:bg-zinc-800" />
            <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">1 event scheduled</span>
          </div>

          {/* ── Event Ticket Card ── */}
          <div className="overflow-hidden rounded-4xl shadow-[0_32px_80px_-20px_rgba(13,148,136,0.25)]">
            <div className="grid lg:grid-cols-[340px_1fr]">

              {/* LEFT STUB — date + decorations */}
              <div className="relative flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-teal-600 via-teal-700 to-teal-900 px-8 py-12 text-center lg:py-14">
                {/* Dot grid */}
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.07)_1px,transparent_1px)] bg-size-[24px_24px]" />
                {/* Glow */}
                <div aria-hidden className="pointer-events-none absolute -top-16 left-1/2 h-48 w-48 -translate-x-1/2 rounded-full bg-teal-300/15 blur-3xl" />

                {/* Starbursts */}
                <Starburst className="absolute right-6 top-6 h-10 w-10 text-white/15" />
                <Starburst className="absolute bottom-8 left-6 h-7 w-7 rotate-12 text-amber-300/30" />

                {/* SAVE THE DATE badge */}
                <span className="relative rounded-full border border-amber-300/40 bg-amber-400/15 px-4 py-1.5 text-[10px] font-black uppercase tracking-[0.3em] text-amber-300">
                  Save the date
                </span>

                {/* Date display */}
                <div className="relative mt-6">
                  <p className="text-[11px] font-bold uppercase tracking-[0.25em] text-teal-200/70">
                    {FEATURED.month} · {FEATURED.year}
                  </p>
                  <p className="mt-1 font-black leading-none tracking-tighter text-white" style={{ fontSize: "clamp(5rem, 12vw, 7.5rem)" }}>
                    {FEATURED.day}
                  </p>
                </div>

                {/* Time */}
                <p className="relative mt-3 text-sm font-semibold text-teal-200/80">
                  {FEATURED.time}
                </p>

                {/* Format badge */}
                <span className="relative mt-4 rounded-full border border-white/20 bg-white/10 px-4 py-1.5 text-[11px] font-bold text-white/80 backdrop-blur-sm">
                  {FEATURED.format}
                </span>

                {/* Perforated edge (dashed right border, visible only on desktop) */}
                <div aria-hidden className="absolute right-0 top-6 hidden h-[calc(100%-3rem)] border-r-2 border-dashed border-white/15 lg:block" />
                {/* Notch circles */}
                <div aria-hidden className="absolute -right-4 top-1/2 hidden h-8 w-8 -translate-y-1/2 rounded-full bg-white shadow-inner dark:bg-zinc-950 lg:block" />
              </div>

              {/* RIGHT PANEL — content */}
              <div className="relative flex flex-col justify-center bg-zinc-950 p-8 sm:p-10 lg:p-12">
                {/* Scattered festive dots */}
                <div aria-hidden className="pointer-events-none absolute right-8 top-8 h-2 w-2 rounded-full bg-amber-400/30" />
                <div aria-hidden className="pointer-events-none absolute right-20 top-14 h-1.5 w-1.5 rounded-full bg-emerald-400/25" />
                <Starburst className="pointer-events-none absolute right-10 bottom-12 h-8 w-8 text-teal-500/15" />

                {/* Status badge */}
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
                    Upcoming · Details Coming Soon
                  </span>
                </div>

                {/* Title */}
                <h2
                  className="mt-5 font-bold leading-snug tracking-tight text-white"
                  style={{ fontSize: "clamp(1.1rem, 2.5vw, 1.6rem)" }}
                >
                  {FEATURED.title}
                </h2>

                {/* Description */}
                <p className="mt-4 text-sm leading-relaxed text-zinc-400">
                  {FEATURED.description}
                </p>

                {/* Countdown */}
                <div className="mt-8">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                    Starts in
                  </p>
                  <EventCountdown targetISO={FEATURED.isoDate} />
                </div>

                {/* CTAs */}
                <div className="mt-8 flex flex-wrap items-center gap-3">
                  {FEATURED.registerHref ? (
                    <a
                      href={FEATURED.registerHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-amber-400 px-7 text-sm font-bold text-amber-950 shadow-xl shadow-amber-900/20 transition hover:bg-amber-300"
                    >
                      Register Now
                      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  ) : (
                    <span className="inline-flex min-h-11 cursor-default items-center justify-center gap-2 rounded-xl border border-amber-400/30 bg-amber-400/10 px-7 text-sm font-semibold text-amber-400/70">
                      <svg className="h-4 w-4" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                        <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2Zm3 4V3a3 3 0 0 0-6 0v2H3.5a1 1 0 0 0-1 1v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V6a1 1 0 0 0-1-1H11Z" />
                      </svg>
                      Registration Opening Soon
                    </span>
                  )}
                  <Link
                    href={FEATURED.href}
                    className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-zinc-700 bg-zinc-900 px-7 text-sm font-semibold text-zinc-300 transition hover:border-teal-700 hover:text-teal-300"
                  >
                    View event details
                    <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          PAST EVENTS
      ══════════════════════════════════════════════════════ */}
      <section id="past" className="relative isolate overflow-hidden bg-[#f2f8f6] py-20 dark:bg-zinc-900 sm:py-24 lg:py-28">
        <div aria-hidden className="pointer-events-none absolute -left-32 top-0 h-[400px] w-[400px] rounded-full bg-teal-200/20 blur-[100px] dark:bg-teal-900/15" />
        <div aria-hidden className="pointer-events-none absolute -right-32 bottom-0 h-[400px] w-[400px] rounded-full bg-violet-200/12 blur-[100px] dark:bg-violet-900/10" />

        {/* Decorative starburst */}
        <Starburst className="pointer-events-none absolute right-[6%] top-12 h-14 w-14 text-teal-400/15" />
        <Starburst className="pointer-events-none absolute left-[4%] bottom-16 h-10 w-10 rotate-22 text-violet-400/12" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">

          {/* Section label */}
          <div className="mb-10 flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full border border-zinc-300/60 bg-white px-4 py-1.5 shadow-sm dark:border-zinc-700/60 dark:bg-zinc-800">
              <span className="h-2 w-2 rounded-full bg-zinc-400 dark:bg-zinc-500" />
              <span className="text-[11px] font-bold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                Past Events
              </span>
            </div>
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
            <span className="text-[11px] font-medium text-zinc-400 dark:text-zinc-500">{PAST_EVENTS.length} recorded</span>
          </div>

          {/* Grid */}
          <ul className="grid gap-6 sm:grid-cols-2">
            {PAST_EVENTS.map(({ title, description, day, month, year, format, tags, accent, accentLight, href, cta, recordingHref }) => (
              <li key={title} className="flex">
                <div className="group flex w-full flex-col overflow-hidden rounded-3xl border border-zinc-200/80 bg-white shadow-sm shadow-zinc-900/4 transition duration-300 hover:-translate-y-1.5 hover:shadow-2xl dark:border-zinc-800/80 dark:bg-zinc-950">
                  {/* Coloured header band */}
                  <div className={`relative overflow-hidden bg-linear-to-br ${accent} px-6 py-6`}>
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.06)_1px,transparent_1px)] bg-size-[20px_20px]" />
                    <div aria-hidden className="pointer-events-none absolute -right-8 -top-8 h-28 w-28 rounded-full bg-white/8" />
                    <Starburst className="pointer-events-none absolute right-5 bottom-3 h-8 w-8 text-white/10" />

                    <div className="relative flex items-start justify-between gap-3">
                      <div>
                        <span className={`text-[10px] font-bold uppercase tracking-[0.2em] ${accentLight} opacity-70`}>
                          {format}
                        </span>
                        <p className="mt-1 font-black leading-none tracking-tighter text-white"
                           style={{ fontSize: "clamp(1.75rem, 4vw, 2.5rem)" }}>
                          {day !== "—" ? `${day} ` : ""}
                          <span className={accentLight}>{month}</span>
                          {year ? ` ${year}` : ""}
                        </p>
                      </div>
                      <span className="shrink-0 rounded-full bg-black/20 px-3 py-1 text-[10px] font-bold uppercase tracking-[0.15em] text-white/70 backdrop-blur-sm">
                        Past
                      </span>
                    </div>

                    <div className="relative mt-3 flex flex-wrap gap-1.5">
                      {tags.map((tag) => (
                        <span key={tag} className="rounded-full border border-white/15 bg-white/10 px-2.5 py-0.5 text-[10px] font-semibold text-white/75">
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Body */}
                  <div className="flex flex-1 flex-col p-6">
                    <h3 className="text-base font-bold leading-snug tracking-tight text-zinc-900 transition-colors group-hover:text-teal-800 dark:text-zinc-50 dark:group-hover:text-teal-300">
                      {title}
                    </h3>
                    <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-500 dark:text-zinc-400">
                      {description}
                    </p>

                    {/* CTAs */}
                    <div className="mt-6 flex flex-wrap gap-2">
                      {/* Recording / recap link */}
                      {recordingHref ? (
                        <a
                          href={recordingHref}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="inline-flex items-center gap-2 rounded-xl bg-teal-600 px-4 py-2 text-xs font-bold text-white shadow-sm transition hover:bg-teal-500"
                        >
                          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                            <path d="M5.5 3.5a.5.5 0 0 1 .5-.5l8 4.5a.5.5 0 0 1 0 .866l-8 4.5A.5.5 0 0 1 5 12.5v-9Z" />
                          </svg>
                          Watch Recording
                        </a>
                      ) : (
                        <span className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-zinc-50 px-4 py-2 text-xs font-semibold text-zinc-400 dark:border-zinc-700 dark:bg-zinc-800/60">
                          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="currentColor" aria-hidden>
                            <path d="M8 1a2 2 0 0 1 2 2v2H6V3a2 2 0 0 1 2-2Zm3 4V3a3 3 0 0 0-6 0v2H3.5a1 1 0 0 0-1 1v7a2 2 0 0 0 2 2h7a2 2 0 0 0 2-2V6a1 1 0 0 0-1-1H11Z" />
                          </svg>
                          Recording Coming Soon
                        </span>
                      )}
                      {/* Details link */}
                      <Link
                        href={href}
                        className="inline-flex items-center gap-1.5 rounded-xl border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-600 transition hover:border-teal-300 hover:text-teal-700 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300 dark:hover:border-teal-700 dark:hover:text-teal-400"
                      >
                        {cta}
                        <svg className="h-3 w-3" viewBox="0 0 12 12" fill="none" stroke="currentColor" strokeWidth="1.75">
                          <path d="M1.5 6h9M6.5 2l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                      </Link>
                    </div>
                  </div>

                  {/* Bottom sweep */}
                  <div aria-hidden className="h-[3px] w-0 bg-linear-to-r from-teal-500 via-emerald-500 to-teal-400 transition-all duration-500 group-hover:w-full" />
                </div>
              </li>
            ))}
          </ul>

          {/* View all */}
          <div className="mt-10 text-center">
            <Link
              href={africaRoutes.events}
              className="inline-flex items-center gap-2 rounded-xl border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-teal-300 hover:text-teal-700 hover:shadow-md dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300 dark:hover:border-teal-700 dark:hover:text-teal-400"
            >
              Browse all events
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          STAY UPDATED CTA
      ══════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-zinc-950 via-teal-950 to-zinc-950 py-20 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px]" />
        {/* Amber bloom */}
        <div aria-hidden className="pointer-events-none absolute -right-32 top-0 h-[400px] w-[400px] rounded-full bg-amber-400/5 blur-[100px]" />
        {/* Teal bloom */}
        <div aria-hidden className="pointer-events-none absolute -left-32 bottom-0 h-[400px] w-[400px] rounded-full bg-teal-500/8 blur-[100px]" />

        {/* Starbursts */}
        <Starburst className="pointer-events-none absolute right-[15%] top-10 h-12 w-12 text-amber-400/15" />
        <Starburst className="pointer-events-none absolute left-[10%] bottom-10 h-8 w-8 rotate-30 text-teal-400/15" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">

            {/* Left */}
            <div>
              <div className="flex items-center gap-2">
                <span className="h-px w-6 bg-amber-400/50" />
                <p className="text-[10px] font-bold uppercase tracking-[0.3em] text-amber-400/70">
                  Stay in the loop
                </p>
              </div>
              <h2
                className="mt-6 font-black leading-[0.9] tracking-tighter text-white"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                Never miss<br />
                <span className="bg-linear-to-r from-amber-300 to-yellow-200 bg-clip-text text-transparent">
                  an event.
                </span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400">
                Get the latest updates on programs, events, and success stories. Be part of a community empowering young minds across Africa.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={africaRoutes.donate}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl bg-amber-400 px-7 text-sm font-bold text-amber-950 shadow-xl shadow-amber-900/20 transition hover:bg-amber-300"
                >
                  Get involved
                </Link>
                <Link
                  href={africaRoutes.home}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 px-7 text-sm font-semibold text-zinc-300 transition hover:border-teal-700 hover:text-teal-300"
                >
                  Back to home
                </Link>
              </div>
            </div>

            {/* Right: next event card */}
            <div className="overflow-hidden rounded-3xl border border-white/8 bg-white/5 backdrop-blur-sm">
              {/* Card header */}
              <div className="flex items-center justify-between border-b border-white/8 px-6 py-4">
                <div className="flex items-center gap-2">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-amber-400 opacity-75" />
                    <span className="relative inline-flex h-2 w-2 rounded-full bg-amber-400" />
                  </span>
                  <span className="text-[11px] font-bold uppercase tracking-[0.2em] text-amber-400">
                    Next event
                  </span>
                </div>
                <span className="text-[10px] font-medium text-zinc-500">Apr 27, 2026</span>
              </div>

              <div className="p-6 sm:p-8">
                <div className="flex items-start gap-6">
                  {/* Date block */}
                  <div className="flex shrink-0 flex-col items-center rounded-2xl border border-amber-400/25 bg-amber-400/10 px-4 py-3 text-center">
                    <span className="text-[10px] font-bold uppercase tracking-[0.15em] text-amber-300">Apr</span>
                    <span className="text-4xl font-black leading-none text-amber-200">27</span>
                    <span className="text-[9px] text-amber-400/50">2026</span>
                  </div>

                  <div className="min-w-0">
                    <p className="text-[11px] font-semibold text-zinc-500">{FEATURED.format} · {FEATURED.time}</p>
                    <p className="mt-2 text-sm font-bold leading-snug text-white">
                      {FEATURED.title}
                    </p>
                    <a
                      href={FEATURED.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-amber-400 transition hover:text-amber-300"
                    >
                      View event details
                      <svg className="h-3.5 w-3.5" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="1.75">
                        <path d="M2 7h10M8 3l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </a>
                  </div>
                </div>

                {/* Mini countdown */}
                <div className="mt-6 border-t border-white/8 pt-5">
                  <p className="mb-3 text-[10px] font-bold uppercase tracking-[0.22em] text-zinc-500">
                    Countdown
                  </p>
                  <EventCountdown targetISO={FEATURED.isoDate} />
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
