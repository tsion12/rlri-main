import type { AfricaWebinarEvent } from "@/lib/africa-events";

export const TWENTY_FOUR_HOURS_MS = 24 * 60 * 60 * 1000;

export type AfricaEventPhase = "countdown" | "starting-soon" | "live" | "ended";

export function getEventEndMs(event: Pick<AfricaWebinarEvent, "isoDate" | "durationMinutes">): number {
  const duration = event.durationMinutes ?? 90;
  return new Date(event.isoDate).getTime() + duration * 60 * 1000;
}

export function getEventEndIso(event: Pick<AfricaWebinarEvent, "isoDate" | "durationMinutes">): string {
  return new Date(getEventEndMs(event)).toISOString();
}

export function getEventPhase(
  event: Pick<AfricaWebinarEvent, "isoDate" | "durationMinutes">,
  nowMs = Date.now(),
): AfricaEventPhase {
  const startMs = new Date(event.isoDate).getTime();
  const endMs = getEventEndMs(event);

  if (nowMs >= endMs) return "ended";
  if (nowMs >= startMs) return "live";
  if (startMs - nowMs > TWENTY_FOUR_HOURS_MS) return "countdown";
  return "starting-soon";
}

export function categorizeAfricaEvents(events: AfricaWebinarEvent[], nowMs = Date.now()) {
  const sorted = [...events].sort(
    (a, b) => new Date(a.isoDate).getTime() - new Date(b.isoDate).getTime(),
  );
  const upcoming = sorted.filter((event) => getEventEndMs(event) > nowMs);
  const past = sorted.filter((event) => getEventEndMs(event) <= nowMs).reverse();
  return { upcoming, past };
}
