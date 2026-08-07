import type { TranslationKey } from "@/lib/i18n/messages/en";
import { mainGallerySrc } from "@/lib/main-gallery";
import { mainRoutes } from "@/lib/main-routes";

export type MainInstituteEvent = {
  id: string;
  /**
   * ISO date on which the event stops being something a visitor can still turn
   * up to. Drives both the ordering and the upcoming/past split, so the
   * calendar cannot keep advertising a program that has already run — the old
   * hardcoded `timing` flag had to be edited by hand and silently went stale.
   */
  endDate: string;
  /** Filename inside `public/assets/main-gallery/` (not necessarily part of the home gallery). */
  image: string;
  /** When true, the card shows a designed placeholder instead of `image` (e.g. an event with no representative photo yet). */
  placeholder?: boolean;
  titleKey: TranslationKey;
  summaryKey: TranslationKey;
  whenKey: TranslationKey;
  whereKey: TranslationKey;
  programKey: TranslationKey;
  tagKeys: TranslationKey[];
  href?: string;
};

/** The Unity Run keeps its own headline slot in the past-events section. */
export const MAIN_PAST_GATHERING: MainInstituteEvent = {
  id: "love-unity-run",
  endDate: "2025-08-23",
  image: "WhatsApp Image 2025-08-23 at 19.07.50 (1).jpeg",
  titleKey: "pages.events.items.loveUnityRun.title",
  summaryKey: "pages.events.items.loveUnityRun.summary",
  whenKey: "pages.events.items.loveUnityRun.when",
  whereKey: "pages.events.items.loveUnityRun.where",
  programKey: "pages.events.items.loveUnityRun.program",
  tagKeys: ["pages.events.tags.community", "pages.events.tags.sport"],
  href: `${mainRoutes.home}#main-events-gallery`,
};

/** Every dated RLRI program, newest end date last. Split by `getMainInstituteEvents`. */
export const MAIN_INSTITUTE_EVENTS: MainInstituteEvent[] = [
  {
    id: "arctic-security-conference-2026",
    endDate: "2026-10-24",
    // Conference has not happened yet — show a designed placeholder, not a photo.
    image: "Rethinking Arctic Security from Iqaluit-conference.jpeg",
    placeholder: true,
    titleKey: "pages.events.items.arcticConference.title",
    summaryKey: "pages.events.items.arcticConference.summary",
    whenKey: "pages.events.items.arcticConference.when",
    whereKey: "pages.events.items.arcticConference.where",
    programKey: "pages.events.items.arcticConference.program",
    tagKeys: ["pages.events.tags.arcticSecurity", "pages.events.tags.community"],
    href: mainRoutes.conference,
  },
  {
    id: "unity-race-2026",
    endDate: "2026-07-01",
    image: "Supporting Well-Being Across the North.jpg",
    titleKey: "pages.events.items.unityRace.title",
    summaryKey: "pages.events.items.unityRace.summary",
    whenKey: "pages.events.items.unityRace.when",
    whereKey: "pages.events.items.unityRace.where",
    programKey: "pages.events.items.unityRace.program",
    tagKeys: ["pages.events.tags.community", "pages.events.tags.arcticSecurity"],
    href: mainRoutes.arcticSecurity,
  },
  {
    id: "community-soccer-2026",
    endDate: "2026-06-15",
    image: "Community Soccer initiative.jpeg",
    titleKey: "pages.events.items.communitySoccer.title",
    summaryKey: "pages.events.items.communitySoccer.summary",
    whenKey: "pages.events.items.communitySoccer.when",
    whereKey: "pages.events.items.communitySoccer.where",
    programKey: "pages.events.items.communitySoccer.program",
    tagKeys: ["pages.events.tags.youth", "pages.events.tags.community"],
    href: mainRoutes.arcticSecurity,
  },
  {
    id: "summer-celebrations-2026",
    // The listing is a call for student volunteers, and that intake closed on
    // 15 May 2026 (see `pages.volunteer.applyBody`), so it stops being
    // something a visitor can act on well before the celebrations wrap up.
    endDate: "2026-05-15",
    image: "REAL LIFE INSTITUTE 1-10.jpg",
    titleKey: "pages.events.items.summerCelebrations.title",
    summaryKey: "pages.events.items.summerCelebrations.summary",
    whenKey: "pages.events.items.summerCelebrations.when",
    whereKey: "pages.events.items.summerCelebrations.where",
    programKey: "pages.events.items.summerCelebrations.program",
    tagKeys: ["pages.events.tags.volunteer", "pages.events.tags.community"],
    href: mainRoutes.volunteer,
  },
];

