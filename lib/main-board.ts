/**
 * Canadian Board of Directors — rendered on the About Us page.
 *
 * Portraits live in `public/assets/board/` (square, white-matted webp).
 * A member whose portrait has not been submitted yet uses `photo: null`,
 * which renders an initials monogram until a photo is added here.
 *
 * Role labels are translated: each `roleKey` resolves to
 * `pages.aboutUs.board.roles.<roleKey>` in the i18n message files.
 */
export type BoardRoleKey =
  | "chair"
  | "viceChair"
  | "strategicOperations"
  | "programs"
  | "policyAdvisor";

export type BoardMember = {
  id: string;
  name: string;
  roleKey: BoardRoleKey;
  /** Public path under `/assets/board/`, or null when awaiting a photo. */
  photo: string | null;
};

/** Listed in governance seniority: Chair, Vice Chair, then directors. */
export const CANADIAN_BOARD_MEMBERS: BoardMember[] = [
  {
    id: "william-rowsell",
    name: "William Rowsell",
    roleKey: "chair",
    photo: "/assets/board/William-Rowsell.webp",
  },
  {
    id: "derek-derosie",
    name: "Derek DeRosie",
    roleKey: "viceChair",
    photo: "/assets/board/Derek-DeRosie.webp",
  },
  {
    id: "yousaf-hamed",
    name: "Yousaf Hamed",
    roleKey: "strategicOperations",
    photo: "/assets/board/Yousaf-Hamed.webp",
  },
  {
    id: "ernest-lequimboh",
    name: "Ernest Lequimboh",
    roleKey: "policyAdvisor",
    photo: "/assets/board/Ernest-Lequimboh.webp",
  },
  {
    id: "kyleigh-rosset",
    name: "Kyleigh Rosset",
    roleKey: "programs",
    photo: "/assets/board/Kyleigh-Rosset.webp",
  },
];

/** First letters of the first two name parts, for the no-photo monogram. */
export function boardMemberInitials(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}
