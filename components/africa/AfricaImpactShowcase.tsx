import Image from "next/image";
import { africaStock } from "./africa-stock";
import { au } from "./africa-ui";

const METRICS = [
  { value: "Pan-African", label: "research and dialogue network" },
  { value: "Youth-led", label: "ideas centered in every program" },
  { value: "Real-world", label: "focus on actionable community outcomes" },
] as const;

export function AfricaImpactShowcase() {
  return (
    <section className={`${au.home.section} ${au.home.sectionPad}`} aria-labelledby="africa-impact-heading">
      <div className={au.home.showcaseGrid}>
        <div className={`${au.home.showcaseMediaCol} home-fade-up`}>
          <div className={au.home.showcaseMediaShell}>
            <div className={au.home.showcaseMediaFrame}>
              <Image
                src={africaStock.impact.src}
                alt={africaStock.impact.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className={au.home.showcaseImage}
              />
              <div className={au.home.showcaseQuote}>
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-zinc-500 dark:text-zinc-400">
                  Community-first
                </p>
                <p className="mt-1 font-medium tracking-tight">
                  Local knowledge and lived experience shape the work.
                </p>
              </div>
              <p className={au.home.showcaseCredit}>{africaStock.impact.creditLabel}</p>
            </div>
          </div>
        </div>

        <div className={`${au.home.showcaseCopyCol} home-fade-up`} style={{ animationDelay: "120ms" }}>
          <p className={au.home.eyebrow}>Impact</p>
          <h2 id="africa-impact-heading" className={au.home.title}>
            Research that feels grounded, human, and useful
          </h2>
          <p className={au.home.showcaseLead}>
            We are building a more visual and modern home for the Africa Program, but the heart of it is
            still the same: connect evidence, community insight, and practical action people can actually
            use.
          </p>

          <div className={au.home.showcaseMetrics}>
            {METRICS.map(({ value, label }, index) => (
              <div
                key={label}
                className={`${au.home.showcaseMetric} home-fade-up`}
                style={{ animationDelay: `${180 + index * 70}ms` }}
              >
                <p className={au.home.showcaseMetricValue}>{value}</p>
                <p className={au.home.showcaseMetricLabel}>{label}</p>
              </div>
            ))}
          </div>

          <div className={`${au.home.showcaseCard} home-fade-up`} style={{ animationDelay: "360ms" }}>
            <p className="text-sm leading-relaxed text-zinc-700 dark:text-zinc-300">
              From climate resilience and food systems to urban sustainability and public dialogue, the
              home page should immediately communicate that RLRI Africa is active, thoughtful, and deeply
              connected to the communities it serves.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
