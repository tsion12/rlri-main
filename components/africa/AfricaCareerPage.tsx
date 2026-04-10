import Link from "next/link";
import { africaEmails, africaRoutes } from "@/lib/africa-routes";

export function AfricaCareerPage() {
  return (
    <>
      <section
        className="border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950"
        aria-labelledby="career-heading"
      >
        <div className="mx-auto max-w-7xl px-4 py-20 sm:px-6 sm:py-24 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">Careers</p>
          <h1
            id="career-heading"
            className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl"
          >
            Work with us
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            We don&apos;t have open job postings on this site right now. Please stay tuned—future opportunities to join the Real
            Life Research Institute Africa Program will be shared here and through our channels when they become available.
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <Link
              href={africaRoutes.team}
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
            >
              Meet the team
            </Link>
            <a
              href={`mailto:${africaEmails.jobsHr}`}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              Email HR
            </a>
            <Link
              href={africaRoutes.home}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <section className="border-t border-zinc-200/80 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-950/80">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Interested in volunteering or collaborating? We welcome volunteers from around the world—see our{" "}
            <Link href={africaRoutes.volunteers} className="font-semibold text-teal-700 underline-offset-4 hover:underline dark:text-teal-400">
              Volunteers
            </Link>{" "}
            page for more.
          </p>
          <p className="mt-3 text-xs text-zinc-500 dark:text-zinc-500">
            HR email:{" "}
            <a
              href={`mailto:${africaEmails.jobsHr}`}
              className="font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-400"
            >
              {africaEmails.jobsHr}
            </a>
          </p>
        </div>
      </section>
    </>
  );
}
