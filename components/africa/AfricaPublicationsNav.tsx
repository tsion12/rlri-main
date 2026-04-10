import Link from "next/link";

export const PUB_SUBNAV = [
  { id: "blogs", label: "Blogs & Op-eds", href: "/africa/publications/blogs" },
  { id: "stories", label: "Stories", href: "/africa/publications/stories" },
  { id: "policy-briefs", label: "Policy briefs", href: "/africa/publications/policy-briefs" },
] as const;

export type PubSection = (typeof PUB_SUBNAV)[number]["id"];

export function PubSubNav({ active }: { active: PubSection }) {
  return (
    <nav
      className="border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950"
      aria-label="Publication sections"
    >
      <div className="mx-auto flex max-w-7xl gap-1 overflow-x-auto px-4 sm:px-6 lg:px-8">
        {PUB_SUBNAV.map(({ id, label, href }) => (
          <Link
            key={id}
            href={href}
            className={`shrink-0 border-b-2 px-3 py-3.5 text-sm font-medium transition-colors sm:px-4 ${
              active === id
                ? "border-teal-600 text-teal-800 dark:border-teal-500 dark:text-teal-300"
                : "border-transparent text-zinc-500 hover:text-zinc-800 dark:text-zinc-400 dark:hover:text-zinc-200"
            }`}
          >
            {label}
          </Link>
        ))}
      </div>
    </nav>
  );
}