/** `YYYY-MM-DD` in local time, so the split flips at local midnight. */
function isoDay(date: Date) {
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(
    date.getDate(),
  ).padStart(2, "0")}`;
}

/**
 * Split the calendar on today's date: soonest first for what is still ahead,
 * most recent first for what has already run.
 *
 * The events route is statically rendered, so "today" is the moment the page
 * was generated — see the `revalidate` export in `app/[locale]/events/page.tsx`,
 * which re-renders daily so a long-lived deployment cannot go stale.
 */
export function getMainInstituteEvents(now = new Date()) {
  const today = isoDay(now);
  const upcoming = MAIN_INSTITUTE_EVENTS.filter((event) => event.endDate >= today).sort((a, b) =>
    a.endDate.localeCompare(b.endDate),
  );
  const past = MAIN_INSTITUTE_EVENTS.filter((event) => event.endDate < today).sort((a, b) =>
    b.endDate.localeCompare(a.endDate),
  );
  return { upcoming, past };
}

export const MULTICULTURALISM_DAY_FLYER = "/assets/main-events/multiculturalism-day-2026-flyer.png";

export const MULTICULTURALISM_GALLERY_BASE = "/assets/main-gallery/multi-culturism";

export const MULTICULTURALISM_GALLERY_FILES = [
  "WhatsApp Image 2026-06-27 at 19.51.26.jpeg",
  "WhatsApp Image 2026-06-27 at 19.51.26 (1).jpeg",
  "WhatsApp Image 2026-06-27 at 19.51.26 (2).jpeg",
  "WhatsApp Image 2026-06-27 at 19.51.27.jpeg",
  "WhatsApp Image 2026-06-27 at 19.51.27 (1).jpeg",
  "WhatsApp Image 2026-06-28 at 06.31.45.jpeg",
  "WhatsApp Image 2026-06-28 at 06.31.47.jpeg",
  "WhatsApp Image 2026-06-28 at 06.31.48.jpeg",
  "WhatsApp Image 2026-06-28 at 06.32.39.jpeg",
  "WhatsApp Image 2026-06-28 at 06.32.43.jpeg",
  "WhatsApp Image 2026-06-28 at 06.32.44.jpeg",
  "WhatsApp Image 2026-06-28 at 06.32.48.jpeg",
  "WhatsApp Image 2026-06-28 at 06.32.50.jpeg",
  "WhatsApp Image 2026-06-28 at 06.32.52.jpeg",
  "WhatsApp Image 2026-06-28 at 06.32.55.jpeg",
  "WhatsApp Image 2026-06-28 at 06.33.03.jpeg",
  "WhatsApp Image 2026-06-28 at 06.33.05.jpeg",
  "WhatsApp Image 2026-06-28 at 06.33.09.jpeg",
  "WhatsApp Image 2026-06-28 at 06.33.12.jpeg",
  "WhatsApp Image 2026-06-28 at 06.33.20.jpeg",
] as const;

export function multiculturalismGallerySrc(file: string) {
  return `${MULTICULTURALISM_GALLERY_BASE}/${encodeURIComponent(file)}`;
}

export const MULTICULTURALISM_GALLERY_IMAGES = MULTICULTURALISM_GALLERY_FILES.map(
  (file, index) => ({
    id: `multiculturalism-${index}`,
    src: multiculturalismGallerySrc(file),
  }),
);

/**
 * "Community events & celebrations" slide show — a spread across RLRI programming:
 * multiculturalism, the Love & Unity Run, community soccer, and Canada Day.
 */
const EVENTS_HERO_FILES = [
  "Multiculturalism Day 1.jpeg", // Multiculturalism Day table with flags
  "WhatsApp Image 2025-08-23 at 19.07.55 (1).jpeg", // stretching exercises, up close
  "RUNNING-14.jpg", // lady running
  "REAL LIFE INSTITUTE 1-15.jpg", // Indigenous items on display
  "Community Soccer initiative.jpeg", // community soccer team
  "Celebrate Canada pictures 1.jpeg", // Canada Day celebration
] as const;

export const EVENTS_HERO_IMAGES = EVENTS_HERO_FILES.map((file, index) => ({
  id: `events-hero-${index}`,
  src: mainGallerySrc(file),
}));

export const EVENTS_HERO_INTERVAL_MS = 2800;

export const MULTICULTURALISM_DAY_AGENDA = [
  { activityKey: "pages.events.recent.multiculturalismDay.agenda.protocol", start: "1:30 PM", end: "2:00 PM" },
  { activityKey: "pages.events.recent.multiculturalismDay.agenda.food", start: "2:00 PM", end: "4:00 PM" },
  { activityKey: "pages.events.recent.multiculturalismDay.agenda.family", start: "3:00 PM", end: "4:00 PM" },
  { activityKey: "pages.events.recent.multiculturalismDay.agenda.shows", start: "4:00 PM", end: "6:00 PM" },
  { activityKey: "pages.events.recent.multiculturalismDay.agenda.dance", start: "6:00 PM", end: "7:00 PM" },
  { activityKey: "pages.events.recent.multiculturalismDay.agenda.teardown", start: "7:00 PM", end: "8:00 PM" },
] as const;

export const MULTICULTURALISM_DAY_PROTOCOL = [
  "pages.events.recent.multiculturalismDay.protocol.landAcknowledgement",
  "pages.events.recent.multiculturalismDay.protocol.unityToast",
  "pages.events.recent.multiculturalismDay.protocol.groupPhoto",
] as const;

export const MULTICULTURALISM_DAY_PROGRAM = [
  "pages.events.recent.multiculturalismDay.program.tasting",
  "pages.events.recent.multiculturalismDay.program.meal",
  "pages.events.recent.multiculturalismDay.program.performances",
] as const;

export const MULTICULTURALISM_DAY_NOTES = [
  "pages.events.recent.multiculturalismDay.notes.regalia",
  "pages.events.recent.multiculturalismDay.notes.freeEntry",
  "pages.events.recent.multiculturalismDay.notes.takeaways",
] as const;
