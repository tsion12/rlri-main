"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { au } from "@/components/africa/africa-ui";
import type { MainTeamCanadaId } from "@/lib/main-team-canada";

export type MainAboutTeamMember = {
  id: MainTeamCanadaId;
  initials: string;
  name: string;
  role: string;
  bio: string;
  photo: string;
};

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  profileLabel: string;
  readBio: string;
  closeLabel: string;
  members: MainAboutTeamMember[];
};

export function MainAboutTeam({
  eyebrow,
  title,
  lead,
  profileLabel,
  readBio,
  closeLabel,
  members,
}: Props) {
  const [activeId, setActiveId] = useState<MainTeamCanadaId | null>(null);

  const activeMember = useMemo(
    () => members.find((m) => m.id === activeId) ?? null,
    [activeId, members],
  );

  useEffect(() => {
    if (!activeId) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActiveId(null);
    };
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = "";
      window.removeEventListener("keydown", onKey);
    };
  }, [activeId]);

  return (
    <section
      id="about-team"
      className="relative scroll-mt-24 border-b border-zinc-200/80 bg-[#f7faf9] bg-[radial-gradient(ellipse_100%_70%_at_50%_0%,rgba(20,184,166,0.06),transparent_55%)] dark:border-zinc-800 dark:bg-zinc-950 dark:bg-none"
      aria-labelledby="about-team-heading"
    >
      <div className={`${au.about.section} relative py-14 sm:py-16 lg:py-20`}>
        <header className="home-fade-up mx-auto max-w-2xl text-center" style={{ animationDelay: "40ms" }}>
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600 dark:text-teal-400">
            {eyebrow}
          </p>
          <h2
            id="about-team-heading"
            className="mt-3 font-serif text-2xl font-semibold tracking-tight text-zinc-900 sm:text-3xl dark:text-zinc-50"
          >
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">
            {lead}
          </p>
        </header>

        <ul className="mx-auto mt-10 grid max-w-4xl grid-cols-2 gap-3 sm:mt-12 sm:gap-4 md:grid-cols-4 lg:max-w-5xl">
          {members.map((member, index) => (
            <li key={member.id} className="home-fade-up" style={{ animationDelay: `${80 + index * 50}ms` }}>
              <TeamCard member={member} readBio={readBio} onOpen={() => setActiveId(member.id)} />
            </li>
          ))}
        </ul>
      </div>

      {activeMember ? (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center bg-zinc-950/55 p-4 backdrop-blur-[3px]"
          role="dialog"
          aria-modal="true"
          aria-labelledby="about-team-member-title"
          onClick={() => setActiveId(null)}
        >
          <div
            className="relative max-h-[88vh] w-full max-w-2xl overflow-auto rounded-2xl border border-zinc-200/90 bg-white shadow-2xl dark:border-zinc-800 dark:bg-zinc-950"
            onClick={(e) => e.stopPropagation()}
          >
            <button
              type="button"
              onClick={() => setActiveId(null)}
              className="absolute right-3 top-3 z-10 inline-flex size-8 items-center justify-center rounded-full border border-zinc-200/90 bg-white/95 text-zinc-500 transition hover:bg-zinc-50 hover:text-zinc-800 dark:border-zinc-700 dark:bg-zinc-900 dark:hover:bg-zinc-800"
              aria-label={closeLabel}
            >
              <span className="text-lg leading-none" aria-hidden>
                ×
              </span>
            </button>

            <div className="grid gap-5 p-5 sm:grid-cols-[168px_1fr] sm:gap-6 sm:p-6">
              <div className="relative mx-auto aspect-3/4 w-full max-w-[168px] overflow-hidden rounded-xl bg-zinc-100 ring-1 ring-zinc-900/5 dark:bg-zinc-900 dark:ring-white/10 sm:mx-0">
                <Image
                  src={activeMember.photo}
                  alt={activeMember.name}
                  fill
                  className="object-cover"
                  sizes="168px"
                />
              </div>
              <div className="min-w-0 pt-0 sm:pt-1">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-600 dark:text-teal-400">
                  {profileLabel}
                </p>
                <h3
                  id="about-team-member-title"
                  className="mt-2 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
                >
                  {activeMember.name}
                </h3>
                <p className="mt-1 text-xs font-medium text-teal-700 dark:text-teal-400">{activeMember.role}</p>
                <p className="mt-4 text-[13px] leading-[1.75] text-zinc-600 dark:text-zinc-400">{activeMember.bio}</p>
              </div>
            </div>
          </div>
        </div>
      ) : null}
    </section>
  );
}

function TeamCard({
  member,
  readBio,
  onOpen,
}: {
  member: MainAboutTeamMember;
  readBio: string;
  onOpen: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onOpen}
      className="group flex w-full flex-col overflow-hidden rounded-xl border border-zinc-200/90 bg-white text-left shadow-sm transition duration-300 hover:border-teal-300/70 hover:shadow-md focus:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/45 focus-visible:ring-offset-2 focus-visible:ring-offset-[#f7faf9] dark:border-zinc-800/90 dark:bg-zinc-900/80 dark:hover:border-teal-700/50 dark:focus-visible:ring-offset-zinc-950"
    >
      <div className="relative aspect-3/4 w-full overflow-hidden bg-zinc-100 dark:bg-zinc-800">
        <Image
          src={member.photo}
          alt={member.name}
          fill
          className="object-cover object-top transition duration-500 group-hover:scale-[1.04]"
          sizes="(max-width: 640px) 45vw, 220px"
        />
        <div
          className="absolute inset-0 bg-linear-to-t from-zinc-950/40 via-transparent to-transparent opacity-80 transition-opacity group-hover:opacity-100"
          aria-hidden
        />
      </div>

      <div className="flex flex-col gap-1.5 px-3.5 py-3 sm:px-4 sm:py-3.5">
        <p className="line-clamp-2 text-[13px] font-semibold leading-snug tracking-tight text-zinc-900 dark:text-zinc-50">
          {member.name}
        </p>
        <p className="line-clamp-2 min-h-8 text-[11px] font-medium leading-snug text-teal-700/90 dark:text-teal-400/90">
          {member.role}
        </p>
        <span className="mt-1 inline-flex items-center gap-1 text-[11px] font-semibold text-zinc-500 transition group-hover:text-teal-700 dark:group-hover:text-teal-400">
          {readBio}
          <svg
            className="size-3 shrink-0 transition-transform group-hover:translate-x-0.5"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2.5"
            aria-hidden
          >
            <path d="M5 12h14M13 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </div>
    </button>
  );
}
