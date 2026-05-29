import Link from "next/link";
import { programsAnchor } from "@/lib/africa-routes";

const linkClass =
  "font-medium text-teal-800 underline underline-offset-2 transition hover:text-teal-600 dark:text-teal-300 dark:hover:text-teal-200";

const PROGRAM_BY_MONTH = {
  february: {
    href: programsAnchor("05"),
    name: "Food, Environment, and Natural Resources Team",
  },
  march: {
    href: programsAnchor("02"),
    name: "Digital Futures Team",
  },
  april: {
    href: programsAnchor("04"),
    name: "Peacebuilding & Inclusive Dialogues Team",
  },
  may: {
    href: programsAnchor("03"),
    name: "Climate Adaptation & Resilience Team",
  },
  june: {
    href: programsAnchor("04"),
    name: "Peacebuilding & Inclusive Dialogues Team",
  },
} as const;

export type WebinarProgramMonth = keyof typeof PROGRAM_BY_MONTH;

type Props = {
  month: WebinarProgramMonth;
  className?: string;
};

/**
 * Standard attribution line linking a webinar to its supporting program on /africa/programs.
 */
export function WebinarProgramSupportLine({ month, className = "" }: Props) {
  const { href, name } = PROGRAM_BY_MONTH[month];
  return (
    <p className={`text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 ${className}`.trim()}>
      This webinar is supported by the{" "}
      <Link href={href} className={linkClass}>
        {name}
      </Link>
      .
    </p>
  );
}
