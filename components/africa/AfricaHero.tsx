import Image from "next/image";
import Link from "next/link";
import { blogPostPath, stripHtml, type WpPageHighlight, type WpPostWithSource } from "@/lib/wp";
import { africaRoutes } from "@/lib/africa-routes";
import { africaStock } from "./africa-stock";
import { au } from "./africa-ui";


type Props = {
  featuredPost?: WpPostWithSource | null;
  upcomingEvent?: WpPageHighlight | null;
};

export function AfricaHero({ featuredPost, upcomingEvent }: Props) {
  /** Prioritize events in the hero spotlight when we have any event content. */
  const prioritizeEvent = Boolean(upcomingEvent);
  const featuredPostTitle = featuredPost ? stripHtml(featuredPost.title.rendered) : null;

  const storySpotlight = (
    <article className={`${au.hero.spotlightCard} home-fade-up`} style={{ animationDelay: "280ms" }}>
      <p className={au.hero.spotlightLabel}>Latest Insights</p>
      <h2 className={au.hero.spotlightTitle}>
        {prioritizeEvent
          ? upcomingEvent?.title ?? "Upcoming webinar and event updates"
          : featuredPostTitle ?? "Fresh research and commentary from the Africa journal"}
      </h2>
      <p className={au.hero.spotlightText}>
        {prioritizeEvent
          ? upcomingEvent?.excerpt
            ? trimText(upcomingEvent.excerpt, 150)
            : "Webinars and events are highlighted first in the hero so visitors can quickly find what is happening next."
          : featuredPost
            ? "A new post is live now. Open the latest article directly from the hero."
            : "Follow the newest research notes, commentary, and institute updates as they are published."}
      </p>
      <div className={au.hero.spotlightMeta}>
        {prioritizeEvent ? (
          <span>
            {upcomingEvent?.eventDateISO
              ? `Event · ${formatDate(upcomingEvent.eventDateISO)}`
              : upcomingEvent
                ? `Updated ${formatDate(upcomingEvent.modified)}`
                : "Live schedule"}
          </span>
        ) : featuredPost ? (
          <>
            <span>{formatDate(featuredPost.date)}</span>
            <span aria-hidden>•</span>
            <span>{featuredPost.source === "africa" ? "Africa Program" : "Main Institute"}</span>
          </>
        ) : (
          <span>Live from the journal</span>
        )}
      </div>
      <Link
        href={prioritizeEvent ? africaRoutes.events : featuredPost ? blogPostPath(featuredPost) : "/blog"}
        className={au.hero.spotlightLink}
      >
        {prioritizeEvent ? "See events" : "Read latest"}
        <span aria-hidden>→</span>
      </Link>
    </article>
  );

  const eventSpotlight = (
    <article className={`${au.hero.spotlightCard} home-fade-up`} style={{ animationDelay: "360ms" }}>
      <p className={au.hero.spotlightLabel}>{prioritizeEvent ? "Latest article" : "Upcoming event"}</p>
      <h2 className={au.hero.spotlightTitle}>
        {prioritizeEvent
          ? featuredPostTitle ?? "Fresh research and commentary from the Africa journal"
          : upcomingEvent?.title ?? "What's coming up next"}
      </h2>
      <p className={au.hero.spotlightText}>
        {prioritizeEvent
          ? featuredPost
            ? "Browse the newest article while keeping upcoming webinars and events front and center."
            : "No recent article is available right now. Visit the journal for the full archive."
          : upcomingEvent
            ? trimText(upcomingEvent.excerpt, 150)
            : "See the latest webinar announcements, registration links, and event details from the Africa Program."}
      </p>
      <div className={au.hero.spotlightMeta}>
        {prioritizeEvent ? (
          featuredPost ? (
            <>
              <span>{formatDate(featuredPost.date)}</span>
              <span aria-hidden>•</span>
              <span>{featuredPost.source === "africa" ? "Africa Program" : "Main Institute"}</span>
            </>
          ) : (
            <span>Live from the journal</span>
          )
        ) : (
          <span>
            {upcomingEvent
              ? upcomingEvent.eventDateISO
                ? `Event · ${formatDate(upcomingEvent.eventDateISO)}`
                : `Updated ${formatDate(upcomingEvent.modified)}`
              : "Live schedule"}
          </span>
        )}
      </div>
      <Link
        href={prioritizeEvent ? (featuredPost ? blogPostPath(featuredPost) : "/blog") : africaRoutes.events}
        className={au.hero.spotlightLink}
      >
        {prioritizeEvent ? "Read article" : "See events"}
        <span aria-hidden>→</span>
      </Link>
    </article>
  );

  const heroImageSrc = prioritizeEvent && upcomingEvent?.featuredImage ? upcomingEvent.featuredImage : africaStock.hero.src;
  const heroImageAlt =
    prioritizeEvent && upcomingEvent
      ? `${upcomingEvent.title} — upcoming event`
      : africaStock.hero.alt;
  const heroCredit =
    prioritizeEvent && upcomingEvent?.featuredImage ? "Image from events page" : africaStock.hero.creditLabel;

  return (
    <section className={au.hero.section} aria-labelledby="africa-hero-heading">
      <div className={au.hero.bloomA} aria-hidden />
      <div className={au.hero.bloomB} aria-hidden />
      <div className={au.hero.grid} aria-hidden />

      <div className={au.hero.inner}>
        <div className={au.hero.gridLayout}>
          <div className={au.hero.colCopy}>
            <p className={au.hero.eyebrow}>
              <span className="inline-block size-1.5 rounded-full bg-teal-500 shadow-[0_0_0_3px_rgba(20,184,166,0.25)] dark:bg-teal-400" />
              Africa Program
            </p>
            <h1 id="africa-hero-heading" className={au.hero.headline}>
              Advancing African-led solutions for sustainable futures
            </h1>
            <p className={au.hero.body}>
              The Real Life Research Institute – Africa Program accelerates actionable research and connects
              African knowledge, policy, and practice to deliver evidence-based solutions with global impact.
            </p>
            <div className={au.hero.statRow}>
              <span className={`${au.hero.statChip} home-fade-up`} style={{ animationDelay: "90ms" }}>
                <span className="size-2 rounded-full bg-teal-500 dark:bg-teal-400" />
                Research-driven
              </span>
              <span className={`${au.hero.statChip} home-fade-up`} style={{ animationDelay: "160ms" }}>
                Policy-oriented
              </span>
              <span className={`${au.hero.statChip} home-fade-up`} style={{ animationDelay: "230ms" }}>
                Implementation-focused
              </span>
            </div>
            <div className={au.hero.ctaRow}>
              {/* <Link href="/blog" className={au.hero.primaryCta}>
                Read the Journal
              </Link> */}
              <a
                href={africaRoutes.canadianProgram}
                className={au.hero.secondaryCta}
                target="_blank"
                rel="noopener noreferrer"
              >
                Explore Our Canadian Program
              </a>
            </div>
            <div className={au.hero.spotlightGrid}>
              {prioritizeEvent ? (
                <>
                  {eventSpotlight}
                  {storySpotlight}
                </>
              ) : (
                <>
                  {storySpotlight}
                  {eventSpotlight}
                </>
              )}
            </div>
          </div>

          <div className={au.hero.colAside}>
            <div className={`${au.hero.mediaStage} home-fade-up`} style={{ animationDelay: "140ms" }}>
              <div className={`${au.hero.mediaShell} group`}>
                <div className={au.hero.mediaFrame}>
                  <Image
                    src={heroImageSrc}
                    alt={heroImageAlt}
                    fill
                    priority
                    sizes="(max-width: 1024px) 100vw, 42vw"
                    className={au.hero.mediaImage}
                  />
                  <div className={au.hero.mediaOverlay}>
                    <p className={au.hero.mediaKicker}>
                      {prioritizeEvent ? "Featured event" : "Featured story"}
                    </p>
                    {prioritizeEvent && upcomingEvent ? (
                      <>
                        <p className={au.hero.mediaHeading}>{upcomingEvent.title}</p>
                        {upcomingEvent.excerpt ? (
                          <p className="mt-2 line-clamp-3 text-sm leading-relaxed text-white/85">
                            {trimText(upcomingEvent.excerpt, 180)}
                          </p>
                        ) : null}
                        <p className={au.hero.mediaMeta}>
                          <span className="inline-block size-1.5 rounded-full bg-amber-300" />
                          {upcomingEvent.eventDateISO
                            ? `${formatDate(upcomingEvent.eventDateISO)} · Webinar`
                            : `${formatDate(upcomingEvent.modified)} · Events`}
                        </p>
                        <Link
                          href={africaRoutes.events}
                          className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/18"
                        >
                          View event details
                          <span aria-hidden>→</span>
                        </Link>
                      </>
                    ) : (
                      <>
                        <p
                          className={au.hero.mediaHeading}
                          dangerouslySetInnerHTML={{
                            __html:
                              featuredPost?.title.rendered ?? "Research, learning, and local leadership in motion.",
                          }}
                        />
                        <p className={au.hero.mediaMeta}>
                          <span className="inline-block size-1.5 rounded-full bg-teal-300" />
                          {featuredPost ? formatDate(featuredPost.date) : "Fresh updates from the journal"}
                        </p>
                        <Link
                          href={featuredPost ? blogPostPath(featuredPost) : "/blog"}
                          className="mt-4 inline-flex items-center gap-2 rounded-full bg-white/12 px-4 py-2 text-sm font-medium text-white backdrop-blur-sm transition hover:bg-white/18"
                        >
                          Open featured story
                          <span aria-hidden>→</span>
                        </Link>
                      </>
                    )}
                    <p className="mt-2 text-xs text-white/60">{heroCredit}</p>
                  </div>
                </div>
              </div>
              <div className={`${au.hero.floatingCard} home-float-slow hidden sm:block`}>
                <p className="font-semibold tracking-tight">Latest Insights</p>
              </div>
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}

function formatDate(value: string) {
  return new Intl.DateTimeFormat("en-US", {
    month: "short",
    day: "numeric",
    year: "numeric",
  }).format(new Date(value));
}

function trimText(text: string, limit: number) {
  return text.length > limit ? `${text.slice(0, limit - 1).trimEnd()}…` : text;
}

