import { sourceDisplay, type WpSource } from "@/lib/wp";

export function BlogSourceBadge({ source }: { source: WpSource }) {
  const isMain = source === "main";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
        isMain
          ? "bg-stone-200/90 text-stone-700 dark:bg-zinc-800 dark:text-zinc-300"
          : "bg-emerald-950/25 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200"
      }`}
    >
      {sourceDisplay(source)}
    </span>
  );
}
