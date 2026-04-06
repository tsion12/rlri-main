"use client";

import Link from "next/link";
import { useState } from "react";
import { africaRoutes } from "@/lib/africa-routes";

const CONTACT_EMAIL = "contact-africa@reallifeinstitute.org";

/* ── Categories ───────────────────────────────────────────────── */
type Category = "all" | "organization" | "our-work" | "support" | "get-involved";

const CATEGORIES: { id: Category; label: string; count: number }[] = [
  { id: "all", label: "All questions", count: 8 },
  { id: "organization", label: "About Us", count: 2 },
  { id: "our-work", label: "Our Work", count: 1 },
  { id: "support", label: "Support & Giving", count: 3 },
  { id: "get-involved", label: "Get Involved", count: 2 },
];

/* ── FAQ data ─────────────────────────────────────────────────── */
const FAQS = [
  {
    id: "q1",
    category: "organization" as Category,
    categoryLabel: "About Us",
    question: "What is Real Life Research Institute Africa Program?",
    answer:
      "The Real Life Research Institute Africa Program is a Pan-African non-profit powered by a dynamic regional network and field teams across Kenya, Zimbabwe, Ethiopia, Cameroon, Nigeria, and Ghana. The Institute is dedicated to addressing Africa's most pressing challenges through locally led research and community-driven action. Our work advances climate resilience, energy access, urban sustainability, food security, gender equality, and peacebuilding. Powered by dedicated staff and a trusted network of partners and field experts across Africa, we deliver impactful programs that connect communities, engage young people in Africa and the diaspora, and collaborate with global development partners committed to Africa's future.",
  },
  {
    id: "q2",
    category: "organization" as Category,
    categoryLabel: "About Us",
    question: "What are Real Life Research Institute Africa Program's safeguarding principles?",
    answer:
      'Real Life Research Institute Africa Program is committed to upholding the highest standards of safeguarding to ensure the safety, dignity, and well-being of all individuals involved in our programs, especially children, youth, women, and vulnerable community members. Our safeguarding principles include zero tolerance for abuse and exploitation. All staff, volunteers, and partners are expected to adhere to our safeguarding policy and code of conduct. For more information, please see the \u201cPolicies\u201d section on our website to access our full safeguarding policy and related documents.',
  },
  {
    id: "q3",
    category: "our-work" as Category,
    categoryLabel: "Our Work",
    question: "How does Real Life Research Institute Africa Program decide where to work?",
    answer:
      "Real Life Research Institute Africa Program determines where to work based on a combination of community-identified needs, research evidence, and strategic partnerships. We prioritize regions and populations where we have established partnerships, as well as those with the most pressing needs. We respond to urgent challenges, such as climate vulnerability and humanitarian crises, across Africa through research and collaboration with stakeholders, organizations, and experts who understand the unique context of each community.",
  },
  {
    id: "q4",
    category: "support" as Category,
    categoryLabel: "Support & Giving",
    question: "How are my contributions used in Real Life Research Institute Africa Program's development and charitable projects?",
    answer:
      "We are committed to transparency and accountability in how we use contributions. Donations directly support the delivery of our programs, including humanitarian relief, community-based research, and initiatives addressing climate change, insecurity, energy poverty, urban waste, gender inequality, and food insecurity. The majority of funds go directly toward implementing projects on the ground. A modest portion supports essential administrative and operational functions that ensure strong oversight, coordination, compliance, and measurable impact. We regularly share updates, reports, and impact stories so you can see how your support is making a difference. We also actively engage our partners and donors through monthly webinars, policy briefs, and program updates.",
  },
  {
    id: "q5",
    category: "support" as Category,
    categoryLabel: "Support & Giving",
    question: "Can I donate specifically to the scholarship or emergency relief fund?",
    answer:
      "Yes, you can choose to direct your donation specifically to our scholarship fund or emergency fund. When donating through our website, please specify your preferred fund to ensure your contribution supports the cause that matters most to you.",
  },
  {
    id: "q6",
    category: "support" as Category,
    categoryLabel: "Support & Giving",
    question: "Who benefits from Real Life Research Institute Africa Program's scholarships and emergency relief fund?",
    answer:
      "Real Life Research Institute Africa Program's scholarships and emergency relief fund primarily benefit individuals from underserved communities. We also support individuals and families in crisis, such as those affected by displacement, housing insecurity, and other emergencies, by providing timely assistance to help them regain stability and continue their personal or academic journey.",
  },
  {
    id: "q7",
    category: "get-involved" as Category,
    categoryLabel: "Get Involved",
    question: "How can I support Real Life Research Institute Africa Program projects?",
    answer:
      "You can support the Real Life Research Institute Africa Program in many ways. Contributions may include financial donations, volunteering your time and expertise, partnering with us, or participating in our community events and campaigns. If you are invited to speak at one of our webinars or events, you may also choose to donate your speaker honorarium to support our work. To explore partnership opportunities or offer support, please fill out the partnership form on our website or contact us directly at contact-africa@reallifeinstitute.org.",
  },
  {
    id: "q8",
    category: "get-involved" as Category,
    categoryLabel: "Get Involved",
    question: "What internship, volunteer, or career opportunities are available at Real Life Africa Program?",
    answer:
      "Real Life Research Institute Africa Program offers a range of internships, volunteer, and career opportunities for individuals passionate about community development, research, and social impact. We also frequently host webinars and online events that discuss key development issues within the African context. We invite researchers and experts to share peer-reviewed research and to contribute to our policy briefs. Applicants from diverse backgrounds, including students, recent graduates, and early-career professionals seeking meaningful experience, are all welcome to participate. Current opportunities are posted on our website.",
  },
] as const;

