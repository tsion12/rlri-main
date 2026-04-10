import Link from "next/link";
import { africaEmails, africaRoutes } from "@/lib/africa-routes";

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
            We welcome people from around the world who share our values and want to contribute time and skills to research
            dissemination, events, and program support.
          </p>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-950 lg:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="rounded-3xl border border-zinc-200/80 bg-white p-8 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-10">
            <h2 className="text-xl font-bold tracking-tight text-zinc-900 dark:text-zinc-50">Open to volunteers worldwide</h2>
            <p className="mt-4 max-w-3xl text-[1.025rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
              If you are interested in volunteering, please reach out—we would love to hear from you. You can also explore how
              to support our work through other channels.
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
