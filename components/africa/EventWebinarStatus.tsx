"use client";

import { useEffect, useState } from "react";
import { getEventPhase, type AfricaEventPhase } from "@/lib/africa-event-schedule";

function getTimeLeft(targetMs: number) {
  const diff = targetMs - Date.now();
  if (diff <= 0) return { days: 0, hours: 0, minutes: 0, seconds: 0 };
  return {
    days: Math.floor(diff / (1000 * 60 * 60 * 24)),
    hours: Math.floor((diff / (1000 * 60 * 60)) % 24),
    minutes: Math.floor((diff / (1000 * 60)) % 60),
    seconds: Math.floor((diff / 1000) % 60),
  };
}

const UNITS = ["days", "hours", "minutes", "seconds"] as const;
const LABELS = { days: "Days", hours: "Hrs", minutes: "Min", seconds: "Sec" };

const PHASE_LABEL: Record<Exclude<AfricaEventPhase, "ended">, string> = {
  countdown: "Countdown to webinar",
  "starting-soon": "Starting soon",
  live: "Live now",
};

type Props = {
  startISO: string;
  endISO: string;
  title: string;
  registerHref?: string | null;
};

export function EventWebinarStatus({ startISO, endISO, title, registerHref }: Props) {
  const startMs = new Date(startISO).getTime();
  const endMs = new Date(endISO).getTime();
  const durationMinutes = Math.round((endMs - startMs) / 60000);
  const [phase, setPhase] = useState<AfricaEventPhase>(() =>
    getEventPhase({ isoDate: startISO, durationMinutes }),
  );
  const [time, setTime] = useState(() => getTimeLeft(startMs));

  useEffect(() => {
    const tick = () => {
      setPhase(getEventPhase({ isoDate: startISO, durationMinutes }));
      setTime(getTimeLeft(startMs));
    };
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startISO, durationMinutes, startMs]);

  if (phase === "ended") return null;

  if (phase === "live") {
    return (
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-200">{PHASE_LABEL.live}</p>
        <p className="mt-1 text-sm text-teal-100">{title}</p>
        <div className="mt-4 flex flex-wrap items-center gap-3">
          <span className="inline-flex items-center gap-2 rounded-full border border-emerald-300/40 bg-emerald-400/15 px-4 py-2 text-sm font-semibold text-emerald-100">
            <span className="relative flex size-2.5">
              <span className="absolute inline-flex size-full animate-ping rounded-full bg-emerald-300 opacity-70" />
              <span className="relative inline-flex size-2.5 rounded-full bg-emerald-300" />
            </span>
            Live now
          </span>
          {registerHref ? (
            <a
              href={registerHref}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-10 items-center justify-center rounded-lg bg-white px-5 text-sm font-semibold text-teal-800 transition hover:bg-teal-50"
            >
              Join webinar
            </a>
          ) : null}
        </div>
      </div>
    );
  }

  if (phase === "starting-soon") {
    return (
      <div>
        <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-200">
          {PHASE_LABEL["starting-soon"]}
        </p>
        <p className="mt-1 text-sm text-teal-100">{title}</p>
        <div className="mt-4 flex flex-wrap gap-2">
          {UNITS.map((unit) => (
            <div
              key={unit}
              className="flex min-w-18 flex-col items-center rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center backdrop-blur-sm"
            >
              <span className="text-2xl font-black tabular-nums leading-none text-white sm:text-3xl">
                {String(time[unit]).padStart(2, "0")}
              </span>
              <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
                {LABELS[unit]}
              </span>
            </div>
          ))}
        </div>
      </div>
    );
  }

  return (
    <div>
      <p className="text-[10px] font-semibold uppercase tracking-[0.2em] text-teal-200">{PHASE_LABEL.countdown}</p>
      <p className="mt-1 text-sm text-teal-100">{title}</p>
      <div className="mt-4 flex flex-wrap gap-2">
        {UNITS.map((unit) => (
          <div
            key={unit}
            className="flex min-w-18 flex-col items-center rounded-2xl border border-white/15 bg-white/10 px-4 py-3 text-center backdrop-blur-sm"
          >
            <span className="text-2xl font-black tabular-nums leading-none text-white sm:text-3xl">
              {String(time[unit]).padStart(2, "0")}
            </span>
            <span className="mt-1 text-[10px] font-bold uppercase tracking-[0.18em] text-white/50">
              {LABELS[unit]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
