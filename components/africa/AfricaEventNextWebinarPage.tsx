import Image from "next/image";
import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import { WebinarProgramSupportLine } from "@/components/africa/WebinarProgramSupportLine";

const REGISTER_URL =
  "https://docs.google.com/forms/d/e/1FAIpQLSfGSPxWyIdYLIXDRPWZs4XezOXcBZ09rV3yxnPze1DXZ3lXxA/viewform?usp=publish-editor";

const SPEAKERS = [
  {
    name: "Solomon Kimaita",
    role: "Speaker",
    photo: "/assets/april/Solomon.webp",
    bio: "Solomon Kimaita is an accomplished Lecturer of International Relations and Diplomacy at Zetech University in Nairobi, Kenya, specializing in Peace and Conflict Studies. He holds an M.A. in International Relations from the United States International University-Africa, and a B.A. in Social Studies – Government and Public Administration from Moi University in Eldoret, Kenya. Solomon’s teaching portfolio covers topics such as Development Dynamics in Africa, Regional Integration, and International Conflict Management. He is a Certified Professional Mediator and has certifications in pedagogy and academic quality assurance. His experience spans significant roles in humanitarian work with UNHCR and project management with USIU’s Development Partnerships in Higher Education Project. He has contributed to multiple academic conferences and published in peer-reviewed journals on emerging themes like AI in conflict prevention, youth participation in climate resilience and digital diplomacy. A committed academic, Solomon actively contributes to curriculum development and mentorship as the patron of the UNESCO Club at Zetech. His professional affiliations include membership in the Christian Professional Mediators Association of Kenya (CPMAK) and the International Relations Society of Kenya (IRSK).",
  },
  {
    name: "Alvin Korkie",
    role: "Speaker",
    photo: "/assets/april/Alvin.webp",
    bio: "Alvin Korkie is a telecommunications and ICT executive with nearly 30 years of experience across Africa, the Middle East, Latin America, and the Caribbean. He has held senior leadership roles, including Chief Commercial Officer at operators such as MTC Namibia, Digicel Group, and Uganda Telecom, where he led market expansion, commercial strategy, and the rollout of broadband and digital services. He has worked closely with leading telecommunications groups, including MTN, Vodacom, and Airtel Africa, advising on strategy, digital transformation, and the evolution of operators into full-scale digital service providers. His expertise spans mobile and fixed broadband, enterprise ICT solutions, fintech, and emerging technologies such as 5G, cloud, and IoT. Alvin is the founder of NXCOM Global, an advisory firm focused on digital infrastructure, telecom strategy, and digital transformation across emerging markets. He is passionate about expanding access to connectivity and enabling inclusive digital economies, particularly across Sub-Saharan Africa.",
  },
  {
    name: "Mkong Immaculate Kelighai",
    role: "Moderator",
    photo: "/assets/april/Mkong.webp",
    bio: "Mkong Immaculate Kelighai is a certified professional peacebuilder and communications specialist with strong expertise in external relations and stakeholder engagement. She holds a Bachelor’s in Journalism and Mass Communication (University of Buea), a Master’s in Information and Communication Science (University of Yaoundé II), and a certificate in Conflict Resolution, Peacebuilding, and Reconciliation (Hekima University, Nairobi). Imma has worked with the United Nations in key communications and political affairs roles. She served as Program Assistant for Communications at the Africa Office of the UN University for Peace (UPEACE-Africa) in Ethiopia, and later joined the UN Stabilization Mission in the Democratic Republic of Congo (MONUSCO) as Associate Political Affairs Officer, contributing to conflict analysis, mediation, and peacebuilding processes. She is a PhD researcher in Peace and Security Studies, and has published in several peer-reviewed journals on the role of media in conflicts and intergroup relations in Africa.",
  },
] as const;

export function AfricaEventNextWebinarPage() {
  return (
    <>
      <section className="border-b border-zinc-200/80 bg-white py-16 dark:border-zinc-800 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.25em] text-teal-700 dark:text-teal-400">
            Webinar Series | Real Life Research Institute
          </p>
          <h1 className="mt-4 max-w-5xl text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-4xl lg:text-5xl">
            Tensions in the Middle East: Implications for African Security and Digital Infrastructure
          </h1>
          <p className="mt-5 text-sm font-medium text-zinc-700 dark:text-zinc-300">
            Location: Online | Monday, April 27, 2026
          </p>
          <p className="mt-2 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            Ottawa (EDT): 9:00 am – 10:00 am | South Africa (SAST): 3:00 pm – 4:00 pm | Kenya / Ethiopia (EAT):
            4:00 pm – 5:00 pm | Cameroon/Nigeria (WAT): 2:00 pm – 3:00 pm
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a
              href={REGISTER_URL}
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
          <div className="space-y-4 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
            <p>
              Since 28 February 2026, the Middle East has experienced sustained hostilities following United States
              and Israeli strikes against Iran and subsequent retaliation by Iran. The conflict is already disrupting
              global trade and maritime routes, which ultimately drives up prices for goods and commodities imported
              into African markets.
            </p>
            <p>
              The crisis also raises important security considerations. The Horn of Africa hosts several strategic
              military bases within the range of the Iranian missiles, with over 4,000 US military personnel at Camp
              Lemonnier in Djibouti. These developments are unfolding against an already fragile regional context,
              including ongoing conflict in Sudan, tensions between Ethiopia and Eritrea, and persistent instability in
              Somalia.
            </p>
            <p>
              Beyond these geopolitical risks, one of the most overlooked dimensions of the crisis is its cascading
              impact on Africa&apos;s digital infrastructure and socio-economic systems. Much of Sub-Saharan Africa&apos;s
              internet traffic depends on subsea cables routed through the Red Sea and broader Middle East, making the
              region highly vulnerable to disruptions.
            </p>
            <p>
              This event brings together scholars, policymakers, and practitioners to examine the economic, security,
              and political implications of the evolving Middle East crisis for Africa, and to explore how African
              governments and institutions can prepare for and respond to these emerging challenges.
            </p>
          </div>
        </div>
      </section>

      <section className="bg-white py-16 dark:bg-zinc-950 sm:py-20">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <WebinarProgramSupportLine program="04" className="max-w-4xl" />
          <h2 className="mt-10 text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">Speakers &amp; moderator</h2>
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
        </div>
      </section>
    </>
  );
}
