"use client";

import { au } from "@/components/africa/africa-ui";
import { useTranslations } from "@/components/main/i18n/LocaleProvider";
import { mainRoutes } from "@/lib/main-routes";
import { MainLink } from "./MainLink";

export function MainHomeFocus() {
  const t = useTranslations();

  const focusAreas = [
    {
      titleKey: "home.cardArcticTitle" as const,
      bodyKey: "home.cardArcticBody" as const,
      href: mainRoutes.arcticSecurity,
      external: false,
    },
    {
      titleKey: "home.cardMentalTitle" as const,
      bodyKey: "home.cardMentalBody" as const,
      href: mainRoutes.mentalHealth,
      external: false,
    },
    {
      titleKey: "home.cardAfricaTitle" as const,
      bodyKey: "home.cardAfricaBody" as const,
      href: mainRoutes.africaProgram,
      external: true,
    },
  ] as const;

  return (
    <section
      id="main-home-focus"
      className={`${au.home.section} ${au.home.sectionPad}`}
      aria-labelledby="main-focus-heading"
    >
      <p className={au.home.eyebrow}>{t("home.focusEyebrow")}</p>
      <h2 id="main-focus-heading" className={au.home.title}>
        {t("home.focusTitle")}
      </h2>
      <p className={au.home.lead}>{t("home.focusLead")}</p>
      <div className={au.home.programsGrid}>
        {focusAreas.map((area) => {
          const inner = (
            <>
              <h3 className={au.home.programTitle}>{t(area.titleKey)}</h3>
              <p className={au.home.programBody}>{t(area.bodyKey)}</p>
              <span className={au.home.programLink}>
                {t("home.learnMore")}
                <span aria-hidden> →</span>
              </span>
            </>
          );

          return area.external ? (
            <a
              key={area.titleKey}
              href={area.href}
              target="_blank"
              rel="noopener noreferrer"
              className={`${au.home.programCard} group`}
            >
              <div className={au.home.programBodyWrap}>{inner}</div>
            </a>
          ) : (
            <MainLink key={area.titleKey} href={area.href} className={`${au.home.programCard} group`}>
              <div className={au.home.programBodyWrap}>{inner}</div>
            </MainLink>
          );
        })}
      </div>
    </section>
  );
}
