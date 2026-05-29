import type { AfricaProgramKey } from "@/lib/wp";

export type AfricaPolicyBrief = {
  title: string;
  description: string;
  href: string;
  date: string;
  format: string;
  program: AfricaProgramKey;
};

const AFRICA_POLICY_BRIEFS: AfricaPolicyBrief[] = [
  {
    title:
      "IMPROVING WATER AND SANITATION SERVICE DELIVERY IN CAMEROON, ETHIOPIA, KENYA, AND ZIMBABWE: WHAT IS WORKING, WHAT ISN'T, AND WHY?",
    description:
      "Evidence-informed policy brief from RLRI Africa Program. Download the full PDF for findings and recommendations.",
    href: "https://cms-programs.reallifeinstitute.org/wp-content/uploads/2026/04/Policy-Brief-FEBRUARY-1.pdf",
    date: "April 2026",
    format: "PDF",
    program: "health-systems-equity-social-transformation",
  },
];

export function getAfricaPolicyBriefs() {
  return [...AFRICA_POLICY_BRIEFS];
}

export function getPolicyBriefsForProgram(program: AfricaProgramKey) {
  return AFRICA_POLICY_BRIEFS.filter((brief) => brief.program === program);
}
