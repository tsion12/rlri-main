import { AfricaVideoEmbed } from "@/components/africa/AfricaVideoEmbed";
import { africaVideos } from "@/lib/africa-media";

export function AfricaWebinarIntroSection() {
  return (
    <section
      id="how-webinars-work"
      className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20 lg:py-24"
      aria-labelledby="webinar-intro-heading"
    >
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="grid items-start gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.1fr)] lg:gap-12">
          <div>
            <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
              Webinar series
            </p>
            <h2
              id="webinar-intro-heading"
              className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl"
            >
              How our webinars work
            </h2>
            <p className="mt-4 max-w-xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
              RLRI Africa Programs hosts pan-African online sessions that bring together researchers, policy
              practitioners, and community voices. Each webinar is announced here with registration details,
              live participation guidance, and recordings after the event.
            </p>
            <ul className="mt-6 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
              <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-400" aria-hidden />
                Check upcoming dates and register before the session opens.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-400" aria-hidden />
                Join live for discussion, Q&amp;A, and shared resources from speakers.
              </li>
              <li className="flex gap-3">
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-teal-600 dark:bg-teal-400" aria-hidden />
                Return to past events for recordings and related policy briefs when available.
              </li>
            </ul>
          </div>
          <AfricaVideoEmbed
            src={africaVideos.webinarIntro}
            title="Introduction to RLRI Africa Program webinars"
            caption="A short overview of how we schedule, host, and follow up on our webinar series."
          />
        </div>
      </div>
    </section>
  );
}
