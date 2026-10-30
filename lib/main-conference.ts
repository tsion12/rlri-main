import type { TranslationKey } from "@/lib/i18n/messages/en";
import { mainGallerySrc } from "@/lib/main-gallery";

/**
 * Real Life Conference on Arctic Security — March 11–13, 2027 at
 * Nunavut Arctic College, Nunatta Campus, Iqaluit.
 */
export const CONFERENCE_HERO_IMAGE = mainGallerySrc(
  "Rethinking Arctic Security from Iqaluit-conference.jpeg",
);

/** Nunatta Campus, as published by Nunavut Arctic College. */
export const CONFERENCE_VENUE_QUERY =
  "502 Niaqunngusiariaq Road, Iqaluit, NU X0A 2H0";

export const CONFERENCE_MAP_EMBED = `https://maps.google.com/maps?q=${encodeURIComponent(CONFERENCE_VENUE_QUERY)}&z=16&output=embed`;

const DIRECTION_MODES = ["driving", "transit", "bicycling", "walking"] as const;

export type ConferenceDirectionMode = (typeof DIRECTION_MODES)[number];

export function conferenceDirectionsHref(mode: ConferenceDirectionMode): string {
  const params = new URLSearchParams({
    api: "1",
    destination: CONFERENCE_VENUE_QUERY,
    travelmode: mode,
  });
  return `https://www.google.com/maps/dir/?${params.toString()}`;
}

/** MINDS (Mobilizing Insights in Defence and Security) funding-program lockup. */
export const MINDS_LOGO_SRC = "/assets/main-site/minds-logo.jpeg";

/** In-page anchor for the registration form (`/conference#register`). */
export const CONFERENCE_REGISTER_ANCHOR = "register";

export type MainConferenceDay = {
  id: string;
  labelKey: TranslationKey;
  dateKey: TranslationKey;
  themeKey: TranslationKey;
  bodyKey: TranslationKey;
  /** Confirmed resource person, or `undefined` while still "to be confirmed". */
  resourceKey?: TranslationKey;
};

/**
 * Day-by-day agenda. Session-level detail (panelists, breakout questions) stays
 * out until speakers confirm — restore from git history when ready to publish.
 */
export const MAIN_CONFERENCE_DAYS: MainConferenceDay[] = [
  {
    id: "day-1",
    labelKey: "pages.conference.agenda.day1Label",
    dateKey: "pages.conference.agenda.day1Date",
    themeKey: "pages.conference.agenda.day1Theme",
    bodyKey: "pages.conference.agenda.day1Body",
  },
  {
    id: "day-2",
    labelKey: "pages.conference.agenda.day2Label",
    dateKey: "pages.conference.agenda.day2Date",
    themeKey: "pages.conference.agenda.day2Theme",
    bodyKey: "pages.conference.agenda.day2Body",
  },
  {
    id: "day-3",
    labelKey: "pages.conference.agenda.day3Label",
    dateKey: "pages.conference.agenda.day3Date",
    themeKey: "pages.conference.agenda.day3Theme",
    bodyKey: "pages.conference.agenda.day3Body",
  },
];

/** Options in the registration form's "I'm registering as" select. */
export const MAIN_CONFERENCE_ROLES = [
  { value: "participant", labelKey: "pages.conference.register.roleParticipant" },
  { value: "student", labelKey: "pages.conference.register.roleStudent" },
  {
    value: "student-volunteer",
    labelKey: "pages.conference.register.roleStudentVolunteer",
  },
  { value: "speaker", labelKey: "pages.conference.register.roleSpeaker" },
  { value: "media", labelKey: "pages.conference.register.roleMedia" },
  { value: "sponsor", labelKey: "pages.conference.register.roleSponsor" },
] as const satisfies readonly { value: string; labelKey: TranslationKey }[];

export type MainConferenceRole = (typeof MAIN_CONFERENCE_ROLES)[number]["value"];

/** Options in the registration form's attendance radio group. */
export const MAIN_CONFERENCE_ATTENDANCE = [
  { value: "in-person", labelKey: "pages.conference.register.attendInPerson" },
  { value: "online", labelKey: "pages.conference.register.attendOnline" },
] as const satisfies readonly { value: string; labelKey: TranslationKey }[];
