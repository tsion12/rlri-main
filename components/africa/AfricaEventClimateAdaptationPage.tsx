import Image from "next/image";
import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import { WebinarProgramSupportLine } from "@/components/africa/WebinarProgramSupportLine";

const REGISTRATION_HREF =
  "https://docs.google.com/forms/d/e/1FAIpQLSdgvJw-YcKHoeblL1dUp3JeTuuy0j4oXMT7N1mper6-JIkPsg/viewform?usp=publish-editor";

const SPEAKERS = [
  {
    name: "Bouchra Bargam",
    role: "Speaker",
    photo: "/assets/may/Bouchra Bargam.png",
    bio: "Bouchra Bargam is a researcher in hydrology and artificial intelligence, exploring climate issues related to water resources. She has a PhD in this field from Mohammed VI Polytechnic University. Bouchra Bargam specializes in innovative techniques for understanding and forecasting water supply in areas where data is unavailable. In her role as co-lead of the Baobab Synthesis project, she contributes to research into the complex relationships between climate, conflict, and livelihoods in the Sahel region.",
  },
  {
    name: "Andrew Heffernan",
    role: "Speaker",
    photo: "/assets/may/Andrew Heffernan.png",
    bio: "Andrew Heffernan holds a PhD in Political Science from the University of Ottawa, where he is an adjunct professor teaching on global governance, environmental politics, and information integrity. His research and policy work focus on climate governance, climate disinformation, and the intersections of environmental change, food systems, and insecurity, particularly in African contexts. He is a Senior Programs Manager at the Centre for Information Integrity and a Fellow at the Centre for International Governance Innovation (CIGI), where he previously completed a postdoctoral fellowship. Andrew has also served as Rapporteur for the Forum for Information and Democracy (FID) and held research roles with IFSD and Nexus PFM, bridging academic research with applied policy and governance practice.",
  },
  {
    name: "Patricia Jitta Abdulai",
    role: "Speaker",
    photo: "/assets/may/Patricia Jitta Abdulai.png",
    bio: "Patricia Jitta Abdulai is a Lecturer and Dean of the Faculty of Agriculture and Food Science at the University of Makeni, Sierra Leone, and Founder of the Centre of Excellence for Environment and Climate Change. She holds a PhD in Environmental and Water Resources Engineering, with research focused on how climate change affects drought severity at the watershed level. Her work also includes developing low-cost approaches to treat acid mine drainage and heavy-metal contamination. A member of the University of Makeni Scientific Committee, Abdulai is actively engaged in environmental governance and is particularly passionate about gender and climate change, with a strong focus on the impacts of climate change on women in agriculture.",
  },
] as const;

export function AfricaEventClimateAdaptationPage() {
  return (
    <>
      <section className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
            Webinar Series | Real Life Research Institute
          </p>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
            Rethinking Climate Adaptation in Africa
          </h1>
          <p className="mt-5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Online webinar | Friday, May 29, 2026
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Ottawa: 9:00 – 10:30 AM (EDT) | West Africa: 1:00 – 2:30 PM | North Africa: 2:00 – 3:30 PM |
            Central &amp; Southern Africa: 3:00 – 4:30 PM | East Africa: 4:00 – 5:30 PM
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={REGISTRATION_HREF}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex min-h-11 items-center justify-center rounded-lg bg-teal-700 px-6 text-sm font-semibold text-white transition hover:bg-teal-600"
            >
              Register now
            </a>
            <Link
              href={africaRoutes.events}
              className="inline-flex min-h-11 items-center justify-center rounded-lg border border-zinc-200 bg-white px-6 text-sm font-semibold text-zinc-800 transition hover:border-teal-700/40 hover:text-teal-800 dark:border-zinc-700 dark:bg-zinc-900 dark:text-zinc-100 dark:hover:border-zinc-600"
            >
              Back to events
            </Link>
          </div>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-zinc-50 py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Webinar overview</h2>

          <p className="mt-5 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Across Africa, climate change is no longer a future risk but a lived reality. From advancing
            desertification and climate-related conflict dynamics in the Sahel to intensified flooding in coastal
            and informal settlements in Sierra Leone, climate impacts are reshaping livelihoods, deepening
            vulnerability, and testing governance systems.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            In response, global investments in climate adaptation have increased significantly. Yet many
            interventions continue to fall short of expected outcomes, particularly for the most vulnerable
            communities. A growing body of evidence suggests that this gap is not merely technical, but
            structural: adaptation strategies are frequently externally designed, standardized across diverse
            contexts, and insufficiently grounded in local realities and Indigenous knowledge systems.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Emerging findings from a climate-conflict-migration synthesis in the Sahel under the BAOBAB initiative
            show that adaptation efforts that overlook social dynamics, political context, and community-level coping
            strategies risk reinforcing vulnerability rather than reducing it. At the same time, climate misinformation
            and disinformation are increasingly shaping how climate risks and responses are understood. Disinformation
            not only distorts scientific evidence but also undermines trust in both formal expertise and Indigenous
            knowledge systems, delaying effective policy action.
          </p>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Despite these constraints, communities are actively responding. In Sierra Leone, particularly in
            high-risk coastal and urban communities such as Kroo Bay, Portee, and Rokupa, residents are
            implementing locally driven adaptation measures to manage recurrent flooding and climate stress.
            Often characterized as a “no-wait-for-government” approach, these initiatives are practical, low-cost,
            and deeply rooted in lived experience—yet they remain largely under-recognized and underfunded within
            national and international adaptation frameworks.
          </p>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-4xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Purpose of the webinar</h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            This webinar aims to recentre locally grounded adaptation in African climate responses by bringing
            together three complementary perspectives: evidence from a Sahel-focused climate-conflict-migration
            synthesis under the BAOBAB initiative; expert insight on climate misinformation and disinformation and
            their implications for adaptation governance; and lived experience from a local civil society leader
            working in high-risk communities in Sierra Leone.
          </p>
          <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            By bridging research, information integrity, and community-based practice, the webinar seeks to advance
            more context-responsive, trusted, and effective pathways for climate adaptation across Africa.
          </p>

          <h2 className="mt-10 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Targeted Audience</h2>
          <p className="mt-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Local and regional civil society organizations and community-based groups working on climate adaptation;
            African and Canadian development practitioners involved in resilience, humanitarian, and sustainable
            development programming; policymakers and donor agencies shaping climate, adaptation, and development
            finance; as well as researchers, students, and policy analysts engaged in climate adaptation, resilience,
            and sustainable development.
          </p>

          <WebinarProgramSupportLine month="may" className="mt-8" />
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <h2 className="text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Key speakers</h2>
          <ul className="mt-8 space-y-8">
            {SPEAKERS.map((person) => (
              <li key={person.name}>
                <article className="overflow-hidden rounded-2xl border border-zinc-200/80 bg-zinc-50 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/70 md:flex md:gap-8">
                  <div className="relative aspect-4/3 w-full shrink-0 md:aspect-auto md:h-full md:min-h-64 md:w-72 md:self-stretch">
                    <Image
                      src={person.photo}
                      alt={person.name}
                      fill
                      className="object-cover"
                      sizes="(max-width: 768px) 100vw, 288px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col justify-center p-5 sm:p-6">
                    <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">
                      {person.role}
                    </p>
                    <h3 className="mt-1 text-lg font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                      {person.name}
                    </h3>
                    <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">{person.bio}</p>
                  </div>
                </article>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-sm italic leading-relaxed text-zinc-500 dark:text-zinc-400">Moderator: TBC</p>
        </div>
      </section>
    </>
  );
}