/* ── Category accent colors ───────────────────────────────────── */
const CATEGORY_ACCENT: Record<Category, string> = {
  all: "bg-teal-600 text-white",
  organization: "bg-sky-500 text-white",
  "our-work": "bg-emerald-500 text-white",
  support: "bg-violet-500 text-white",
  "get-involved": "bg-amber-500 text-white",
};

const CATEGORY_PILL: Record<Category, string> = {
  all: "border-teal-200 bg-teal-50 text-teal-700 dark:border-teal-800/60 dark:bg-teal-900/30 dark:text-teal-400",
  organization: "border-sky-200 bg-sky-50 text-sky-700 dark:border-sky-800/60 dark:bg-sky-900/30 dark:text-sky-400",
  "our-work": "border-emerald-200 bg-emerald-50 text-emerald-700 dark:border-emerald-800/60 dark:bg-emerald-900/30 dark:text-emerald-400",
  support: "border-violet-200 bg-violet-50 text-violet-700 dark:border-violet-800/60 dark:bg-violet-900/30 dark:text-violet-400",
  "get-involved": "border-amber-200 bg-amber-50 text-amber-700 dark:border-amber-800/60 dark:bg-amber-900/30 dark:text-amber-400",
};

/* ── Starburst decoration ─────────────────────────────────────── */
function Starburst({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden>
      <path d="M12 2l1.6 5.3L19 5l-3.4 4.5L21 12l-5.4 1.4L17 19l-5-2.6L12 22l-1.6-5.3L5 19l3.4-4.5L3 12l5.4-1.4L6 5l5 2.6z" />
    </svg>
  );
}

