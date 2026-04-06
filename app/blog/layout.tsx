import Link from "next/link";
import { ThemeToggle } from "@/components/ThemeToggle";

export default function BlogLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="blog-shell-bg flex min-h-full flex-col">
      <header className="sticky top-0 z-20 border-b border-stone-200/80 bg-stone-50/75 backdrop-blur-xl dark:border-zinc-800/80 dark:bg-zinc-950/75">
        <div className="mx-auto flex h-14 max-w-3xl items-center justify-between gap-3 px-4 sm:h-16 sm:px-6">
          <Link
            href="/"
            className="group inline-flex items-center gap-2 text-sm font-medium text-stone-500 transition-colors hover:text-stone-900 dark:text-zinc-400 dark:hover:text-zinc-100"
          >
            <span
              aria-hidden
              className="inline-block transition-transform group-hover:-translate-x-0.5"
            >
              ←
            </span>
            Home
          </Link>
          <div className="flex items-center gap-2">
            <ThemeToggle />
            <span className="text-[10px] font-semibold uppercase tracking-[0.35em] text-stone-400 dark:text-zinc-500">
              RLRI
            </span>
          </div>
        </div>
      </header>
      {children}
    </div>
  );
}
