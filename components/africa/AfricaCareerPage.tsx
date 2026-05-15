import Link from "next/link";
import { africaEmails, africaRoutes } from "@/lib/africa-routes";

const AFRICA_PROGRAM_URL = "https://africa-programs.reallifeinstitute.org/";
const APPLICATION_CLOSED_AT = "May 15, 2026 at 11:59 PM (EAT)";

const listItemClass = "pl-1 text-[1.025rem] leading-relaxed";
const subheadingClass = "mt-6 text-sm font-semibold uppercase tracking-[0.12em] text-zinc-500 dark:text-zinc-500";
const bulletListClass = "mt-3 list-disc space-y-2 pl-5 text-zinc-600 dark:text-zinc-400";

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
            The Real Life Research Institute (RLRI) is a Canadian non-profit organization advancing equity and inclusion so
            that no one is left behind. The paid role below is with the Africa Program.
          </p>
          <p className="mt-4 inline-flex items-center rounded-full border border-zinc-300 bg-zinc-100 px-4 py-1 text-sm font-semibold text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100">
            Applications closed on {APPLICATION_CLOSED_AT}
          </p>
          <div className="mt-10 flex flex-wrap gap-4">
            <span className="inline-flex min-h-11 items-center justify-center rounded-lg bg-zinc-200 px-6 text-sm font-semibold text-zinc-700 dark:bg-zinc-800 dark:text-zinc-300">
              Applications closed
            </span>
            <a
              href={`mailto:${africaEmails.hrSupport}?subject=HR%20inquiry%20%E2%80%94%20RLRI%20careers`}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              HR support
            </a>
            <Link
              href={africaRoutes.team}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              Meet the team
            </Link>
            <Link
              href={africaRoutes.home}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              Back to home
            </Link>
          </div>
        </div>
      </section>

      <div className="border-b border-zinc-200/80 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-950/80 lg:py-20">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <article
            id="assistant-editor-remote"
            className="scroll-mt-8 rounded-3xl border border-zinc-200/80 bg-white p-7 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70 sm:p-10"
          >
            <p className="text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 dark:text-teal-400">Position</p>
            <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-[1.75rem]">
              Assistant Editor — remote
            </h2>
            <p className="mt-5 text-[1.025rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
              Through its Africa Program, RLRI works across the continent to strengthen collaboration among regional and global
              stakeholders, generate locally grounded knowledge, and support policy-relevant research and action that drives
              meaningful impact.
            </p>

            <h3 className={subheadingClass}>The role</h3>
            <p className="mt-3 text-[1.025rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
              The Assistant Editor ensures that all RLRI outputs and publications meet high standards of English writing and
              reports to the Managing Editor.
            </p>

            <h3 className={subheadingClass}>Responsibilities</h3>
            <ul className={bulletListClass}>
              <li className={listItemClass}>
                Fact-check, copy-edit, and proofread all RLRI–Africa Program outputs (op-eds, policy briefs, digital content)
                for clarity, coherence, and accuracy.
              </li>
              <li className={listItemClass}>
                Act as a liaison between peer reviewers and writers of policy briefs to ensure quality, consistency, and
                rigor across outputs.
              </li>
              <li className={listItemClass}>
                Ensure policy briefs and other knowledge products meet quality and metadata requirements for DOI assignment
                and long-term scholarly visibility.
              </li>
              <li className={listItemClass}>
                Help manage the editorial calendar and the timely publication of materials.
              </li>
              <li className={listItemClass}>
                Maintain consistency in style, tone, and format across published content.
              </li>
              <li className={listItemClass}>
                Provide constructive feedback to writers and contribute to content improvement.
              </li>
              <li className={listItemClass}>
                Coordinate with writers, editors, and designers for smooth workflow and on-time delivery.
              </li>
            </ul>

            <h3 className={subheadingClass}>Requirements</h3>
            <ul className={bulletListClass}>
              <li className={listItemClass}>
                Advanced training and/or substantial professional experience in editing, writing, or communications in
                policy, research, or development settings.
              </li>
              <li className={listItemClass}>
                Strong English copy-editing and proofreading with attention to detail and narrative flow.
              </li>
              <li className={listItemClass}>
                Proven experience as a blog or policy brief editor, or in a similar editorial role.
              </li>
              <li className={listItemClass}>
                A verifiable portfolio, including examples of previously edited or published articles.
              </li>
              <li className={listItemClass}>
                Strong organizational and communication skills; able to work independently and collaboratively in a
                fast-paced environment.
              </li>
              <li className={listItemClass}>
                Flexibility in managing shifting priorities, deadlines, and evolving editorial needs.
              </li>
            </ul>

            <h3 className={subheadingClass}>Application status</h3>
            <p className="mt-3 text-[1.025rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
              This position is currently closed. Applications were accepted through{" "}
              <strong className="font-medium text-zinc-800 dark:text-zinc-200">{APPLICATION_CLOSED_AT}</strong>. The full
              posting remains available in case the role is reopened after screening. For HR questions, contact{" "}
              <a
                href={`mailto:${africaEmails.hrSupport}?subject=HR%20inquiry%20%E2%80%94%20RLRI%20careers`}
                className="font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-400"
              >
                {africaEmails.hrSupport}
              </a>
              .
            </p>
            <ul className={bulletListClass}>
              <li className={listItemClass}>
                Two to three writing or editing samples showing relevant experience for research institutions, think tanks,
                or similar organizations. Samples may include published work or before-and-after editing (where
                permissible).
              </li>
              <li className={listItemClass}>Curriculum vitae and cover letter.</li>
            </ul>
            <p className="mt-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              Real Life Research Institute is an equal opportunity employer. We believe that staff diversity contributes to
              excellence. We thank all applicants; only shortlisted candidates will be contacted.
            </p>
            <p className="mt-4 text-sm leading-relaxed text-zinc-500 dark:text-zinc-500">
              More about the Africa Program:{" "}
              <a
                href={AFRICA_PROGRAM_URL}
                className="font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-400"
                rel="noreferrer"
              >
                africa-programs.reallifeinstitute.org
              </a>
            </p>
          </article>
        </div>
      </div>

      <section className="border-t border-zinc-200/80 bg-white py-14 dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto max-w-2xl px-4 text-center sm:px-6 lg:px-8">
          <p className="text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Looking for a volunteer role? See{" "}
            <Link
              href={`${africaRoutes.volunteers}#iqaluit-summer-2026`}
              className="font-semibold text-teal-700 underline-offset-4 hover:underline dark:text-teal-400"
            >
              Volunteers
            </Link>{" "}
            (including the Iqaluit summer student program). Applications:{" "}
            <a
              href={`mailto:${africaEmails.jobsHr}`}
              className="font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-400"
            >
              {africaEmails.jobsHr}
            </a>
            . General HR:{" "}
            <a
              href={`mailto:${africaEmails.hrSupport}`}
              className="font-medium text-teal-700 underline-offset-4 hover:underline dark:text-teal-400"
            >
              {africaEmails.hrSupport}
            </a>
            .
          </p>
        </div>
      </section>
    </>
  );
}
