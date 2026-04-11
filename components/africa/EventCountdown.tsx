"use client";

import { useEffect, useState } from "react";

function getTimeLeft(iso: string) {
  const diff = new Date(iso).getTime() - Date.now();
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

export function EventCountdown({ targetISO }: { targetISO: string }) {
  const [time, setTime] = useState(getTimeLeft(targetISO));

  useEffect(() => {
    const id = setInterval(() => setTime(getTimeLeft(targetISO)), 1000);
    return () => clearInterval(id);
  }, [targetISO]);

  const isOver = Object.values(time).every((v) => v === 0);

  if (isOver) {
    return (
      <p className="text-sm font-semibold text-amber-300">
        This event has started — join now!
      </p>
    );
  }

  return (
    <div className="flex flex-wrap gap-2">
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
  );
}
