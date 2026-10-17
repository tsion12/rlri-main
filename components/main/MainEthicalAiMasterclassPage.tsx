import type { Locale } from "@/lib/i18n/config";
import type { TranslationKey } from "@/lib/i18n/messages/en";
import { getTranslator } from "@/lib/i18n/translate";
import { hasEthicalAiAccess } from "@/lib/ethical-ai-session";
import { signOutOfEthicalAi } from "@/lib/ethical-ai-actions";
import { EthicalAiLoginForm } from "@/components/main/EthicalAiLoginForm";
import { MainImagePlaceholder } from "@/components/main/MainImagePlaceholder";

type Props = { locale: Locale };

const SESSION_IDS = ["decision", "bias", "accountability"] as const;

function paragraphs(text: string) {
  return text.split("\n\n").filter(Boolean);
}

export async function MainEthicalAiMasterclassPage({ locale }: Props) {
  const t = await getTranslator(locale);
  const signedIn = await hasEthicalAiAccess();

  return (
    <div className="bg-[#f7faf9] dark:bg-zinc-950">
      <section
        className="relative flex min-h-[70dvh] items-center justify-center overflow-hidden"
        aria-labelledby="ethical-ai-heading"
      >
        <MainImagePlaceholder accent="teal" variant="overlay" />
        <div className="absolute inset-0 bg-linear-to-b from-zinc-950/70 via-zinc-950/45 to-zinc-950/85" aria-hidden />
        <div className="relative z-10 mx-auto max-w-3xl px-4 py-24 text-center sm:px-6 lg:px-8">
          <p className="text-[11px] font-semibold uppercase tracking-[0.32em] text-teal-300/90">
            {t("pages.ethicalAi.heroEyebrow")}
          </p>
          <h1
            id="ethical-ai-heading"
            className="mt-6 font-serif text-4xl font-semibold leading-[1.1] tracking-tight text-white sm:text-5xl"
          >
            {t("pages.ethicalAi.heroTitle")}
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-lg leading-relaxed text-white/90">{t("pages.ethicalAi.heroLead")}</p>
        </div>
      </section>

      <section className="border-b border-zinc-200/80 bg-white dark:border-zinc-800 dark:bg-zinc-950">
        <div className="mx-auto grid max-w-7xl gap-12 px-4 py-16 sm:px-6 lg:grid-cols-[minmax(0,1.4fr)_minmax(0,0.8fr)] lg:px-8 lg:py-20">
          <div>
            <h2 className="font-serif text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
              {t("pages.ethicalAi.aboutTitle")}
            </h2>
            <p className="mt-6 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("pages.ethicalAi.aboutP1")}
            </p>
            <p className="mt-5 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("pages.ethicalAi.aboutP2")}
            </p>
            <h3 className="mt-10 text-sm font-bold tracking-tight text-zinc-900 dark:text-zinc-100">
              {t("pages.ethicalAi.audienceTitle")}
            </h3>
            <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
              {t("pages.ethicalAi.audienceBody")}
            </p>
          </div>

          <aside className="h-fit rounded-3xl border border-zinc-200/80 bg-zinc-50 p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/50 sm:p-8">
            {signedIn ? (
              <div>
                <p className="text-[11px] font-semibold uppercase tracking-[0.22em] text-teal-700 dark:text-teal-400">
                  {t("pages.ethicalAi.signedInEyebrow")}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {t("pages.ethicalAi.classroomLead")}
                </p>
                <form action={signOutOfEthicalAi} className="mt-6">
                  <input type="hidden" name="locale" value={locale} />
                  <button
                    type="submit"
                    className="inline-flex min-h-11 items-center justify-center rounded-full border border-zinc-300 px-6 text-sm font-semibold text-zinc-800 transition hover:bg-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-600 dark:border-zinc-700 dark:text-zinc-100 dark:hover:bg-zinc-800"
                  >
                    {t("pages.ethicalAi.signOut")}
                  </button>
                </form>
              </div>
            ) : (
              <div>
                <h2 className="font-serif text-2xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {t("pages.ethicalAi.loginTitle")}
                </h2>
                <p className="mt-3 text-sm leading-relaxed text-zinc-600 dark:text-zinc-400">
                  {t("pages.ethicalAi.loginLead")}
                </p>
                <EthicalAiLoginForm locale={locale} />
              </div>
            )}
          </aside>
        </div>
      </section>

      <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8 lg:py-20" aria-labelledby="ethical-ai-sessions">
        <h2
          id="ethical-ai-sessions"
          className="font-serif text-3xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50"
        >
          {signedIn ? t("pages.ethicalAi.classroomTitle") : t("pages.ethicalAi.outlineTitle")}
        </h2>
        <p className="mt-4 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400">
          {signedIn ? t("pages.ethicalAi.classroomLead") : t("pages.ethicalAi.outlineLead")}
        </p>
        <ol className="mt-10 grid gap-6">
          {SESSION_IDS.map((id, index) => {
            const titleKey = `pages.ethicalAi.sessions.${id}.title` as TranslationKey;
            const summaryKey = `pages.ethicalAi.sessions.${id}.summary` as TranslationKey;
            const bodyKey = `pages.ethicalAi.sessions.${id}.body` as TranslationKey;
            return (
              <li
                key={id}
                className="rounded-3xl border border-zinc-200/80 bg-white p-6 shadow-sm dark:border-zinc-800 dark:bg-zinc-900/40 sm:p-8"
              >
                <p className="text-[11px] font-semibold uppercase tracking-[0.18em] text-teal-700 dark:text-teal-400">
                  {String(index + 1).padStart(2, "0")}
                </p>
                <h3 className="mt-2 text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                  {t(titleKey)}
                </h3>
                <p className="mt-3 text-base leading-relaxed text-zinc-600 dark:text-zinc-400">{t(summaryKey)}</p>
                {signedIn
                  ? paragraphs(t(bodyKey)).map((paragraph) => (
                      <p key={paragraph} className="mt-4 text-base leading-relaxed text-zinc-700 dark:text-zinc-300">
                        {paragraph}
                      </p>
                    ))
                  : null}
              </li>
            );
          })}
        </ol>
      </section>
    </div>
  );
}
