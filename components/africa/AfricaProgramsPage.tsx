import Image from "next/image";
import Link from "next/link";
import { africaRoutes, programsAnchor } from "@/lib/africa-routes";
import { africaStock } from "./africa-stock";

/* ── Program data ─────────────────────────────────────────────────── */
const PROGRAMS = [
  {
    n: "01",
    slug: "oceans",
    label: "Ocean & Maritime",
    title: "Oceans",
    tagline: "Blue economy, maritime security, and inclusive coastal development",
    body: [
      "The Ocean Program at the Real Life Research Institute – Africa Program builds on our work on ocean, blue economy, maritime security, governance, and inclusive economic development. The program focuses on ocean and maritime activities, local, regional, and international ocean policies and law, including aspects of livelihood, coastal development, and resilience.",
      "The program supports contemporary debates and policy action on sustainable ocean resource management, economic development, strengthening environmental protection, and enhancing the resilience of coastal and marine-dependent communities. We contribute to research that advances understanding of ocean ecosystems and ocean health, with a focus on the Gulf of Guinea and beyond.",
      "By generating context-specific knowledge and linking African expertise with international research and policy platforms, the program positions Africa as a critical contributor to global ocean science and governance.",
    ],
    accent: {
      bg: "bg-sky-600",
      bgLight: "bg-sky-50 dark:bg-sky-950/40",
      border: "border-sky-200 dark:border-sky-800/50",
      text: "text-sky-700 dark:text-sky-400",
      textLight: "text-sky-300",
      gradient: "from-sky-600 to-cyan-700",
      gradientLight: "from-sky-50 to-cyan-50/50",
      sectionBg: "bg-[#f0f8ff] dark:bg-zinc-900",
      number: "text-sky-100 dark:text-sky-950",
      dot: "bg-sky-500",
    },
    image: africaStock.programHeros.oceans,
    topics: ["Blue Economy", "Maritime Security", "Ocean Governance", "Coastal Resilience", "Gulf of Guinea"],
    href: programsAnchor("01"),
    flip: false,
  },
  {
    n: "02",
    slug: "digital-futures",
    label: "Technology & Society",
    title: "Digital Futures",
    tagline: "AI governance, digital transformation, and inclusive tech for Africa",
    body: [
      "Our Digital Futures Program focuses on the social, political, and economic implications of digital transformation across Africa, with particular attention to artificial intelligence (AI) and its growing role in shaping sustainable development.",
      "The program supports research and policy engagement on the ethical use of AI, AI governance frameworks, and the gendered dimensions of artificial intelligence. It also examines how biases in AI systems can reinforce inequalities, particularly for women and marginalized groups, and explores pathways for more inclusive, accountable, and context-sensitive AI design and deployment.",
      "The program contributes to shaping more equitable and responsible digital futures while positioning Africa as an important actor in global debates on AI governance and digital transformation.",
    ],
    accent: {
      bg: "bg-violet-600",
      bgLight: "bg-violet-50 dark:bg-violet-950/40",
      border: "border-violet-200 dark:border-violet-800/50",
      text: "text-violet-700 dark:text-violet-400",
      textLight: "text-violet-300",
      gradient: "from-violet-600 to-purple-700",
      gradientLight: "from-violet-50 to-purple-50/50",
      sectionBg: "bg-[#faf8ff] dark:bg-zinc-900",
      number: "text-violet-100 dark:text-violet-950",
      dot: "bg-violet-500",
    },
    image: africaStock.programHeros.digital,
    topics: ["AI Governance", "Digital Transformation", "Tech Ethics", "Gender & AI", "Inclusive Design"],
    href: programsAnchor("02"),
    flip: true,
  },
  {
    n: "03",
    slug: "climate",
    label: "Environment & Resilience",
    title: "Climate Adaptation & Resilience",
    tagline: "Local voices, indigenous knowledge, and climate justice across Africa",
    body: [
      "The Climate Adaptation & Resilience program amplifies local and indigenous voices across Africa on climate adaptation. It supports research and policy dialogue on locally grounded adaptation strategies, resilience-building, climate justice, livelihood protection, and the governance systems needed to respond to growing climate risks.",
      "The program also examines the intersection of climate change and conflict, including how environmental stressors such as resource scarcity, displacement, and livelihood disruption can exacerbate existing tensions and undermine stability in vulnerable regions like the Sahel.",
      "By advancing evidence-based and context-sensitive approaches, and by connecting African perspectives to broader global debates, the program contributes to stronger and more inclusive responses to climate change across the continent and beyond.",
    ],
    accent: {
      bg: "bg-emerald-600",
      bgLight: "bg-emerald-50 dark:bg-emerald-950/40",
      border: "border-emerald-200 dark:border-emerald-800/50",
      text: "text-emerald-700 dark:text-emerald-400",
      textLight: "text-emerald-300",
      gradient: "from-emerald-600 to-teal-700",
      gradientLight: "from-emerald-50 to-teal-50/50",
      sectionBg: "bg-[#f0faf6] dark:bg-zinc-900",
      number: "text-emerald-100 dark:text-emerald-950",
      dot: "bg-emerald-500",
    },
    image: africaStock.programHeros.climate,
    topics: ["Climate Justice", "Resilience Building", "Sahel Stability", "Indigenous Knowledge", "Livelihood Protection"],
    href: programsAnchor("03"),
    flip: false,
  },
  {
    n: "04",
    slug: "peacebuilding",
    label: "Peace & Civil Society",
    title: "Peacebuilding & Inclusive Dialogues",
    tagline: "Civil society, national dialogues, and sustainable conflict transformation",
    body: [
      "The Peacebuilding & Inclusive Dialogue Program builds on our work on national dialogues and the role of civil society in peacebuilding processes across Africa. The program explores the actual and potential role of civil society organisations in peacebuilding dialogues.",
      "It supports research and policy engagement on peace processes, national and local dialogue initiatives, civil society participation, gender inclusion, and the institutional conditions needed for meaningful and sustainable peacebuilding.",
      "By producing context-specific knowledge and linking African practitioners and researchers with wider policy and dialogue platforms, the program engages communities, civil society actors, and decision-makers, ensuring that locally grounded insights meaningfully inform policy processes and support effective conflict transformation.",
    ],
    accent: {
      bg: "bg-amber-600",
      bgLight: "bg-amber-50 dark:bg-amber-950/40",
      border: "border-amber-200 dark:border-amber-800/50",
      text: "text-amber-700 dark:text-amber-400",
      textLight: "text-amber-300",
      gradient: "from-amber-600 to-orange-700",
      gradientLight: "from-amber-50 to-orange-50/50",
      sectionBg: "bg-[#fffbf0] dark:bg-zinc-900",
      number: "text-amber-100 dark:text-amber-950",
      dot: "bg-amber-500",
    },
    image: africaStock.programHeros.peacebuilding,
    topics: ["Civil Society", "National Dialogues", "Gender Inclusion", "Conflict Transformation", "Peace Processes"],
    href: programsAnchor("04"),
    flip: true,
  },
] as const;

