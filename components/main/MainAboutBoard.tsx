import Image from "next/image";
import { au } from "@/components/shared/africa-ui";
import { boardMemberInitials } from "@/lib/main-board";

export type BoardCardData = {
  id: string;
  name: string;
  role: string;
  photo: string | null;
};

type Props = {
  eyebrow: string;
  title: string;
  lead: string;
  photoPending: string;
  members: BoardCardData[];
};

function BoardCard({ member, photoPending }: { member: BoardCardData; photoPending: string }) {
  return (
    <li className="flex">
      <article className="group flex w-full flex-col overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-[0_16px_40px_-24px_rgba(15,23,42,0.22)] ring-1 ring-zinc-900/5 transition duration-300 hover:-translate-y-1 hover:border-teal-300/70 hover:shadow-[0_24px_50px_-24px_rgba(13,148,136,0.28)] dark:border-zinc-800/90 dark:bg-zinc-900/60 dark:ring-white/5 dark:hover:border-teal-800/50">
        <div className="relative aspect-square overflow-hidden bg-white dark:bg-zinc-800">
          {member.photo ? (
            <Image
              src={member.photo}
              alt={member.name}
              fill
              className="object-cover"
              sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 300px"
            />
          ) : (
            <div className="flex h-full w-full flex-col items-center justify-center gap-3 bg-linear-to-br from-teal-50 via-white to-zinc-50 dark:from-teal-950/40 dark:via-zinc-900 dark:to-zinc-950">
              <span className="flex size-20 items-center justify-center rounded-full bg-teal-600/10 text-xl font-bold tracking-wide text-teal-700 ring-1 ring-teal-600/15 dark:bg-teal-500/15 dark:text-teal-300">
                {boardMemberInitials(member.name)}
              </span>
              <span className="text-[11px] font-medium uppercase tracking-[0.18em] text-zinc-400 dark:text-zinc-500">
                {photoPending}
              </span>
            </div>
          )}
        </div>

        <div className="flex flex-1 flex-col p-5">
          <h3 className="text-base font-bold tracking-tight text-zinc-900 dark:text-zinc-50">{member.name}</h3>
          <p className="mt-1.5 text-sm leading-relaxed text-teal-700 dark:text-teal-400">{member.role}</p>
          <span className="mt-4 h-0.5 w-8 rounded-full bg-teal-500/30 transition-all duration-300 group-hover:w-14 group-hover:bg-teal-500" aria-hidden />
        </div>
      </article>
    </li>
  );
}

export function MainAboutBoard({ eyebrow, title, lead, photoPending, members }: Props) {
  return (
    <section
      id="board"
      className="relative scroll-mt-24 border-b border-zinc-200/80 bg-[#f7faf9] dark:border-zinc-800 dark:bg-zinc-950"
      aria-labelledby="about-board-heading"
    >
      <div className={`${au.about.section} ${au.about.sectionPad}`}>
        <div className="mx-auto max-w-2xl text-center">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600 dark:text-teal-400">
            {eyebrow}
          </p>
          <h2
            id="about-board-heading"
            className="mt-3 font-serif text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl"
          >
            {title}
          </h2>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[15px]">{lead}</p>
        </div>

        <ul className="mx-auto mt-10 grid max-w-5xl gap-5 sm:grid-cols-2 lg:grid-cols-3 lg:gap-6">
          {members.map((member) => (
            <BoardCard key={member.id} member={member} photoPending={photoPending} />
          ))}
        </ul>
      </div>
    </section>
  );
}
