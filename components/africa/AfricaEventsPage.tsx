import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";

const FEATURED = {
  series: "Webinar Series | Real Life Research Institute",
  locationDate: "Location: Online | Monday, April 27, 2026",
  title: "Tensions in the Middle East: Implications for African Security and Digital Infrastructure",
  timezoneLine:
    "Ottawa (EDT): 9:00 am – 10:00 am | South Africa (SAST): 3:00 pm – 4:00 pm | Kenya / Ethiopia (EAT): 4:00 pm – 5:00 pm | Cameroon/Nigeria (WAT): 2:00 pm – 3:00 pm",
  summary:
    "This event brings together scholars, policymakers, and practitioners to examine the economic, security, and political implications of the evolving Middle East crisis for Africa, with special focus on digital infrastructure resilience.",
  day: "27",
  month: "APR",
  year: "2026",
  time: "9:00 AM – 10:00 AM (Ottawa, EDT)",
  format: "Online Webinar",
  isoDate: "2026-04-27T09:00:00-04:00",
  href: africaRoutes.eventNextWebinar,
  registerHref:
    "https://docs.google.com/forms/d/e/1FAIpQLSfGSPxWyIdYLIXDRPWZs4XezOXcBZ09rV3yxnPze1DXZ3lXxA/viewform?usp=publish-editor",
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
    href: africaRoutes.events,
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
    href: africaRoutes.events,
    /** Recording link — set this to the webinar replay URL */
    recordingHref: null as string | null,
  },
] as const;

export function AfricaEventsPage() {
  return (
    <>
      <section className="border-b border-zinc-200/80 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
            Events
          </p>
          <h1 id="events-heading" className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl">
            Events &amp; webinars
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            We host webinars and public dialogues that connect research, policy, and community perspectives across Africa.
          </p>
          <div className="mt-8 flex flex-wrap gap-3">
            <Link
              href="#upcoming"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
            >
              Upcoming event
            </Link>
            <Link
              href="#past"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              Past events
            </Link>
          </div>
        </div>
      </section>

      <section id="upcoming" className="border-b border-zinc-200/80 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">Upcoming</p>
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <div className="overflow-hidden rounded-4xl shadow-[0_24px_55px_-24px_rgba(15,23,42,0.35)]">
            <div className="grid lg:grid-cols-[280px_1fr]">
              <div className="relative flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-teal-600 via-teal-700 to-teal-900 px-8 py-10 text-center text-white">
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-200/90">
                  {FEATURED.month} · {FEATURED.year}
                </p>
                <p className="mt-2 text-7xl font-bold leading-none">{FEATURED.day}</p>
                <p className="mt-3 text-xs font-semibold text-teal-100">{FEATURED.time}</p>
                <span className="mt-3 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-medium">
                  {FEATURED.format}
                </span>
              </div>

              <div className="bg-white p-6 sm:p-8 dark:bg-zinc-900/80">
                <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
                  {FEATURED.series}
                </p>
                <h2 className="mt-3 text-xl font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
                  {FEATURED.title}
                </h2>
                <p className="mt-3 text-sm font-medium text-zinc-700 dark:text-zinc-300">{FEATURED.locationDate}</p>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{FEATURED.timezoneLine}</p>
                <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{FEATURED.summary}</p>
                <div className="mt-6 flex flex-wrap gap-3">
                  {FEATURED.registerHref ? (
                    <a
                      href={FEATURED.registerHref}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-600"
                    >
                      Register now
                    </a>
                  ) : (
                    <span className="inline-flex min-h-11 cursor-default items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 px-6 text-sm font-semibold text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                      Registration opening soon
                    </span>
                  )}
                  <Link
                    href={FEATURED.href}
                    className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
                  >
                    View details
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section id="past" className="bg-white py-20 dark:bg-zinc-950 sm:py-24 lg:py-28">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="mb-8 flex items-center gap-3">
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">Past events</p>
            <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
          </div>

          <ul className="grid gap-6 sm:grid-cols-2">
            {PAST_EVENTS.map(({ title, description, day, month, year, format, tags, href, recordingHref }) => (
              <li key={title} className="flex">
                <article className="flex w-full flex-col rounded-2xl border border-zinc-200/80 bg-zinc-50 p-5 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
                  <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                    {format}
                  </p>
                  <p className="mt-2 text-sm font-semibold text-teal-700 dark:text-teal-400">
                    {day !== "—" ? `${day} ${month}` : month}
                    {year ? ` ${year}` : ""}
                  </p>
                  <h3 className="mt-3 text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
                    {title}
                  </h3>
                  <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{description}</p>
                  <div className="mt-4 flex flex-wrap gap-2">
                    {tags.map((tag) => (
                      <span key={tag} className="rounded-full border border-zinc-200 bg-white px-2.5 py-1 text-[11px] font-medium text-zinc-600 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-300">
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className="mt-6 flex flex-wrap gap-2">
                    {recordingHref ? (
                      <a
                        href={recordingHref}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 rounded-lg bg-teal-700 px-4 py-2 text-xs font-semibold text-white transition hover:bg-teal-600"
                      >
                        Watch recording
                      </a>
                    ) : (
                      <span className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-medium text-zinc-500 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-400">
                        Recording coming soon
                      </span>
                    )}
                    <Link
                      href={href}
                      className="inline-flex items-center rounded-lg border border-zinc-200 bg-white px-4 py-2 text-xs font-semibold text-zinc-700 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600"
                    >
                      Read more
                    </Link>
                  </div>
                </article>
              </li>
            ))}
          </ul>

          <div className="mt-10 text-center">
            <Link
              href={africaRoutes.events}
              className="inline-flex items-center gap-2 rounded-lg border border-zinc-200 bg-white px-6 py-3 text-sm font-semibold text-zinc-700 shadow-sm transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600"
            >
              Browse all events
            </Link>
          </div>
        </div>
      </section>

      <section className="bg-teal-700 py-16 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-200/70">Stay updated</p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Never miss an event
              </h2>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-teal-100/80">
                Follow upcoming webinars, panel conversations, and public dialogues from RLRI Africa Programs.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
              <Link
                href={africaRoutes.donate}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
              >
                Get involved
              </Link>
              <Link
                href={africaRoutes.home}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
