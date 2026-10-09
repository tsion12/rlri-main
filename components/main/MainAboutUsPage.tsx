import { MainAboutHashScroll } from "@/components/main/MainAboutHashScroll";
// import { MainAboutIssuuFlipbook } from "@/components/main/MainAboutIssuuFlipbook";
import { MainAboutPolicies } from "@/components/main/MainAboutPolicies";
import { MainAboutValuePillars } from "@/components/main/MainAboutValuePillars";
import { MainAboutWhoWeAre } from "@/components/main/MainAboutWhoWeAre";
import type { Locale } from "@/lib/i18n/config";
import { getTranslator } from "@/lib/i18n/translate";
import { mainGallerySrc } from "@/lib/main-gallery";
import { getMainPolicyPosts } from "@/lib/wp";

type Props = { locale: Locale };

export async function MainAboutUsPage({ locale }: Props) {
  const [t, policyPosts] = await Promise.all([getTranslator(locale), getMainPolicyPosts(locale)]);

  // Lead frame: community members celebrating Canada Day together. Supporting
  // frames: the Arctic security research dialogue, and a community celebration.
  const storyImages = [
    {
      src: mainGallerySrc("Celebrate Canada pictures 1.jpeg"),
      alt: t("pages.aboutUs.story.imageAlt"),
    },
    {
      src: mainGallerySrc("Rethinking Arctic Security from Iqaluit-conference.jpeg"),
      alt: t("pages.aboutUs.story.imageAltResearch"),
    },
    {
      src: mainGallerySrc("Multiculturalism & Food Festival.jpeg"),
      alt: t("pages.aboutUs.story.imageAltCommunity"),
    },
  ] as const;

  // The two focus cards restate what the institute does. The strings live under
  // `home.whoWeAre` because the home page introduces the same two areas — they
  // describe the institute, not the page, so they are shared rather than forked.
  const focus = [
    {
      key: "programs",
      title: t("home.whoWeAre.skillTitle"),
      body: t("home.whoWeAre.skillBody"),
    },
    {
      key: "research",
      title: t("home.whoWeAre.researchTitle"),
      body: t("home.whoWeAre.researchBody"),
    },
  ];

  const pillars = [
    {
      key: "vision",
      title: t("pages.aboutUs.pillars.visionTitle"),
      body: t("pages.aboutUs.pillars.visionBody"),
      variant: "light" as const,
    },
    {
      key: "mission",
      title: t("pages.aboutUs.pillars.missionTitle"),
      body: t("pages.aboutUs.pillars.missionBody"),
      variant: "teal" as const,
    },
    {
      key: "impact",
      title: t("pages.aboutUs.pillars.impactTitle"),
      body: t("pages.aboutUs.pillars.impactBody"),
      variant: "light" as const,
    },
  ];

  return (
    <div className="bg-white dark:bg-zinc-950">
      <MainAboutHashScroll />
      <section
        className="relative overflow-hidden border-b border-zinc-200/80 bg-linear-to-br from-teal-50 via-white to-zinc-50 dark:border-zinc-800 dark:from-teal-950/40 dark:via-zinc-950 dark:to-zinc-950"
        aria-labelledby="about-page-hero"
      >
        <div
          className="pointer-events-none absolute -right-32 top-0 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl dark:bg-teal-600/15"
          aria-hidden
        />
        <div className="relative mx-auto max-w-7xl px-4 py-14 sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <p className="text-[11px] font-semibold uppercase tracking-[0.28em] text-teal-600 dark:text-teal-400">
            {t("pages.aboutUs.heroEyebrow")}
          </p>
          <h1
            id="about-page-hero"
            className="mt-4 max-w-4xl font-serif text-4xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.08]"
          >
            {t("pages.aboutUs.heroTitle")}
          </h1>
          <p className="mt-4 max-w-2xl text-lg text-zinc-600 dark:text-zinc-400">{t("pages.aboutUs.heroLead")}</p>
        </div>
      </section>

      <MainAboutWhoWeAre
        eyebrow={t("pages.aboutUs.story.eyebrow")}
        heading={t("pages.aboutUs.story.heading")}
        lead={t("home.whoWeAre.intro")}
        locationLabel={t("pages.aboutUs.story.locationLabel")}
        locationTagline={t("pages.aboutUs.story.locationTagline")}
        tags={[
          t("pages.aboutUs.story.tags.nunavut"),
          t("pages.aboutUs.story.tags.ottawa"),
          t("pages.aboutUs.story.tags.under40"),
          t("pages.aboutUs.story.tags.iq"),
        ]}
        images={storyImages}
        focus={focus}
        welcome={t("pages.aboutUs.welcome")}
        welcomeSub={t("pages.aboutUs.welcomeSub")}
      />

      {/* Temporarily hidden — Issuu flipbook has a slide issue
      <MainAboutIssuuFlipbook
        eyebrow={t("pages.aboutUs.flipbook.eyebrow")}
        title={t("pages.aboutUs.flipbook.title")}
        lead={t("pages.aboutUs.flipbook.lead")}
        iframeTitle={t("pages.aboutUs.flipbook.iframeTitle")}
        openExternal={t("pages.aboutUs.flipbook.openExternal")}
        hint={t("pages.aboutUs.flipbook.hint")}
      />
      */}

      <MainAboutValuePillars
        valueEyebrow={t("pages.aboutUs.value.eyebrow")}
        valueTitle={t("pages.aboutUs.value.title")}
        valueLead={t("pages.aboutUs.value.lead")}
        coreLabel={t("pages.aboutUs.value.coreLabel")}
        pillars={pillars}
      />

      <MainAboutPolicies
        eyebrow={t("pages.aboutUs.policies.eyebrow")}
        title={t("pages.aboutUs.policies.title")}
        lead={t("pages.aboutUs.policies.lead")}
        readPolicy={t("pages.aboutUs.policies.readPolicy")}
        viewAll={t("pages.aboutUs.policies.viewAll")}
        empty={t("pages.aboutUs.policies.empty")}
        posts={policyPosts}
        locale={locale}
      />
    </div>
  );
}
