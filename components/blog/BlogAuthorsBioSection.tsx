import Image from "next/image";
import Link from "next/link";
import { resolveAuthorPhoto } from "@/lib/blog-author-photos";

export type BlogAuthorBio = {
  name: string;
  role: string;
  bio?: string;
  avatar?: string | null;
  linkedin?: string;
};

function authorInitial(name: string) {
  return name.replace(/^Dr\.\s+/i, "").charAt(0).toUpperCase();
}

function LinkedInIcon() {
  return (
    <svg className="h-3.5 w-3.5" viewBox="0 0 24 24" fill="currentColor" aria-hidden>
      <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
    </svg>
  );
}

function AuthorPortrait({ name, avatar }: { name: string; avatar: string | null }) {
  if (avatar) {
    return (
      <div className="relative mx-auto size-16 overflow-hidden rounded-full border border-teal-200/80 bg-white shadow-sm ring-1 ring-teal-950/5 dark:border-teal-800/60 dark:bg-zinc-900 dark:ring-white/5 sm:size-20">
        <Image src={avatar} alt={name} fill className="object-cover object-top" sizes="80px" />
      </div>
    );
  }

  const initial = authorInitial(name);
  return (
    <div
      aria-hidden
      className="relative mx-auto flex size-16 items-center justify-center overflow-hidden rounded-full border border-teal-200/90 bg-linear-to-br from-teal-50 to-white text-base font-semibold text-teal-800 shadow-sm dark:border-teal-800/60 dark:from-teal-950/50 dark:to-zinc-900 dark:text-teal-200 sm:size-20"
    >
      {initial}
    </div>
  );
}

function AuthorEntry({
  author,
  index,
  total,
}: {
  author: BlogAuthorBio;
  index: number;
  total: number;
}) {
  const photo = resolveAuthorPhoto(author.name, author.avatar);
  const bio = author.bio?.trim() ?? "";

  return (
    <article className="px-6 py-6 sm:px-8 sm:py-7">
      <div className={`flex flex-col gap-5 ${bio ? "sm:flex-row sm:gap-6" : "sm:items-center sm:justify-center"}`}>
        <div className="flex w-44 shrink-0 flex-col items-center gap-2.5 text-center">
          <AuthorPortrait name={author.name} avatar={photo} />
          <div className="w-full text-center">
            <p className="text-sm font-semibold leading-snug tracking-tight text-stone-900 dark:text-zinc-50">
              {author.name}
            </p>
            <p className="mt-1 text-xs font-medium leading-snug text-teal-800/90 dark:text-teal-300/90">{author.role}</p>
            {author.linkedin ? (
              <Link
                href={author.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-3 inline-flex items-center gap-1.5 text-xs font-semibold text-teal-700 underline-offset-2 transition hover:text-teal-900 hover:underline dark:text-teal-400 dark:hover:text-teal-200"
              >
                <LinkedInIcon />
                LinkedIn profile
              </Link>
            ) : null}
          </div>
          {total > 1 ? (
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-stone-400 dark:text-zinc-500">
              {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
            </span>
          ) : null}
        </div>

        {bio ? (
          <div className="min-w-0 flex-1 sm:border-l sm:border-teal-200/50 sm:pl-6 dark:sm:border-teal-900/40">
            <p className="blog-author-bio-text font-serif text-[15px] italic leading-[1.85] text-stone-600 dark:text-zinc-400">
              {bio}
            </p>
          </div>
        ) : null}
      </div>
    </article>
  );
}

export function BlogAuthorsBioSection({ authors }: { authors: BlogAuthorBio[] }) {
  if (authors.length === 0) return null;

  const heading = authors.length > 1 ? "About the authors" : "About the author";

  return (
    <section
      aria-labelledby="about-authors-heading"
      className="relative mt-14 overflow-hidden rounded-3xl border border-teal-200/70 bg-linear-to-br from-teal-50/90 via-white to-stone-50/80 shadow-[0_20px_50px_-28px_rgba(15,118,110,0.35)] dark:border-teal-900/50 dark:from-teal-950/40 dark:via-zinc-900/80 dark:to-zinc-950/90 dark:shadow-none"
    >
      <div
        aria-hidden
        className="pointer-events-none absolute -right-16 -top-16 h-48 w-48 rounded-full bg-teal-400/10 blur-3xl dark:bg-teal-500/10"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-20 -left-12 h-56 w-56 rounded-full bg-amber-400/8 blur-3xl dark:bg-amber-500/5"
      />
      <div
        aria-hidden
        className="absolute inset-y-0 left-0 w-1 bg-linear-to-b from-teal-600 via-teal-500/80 to-teal-400/40 dark:from-teal-500 dark:via-teal-600/70 dark:to-teal-800/30"
      />

      <header className="relative border-b border-teal-200/60 px-6 pb-5 pt-7 dark:border-teal-900/40 sm:px-8 sm:pt-8">
        <p
          id="about-authors-heading"
          className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-800 dark:text-teal-300"
        >
          {heading}
        </p>
      </header>

      <div className="relative divide-y divide-teal-200/60 dark:divide-teal-900/40">
        {authors.map((author, index) => (
          <AuthorEntry key={author.name} author={author} index={index} total={authors.length} />
        ))}
      </div>
    </section>
  );
}
