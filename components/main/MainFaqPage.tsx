import type { Locale } from "@/lib/i18n/config";
import { getTranslator } from "@/lib/i18n/translate";
import { MAIN_FAQ_ITEMS } from "@/lib/main-faq";
import { MainLink } from "@/components/main/MainLink";

type Props = { locale: Locale };

function FaqAnswer({ text, linkPhrase, linkHref }: { text: string; linkPhrase?: string; linkHref?: string }) {
  if (!linkPhrase || !linkHref || !text.includes(linkPhrase)) {
    return <p>{text}</p>;
  }

  const [before, after] = text.split(linkPhrase);
  const isExternal = linkHref.startsWith("http") || linkHref.startsWith("mailto:");

  return (
    <p>
      {before}
      {isExternal ? (
        <a
          href={linkHref}
          className="font-medium text-teal-700 underline decoration-teal-700/30 underline-offset-2 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
        >
          {linkPhrase}
        </a>
      ) : (
        <MainLink
          href={linkHref}
          className="font-medium text-teal-700 underline decoration-teal-700/30 underline-offset-2 hover:text-teal-800 dark:text-teal-400 dark:hover:text-teal-300"
        >
          {linkPhrase}
        </MainLink>
      )}
      {after}
    </p>
  );
}

export async function MainFaqPage({ locale }: Props) {
  const t = await getTranslator(locale);

  return (
    <div className="bg-white dark:bg-zinc-950">
      <section
        className="border-b border-zinc-200/80 bg-zinc-50/80 dark:border-zinc-800 dark:bg-zinc-900/40"
        aria-labelledby="main-faq-heading"
      >
        <div className="mx-auto max-w-4xl px-4 py-14 text-center sm:px-6 sm:py-16 lg:px-8 lg:py-20">
          <h1
            id="main-faq-heading"
            className="font-serif text-3xl font-bold uppercase tracking-tight text-zinc-900 sm:text-4xl dark:text-zinc-50"
          >
            {t("pages.faq.heading")}
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-lg">
            {t("pages.faq.subtitle")}
          </p>
        </div>
      </section>

      <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20" aria-label={t("pages.faq.listLabel")}>
        <ul className="space-y-8">
          {MAIN_FAQ_ITEMS.map((item, index) => (
            <li key={item.id}>
              <article aria-labelledby={`faq-q-${item.id}`}>
                <h2
                  id={`faq-q-${item.id}`}
                  className="rounded-sm bg-zinc-100 px-5 py-4 text-base font-bold leading-snug text-zinc-900 sm:px-6 sm:text-lg dark:bg-zinc-800/80 dark:text-zinc-50"
                >
                  <span className="sr-only">{`Question ${index + 1}`}</span>
                  {item.question}
                </h2>
                <div className="px-5 py-5 text-base leading-relaxed text-zinc-800 sm:px-6 sm:py-6 dark:text-zinc-300">
                  <FaqAnswer
                    text={item.answer}
                    linkPhrase={item.answerLinkPhrase}
                    linkHref={item.answerLinkHref}
                  />
                </div>
              </article>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}
