import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import { WebinarProgramSupportLine } from "@/components/africa/WebinarProgramSupportLine";

const RECORDING_HREF = "https://youtu.be/YD2DqNYMBiY";
const RECORDING_EMBED_HREF = "https://www.youtube.com/embed/YD2DqNYMBiY";

export function AfricaEventEbolaDrcPage() {
  return (
    <>
      <section className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
            Webinar Series | Real Life Research Institute
          </p>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
            How Conflict, Aid Cuts, and Misinformation are Redefining Ebola Responses in DRC
          </h1>
          <p className="mt-3 max-w-5xl text-base font-medium italic leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            What Past Outbreaks Should Have Already Taught Us
          </p>
          <p className="mt-5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Online webinar | Tuesday, June 9, 2026
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Ottawa: 8:00 – 9:00 AM (EDT) | UK: 1:00 – 2:00 PM | West Africa: 1:00 – 2:00 PM | Central
            &amp; Southern Africa: 2:00 – 3:00 PM | East Africa: 3:00 – 4:00 PM
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={RECORDING_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-600"
            >
              Watch recording
            </a>
            <Link
              href={africaRoutes.events}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              Back to events
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-zinc-50 py-12 dark:border-zinc-800 dark:bg-zinc-950 sm:py-16">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Webinar recording</h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Watch the full session from Tuesday, June 9, 2026.
          </p>
          <div className="mt-6 overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-950 shadow-sm dark:border-zinc-800">
            <iframe
              className="aspect-video w-full"
              src={RECORDING_EMBED_HREF}
              title="How Conflict, Aid Cuts, and Misinformation are Redefining Ebola Responses in DRC — webinar recording"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Webinar overview</h2>

          <p className="mt-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Nearly five decades after Ebola was first identified in Yambuku, DRC, the country is currently
            grappling with its 17th Ebola outbreak. The current outbreak is caused by the Bundibugyo strain,
            which currently has no vaccine and has a high fatality rate. The virus continues to spread due to a
            combination of factors, including misinformation, conflict, and aid cuts.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Health responses are too often entangled with military presence, reinforcing perceptions of
            repression rather than care. Communities have seen relatives taken to treatment centres and never
            returned; burial practices are disrupted without dialogue; and deeply held beliefs are dismissed
            rather than engaged. The result is predictable: resistance, misinformation, and at times, violent
            backlash against response efforts themselves.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Although the DRC has solid experience in Ebola response, externally driven approaches might be
            sidelining what already works. At the same time, neighboring states and countries further afield
            remain primarily focused on preventing exported cases, rather than strengthening response at the
            source. This not only complicates local containment efforts but risks accelerating regional and
            global spillover, leaving even distant systems more exposed.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Purpose of the webinar</h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            This webinar attempts to answer the question: Why does Ebola persist in the DRC despite decades of
            response experience? Key speakers and participants will examine what must change to stop outbreaks at
            their source before they spread beyond it. The session will also discuss how community perspectives
            and lived realities reveal the social and cultural dynamics that continue to shape transmission.
          </p>

          <h2 className="mt-10 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
            Moderator and speakers
          </h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Moderator and speakers to be announced later.
          </p>

          <WebinarProgramSupportLine program="05" className="mt-8" />
        </div>
      </section>
    </>
  );
}
