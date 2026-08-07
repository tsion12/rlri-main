import type { CSSProperties } from "react";

/**
 * Designed placeholder used where the doc asks for "a designed placeholder or
 * no picture" — e.g. the Arctic Security Conference (not held yet) and sections
 * where forcing a stock photo would misrepresent the content. Renders an
 * on-brand "aurora over the tundra" panel instead of a photograph.
 *
 * Drop it into any `relative` container the way a `<Image fill>` would sit:
 *   <div className="relative ...">
 *     <MainImagePlaceholder accent="sky" />
 *   </div>
 *
 * - `variant="overlay"` — the aurora wash on its own, meant to sit *behind*
 *   overlaid text (hero bands). No emblem, and the horizon stays low and dim so
 *   the copy on top keeps its contrast.
 * - `variant="panel"` — self-contained image stand-in with a centred emblem and
 *   a brighter horizon, for side-by-side "photo card" slots.
 *
 * Everything here is deterministic CSS — no randomness, so the server and
 * client markup always agree.
 */

type Accent = "teal" | "sky";
type Variant = "overlay" | "panel";

type AccentTokens = {
  /** Deep base wash behind everything else. */
  gradient: string;
  /** Aurora ribbons, back to front. Each is blurred and tilted on paint. */
  ribbons: readonly string[];
  /** Ground glow sitting just above the horizon line. */
  horizonGlow: string;
  /** Emblem stroke/fill colour. */
  emblem: string;
};

const ACCENT: Record<Accent, AccentTokens> = {
  teal: {
    gradient: "bg-linear-to-br from-teal-900 via-teal-950 to-zinc-950",
    ribbons: [
      "rgba(45,212,191,0.30)",
      "rgba(20,184,166,0.22)",
      "rgba(167,139,250,0.16)",
    ],
    horizonGlow: "rgba(45,212,191,0.22)",
    emblem: "text-teal-200/30",
  },
  sky: {
    gradient: "bg-linear-to-br from-slate-900 via-slate-800 to-sky-950",
    ribbons: [
      "rgba(56,189,248,0.30)",
      "rgba(125,211,252,0.20)",
      "rgba(129,140,248,0.18)",
    ],
    horizonGlow: "rgba(56,189,248,0.22)",
    emblem: "text-sky-200/30",
  },
};

/** Tilt, horizontal drift and thickness for each aurora ribbon. */
const RIBBON_LAYOUT = [
  { rotate: -18, x: "-12%", width: "150%", top: "-18%", height: "72%" },
  { rotate: -9, x: "4%", width: "130%", top: "2%", height: "58%" },
  { rotate: -26, x: "-22%", width: "140%", top: "-6%", height: "48%" },
] as const;

/**
 * Star field, as three tiled dot layers of different sizes and spacings so the
 * repeat never reads as a regular lattice.
 */
const STARS: CSSProperties = {
  backgroundImage: [
    "radial-gradient(1.4px 1.4px at 17px 24px, rgba(255,255,255,0.55), transparent)",
    "radial-gradient(1px 1px at 83px 61px, rgba(255,255,255,0.40), transparent)",
    "radial-gradient(1.1px 1.1px at 131px 19px, rgba(255,255,255,0.30), transparent)",
  ].join(","),
  backgroundSize: "190px 150px, 170px 130px, 210px 170px",
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
  const isPanel = variant === "panel";

  return (
    <div
      className={`overflow-hidden ${a.gradient} ${className}`}
      style={style}
      aria-hidden
    >
      {/* Aurora ribbons */}
      {a.ribbons.map((colour, i) => {
        const layout = RIBBON_LAYOUT[i];
        return (
          <div
            key={colour}
            className="pointer-events-none absolute blur-3xl"
            style={{
              left: layout.x,
              top: layout.top,
              width: layout.width,
              height: layout.height,
              transform: `rotate(${layout.rotate}deg)`,
              background: `linear-gradient(to bottom, transparent 0%, ${colour} 45%, transparent 100%)`,
            }}
          />
        );
      })}

      {/* Star field, brightest at the top where the sky is darkest */}
      <div
        className="pointer-events-none absolute inset-0 [mask-image:linear-gradient(to_bottom,black_5%,transparent_65%)]"
        style={STARS}
      />

      {/* Grid motif, shared with the rest of the site */}
      <div className={`pointer-events-none absolute inset-0 ${GRID}`} />

      {/* Tundra horizon: a soft ridge with the aurora glowing behind it */}
      <div
        className={`pointer-events-none absolute inset-x-0 bottom-0 ${
          isPanel ? "h-[38%]" : "h-[30%] opacity-70"
        }`}
      >
        <div
          className="absolute inset-x-0 bottom-0 h-full"
          style={{
            background: `linear-gradient(to top, transparent, ${a.horizonGlow})`,
            maskImage: "linear-gradient(to top, black, transparent 85%)",
          }}
        />
        <svg
          className="absolute inset-0 h-full w-full"
          viewBox="0 0 400 100"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M0 62 L48 47 L96 58 L150 34 L205 55 L252 41 L310 60 L356 49 L400 61 L400 100 L0 100 Z"
            fill="rgba(9,9,11,0.72)"
          />
          <path
            d="M0 78 L62 66 L128 76 L196 60 L266 74 L330 64 L400 77 L400 100 L0 100 Z"
            fill="rgba(9,9,11,0.9)"
          />
        </svg>
      </div>

      {/* Vignette, so the panel reads as a framed image rather than a flat fill */}
      <div
        className="pointer-events-none absolute inset-0"
        style={{
          background:
            "radial-gradient(ellipse 75% 70% at 50% 45%, transparent 40%, rgba(9,9,11,0.45) 100%)",
        }}
      />

      {isPanel ? (
        <div className="absolute inset-0 flex items-center justify-center">
          <div
            className={`flex size-28 items-center justify-center rounded-full border border-current ${a.emblem}`}
          >
            <svg
              viewBox="0 0 64 64"
              className="h-14 w-14"
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
        </div>
      ) : null}
    </div>
  );
}
