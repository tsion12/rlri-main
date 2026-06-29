import Link from "next/link";
import { AfricaEventsSchedule } from "@/components/africa/AfricaEventsSchedule";
import { AfricaWebinarIntroSection } from "@/components/africa/AfricaWebinarIntroSection";
import { africaRoutes } from "@/lib/africa-routes";
import { getAfricaWebinarEvents } from "@/lib/africa-events";

export function AfricaEventsPage() {
  const events = getAfricaWebinarEvents();

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
              href={africaRoutes.upcomingEvents}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
            >
              Upcoming event
            </Link>
            <Link
              href="#how-webinars-work"
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              How webinars work
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

      <AfricaWebinarIntroSection />

      <AfricaEventsSchedule events={events} />

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
