"use client";

import { useEffect, useState } from "react";
import { getEventPhase } from "@/lib/africa-event-schedule";

type Props = {
  startISO: string;
  endISO: string;
};

export function HeroEventLiveBadge({ startISO, endISO }: Props) {
  const startMs = new Date(startISO).getTime();
  const endMs = new Date(endISO).getTime();
  const durationMinutes = Math.round((endMs - startMs) / 60000);
  const [live, setLive] = useState(
    () => getEventPhase({ isoDate: startISO, durationMinutes }) === "live",
  );

  useEffect(() => {
    const tick = () => setLive(getEventPhase({ isoDate: startISO, durationMinutes }) === "live");
    tick();
    const id = setInterval(tick, 1000);
    return () => clearInterval(id);
  }, [startISO, durationMinutes]);

  if (!live) return null;

  return (
    <span className="mb-3 inline-flex items-center gap-2 rounded-full border border-emerald-600/30 bg-emerald-50 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.16em] text-emerald-800 dark:border-emerald-500/30 dark:bg-emerald-950/40 dark:text-emerald-300">
      <span className="size-2 animate-pulse rounded-full bg-emerald-500" />
      Live now
    </span>
  );
}
