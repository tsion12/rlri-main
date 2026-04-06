"use client";

import { useState } from "react";

type Props = {
  /** Omit intro paragraph when the parent section already describes the signup */
  variant?: "default" | "compact";
  /** Unique suffix for input id when multiple forms exist on one page */
  idSuffix?: string;
};

export function AfricaNewsletterForm({ variant = "default", idSuffix = "default" }: Props) {
  const [status, setStatus] = useState<"idle" | "sent">("idle");
  const inputId = `africa-newsletter-email-${idSuffix}`;

  return (
    <form
      className="relative"
      onSubmit={(e) => {
        e.preventDefault();
        setStatus("sent");
      }}
    >
      {variant === "default" && (
        <p className="mb-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
          Get the latest updates on our programs, events, and success stories. Sign up and be part of a
          community empowering young minds.
        </p>
      )}
      <div className="flex flex-col gap-2 sm:flex-row sm:items-stretch">
        <label htmlFor={inputId} className="sr-only">
          Email
        </label>
        <input
          id={inputId}
          name="email"
          type="email"
          required
          autoComplete="email"
          placeholder="Your email"
          disabled={status === "sent"}
          className="min-h-10 w-full flex-1 rounded-lg border border-zinc-200 bg-white px-3 py-2 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 disabled:opacity-60 dark:border-zinc-700 dark:bg-zinc-950/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-teal-500/25"
        />
        <button
          type="submit"
          disabled={status === "sent"}
          className="inline-flex min-h-10 shrink-0 items-center justify-center rounded-lg bg-zinc-900 px-5 text-sm font-medium text-white shadow-sm transition hover:bg-zinc-800 disabled:opacity-90 dark:bg-teal-600 dark:hover:bg-teal-500"
        >
          {status === "sent" ? "Subscribed" : "Subscribe"}
        </button>
      </div>
      {status === "sent" && (
        <p className="mt-2 text-xs text-teal-700 dark:text-teal-400">Thanks — we&apos;ll be in touch soon.</p>
      )}
    </form>
  );
}