/* ── Ticker ───────────────────────────────────────────────────────── */
const TICKER = ["Oceans", "Digital Futures", "Climate Adaptation", "Peacebuilding", "Inclusive Dialogues", "Blue Economy", "AI Governance", "Resilience"];

function TickerStrip() {
  return (
    <div className="overflow-hidden border-t border-teal-800/50 bg-teal-950/60 py-3.5">
      <div className="flex whitespace-nowrap animate-[marquee-scroll_32s_linear_infinite]" aria-hidden>
        {[0, 1].map((i) => (
          <span key={i} className="flex shrink-0 items-center">
            {TICKER.map((item, j) => (
              <span key={`${i}-${j}`} className="flex items-center gap-5 pr-5 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-400/60">
                {item}
                <span className="h-1 w-1 rounded-full bg-teal-700/60" />
              </span>
            ))}
          </span>
        ))}
      </div>
    </div>
  );
}

/* ── Main page ────────────────────────────────────────────────────── */
export function AfricaProgramsPage() {
  return (
    <>
      {/* ══════════════════════════════════════════════════════
          HERO
      ══════════════════════════════════════════════════════ */}
      <section
        className="relative isolate overflow-hidden bg-linear-to-br from-teal-950 via-[#0b2d2a] to-zinc-950"
        aria-labelledby="programs-heading"
      >
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[40px_40px]" />
        <div aria-hidden className="pointer-events-none absolute left-1/2 top-0 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-teal-400/8 blur-[130px]" />
        <div aria-hidden className="pointer-events-none absolute -right-24 -top-24 h-[420px] w-[420px] rounded-full border border-teal-500/8" />

        <div className="relative mx-auto max-w-7xl px-4 pb-0 pt-20 sm:px-6 sm:pt-24 lg:px-8 lg:pt-32">
          <div className="grid items-end gap-12 pb-16 sm:pb-20 lg:grid-cols-2 lg:pb-24">

            {/* Left: copy */}
            <div>
              <div className="flex items-center gap-3">
                <span className="h-px w-8 bg-teal-500/50" />
                <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-400/80">
                  Africa Programs
                </p>
              </div>

              <h1
                id="programs-heading"
                className="mt-8 font-black leading-[0.88] tracking-tighter text-white"
                style={{ fontSize: "clamp(4rem, 11vw, 9rem)" }}
              >
                <span className="block">Pro</span>
                <span className="block bg-linear-to-r from-teal-400 via-teal-300 to-emerald-300 bg-clip-text text-transparent">
                  grams.
                </span>
              </h1>

              <p className="mt-8 max-w-md text-base leading-relaxed text-zinc-400">
                Community-driven solutions across Africa — four thematic programs connecting research, policy, and people to the challenges that matter most.
              </p>

              <div className="mt-8 flex flex-wrap gap-3">
                {PROGRAMS.map(({ n, title, accent }) => (
                  <Link
                    key={n}
                    href={`#${n}`}
                    className={`inline-flex items-center gap-2 rounded-xl border ${accent.border} ${accent.bgLight} px-4 py-2 text-xs font-bold ${accent.text} transition hover:shadow-sm`}
                  >
                    <span className={`h-1.5 w-1.5 rounded-full ${accent.dot}`} />
                    {title}
                  </Link>
                ))}
              </div>
            </div>

            {/* Right: 2×2 stat/program grid */}
            <div className="grid grid-cols-2 gap-3">
              {PROGRAMS.map(({ n, title, label, accent }) => (
                <div
                  key={n}
                  className={`group relative overflow-hidden rounded-2xl border border-white/8 bg-white/5 p-5 backdrop-blur-sm transition hover:bg-white/8`}
                >
                  <span className="pointer-events-none absolute right-3 top-2 select-none text-5xl font-black leading-none text-white/5">
                    {n}
                  </span>
                  <span className={`inline-block h-2 w-2 rounded-full ${accent.dot}`} />
                  <p className="mt-3 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500 dark:text-zinc-400">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">{title}</p>
                </div>
              ))}
            </div>

          </div>
        </div>

        <TickerStrip />
      </section>

      {/* ══════════════════════════════════════════════════════
          PROGRAMS — alternating editorial sections
      ══════════════════════════════════════════════════════ */}
      {PROGRAMS.map(({ n, slug, label, title, tagline, body, accent, image, topics, href, flip }) => (
        <section
          key={slug}
          id={n}
          className={`${accent.sectionBg} py-0`}
        >
          <div className={`grid min-h-[600px] lg:grid-cols-2 ${flip ? "lg:grid-flow-dense" : ""}`}>

            {/* ── Image column ── */}
            <div className={`relative min-h-[300px] overflow-hidden lg:min-h-full ${flip ? "lg:col-start-2" : ""}`}>
              <Image
                src={image.src}
                alt={image.alt}
                fill
                className="object-cover transition duration-700 hover:scale-[1.03]"
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Gradient overlay — vignette fade to section bg edge */}
              <div
                className={`absolute inset-0 ${flip ? "bg-linear-to-r" : "bg-linear-to-l"} from-transparent via-transparent to-black/25`}
                aria-hidden
              />
              {/* Number watermark on image */}
              <div className="absolute bottom-4 left-4 text-7xl font-black leading-none text-white/20 select-none">
                {n}
              </div>
            </div>

            {/* ── Content column ── */}
            <div className={`relative flex flex-col justify-center px-8 py-14 sm:px-12 sm:py-16 lg:px-14 lg:py-20 ${flip ? "lg:col-start-1 lg:row-start-1" : ""}`}>

              {/* Decorative large number in bg */}
              <span
                className={`pointer-events-none absolute right-6 top-6 select-none font-black leading-none ${accent.number} opacity-40`}
                style={{ fontSize: "clamp(5rem, 12vw, 9rem)" }}
                aria-hidden
              >
                {n}
              </span>

              {/* Eyebrow */}
              <div className="flex items-center gap-3">
                <span className={`h-px w-8 ${accent.bg} opacity-60`} />
                <p className={`text-[10px] font-bold uppercase tracking-[0.28em] ${accent.text}`}>
                  {label}
                </p>
              </div>

              {/* Title */}
              <h2
                className="relative mt-5 font-black tracking-tight text-zinc-900 dark:text-zinc-50"
                style={{ fontSize: "clamp(1.75rem, 4vw, 3rem)" }}
              >
                {title}
              </h2>

              {/* Tagline */}
              <p className={`mt-3 text-sm font-semibold italic ${accent.text}`}>
                {tagline}
              </p>

              {/* Body */}
              <div className="relative mt-6 space-y-4 text-[0.95rem] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {body.map((para, i) => (
                  <p key={i}>{para}</p>
                ))}
              </div>

              {/* Topic pills */}
              <div className="mt-7 flex flex-wrap gap-2">
                {topics.map((topic) => (
                  <span
                    key={topic}
                    className={`rounded-full border ${accent.border} ${accent.bgLight} px-3 py-1 text-[11px] font-semibold ${accent.text}`}
                  >
                    {topic}
                  </span>
                ))}
              </div>

              {/* CTA */}
              <div className="mt-8">
                <Link
                  href={href}
                  className={`inline-flex items-center gap-2 rounded-xl ${accent.bg} px-6 py-3 text-sm font-bold text-white shadow-lg transition hover:opacity-90 hover:shadow-xl`}
                >
                  Read more
                  <svg className="h-4 w-4" viewBox="0 0 16 16" fill="none" stroke="currentColor" strokeWidth="1.75">
                    <path d="M3 8h10M9 4l4 4-4 4" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </Link>
              </div>
            </div>

          </div>

          {/* Bottom divider */}
          <div className={`h-px ${accent.bg} opacity-15`} />
        </section>
      ))}

      {/* ══════════════════════════════════════════════════════
          CTA
      ══════════════════════════════════════════════════════ */}
      <section className="relative isolate overflow-hidden bg-linear-to-br from-teal-950 via-[#0b2d2a] to-zinc-950 py-24 lg:py-32">
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[radial-gradient(rgba(255,255,255,0.04)_1px,transparent_1px)] bg-size-[32px_32px]" />
        <div aria-hidden className="pointer-events-none absolute -right-32 -top-32 h-[500px] w-[500px] rounded-full bg-teal-400/6 blur-[100px]" />
        <div aria-hidden className="pointer-events-none absolute -bottom-32 -left-32 h-[500px] w-[500px] rounded-full bg-emerald-400/5 blur-[100px]" />

        <div className="relative mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid items-center gap-16 lg:grid-cols-2">

            <div>
              <p className="text-[10px] font-semibold uppercase tracking-[0.3em] text-teal-400/70">
                Get involved
              </p>
              <h2
                className="mt-5 font-black leading-[0.9] tracking-tighter text-white"
                style={{ fontSize: "clamp(2.5rem, 6vw, 4.5rem)" }}
              >
                Explore all<br />
                <span className="bg-linear-to-r from-teal-400 to-emerald-300 bg-clip-text text-transparent">
                  our programs.
                </span>
              </h2>
              <p className="mt-6 max-w-md text-base leading-relaxed text-zinc-400">
                Explore publications, stories, and research outputs — and find ways to collaborate with our teams across Africa.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Link
                  href={africaRoutes.publications}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl bg-teal-600 px-8 text-sm font-bold text-white shadow-xl shadow-teal-900/20 transition hover:bg-teal-500"
                >
                  View publications
                </Link>
                <Link
                  href={africaRoutes.home}
                  className="inline-flex min-h-12 items-center justify-center rounded-xl border border-zinc-700 bg-zinc-900 px-8 text-sm font-semibold text-zinc-300 transition hover:border-teal-700 hover:text-teal-300"
                >
                  Back to home
                </Link>
              </div>
            </div>

            {/* Program colour badges */}
            <div className="grid grid-cols-2 gap-4">
              {PROGRAMS.map(({ n, title, label, accent, topics }) => (
                <div
                  key={n}
                  className="overflow-hidden rounded-3xl border border-white/8 bg-white/5 p-5 backdrop-blur-sm"
                >
                  <div className={`flex h-9 w-9 items-center justify-center rounded-xl ${accent.bg} text-white`}>
                    <span className="text-xs font-black">{n}</span>
                  </div>
                  <p className="mt-4 text-[10px] font-bold uppercase tracking-[0.2em] text-zinc-500">
                    {label}
                  </p>
                  <p className="mt-1 text-sm font-bold text-white">{title}</p>
                  <p className="mt-2 text-[11px] leading-relaxed text-zinc-500">
                    {topics.slice(0, 2).join(" · ")}
                  </p>
                </div>
              ))}
            </div>

          </div>
        </div>
      </section>
    </>
  );
}
