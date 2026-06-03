"use client";

import { au } from "@/components/africa/africa-ui";
import { useTranslations } from "@/components/main/i18n/LocaleProvider";
import type { TranslationKey } from "@/lib/i18n/messages/en";
import { mainRoutes } from "@/lib/main-routes";
import { MainLink } from "./MainLink";

type Props = {
  titleKey: TranslationKey;
  descriptionKey: TranslationKey;
  eyebrowKey?: TranslationKey;
};

export function MainPlaceholderPage({
  titleKey,
  descriptionKey,
  eyebrowKey = "placeholder.defaultEyebrow",
}: Props) {
  const t = useTranslations();

  return (
    <section className={`${au.about.section} ${au.about.sectionPad}`}>
      <p className={au.about.heroEyebrow}>{t(eyebrowKey)}</p>
      <h1 className={au.about.sectionHeading}>{t(titleKey)}</h1>
      <p className={au.about.heroLead}>{t(descriptionKey)}</p>
      <div className={`${au.about.proseCard} mt-10 text-center`}>
        <p className="text-sm text-zinc-600 dark:text-zinc-400">{t("placeholder.body")}</p>
        <MainLink href={mainRoutes.home} className={`${au.about.ctaPrimary} mt-6`}>
          {t("placeholder.backHome")}
        </MainLink>
      </div>
    </section>
  );
}
