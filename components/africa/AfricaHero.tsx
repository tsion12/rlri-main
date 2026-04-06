import Image from "next/image";
import Link from "next/link";
import { stripHtml, type WpPageHighlight, type WpPostWithSource } from "@/lib/wp";
import { africaRoutes } from "@/lib/africa-routes";
import { africaStock } from "./africa-stock";
import { au } from "./africa-ui";

const FOCUS_AREAS = [
  {
    title: "Climate resilience",
    body: "Evidence-based adaptation with communities on the front lines of change.",
    icon: ClimateIcon,
  },
  {
    title: "Energy & cities",
    body: "Cleaner energy access and more sustainable, livable urban systems.",
    icon: EnergyIcon,
  },
  {
    title: "Food security",
    body: "Youth-led research and action for secure, equitable food systems.",
    icon: FoodIcon,
  },
] as const;

type Props = {
  featuredPost?: WpPostWithSource | null;
  upcomingEvent?: WpPageHighlight | null;
};

export function AfricaHero({ featuredPost, upcomingEvent }: Props) {
  /** Prefer journal layout unless we parsed a concrete scheduled event from the events page. */
  const prioritizeEvent = Boolean(upcomingEvent?.eventDateISO);
  const featuredPostTitle = featuredPost ? stripHtml(featuredPost.title.rendered) : null;

  const storySpotlight = (
    <article className={`${au.hero.spotlightCard} home-fade-up`} style={{ animationDelay: "280ms" }}>
      <p className={au.hero.spotlightLabel}>Latest story</p>
      <h2 className={au.hero.spotlightTitle}>
        {featuredPostTitle ?? "Fresh research and commentary from the Africa journal"}
      </h2>
      <p className={au.hero.spotlightText}>
        {featuredPost
          ? "A new post is live now. Open the latest article directly from the hero."
          : "Follow the newest research notes, commentary, and institute updates as they are published."}
      </p>
      <div className={au.hero.spotlightMeta}>
        {featuredPost ? (
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
        href={featuredPost ? `/blog/${featuredPost.source}/${featuredPost.slug}` : "/blog"}
        className={au.hero.spotlightLink}
      >
        Read latest
        <span aria-hidden>→</span>
      </Link>
    </article>
  );

  const eventSpotlight = (
    <article className={`${au.hero.spotlightCard} home-fade-up`} style={{ animationDelay: "360ms" }}>
      <p className={au.hero.spotlightLabel}>Upcoming event</p>
      <h2 className={au.hero.spotlightTitle}>
        {upcomingEvent?.title ?? "What's coming up next"}
      </h2>
      <p className={au.hero.spotlightText}>
        {upcomingEvent
          ? trimText(upcomingEvent.excerpt, 150)
          : "See the latest webinar announcements, registration links, and event details from the Africa Program."}
      </p>
      <div className={au.hero.spotlightMeta}>
        <span>
          {upcomingEvent
            ? upcomingEvent.eventDateISO
              ? `Event · ${formatDate(upcomingEvent.eventDateISO)}`
              : `Updated ${formatDate(upcomingEvent.modified)}`
            : "Live schedule"}
        </span>
      </div>
      <Link href={africaRoutes.events} className={au.hero.spotlightLink}>
        See events
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
              Community-driven solutions for Africa
            </h1>
            <p className={au.hero.body}>
              The Real Life Research Institute – Africa Program empowers African youth and communities to
              co-create evidence-based solutions for climate resilience, energy access, urban
              sustainability, and food security.
            </p>
            <div className={au.hero.statRow}>
              <span className={`${au.hero.statChip} home-fade-up`} style={{ animationDelay: "90ms" }}>
                <span className="size-2 rounded-full bg-teal-500 dark:bg-teal-400" />
                Youth-led research
              </span>
              <span className={`${au.hero.statChip} home-fade-up`} style={{ animationDelay: "160ms" }}>
                Pan-African dialogue
              </span>
              <span className={`${au.hero.statChip} home-fade-up`} style={{ animationDelay: "230ms" }}>
                Community-first impact
              </span>
            </div>
            <div className={au.hero.ctaRow}>
              {prioritizeEvent ? (
                <>
                  <Link href={africaRoutes.events} className={au.hero.primaryCta}>
                    Upcoming events
                  </Link>
                  <Link href="/blog" className={au.hero.secondaryCta}>
                    Read the journal
                  </Link>
                </>
              ) : (
                <>
                  <Link href="/blog" className={au.hero.primaryCta}>
                    Read the journal
                  </Link>
                  <Link href={africaRoutes.events} className={au.hero.secondaryCta}>
                    Upcoming events
                  </Link>
                </>
              )}
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
                          href={featuredPost ? `/blog/${featuredPost.source}/${featuredPost.slug}` : "/blog"}
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
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  Next generation
                </p>
                <p className="mt-1 font-semibold tracking-tight">Beautiful research storytelling</p>
              </div>
            </div>

            <div className={`${au.hero.featureCard} mt-6 home-fade-up`} style={{ animationDelay: "220ms" }}>
              <div className={au.hero.featureInner}>
                <p className={au.hero.featureTitle}>Where we focus</p>
                <ul className="mt-6 space-y-1">
                  {FOCUS_AREAS.map(({ title, body, icon: Icon }, index) => (
                    <li
                      key={title}
                      className="home-fade-up"
                      style={{ animationDelay: `${280 + index * 70}ms` }}
                    >
                      <div className={au.hero.focusRow}>
                        <span className={au.hero.focusIcon} aria-hidden>
                          <Icon />
                        </span>
                        <div>
                          <p className={au.hero.focusHeading}>{title}</p>
                          <p className={au.hero.focusText}>{body}</p>
                        </div>
                      </div>
                    </li>
                  ))}
                </ul>
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

function ClimateIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        d="M12 3v3M12 18v3M4.22 4.22l2.12 2.12M17.66 17.66l2.12 2.12M3 12h3M18 12h3M4.22 19.78l2.12-2.12M17.66 6.34l2.12-2.12"
        strokeLinecap="round"
      />
      <circle cx="12" cy="12" r="4" />
    </svg>
  );
}

function EnergyIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path d="M13 2L4 14h7l-1 8 10-12h-7l0-8z" strokeLinejoin="round" strokeLinecap="round" />
    </svg>
  );
}

function FoodIcon() {
  return (
    <svg viewBox="0 0 24 24" className="size-5" fill="none" stroke="currentColor" strokeWidth="1.75" aria-hidden>
      <path
        d="M12 22c4.97 0 9-3.58 9-8 0-3.5-2.5-6-5-8-1.5 1-3 2-4 2s-2.5-1-4-2c-2.5 2-5 4.5-5 8 0 4.42 4.03 8 9 8z"
        strokeLinejoin="round"
      />
      <path d="M12 14v-4M9 12h6" strokeLinecap="round" />
    </svg>
  );
}