/* ── Single FAQ accordion item ───────────────────────────────── */
function FaqItem({
  question,
  answer,
  category,
  categoryLabel,
  open,
  onToggle,
  index,
}: {
  question: string;
  answer: string;
  category: Category;
  categoryLabel: string;
  open: boolean;
  onToggle: () => void;
  index: number;
}) {
  return (
    <div
      className={`group relative overflow-hidden rounded-2xl border transition duration-300 ${
        open
          ? "border-teal-300/60 bg-white shadow-lg shadow-teal-900/8 dark:border-teal-700/50 dark:bg-zinc-900"
          : "border-zinc-200/70 bg-white hover:border-teal-200/80 hover:shadow-md dark:border-zinc-800/70 dark:bg-zinc-900/60 dark:hover:border-teal-800/60"
      }`}
    >
      {/* Left accent line that appears when open */}
      <div
        className={`absolute left-0 top-0 h-full w-[3px] transition-all duration-300 ${
          open ? CATEGORY_ACCENT[category] : "opacity-0"
        }`}
        aria-hidden
      />

      <button
        type="button"
        onClick={onToggle}
        className="flex w-full items-start gap-4 px-6 py-5 text-left"
        aria-expanded={open}
      >
        {/* Index number */}
        <span
          className={`mt-0.5 shrink-0 text-[11px] font-black tabular-nums transition-colors duration-200 ${
            open ? "text-teal-600 dark:text-teal-400" : "text-zinc-300 dark:text-zinc-600"
          }`}
          style={{ minWidth: "1.75rem" }}
          aria-hidden
        >
          {String(index + 1).padStart(2, "0")}
        </span>

        <div className="flex-1">
          {/* Category pill */}
          <span
            className={`mb-2 inline-block rounded-full border px-2.5 py-0.5 text-[10px] font-bold uppercase tracking-[0.15em] ${CATEGORY_PILL[category]}`}
          >
            {categoryLabel}
          </span>

          {/* Question */}
          <p
            className={`text-sm font-semibold leading-snug transition-colors duration-200 sm:text-[0.95rem] ${
              open ? "text-zinc-900 dark:text-zinc-50" : "text-zinc-700 dark:text-zinc-300"
            }`}
          >
            {question}
          </p>
        </div>

        {/* Chevron icon */}
        <span
          className={`mt-1 shrink-0 flex h-7 w-7 items-center justify-center rounded-full transition-all duration-300 ${
            open
              ? "bg-teal-600 text-white rotate-180"
              : "bg-zinc-100 text-zinc-400 dark:bg-zinc-800 dark:text-zinc-500"
          }`}
          aria-hidden
        >
          <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2.5">
            <path d="M4 6l4 4 4-4" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </span>
      </button>

      {/* Answer — grid animation trick for smooth open/close */}
      <div
        className={`grid transition-all duration-300 ease-in-out ${open ? "grid-rows-[1fr]" : "grid-rows-[0fr]"}`}
      >
        <div className="overflow-hidden">
          <div className="pb-6 pl-15 pr-6 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            {answer}
          </div>
        </div>
      </div>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────── */
export function AfricaFaqPage() {
  const [activeCategory, setActiveCategory] = useState<Category>("all");
  const [openId, setOpenId] = useState<string | null>("q1");

  const filtered =
    activeCategory === "all"
      ? FAQS
      : FAQS.filter((f) => f.category === activeCategory);

  function toggle(id: string) {
    setOpenId((prev) => (prev === id ? null : id));
  }

  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative isolate overflow-hidden bg-linear-to-br from-teal-950 via-[#0b2d2a] to-zinc-950"
        aria-labelledby="faq-heading"
      >
        {/* Dot grid */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[40px_40px]" />
        {/* Glows */}
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[480px] w-[800px] -translate-x-1/2 rounded-full bg-teal-400/8 blur-[130px]" />
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[400px] w-[400px] rounded-full border border-teal-500/8" />
        <div aria-hidden className="pointer-events-none absolute -left-16 bottom-0 h-[300px] w-[300px] rounded-full border border-teal-500/6" />

        {/* Decorative starbursts */}
        <Starburst className="pointer-events-none absolute right-[8%] top-12 h-12 w-12 text-teal-400/15" />
        <Starburst className="pointer-events-none absolute left-[6%] top-24 h-8 w-8 rotate-12 text-amber-400/20" />
        <Starburst className="pointer-events-none absolute right-[20%] bottom-12 h-7 w-7 rotate-22 text-emerald-400/15" />
        <Starburst className="pointer-events-none absolute left-[15%] bottom-8 h-10 w-10 text-teal-300/10" />

        {/* Floating dots */}
        <div aria-hidden className="pointer-events-none absolute left-[28%] top-16 h-2.5 w-2.5 rounded-full bg-amber-400/25" />
        <div aria-hidden className="pointer-events-none absolute right-[30%] top-24 h-1.5 w-1.5 rounded-full bg-teal-400/30" />
        <div aria-hidden className="pointer-events-none absolute right-[12%] top-1/2 h-2 w-2 rounded-full bg-violet-400/20" />

        <div className="relative mx-auto max-w-7xl px-4 pb-0 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="grid items-end gap-10 pb-16 sm:pb-20 lg:grid-cols-2 lg:pb-24">

            {/* Left: copy */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-teal-500/50" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-400/80">
                  Africa Programs
                </p>
              </div>

              <h1
                id="faq-heading"
                className="mt-8 font-black leading-[0.88] tracking-tighter text-white"
                style={{ fontSize: "clamp(4rem, 11vw, 9rem)" }}
              >
                <span className="block">Fre</span>
                <span className="block bg-linear-to-r from-teal-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                  quently
                </span>
                <span className="block text-teal-400/50 text-[0.55em] mt-1 tracking-normal font-bold">
                  Asked Questions.
                </span>
              </h1>

              <p className="mt-8 max-w-md text-base leading-relaxed text-zinc-400">
                Answers to the most common questions about our work, programs, how to get involved, and how your support creates impact across Africa.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {/* Stat chips */}
                {[
                  { value: "8", label: "Questions answered" },
                  { value: "4", label: "Topic areas" },
                  { value: "6", label: "Countries of operation" },
                ].map(({ value, label }) => (
                  <div
                    key={label}
                    className="flex items-center gap-2 rounded-xl border border-white/10 bg-white/6 px-4 py-2 backdrop-blur-sm"
                  >
                    <span className="text-base font-black text-teal-400">{value}</span>
                    <span className="text-[11px] text-zinc-400">{label}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right: category preview cards */}
            <div className="grid grid-cols-2 gap-3">
              {CATEGORIES.filter((c) => c.id !== "all").map(({ id, label, count }) => (
                <button
                  key={id}
                  type="button"
                  onClick={() => setActiveCategory(id)}
                  className={`group relative overflow-hidden rounded-2xl border border-white/8 p-5 text-left backdrop-blur-sm transition hover:bg-white/10 ${
                    activeCategory === id ? "bg-white/12 ring-1 ring-white/20" : "bg-white/5"
                  }`}
                >
                  <span
                    className={`inline-flex h-7 w-7 items-center justify-center rounded-lg text-[10px] font-black text-white ${CATEGORY_ACCENT[id]}`}
                  >
                    {String(count).padStart(2, "0")}
                  </span>
                  <p className="mt-3 text-xs font-bold uppercase tracking-[0.15em] text-zinc-400">
                    {label}
                  </p>
                  <p className="mt-0.5 text-sm font-bold text-white">
                    {count} question{count !== 1 ? "s" : ""}
                  </p>
                  {activeCategory === id && (
                    <div className="absolute bottom-0 left-0 h-[2px] w-full bg-linear-to-r from-teal-500 to-emerald-500" aria-hidden />
                  )}
                </button>
              ))}
            </div>

          </div>
        </div>

        {/* Bottom wave */}
        <div aria-hidden className="h-px w-full bg-linear-to-r from-transparent via-teal-800/50 to-transparent" />
      </section>

      {/* ══════════════════════════════════════════════════════
          FAQ ACCORDION
      ══════════════════════════════════════════════════════ */}
      <section className="bg-[#f7faf9] py-20 dark:bg-zinc-950 sm:py-24 lg:py-28">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-10 lg:grid-cols-[260px_1fr] xl:grid-cols-[300px_1fr] lg:gap-16">

            {/* ── Left: sticky category filter ── */}
            <aside className="lg:sticky lg:top-24 lg:self-start">
              <p className="mb-4 text-[10px] font-bold uppercase tracking-[0.28em] text-teal-700 dark:text-teal-400">
                Browse by topic
              </p>
              <nav className="flex flex-row flex-wrap gap-2 lg:flex-col lg:gap-1" aria-label="FAQ categories">
                {CATEGORIES.map(({ id, label, count }) => (
                  <button
                    key={id}
                    type="button"
                    onClick={() => {
                      setActiveCategory(id);
                      setOpenId(null);
                    }}
                    className={`group flex items-center justify-between rounded-xl px-4 py-2.5 text-left text-sm font-semibold transition ${
                      activeCategory === id
                        ? "bg-teal-600 text-white shadow-lg shadow-teal-900/20"
                        : "text-zinc-600 hover:bg-zinc-100 hover:text-zinc-900 dark:text-zinc-400 dark:hover:bg-zinc-800/70 dark:hover:text-zinc-100"
                    }`}
                  >
                    <span>{label}</span>
                    <span
                      className={`ml-2 rounded-full px-2 py-0.5 text-[10px] font-bold tabular-nums ${
                        activeCategory === id
                          ? "bg-white/20 text-white"
                          : "bg-zinc-200/80 text-zinc-500 group-hover:bg-zinc-200 dark:bg-zinc-700/60 dark:text-zinc-400"
                      }`}
                    >
                      {count}
                    </span>
                  </button>
                ))}
              </nav>

              {/* Divider */}
              <div className="mt-8 hidden h-px bg-zinc-200/70 dark:bg-zinc-800/60 lg:block" />

              {/* Quick contact */}
              <div className="mt-8 hidden rounded-2xl border border-teal-200/60 bg-white p-5 shadow-sm dark:border-teal-800/40 dark:bg-zinc-900 lg:block">
                <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-teal-600 text-white">
                  <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Zm2 0v.217l6 3.5 6-3.5V5H4Zm0 2.217V15h12V7.217l-6 3.5-6-3.5Z" />
                  </svg>
                </div>
                <p className="mt-3 text-sm font-bold text-zinc-900 dark:text-zinc-50">
                  Can&apos;t find an answer?
                </p>
                <p className="mt-1 text-xs leading-relaxed text-zinc-500 dark:text-zinc-400">
                  Our team is happy to help with any question not covered here.
                </p>
                <a
                  href={`mailto:${CONTACT_EMAIL}`}
                  className="mt-4 inline-flex w-full items-center justify-center gap-2 rounded-xl border border-teal-200/70 bg-teal-50 px-4 py-2.5 text-xs font-bold text-teal-700 transition hover:bg-teal-100 hover:shadow-sm dark:border-teal-800/50 dark:bg-teal-900/30 dark:text-teal-400 dark:hover:bg-teal-900/50"
                >
                  Email us
                  <svg className="h-3.5 w-3.5" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="2">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </a>
              </div>
            </aside>

            {/* ── Right: accordion list ── */}
            <div>
              {/* Result header */}
              <div className="mb-6 flex items-center justify-between">
                <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                  <span className="font-bold text-zinc-900 dark:text-zinc-50">{filtered.length}</span>{" "}
                  question{filtered.length !== 1 ? "s" : ""} in{" "}
                  <span className="text-teal-700 dark:text-teal-400">
                    {CATEGORIES.find((c) => c.id === activeCategory)?.label}
                  </span>
                </p>
                {activeCategory !== "all" && (
                  <button
                    type="button"
                    onClick={() => setActiveCategory("all")}
                    className="text-[11px] font-semibold text-zinc-400 underline underline-offset-4 transition hover:text-zinc-700 dark:hover:text-zinc-200"
                  >
                    Clear filter
                  </button>
                )}
              </div>

              <div className="space-y-3">
                {filtered.map((faq, i) => (
                  <FaqItem
                    key={faq.id}
                    {...faq}
                    index={FAQS.indexOf(faq)}
                    open={openId === faq.id}
                    onToggle={() => toggle(faq.id)}
                  />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* ══════════════════════════════════════════════════════
          CTA — STILL HAVE QUESTIONS?
      ══════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-teal-950 via-[#0b2d2a] to-zinc-950 py-20 sm:py-24">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px]" />
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-teal-400/6 blur-[100px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-emerald-400/5 blur-[100px]" />
        <Starburst className="pointer-events-none absolute right-[12%] top-12 h-10 w-10 text-teal-400/15" />
        <Starburst className="pointer-events-none absolute left-[8%] bottom-10 h-7 w-7 rotate-22 text-amber-400/15" />

        <div className="relative mx-auto max-w-4xl px-4 text-center sm:px-6 lg:px-8">
          <div className="inline-flex h-14 w-14 items-center justify-center rounded-2xl bg-teal-600/20 ring-1 ring-teal-500/30">
            <svg className="h-6 w-6 text-teal-400" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
              <path d="M8.228 9c.549-1.165 2.03-2 3.772-2 2.21 0 4 1.343 4 3 0 1.4-1.278 2.575-3.006 2.907-.542.104-.994.54-.994 1.093m0 3h.01M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </div>

          <h2
            className="mt-6 font-black leading-[0.9] tracking-tighter text-white"
            style={{ fontSize: "clamp(2.25rem, 5vw, 3.75rem)" }}
          >
            Still have{" "}
            <span className="bg-linear-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
              questions?
            </span>
          </h2>
          <p className="mx-auto mt-5 max-w-xl text-base leading-relaxed text-zinc-400">
            Our team is always happy to help. Reach out directly and we&apos;ll get back to you as soon as possible. You can also explore programs and publications on this site.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl bg-teal-600 px-8 text-sm font-bold text-white shadow-xl shadow-teal-900/30 transition hover:bg-teal-500"
            >
              <svg className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                <path d="M2 5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v10a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V5Zm2 0v.217l6 3.5 6-3.5V5H4Zm0 2.217V15h12V7.217l-6 3.5-6-3.5Z" />
              </svg>
              Contact us
            </a>
            <Link
              href={africaRoutes.programs}
              className="inline-flex min-h-12 items-center justify-center gap-2 rounded-xl border border-white/15 bg-white/8 px-8 text-sm font-semibold text-white backdrop-blur-sm transition hover:bg-white/15"
            >
              Explore programs
              <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </Link>
            <Link
              href={africaRoutes.home}
              className="inline-flex min-h-12 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 px-8 text-sm font-semibold text-zinc-300 transition hover:border-teal-700 hover:text-teal-300"
            >
              Back to home
            </Link>
          </div>

          {/* Contact detail pills */}
          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <a
              href={`mailto:${CONTACT_EMAIL}`}
              className="flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-medium text-zinc-300 transition hover:border-teal-700/50 hover:text-white"
            >
              <svg className="h-3.5 w-3.5 text-teal-400" viewBox="0 0 16 16" fill="currentColor">
                <path d="M1 4a1 1 0 0 1 1-1h12a1 1 0 0 1 1 1v1.217L8 9 1 5.217V4Zm0 2.283V12a1 1 0 0 0 1 1h12a1 1 0 0 0 1-1V6.283L8 10.5 1 6.283Z" />
              </svg>
              {CONTACT_EMAIL}
            </a>
            <span className="flex items-center gap-2 rounded-full border border-white/10 bg-white/6 px-4 py-2 text-xs font-medium text-zinc-300">
              <svg className="h-3.5 w-3.5 text-teal-400" viewBox="0 0 16 16" fill="currentColor">
                <path d="M3.654 1.328a.678.678 0 0 0-1.015-.063L1.605 2.3c-.483.484-.661 1.169-.45 1.77a17.568 17.568 0 0 0 4.168 6.608 17.569 17.569 0 0 0 6.608 4.168c.601.211 1.286.033 1.77-.45l1.034-1.034a.678.678 0 0 0-.063-1.015l-2.307-1.794a.678.678 0 0 0-.58-.122l-2.19.547a1.745 1.745 0 0 1-1.657-.459L5.482 8.062a1.745 1.745 0 0 1-.46-1.657l.548-2.19a.678.678 0 0 0-.122-.58L3.654 1.328Z" />
              </svg>
              +237 682 787 465
            </span>
          </div>
        </div>
      </section>
    </>
  );
}
