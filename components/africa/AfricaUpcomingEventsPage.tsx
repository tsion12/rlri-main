"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import type { AfricaWebinarEvent } from "@/lib/africa-events";
import { getAfricaWebinarEvents } from "@/lib/africa-events";
import { africaRoutes } from "@/lib/africa-routes";
import { categorizeAfricaEvents, getEventEndIso } from "@/lib/africa-event-schedule";
import { EventWebinarStatus } from "@/components/africa/EventWebinarStatus";
import { WebinarProgramSupportLine } from "@/components/africa/WebinarProgramSupportLine";

function formatCalendarParts(isoDate: string) {
  const date = new Date(isoDate);
  return {
    day: new Intl.DateTimeFormat("en-US", { day: "2-digit" }).format(date),
    month: new Intl.DateTimeFormat("en-US", { month: "short" }).format(date).toUpperCase(),
    year: new Intl.DateTimeFormat("en-US", { year: "numeric" }).format(date),
    weekday: new Intl.DateTimeFormat("en-US", { weekday: "long" }).format(date),
  };
}

function FeaturedUpcomingCard({ event, live }: { event: AfricaWebinarEvent; live: boolean }) {
  const dateParts = formatCalendarParts(event.isoDate);

  return (
    <article className="overflow-hidden rounded-4xl border border-white/10 bg-white/5 shadow-[0_32px_64px_-24px_rgba(0,0,0,0.45)] backdrop-blur-sm">
      <div className="grid lg:grid-cols-[300px_1fr]">
        <div className="relative flex flex-col items-center justify-center overflow-hidden bg-linear-to-br from-teal-500/90 via-teal-600 to-teal-900 px-8 py-12 text-center text-white">
          <div
            className="pointer-events-none absolute inset-0 opacity-30 bg-[radial-gradient(circle_at_30%_20%,rgba(255,255,255,0.35),transparent_55%)]"
            aria-hidden
          />
          {live ? (
            <span className="relative mb-4 inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/20 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-100">
              <span className="size-2 animate-pulse rounded-full bg-emerald-300" />
              Live now
            </span>
          ) : (
            <span className="relative mb-4 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-100">
              Next up
            </span>
          )}
          <p className="relative text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-100/90">
            {dateParts.weekday}
          </p>
          <p className="relative mt-1 text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-200/90">
            {dateParts.month} · {dateParts.year}
          </p>
          <p className="relative mt-2 text-8xl font-bold leading-none">{dateParts.day}</p>
          <p className="relative mt-4 text-xs font-semibold text-teal-100">{event.time}</p>
          <span className="relative mt-4 rounded-full border border-white/25 bg-white/10 px-3 py-1 text-[11px] font-medium">
            {event.format}
          </span>
        </div>

        <div className="relative bg-white p-6 sm:p-8 dark:bg-zinc-900/95">
          <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
            Webinar Series · Real Life Research Institute
          </p>
          <h2 className="mt-3 text-2xl font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
            {event.title}
          </h2>
          {event.subtitle ? (
            <p className="mt-2 text-sm font-medium italic text-zinc-500 dark:text-zinc-400">{event.subtitle}</p>
          ) : null}
          <p className="mt-4 text-sm font-medium text-zinc-700 dark:text-zinc-300">{event.locationDate}</p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{event.timezoneLine}</p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{event.summary}</p>
          <WebinarProgramSupportLine program={event.supportProgram} className="mt-4" />
          <div className="mt-6 rounded-2xl bg-linear-to-r from-teal-700 via-teal-800 to-teal-900 p-4 text-white shadow-sm sm:p-5">
            <EventWebinarStatus
              startISO={event.isoDate}
              endISO={getEventEndIso(event)}
              title={event.title}
              registerHref={event.registerHref}
            />
          </div>
          <div className="mt-6 flex flex-wrap gap-3">
            {event.registerHref ? (
              <a
                href={event.registerHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-600"
              >
                {live ? "Join webinar" : "Register now"}
              </a>
            ) : (
              <span className="inline-flex min-h-11 cursor-default items-center justify-center rounded-lg border border-zinc-200 bg-zinc-100 px-6 text-sm font-semibold text-zinc-500 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-400">
                Registration link coming soon
              </span>
            )}
            <Link
              href={event.href}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              View details
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}

function UpcomingEventCard({ event }: { event: AfricaWebinarEvent }) {
  const dateParts = formatCalendarParts(event.isoDate);

  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-2xl border border-zinc-200/80 bg-white shadow-sm transition hover:-translate-y-0.5 hover:border-teal-200/80 hover:shadow-md dark:border-zinc-800 dark:bg-zinc-900/60 dark:hover:border-teal-800/50">
      <div className="flex items-center gap-4 border-b border-zinc-100 bg-linear-to-r from-teal-50 to-emerald-50/80 px-5 py-4 dark:border-zinc-800 dark:from-teal-950/40 dark:to-emerald-950/30">
        <div className="flex size-14 shrink-0 flex-col items-center justify-center rounded-xl bg-teal-700 text-white shadow-sm">
          <span className="text-[10px] font-bold uppercase tracking-wide">{dateParts.month}</span>
          <span className="text-xl font-bold leading-none">{dateParts.day}</span>
        </div>
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.14em] text-teal-700 dark:text-teal-400">
            {dateParts.weekday}
          </p>
          <p className="mt-0.5 text-sm font-medium text-zinc-700 dark:text-zinc-300">{event.time}</p>
        </div>
      </div>
      <div className="flex flex-1 flex-col p-5">
        <h3 className="text-lg font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
          {event.title}
        </h3>
        {event.subtitle ? (
          <p className="mt-1 text-sm font-medium italic text-zinc-500 dark:text-zinc-400">{event.subtitle}</p>
        ) : null}
        <p className="mt-3 flex-1 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{event.summary}</p>
        <WebinarProgramSupportLine program={event.supportProgram} className="mt-3" />
        <div className="mt-5 flex flex-wrap gap-2 pt-2">
          {event.registerHref ? (
            <a
              href={event.registerHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-teal-700 px-4 text-xs font-semibold text-white transition hover:bg-teal-600"
            >
              Register
            </a>
          ) : null}
          <Link
            href={event.href}
            className="inline-flex min-h-10 items-center justify-center rounded-lg border border-zinc-200 bg-white px-4 text-xs font-semibold text-zinc-700 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-200 dark:hover:border-zinc-600"
          >
            Details
          </Link>
        </div>
      </div>
    </article>
  );
}

export function AfricaUpcomingEventsPage() {
  const events = getAfricaWebinarEvents();
  const [nowMs, setNowMs] = useState(() => Date.now());

  useEffect(() => {
    const id = setInterval(() => setNowMs(Date.now()), 1000);
    return () => clearInterval(id);
  }, []);

  const { upcoming } = useMemo(() => categorizeAfricaEvents(events, nowMs), [events, nowMs]);
  const featured = upcoming[0] ?? null;
  const moreUpcoming = upcoming.slice(1);

  const featuredLive =
    featured != null &&
    nowMs >= new Date(featured.isoDate).getTime() &&
    nowMs < new Date(getEventEndIso(featured)).getTime();

  return (
    <>
      <section className="relative overflow-hidden border-b border-teal-900/20 bg-linear-to-br from-teal-950 via-teal-900 to-emerald-950 py-20 text-white sm:py-24 lg:py-28">
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_20%_0%,rgba(45,212,191,0.18),transparent_55%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_60%_50%_at_90%_80%,rgba(16,185,129,0.12),transparent_50%)]"
          aria-hidden
        />
        <div
          className="pointer-events-none absolute inset-0 opacity-[0.07] bg-[linear-gradient(to_right,rgba(255,255,255,0.5)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.5)_1px,transparent_1px)] bg-[size:48px_48px]"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl">
            <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-300/90">
              Africa Program · Events
            </p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight sm:text-5xl lg:text-6xl">
              Upcoming events
            </h1>
            <p className="mt-5 text-lg leading-relaxed text-teal-100/85">
              Join live webinars and public dialogues connecting African researchers, policymakers, and
              communities on the issues shaping the continent&apos;s future.
            </p>
          </div>
          <div className="mt-10 flex flex-wrap items-center gap-4">
            <div className="rounded-2xl border border-white/15 bg-white/10 px-5 py-4 backdrop-blur-sm">
              <p className="text-3xl font-bold tabular-nums">{upcoming.length}</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-[0.16em] text-teal-200/80">
                {upcoming.length === 1 ? "Scheduled session" : "Scheduled sessions"}
              </p>
            </div>
            <div className="flex flex-wrap gap-3">
              <Link
                href={africaRoutes.events}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                All events
              </Link>
              <Link
                href={`${africaRoutes.events}#past`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/20 px-6 text-sm font-semibold text-teal-100 transition hover:border-white/40 hover:text-white"
              >
                Past recordings
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-zinc-50 py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          {featured ? (
            <>
              <div className="mb-10 flex items-center gap-3">
                <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
                  Featured next
                </p>
                <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
              </div>
              <FeaturedUpcomingCard event={featured} live={featuredLive} />

              {moreUpcoming.length > 0 ? (
                <div className="mt-16">
                  <div className="mb-8 flex items-center gap-3">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                      Also on the calendar
                    </p>
                    <span className="h-px flex-1 bg-zinc-200 dark:bg-zinc-800" />
                  </div>
                  <ul className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                    {moreUpcoming.map((event) => (
                      <li key={event.id}>
                        <UpcomingEventCard event={event} />
                      </li>
                    ))}
                  </ul>
                </div>
              ) : null}
            </>
          ) : (
            <div className="mx-auto max-w-2xl rounded-3xl border border-zinc-200 bg-white p-10 text-center shadow-sm dark:border-zinc-800 dark:bg-zinc-900/60">
              <div className="mx-auto flex size-16 items-center justify-center rounded-2xl bg-teal-50 dark:bg-teal-950/40">
                <svg className="size-8 text-teal-700 dark:text-teal-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden>
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h2 className="mt-6 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                No upcoming sessions right now
              </h2>
              <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                New webinars are announced regularly. Browse past events for recordings, or return to the
                events hub for the full schedule.
              </p>
              <div className="mt-8 flex flex-wrap justify-center gap-3">
                <Link
                  href={`${africaRoutes.events}#past`}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-600"
                >
                  View past events
                </Link>
                <Link
                  href={africaRoutes.events}
                  className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100"
                >
                  Events hub
                </Link>
              </div>
            </div>
          )}
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-8 lg:grid-cols-3">
            {[
              {
                step: "01",
                title: "Register early",
                body: "Secure your spot before sessions fill. Registration links open as each webinar is announced.",
              },
              {
                step: "02",
                title: "Join live",
                body: "Participate in real time with speakers, Q&A, and shared resources across African time zones.",
              },
              {
                step: "03",
                title: "Stay connected",
                body: "Return for recordings, policy briefs, and follow-up publications after each event concludes.",
              },
            ].map(({ step, title, body }) => (
              <article
                key={step}
                className="rounded-2xl border border-zinc-200/80 bg-zinc-50 p-6 dark:border-zinc-800 dark:bg-zinc-900/50"
              >
                <p className="text-[11px] font-bold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">
                  {step}
                </p>
                <h3 className="mt-3 text-lg font-semibold text-zinc-900 dark:text-zinc-50">{title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="bg-teal-700 py-16 sm:py-20">
        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-200/70">
                Get involved
              </p>
              <h2 className="mt-3 text-3xl font-bold tracking-tight text-white sm:text-4xl">
                Never miss a session
              </h2>
              <p className="mt-3 max-w-lg text-base leading-relaxed text-teal-100/80">
                Follow RLRI Africa Programs for webinar announcements, research updates, and ways to
                collaborate across the continent.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
              <Link
                href={africaRoutes.donate}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-white px-6 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
              >
                Support the program
              </Link>
              <Link
                href={africaRoutes.events}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-white/30 bg-white/10 px-6 text-sm font-semibold text-white transition hover:bg-white/20"
              >
                Full events calendar
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
