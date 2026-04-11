import Image from "next/image";
import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";

/* ── Program data ─────────────────────────────────────────────────── */
const PROGRAMS = [
  {
    n: "01",
    slug: "oceans",
    title: "Oceans",
    tagline: "Blue economy, maritime security, and inclusive coastal development",
    body: [
      "The Ocean Program at the Real Life Research Institute – Africa Program builds on our work on ocean, blue economy, maritime security, governance, and inclusive economic development. The program focuses on ocean and maritime activities, local, regional, and international ocean policies and law, including aspects of livelihood, coastal development, and resilience.",
      "The program supports contemporary debates and policy action on sustainable ocean resource management, economic development, strengthening environmental protection, and enhancing the resilience of coastal and marine-dependent communities. We contribute to research that advances understanding of ocean ecosystems and ocean health, with a focus on the Gulf of Guinea and beyond.",
      "By generating context-specific knowledge and linking African expertise with international research and policy platforms, the program positions Africa as a critical contributor to global ocean science and governance.",
    ],
    image: {
      src: "/assets/programs/ocean.jpg",
      alt: "Ocean and maritime program",
    },
    topics: ["Blue Economy", "Maritime Security", "Ocean Governance", "Coastal Resilience", "Gulf of Guinea"],
    href: `${africaRoutes.blogs}?program=oceans`,
  },
  {
    n: "02",
    slug: "digital-futures",
    title: "Digital Futures",
    tagline: "AI governance, digital transformation, and inclusive tech for Africa",
    body: [
      "Our Digital Futures Program focuses on the social, political, and economic implications of digital transformation across Africa, with particular attention to artificial intelligence (AI) and its growing role in shaping sustainable development.",
      "The program supports research and policy engagement on the ethical use of AI, AI governance frameworks, and the gendered dimensions of artificial intelligence. It also examines how biases in AI systems can reinforce inequalities, particularly for women and marginalized groups, and explores pathways for more inclusive, accountable, and context-sensitive AI design and deployment.",
      "The program contributes to shaping more equitable and responsible digital futures while positioning Africa as an important actor in global debates on AI governance and digital transformation.",
    ],
    image: {
      src: "/assets/programs/digital.jpg",
      alt: "Digital futures program",
    },
    topics: ["AI Governance", "Digital Transformation", "Tech Ethics", "Gender & AI", "Inclusive Design"],
    href: `${africaRoutes.blogs}?program=digital-futures`,
  },
  {
    n: "03",
    slug: "climate",
    title: "Climate Adaptation & Resilience",
    tagline: "Local voices, indigenous knowledge, and climate justice across Africa",
    body: [
      "The Climate Adaptation & Resilience program amplifies local and indigenous voices across Africa on climate adaptation. It supports research and policy dialogue on locally grounded adaptation strategies, resilience-building, climate justice, livelihood protection, and the governance systems needed to respond to growing climate risks.",
      "The program also examines the intersection of climate change and conflict, including how environmental stressors such as resource scarcity, displacement, and livelihood disruption can exacerbate existing tensions and undermine stability in vulnerable regions like the Sahel.",
      "By advancing evidence-based and context-sensitive approaches, and by connecting African perspectives to broader global debates, the program contributes to stronger and more inclusive responses to climate change across the continent and beyond.",
    ],
    image: {
      src: "/assets/programs/climate.jpg",
      alt: "Climate adaptation and resilience program",
    },
    topics: ["Climate Justice", "Resilience Building", "Sahel Stability", "Indigenous Knowledge", "Livelihood Protection"],
    href: `${africaRoutes.blogs}?program=climate`,
  },
  {
    n: "04",
    slug: "peacebuilding",
    title: "Peacebuilding & Inclusive Dialogues",
    tagline: "Civil society, national dialogues, and sustainable conflict transformation",
    body: [
      "The Peacebuilding & Inclusive Dialogue Program builds on our work on national dialogues and the role of civil society in peacebuilding processes across Africa. The program explores the actual and potential role of civil society organisations in peacebuilding dialogues.",
      "It supports research and policy engagement on peace processes, national and local dialogue initiatives, civil society participation, gender inclusion, and the institutional conditions needed for meaningful and sustainable peacebuilding.",
      "By producing context-specific knowledge and linking African practitioners and researchers with wider policy and dialogue platforms, the program engages communities, civil society actors, and decision-makers, ensuring that locally grounded insights meaningfully inform policy processes and support effective conflict transformation.",
    ],
    image: {
      src: "/assets/programs/peace.jpg",
      alt: "Peacebuilding and inclusive dialogues program",
    },
    topics: ["Civil Society", "National Dialogues", "Gender Inclusion", "Conflict Transformation", "Peace Processes"],
    href: `${africaRoutes.blogs}?program=peacebuilding`,
  },
  {
    n: "05",
    slug: "food-environment-natural-resources",
    title: "Food, Environment, and Natural Resources",
    tagline: "Sustainable food systems, environmental stewardship, and equitable natural resource governance",
    body: [
      "Africa is home to rapidly evolving food systems that are deeply intertwined with environmental change, natural resource governance, and shifting livelihoods. Our Food, Environment, and Natural Resources program adopts a holistic approach to food systems, recognizing that food is sourced from interconnected ecosystems, including crops, livestock, fisheries, and natural environments.",
      "The program examines how these systems intersect with environmental sustainability, climate change, livelihoods, and governance across diverse African contexts. It supports research and policy dialogue on sustainable food production, ecosystem stewardship, mining governance, and water, sanitation, and hygiene (WASH), including how mining affects agricultural land through degradation and displacement and impacts water systems through overuse and contamination, directly shaping food production, safety, and access, and contributing to resource-based tensions and conflict dynamics.",
      "By advancing context-specific and evidence-based approaches and linking African expertise with global policy and research platforms, the program contributes to more resilient, inclusive, and sustainable food systems and natural resource management.",
    ],
    image: {
      src: "/assets/programs/climate.jpg",
      alt: "Food systems and environment program",
    },
    topics: ["Food Systems", "Ecosystem Stewardship", "Mining Governance", "WASH", "Climate & Livelihoods"],
    href: `${africaRoutes.blogs}?program=food-environment-natural-resources`,
  },
] as const;

