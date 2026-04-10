"use client";

import Link from "next/link";
import { useState } from "react";
import { africaRoutes } from "@/lib/africa-routes";

const inputClass =
  "w-full rounded-xl border border-zinc-200/90 bg-white px-4 py-3 text-sm text-zinc-900 shadow-sm outline-none transition placeholder:text-zinc-400 focus:border-teal-500 focus:ring-2 focus:ring-teal-500/20 dark:border-zinc-700 dark:bg-zinc-950/50 dark:text-zinc-100 dark:placeholder:text-zinc-500 dark:focus:ring-teal-500/25";
const labelClass = "mb-1.5 block text-xs font-semibold text-zinc-700 dark:text-zinc-300";

export function AfricaDonatePage() {
  const [status, setStatus] = useState<"idle" | "loading" | "success" | "error">("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    const fd = new FormData(e.currentTarget);
    const organisationOrIndividual = fd.get("organisationOrIndividual") as string;
    const donationType = fd.get("donationType") as string;
    const paymentMethod = fd.get("paymentMethod") as string;

    const res = await fetch("/api/africa/donate", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        name: String(fd.get("name") ?? ""),
        email: String(fd.get("email") ?? ""),
        phone: String(fd.get("phone") ?? ""),
        organisationOrIndividual,
        donationType,
        description: String(fd.get("description") ?? ""),
        paymentMethod,
        comments: String(fd.get("comments") ?? ""),
      }),
    });

    const data = (await res.json()) as {
      ok?: boolean;
      error?: string;
      message?: string;
      fieldErrors?: Record<string, string>;
    };

    if (data.ok) {
      setStatus("success");
      e.currentTarget.reset();
      return;
    }

    setStatus("error");
    if (data.fieldErrors && Object.keys(data.fieldErrors).length > 0) {
      const first = Object.values(data.fieldErrors).find(Boolean);
      setErrorMsg(first ?? data.error ?? "Something went wrong.");
    } else {
      setErrorMsg(data.error ?? "Something went wrong.");
    }
  }

  return (
    <>
      {/* Hero */}
      <section
        className="relative isolate overflow-hidden bg-zinc-900"
        aria-labelledby="donate-heading"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-amber-400/6 blur-[130px]" />
        <div aria-hidden className="pointer-events-none absolute -right-20 -top-20 h-[360px] w-[360px] rounded-full border border-teal-500/8" />
        <div className="relative mx-auto max-w-7xl px-4 pb-12 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-28">
          <div className="max-w-3xl">
            <div className="flex items-center gap-3">
              <span className="h-px w-8 bg-teal-500/50" />
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-400/80">
                Real Life Research Institute Africa Program
              </p>
            </div>
            <p className="mt-6 text-[10px] font-bold uppercase tracking-[0.28em] text-amber-400/90">
              Donate now
            </p>
            <h1
              id="donate-heading"
              className="mt-3 font-bold leading-[0.95] tracking-tight text-white"
              style={{ fontSize: "clamp(2.5rem, 7vw, 4.5rem)" }}
            >
              Give the gift of{" "}
              <span className="bg-linear-to-r from-amber-300 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                a bright future.
              </span>
            </h1>
            <p className="mt-6 max-w-2xl text-base leading-relaxed text-zinc-400">
              Your generosity drives meaningful change in communities locally and globally. You can support our literacy programs, humanitarian aid, research, and Indigenous-led initiatives through cash donations or in-kind gifts. We accept donations via cheque, bank transfer, credit card, gift card, and other methods. When submitting your donation request, please specify your preferred payment method, donation amount, and whether your contribution will be monetary or in-kind. Our team will promptly follow up with you to assist with the process.
            </p>
          </div>
        </div>
        <div aria-hidden className="h-px w-full bg-linear-to-r from-transparent via-teal-800/50 to-transparent" />
      </section>

      {/* Form section */}
      <section className="bg-[#f7faf9] py-16 dark:bg-zinc-950 sm:py-20 lg:py-24">
        <div className="mx-auto max-w-3xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[1fr_1fr] lg:gap-16">
            <div className="flex flex-col justify-center">
              <p className="text-[10px] font-semibold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-400">
                Get involved
              </p>
              <h2 className="mt-3 font-bold tracking-tight text-zinc-900 dark:text-zinc-50" style={{ fontSize: "clamp(1.5rem, 3vw, 2rem)" }}>
                Every contribution counts
              </h2>
              <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                Use the secure form below to share your details and preferences. Submissions are processed the same way as the
                legacy Africa Program donations flow.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={africaRoutes.home}
                  className="inline-flex min-h-11 items-center justify-center rounded-xl border border-zinc-200 bg-white px-5 text-sm font-semibold text-zinc-700 transition hover:border-teal-300 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-800 dark:text-zinc-300"
                >
                  ← Africa home
                </Link>
                <a
                  href="mailto:contact-africa@reallifeinstitute.org"
                  className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl bg-teal-600 px-5 text-sm font-bold text-white shadow-lg shadow-teal-900/15 transition hover:bg-teal-500"
                >
                  Email us
                </a>
              </div>
            </div>

            <div className="relative">
              <div aria-hidden className="pointer-events-none absolute -inset-4 rounded-4xl bg-teal-400/5 blur-2xl dark:bg-teal-900/20" />
              <form
                onSubmit={onSubmit}
                className="relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-xl shadow-zinc-900/5 dark:border-zinc-800/80 dark:bg-zinc-900/70 sm:p-8"
              >
                <div aria-hidden className="absolute bottom-0 left-0 h-[2px] w-full bg-linear-to-r from-teal-500 via-amber-400 to-emerald-500 opacity-20" />

                {status === "success" ? (
                  <div className="py-8 text-center">
                    <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-100 text-teal-700 dark:bg-teal-950/50 dark:text-teal-400">
                      <svg className="h-7 w-7" viewBox="0 0 20 20" fill="currentColor">
                        <path
                          fillRule="evenodd"
                          d="M16.707 5.293a1 1 0 0 1 0 1.414l-8 8a1 1 0 0 1-1.414 0l-4-4a1 1 0 0 1 1.414-1.414L8 12.586l7.293-7.293a1 1 0 0 1 1.414 0Z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <h3 className="mt-5 text-lg font-bold text-zinc-900 dark:text-zinc-50">Thank you</h3>
                    <p className="mt-2 text-sm text-zinc-600 dark:text-zinc-400">
                      Your donation request has been received. Our team will follow up with you shortly.
                    </p>
                    <button
                      type="button"
                      onClick={() => setStatus("idle")}
                      className="mt-6 text-sm font-semibold text-teal-700 underline underline-offset-4 hover:text-teal-800 dark:text-teal-400"
                    >
                      Submit another request
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="space-y-4">
                      <div>
                        <label htmlFor="donate-name" className={labelClass}>
                          Name
                        </label>
                        <input id="donate-name" name="name" type="text" required autoComplete="name" className={inputClass} placeholder="Your full name" />
                      </div>
                      <div>
                        <label htmlFor="donate-email" className={labelClass}>
                          Email
                        </label>
                        <input id="donate-email" name="email" type="email" required autoComplete="email" className={inputClass} placeholder="you@example.com" />
                      </div>
                      <div>
                        <label htmlFor="donate-phone" className={labelClass}>
                          Phone number
                        </label>
                        <input
                          id="donate-phone"
                          name="phone"
                          type="tel"
                          required
                          autoComplete="tel"
                          className={inputClass}
                          placeholder="+237 …"
                          pattern="[0-9()#&+*\-=.]+"
                          title="Only numbers and phone characters (#, -, *, etc.) are accepted."
                        />
                      </div>
                      <div>
                        <label htmlFor="donate-org" className={labelClass}>
                          Organisation or individual
                        </label>
                        <select id="donate-org" name="organisationOrIndividual" required className={inputClass}>
                          <option value="">Select…</option>
                          <option value="Organisation">Organisation</option>
                          <option value="Individual">Individual</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="donate-type" className={labelClass}>
                          Preferred donation type
                        </label>
                        <select id="donate-type" name="donationType" required className={inputClass}>
                          <option value="">Select…</option>
                          <option value="Monetary Donation">Monetary donation</option>
                          <option value="In-kind Donation">In-kind donation</option>
                        </select>
                      </div>
                      <div>
                        <label htmlFor="donate-desc" className={labelClass}>
                          Description of donation
                        </label>
                        <textarea
                          id="donate-desc"
                          name="description"
                          required
                          rows={4}
                          className={`${inputClass} resize-y min-h-24`}
                          placeholder="Describe what you would like to give or how you would like to help."
                        />
                      </div>
                      <fieldset>
                        <legend className={`${labelClass} mb-2`}>Preferred payment method</legend>
                        <div className="grid gap-2 sm:grid-cols-2">
                          {(["Credit Card", "Cheque", "Bank Transfer", "Gift Card"] as const).map((pm) => (
                            <label
                              key={pm}
                              className="flex cursor-pointer items-center gap-3 rounded-xl border border-zinc-200/90 bg-zinc-50/80 px-4 py-3 text-sm font-medium text-zinc-800 transition hover:border-teal-300 has-checked:border-teal-500 has-checked:bg-teal-50/80 dark:border-zinc-700 dark:bg-zinc-800/50 dark:text-zinc-200 dark:hover:border-teal-700 dark:has-checked:border-teal-600 dark:has-checked:bg-teal-950/40"
                            >
                              <input type="radio" name="paymentMethod" value={pm} required className="size-4 text-teal-600" />
                              {pm}
                            </label>
                          ))}
                        </div>
                      </fieldset>
                      <div>
                        <label htmlFor="donate-comments" className={labelClass}>
                          Comments or special instructions{" "}
                          <span className="font-normal text-zinc-400">(optional)</span>
                        </label>
                        <textarea
                          id="donate-comments"
                          name="comments"
                          rows={3}
                          className={`${inputClass} resize-y min-h-20`}
                          placeholder="Anything else we should know?"
                        />
                      </div>
                    </div>

                    {errorMsg && (
                      <p className="mt-4 rounded-xl border border-red-200/80 bg-red-50 px-4 py-3 text-sm text-red-800 dark:border-red-900/50 dark:bg-red-950/40 dark:text-red-200">
                        {errorMsg}
                      </p>
                    )}

                    <button
                      type="submit"
                      disabled={status === "loading"}
                      className="mt-6 flex w-full min-h-12 items-center justify-center gap-2 rounded-xl bg-linear-to-r from-teal-600 to-teal-700 px-6 text-sm font-bold text-white shadow-lg shadow-teal-900/25 transition hover:from-teal-500 hover:to-teal-600 disabled:cursor-not-allowed disabled:opacity-70"
                    >
                      {status === "loading" ? (
                        <>
                          <span className="size-4 animate-spin rounded-full border-2 border-white/30 border-t-white" aria-hidden />
                          Sending…
                        </>
                      ) : (
                        "Send"
                      )}
                    </button>
                  </>
                )}
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
