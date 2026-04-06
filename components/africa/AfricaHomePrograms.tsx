import Image from "next/image";
import Link from "next/link";
import { africaRoutes } from "@/lib/africa-routes";
import { africaStock } from "./africa-stock";
import { au } from "./africa-ui";

const ITEMS = [
  {
    title: "Programs",
    body: "Field projects, training, and partnerships that turn research into lasting impact.",
    href: africaRoutes.programs,
    cta: "Explore programs",
  },
  {
    title: "Media center",
    body: "Photos, films, and stories from our work across the continent.",
    href: africaRoutes.media,
    cta: "Open publications",
  },
  {
    title: "Get involved",
    body: "Volunteer, collaborate, or support the next generation of African researchers.",
    href: africaRoutes.getInvolved,
    cta: "See how to help",
  },
] as const;

export function AfricaHomePrograms() {
  return (
    <section
      className={`${au.home.sectionMuted} ${au.home.sectionPad}`}
      aria-labelledby="africa-programs-heading"
    >
      <div className={`${au.home.section}`}>
        <p className={au.home.eyebrow}>Explore</p>
        <h2 id="africa-programs-heading" className={au.home.title}>
          Programs &amp; resources
        </h2>
        <p className={au.home.lead}>
          Explore programs, publications, and ways to support the Africa Program from this site.
        </p>

        <ul className={au.home.programsGrid}>
          {ITEMS.map(({ title, body, href, cta }, index) => {
            const image = africaStock.programs[index % africaStock.programs.length];

            return (
              <li key={title} className="home-fade-up" style={{ animationDelay: `${index * 90}ms` }}>
                <article className={`${au.home.programCard} group`}>
                  <div className={au.home.programMedia}>
                    <Image
                      src={image.src}
                      alt={image.alt}
                      fill
                      sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      className={au.home.programImage}
                    />
                    <p className={au.home.programCredit}>{image.creditLabel}</p>
                  </div>
                  <div className={au.home.programBodyWrap}>
                    <h3 className={au.home.programTitle}>{title}</h3>
                    <p className={au.home.programBody}>{body}</p>
                    <Link href={href} className={au.home.programLink}>
                      {cta}
                      <span aria-hidden> →</span>
                    </Link>
                  </div>
                </article>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}
