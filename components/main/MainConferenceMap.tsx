"use client";

import { useState } from "react";
import { CONFERENCE_MAP_EMBED } from "@/lib/main-conference";

type Props = {
  showLabel: string;
  hideLabel: string;
  title: string;
};

export function MainConferenceMap({ showLabel, hideLabel, title }: Props) {
  const [open, setOpen] = useState(false);

  return (
    <div className="mt-5">
      <button
        type="button"
        onClick={() => setOpen((value) => !value)}
        className="text-sm font-semibold text-sky-800 underline-offset-2 hover:underline dark:text-sky-300"
        aria-expanded={open}
      >
        {open ? hideLabel : showLabel}
      </button>
      {open ? (
        <iframe
          title={title}
          src={CONFERENCE_MAP_EMBED}
          className="mt-4 h-72 w-full rounded-2xl border border-zinc-200 dark:border-zinc-800"
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        />
      ) : null}
    </div>
  );
}
