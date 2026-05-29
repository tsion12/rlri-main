import Link from "next/link";
import { programsAnchor } from "@/lib/africa-routes";
import type { WebinarProgramOrdinal } from "@/lib/africa-events";

const linkClass =
  "font-medium text-teal-800 underline underline-offset-2 transition hover:text-teal-600 dark:text-teal-300 dark:hover:text-teal-200";

const PROGRAM_BY_ORDINAL = {
  "01": {
    href: programsAnchor("01"),
    name: "Oceans Team",
  },
  "02": {
    href: programsAnchor("02"),
    name: "Digital Futures Team",
  },
  "03": {
    href: programsAnchor("03"),
    name: "Climate Adaptation & Resilience Team",
  },
  "04": {
    href: programsAnchor("04"),
    name: "Peacebuilding & Inclusive Dialogues Team",
  },
  "05": {
    href: programsAnchor("05"),
    name: "Health Systems, Equity, and Social Transformation Team",
  },
} as const;

type Props = {
  program: WebinarProgramOrdinal;
  className?: string;
};

/**
 * Standard attribution line linking a webinar to its supporting program on /africa/programs.
 */
export function WebinarProgramSupportLine({ program, className = "" }: Props) {
  const { href, name } = PROGRAM_BY_ORDINAL[program];
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