const topicPillClass =
  "rounded-full border border-zinc-200/90 bg-zinc-50 px-3 py-1 text-[11px] font-medium text-zinc-700 dark:border-zinc-700 dark:bg-zinc-800/60 dark:text-zinc-300";

function ProgramCopy({
  className = "",
  title,
  tagline,
  body,
  topics,
  href,
}: {
  className?: string;
  title: string;
  tagline: string;
  body: readonly string[];
  topics: readonly string[];
  href: string;
}) {
  return (
    <div className={`flex flex-col justify-center p-6 sm:p-8 lg:p-10 ${className}`}>
      <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">{title}</h2>
      <p className="mt-2 text-sm font-medium leading-snug text-zinc-700 dark:text-zinc-300">{tagline}</p>
      <div className="mt-5 space-y-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
        {body.map((para, i) => (
          <p key={i}>{para}</p>
        ))}
      </div>
      <div className="mt-6 flex flex-wrap gap-2">
        {topics.map((topic) => (
          <span key={topic} className={topicPillClass}>
            {topic}
          </span>
        ))}
      </div>
      <div className="mt-8">
        <Link
          href={href}
          className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
        >
          Read more
        </Link>
      </div>
    </div>
  );
}

export function AfricaProgramsPage() {
  return (
    <>
      <section
        className="border-b border-zinc-200/80 bg-white py-20 dark:border-zinc-800 dark:bg-zinc-950 sm:py-24"
        aria-labelledby="programs-heading"
      >
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
            Africa Programs
          </p>
          <h1
            id="programs-heading"
            className="mt-4 text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl"
          >
            Our programs
          </h1>
          <p className="mt-5 max-w-3xl text-lg leading-relaxed text-zinc-600 dark:text-zinc-400">
            Five thematic programs connecting research, policy, and communities across the priorities that matter most
            for Africa.
          </p>

          <nav aria-label="Program sections" className="mt-10">
            <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-500">
              Jump to a program
            </p>
            <ul className="mt-3 flex flex-col gap-2 sm:flex-row sm:flex-wrap sm:gap-x-6 sm:gap-y-2">
              {PROGRAMS.map(({ n, title }) => (
                <li key={n}>
                  <Link
                    href={`#${n}`}
                    className="text-sm font-medium text-teal-800 underline-offset-4 transition hover:text-teal-600 hover:underline dark:text-teal-300 dark:hover:text-teal-200"
                  >
                    <span className="text-zinc-400 dark:text-zinc-500">{n}</span>
                    <span className="mx-1.5 text-zinc-300 dark:text-zinc-600">·</span>
                    {title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </section>

      <div className="bg-zinc-50/80 dark:bg-zinc-950">
        {PROGRAMS.map(({ n, slug, title, tagline, body, image, topics, href }, index) => {
          const imageFirst = index % 2 === 0;
          return (
            <section
              key={slug}
              id={n}
              className="scroll-mt-20 border-b border-zinc-200/80 py-16 dark:border-zinc-800 sm:py-20 lg:py-24"
            >
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <article className="overflow-hidden rounded-2xl border border-zinc-200/90 bg-white shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50">
                  <div className="grid md:grid-cols-2 md:items-stretch">
                    {imageFirst ? (
                      <>
                        <div className="relative min-h-56 w-full md:min-h-72">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                        <ProgramCopy title={title} tagline={tagline} body={body} topics={topics} href={href} />
                      </>
                    ) : (
                      <>
                        <ProgramCopy
                          className="order-2 md:order-1"
                          title={title}
                          tagline={tagline}
                          body={body}
                          topics={topics}
                          href={href}
                        />
                        <div className="relative order-1 min-h-56 w-full md:order-2 md:min-h-72">
                          <Image
                            src={image.src}
                            alt={image.alt}
                            fill
                            className="object-cover"
                            sizes="(max-width: 768px) 100vw, 50vw"
                          />
                        </div>
                      </>
                    )}
                  </div>
                </article>
              </div>
            </section>
          );
        })}
      </div>

      <section className="border-t border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col gap-8 rounded-2xl border border-zinc-200/90 bg-zinc-50/90 p-8 sm:flex-row sm:items-center sm:justify-between sm:p-10 dark:border-zinc-800 dark:bg-zinc-900/40">
            <div className="max-w-xl">
              <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
                Get involved
              </p>
              <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-3xl">
                Explore publications &amp; stories
              </h2>
              <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
                Find research outputs and ways to collaborate with our teams across Africa.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 sm:shrink-0">
              <Link
                href={africaRoutes.publications}
                className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white shadow-sm transition hover:bg-teal-600"
              >
                View publications
              </Link>
              <Link
                href={africaRoutes.home}
                className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
              >
                Back to home
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
