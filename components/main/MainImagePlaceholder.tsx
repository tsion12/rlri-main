import type { CSSProperties } from "react";

/**
 * Designed placeholder used where the doc asks for "a designed placeholder or
 * no picture" — e.g. the Arctic Security Conference (not held yet) and sections
 * where forcing a stock photo would misrepresent the content. Renders an
 * on-brand gradient panel with a subtle motif instead of a photograph.
 *
 * Drop it into any `relative` container the way a `<Image fill>` would sit:
 *   <div className="relative ...">
 *     <MainImagePlaceholder accent="sky" />
 *   </div>
 *
 * - `variant="overlay"` — bare gradient meant to sit *behind* overlaid text
 *   (hero bands). No emblem, so the copy stays readable.
 * - `variant="panel"` — self-contained image stand-in with a centred emblem,
 *   for side-by-side "photo card" slots.
 */

type Accent = "teal" | "sky";
type Variant = "overlay" | "panel";

const ACCENT: Record<
  Accent,
  { gradient: string; glow: string; emblem: string }
> = {
  teal: {
    gradient: "bg-linear-to-br from-teal-900 via-teal-950 to-zinc-950",
    glow: "bg-[radial-gradient(ellipse_70%_60%_at_30%_35%,rgba(45,212,191,0.22),transparent_60%)]",
    emblem: "text-teal-200/25",
  },
  sky: {
    gradient: "bg-linear-to-br from-slate-900 via-slate-800 to-sky-950",
    glow: "bg-[radial-gradient(ellipse_75%_60%_at_35%_30%,rgba(56,189,248,0.22),transparent_60%)]",
    emblem: "text-sky-200/25",
  },
};

const GRID =
  "bg-[linear-gradient(to_right,rgba(255,255,255,0.05)_1px,transparent_1px),linear-gradient(to_bottom,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_78%)]";

type Props = {
  accent?: Accent;
  variant?: Variant;
  /** Extra classes for the root layer (positioning, rounding, etc.). */
  className?: string;
  style?: CSSProperties;
};

export function MainImagePlaceholder({
  accent = "teal",
  variant = "panel",
  className = "absolute inset-0",
  style,
}: Props) {
  const a = ACCENT[accent];

  return (
    <div
      className={`overflow-hidden ${a.gradient} ${className}`}
      style={style}
      aria-hidden
    >
      <div className={`pointer-events-none absolute inset-0 ${a.glow}`} />
      <div className={`pointer-events-none absolute inset-0 ${GRID}`} />
      {variant === "panel" ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <svg
            viewBox="0 0 64 64"
            className={`h-16 w-16 ${a.emblem}`}
            fill="none"
            stroke="currentColor"
            strokeWidth="1.5"
          >
            <circle cx="32" cy="32" r="21" />
            <path
              d="M32 6 L36 28 L58 32 L36 36 L32 58 L28 36 L6 32 L28 28 Z"
              fill="currentColor"
              stroke="none"
            />
          </svg>
        </div>
      ) : null}
    </div>
  );
}
