import Link from "next/link";
import { africaEmails, africaRoutes } from "@/lib/africa-routes";

const INSTITUTE_EVENTS_URL = "https://reallifeinstitute.org/events/";

const listItemClass = "pl-1 text-[1.025rem] leading-relaxed";
const subheadingClass = "mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-500";
const bulletListClass = "mt-3 list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400";

export function AfricaVolunteersPage() {
  return (
    <>
      <section
        className="border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        aria-labelledby="volunteers-heading"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
            Volunteers
          </p>
          <h1
            id="volunteers-heading"
            className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl"
          >
            Volunteer with us
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            We welcome people who share our values and want to contribute time and skills to research dissemination, events, and
            program support. Current volunteer openings are listed below. Paid staff roles are posted on our{" "}
            <Link href={africaRoutes.career} className="font-semibold text-teal-700 underline-offset-4 hover:underline dark:text-teal-400">
              Careers
            </Link>{" "}
            page.
          </p>
        </div>
      </section>

      <div className="border-b border-zinc-200/80 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-950 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article
            id="iqaluit-summer-2026"
            className="scroll-mt-8 rounded-3xl border border-zinc-200/80 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-10"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">Opening</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[1.75rem]">
              RLRI Summer Student Volunteer Opportunity — Iqaluit 2026
            </h2>
            <p className="mt-5 text-[1.025rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
              The Real Life Research Institute (RLRI) is a Canadian non-profit organization advancing equity and inclusion to
              ensure no one is left behind. RLRI is looking for three motivated student volunteers to help us bring three of
              Iqaluit&apos;s biggest summer celebrations to life.
            </p>
            <p className="mt-4 text-[1.025rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
              Are you looking to build your resume, gain new skills, and give back to your community this summer? Whatever your
              talents are, we have a place for you.
            </p>

            <h3 className={subheadingClass}>Ways you can contribute</h3>
            <ul className={bulletListClass}>
              <li className={listItemClass}>
                <strong className="font-medium text-zinc-800 dark:text-zinc-200">Event coordination &amp; logistics</strong> — setting
                up venues and managing schedules.
              </li>
              <li className={listItemClass}>
                <strong className="font-medium text-zinc-800 dark:text-zinc-200">Hospitality &amp; registration</strong> — welcoming
                participants and managing sign-ups.
              </li>
              <li className={listItemClass}>
                <strong className="font-medium text-zinc-800 dark:text-zinc-200">Cultural interpretation</strong> — helping neighbors
                connect and celebrate together.
              </li>
              <li className={listItemClass}>
                <strong className="font-medium text-zinc-800 dark:text-zinc-200">Safety &amp; first aid</strong> — ensuring a secure
                environment for all attendees.
              </li>
            </ul>

            <h3 className={subheadingClass}>What we&apos;re looking for</h3>
            <ul className={bulletListClass}>
              <li className={listItemClass}>
                <strong className="font-medium text-zinc-800 dark:text-zinc-200">Iqaluit residents</strong> — students currently living
                in Iqaluit (including those returning home for the summer).
              </li>
              <li className={listItemClass}>
                <strong className="font-medium text-zinc-800 dark:text-zinc-200">Reliability</strong> — showing up ready to help where
                needed.
              </li>
              <li className={listItemClass}>
                <strong className="font-medium text-zinc-800 dark:text-zinc-200">Attitude</strong> — a willingness to learn, work
                safely, and show respect to all community members.
              </li>
              <li className={listItemClass}>
                <strong className="font-medium text-zinc-800 dark:text-zinc-200">Language (asset)</strong> — proficiency in Inuktitut
                or French is a major plus.
              </li>
              <li className={listItemClass}>
                <strong className="font-medium text-zinc-800 dark:text-zinc-200">Requirement</strong> — a valid criminal record
                check is required for all applicants.
              </li>
            </ul>

            <h3 className={subheadingClass}>How to apply</h3>
            <p className="mt-3 text-[1.025rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
              To apply, send your resume to{" "}
              <a
                href={`mailto:${africaEmails.jobsHr}?subject=Application%20%E2%80%94%20Iqaluit%20Summer%20Student%20Volunteer%202026`}
                className="font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-400"
              >
                {africaEmails.jobsHr}
              </a>
              . Applications are accepted until <strong className="font-medium text-zinc-800 dark:text-zinc-200">May 15, 2026</strong>
              .
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">
              For more information about Real Life Research Institute, see{" "}
              <a
                href={INSTITUTE_EVENTS_URL}
                className="font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-400"
                rel="noreferrer"
              >
                reallifeinstitute.org/events
              </a>
              . For general HR support:{" "}
              <a
                href={`mailto:${africaEmails.hrSupport}`}
                className="font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-400"
              >
                {africaEmails.hrSupport}
              </a>
              .
            </p>
          </article>
        </div>
      </div>

      <section className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-200/80 bg-zinc-50/80 p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-10">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Open to volunteers worldwide</h2>
            <p className="mt-4 max-w-3xl text-[1.025rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
              If you are interested in other volunteering opportunities, please reach out—we would love to hear from you. You
              can also explore how to support our work through the links below.
            </p>
            <div className="mt-8 flex flex-wrap gap-4">
              <a
                href={`mailto:${africaEmails.programsCoord}`}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
              >
                Email program coordination
              </a>
              <Link
                href={africaRoutes.getInvolved}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
              >
                Get involved
              </Link>
              <Link
                href={africaRoutes.team}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
              >
                Meet the team
              </Link>
            </div>
            <p className="mt-4 text-xs text-zinc-500 dark:text-zinc-500">
              Volunteer coordination email:{" "}
              <a
                href={`mailto:${africaEmails.programsCoord}`}
                className="font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-400"
              >
                {africaEmails.programsCoord}
              </a>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
