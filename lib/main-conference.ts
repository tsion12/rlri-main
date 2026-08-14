import type { TranslationKey } from "@/lib/i18n/messages/en";
import { mainGallerySrc } from "@/lib/main-gallery";

/**
 * Real Life Conference on Arctic Security — October 21, 22 and 23, 2026 at
 * Nunavut Arctic College. The conference has not taken place yet, so the page
 * shows a designed placeholder rather than a photo (see MainConferencePage).
 * Kept here for when real conference photography is available.
 */
export const CONFERENCE_HERO_IMAGE = mainGallerySrc(
  "Rethinking Arctic Security from Iqaluit-conference.jpeg",
);

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
