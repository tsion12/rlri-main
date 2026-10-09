"use client";

import Image from "next/image";
import { au } from "@/components/shared/africa-ui";

type Focus = {
  key: string;
  title: string;
  body: string;
};

type MosaicImage = {
  src: string;
  alt: string;
};

type Props = {
  eyebrow: string;
  heading: string;
  /** Sits beside the heading — the section used to be a headline over empty space. */
  lead: string;
  locationLabel: string;
  locationTagline: string;
  tags: string[];
  /** Lead photo, then two supporting photos. */
  images: readonly [MosaicImage, MosaicImage, MosaicImage];
  focus: Focus[];
  welcome: string;
  welcomeSub: string;
};

function FocusIcon({ index }: { index: number }) {
  if (index === 1) {
    return (
      <svg
        className="size-6"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden
      >
        <circle cx="11" cy="11" r="6.5" />
        <path d="m16 16 4.5 4.5M11 8v6M8 11h6" />
      </svg>
    );
  }
  return (
    <svg
      className="size-6"
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="1.7"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden
    >
      <path d="M16 20v-1.5a3.5 3.5 0 0 0-3.5-3.5h-5A3.5 3.5 0 0 0 4 18.5V20M10 11.5a3.25 3.25 0 1 0 0-6.5 3.25 3.25 0 0 0 0 6.5ZM20 20v-1.5a3.5 3.5 0 0 0-2.6-3.38M15 5.2a3.25 3.25 0 0 1 0 6.1" />
    </svg>
  );
}

export function MainAboutWhoWeAre({
  eyebrow,
  heading,
  lead,
  locationLabel,
  locationTagline,
  tags,
  images,
  focus,
  welcome,
  welcomeSub,
}: Props) {
  const [primary, ...supporting] = images;

  return (
    <section
      id="who-we-are"
      className="relative scroll-mt-24 overflow-hidden border-b border-zinc-200/80 bg-[#f7faf9] bg-[radial-gradient(ellipse_120%_80%_at_50%_-20%,rgba(20,184,166,0.09),transparent_55%)] dark:border-zinc-800 dark:bg-zinc-950 dark:bg-none"
      aria-labelledby="who-we-are-heading"
    >
      <div
        className="h-1 w-full bg-linear-to-r from-violet-800 via-teal-600 to-teal-500"
        aria-hidden
      />
      <div className={au.about.heroBloom} aria-hidden />
      <div className={au.hero.grid} aria-hidden />
      <div
        className="pointer-events-none absolute -left-24 top-40 h-96 w-96 rounded-full bg-teal-400/12 blur-3xl dark:bg-teal-600/10"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-16 bottom-32 h-80 w-80 rounded-full bg-violet-600/8 blur-3xl dark:bg-violet-500/12"
        aria-hidden
      />

      <div className={`${au.about.section} relative py-16 sm:py-20 lg:py-28`}>
        {/* Header — heading on the left, the institute in one paragraph on the right */}
        <header
          className="home-fade-up relative grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1fr)] lg:items-end lg:gap-16"
          style={{ animationDelay: "40ms" }}
        >
          <div className="relative">
            <span
              className="pointer-events-none absolute -left-2 -top-10 select-none font-serif text-[7rem] font-bold leading-none text-zinc-200/80 dark:text-zinc-800/80 sm:-left-4 sm:text-[9rem]"
              aria-hidden
            >
              01
            </span>
            <p className={`${au.about.heroEyebrow} relative`}>{eyebrow}</p>
            <h2
              id="who-we-are-heading"
              className="relative mt-6 font-serif text-4xl font-semibold tracking-tight text-zinc-900 sm:text-5xl lg:text-[3.25rem] lg:leading-[1.06] dark:text-zinc-50"
            >
              {heading}
            </h2>
          </div>

          <div className="relative">
            <p className="text-base leading-relaxed text-zinc-600 dark:text-zinc-400 sm:text-[17px]">
              {lead}
            </p>
            <ul className="mt-7 flex flex-wrap gap-2">
              {tags.map((tag) => (
                <li key={tag}>
                  <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/90 bg-white/80 px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300">
                    <span className="size-1.5 rounded-full bg-teal-500" aria-hidden />
                    {tag}
                  </span>
                </li>
              ))}
            </ul>
          </div>
        </header>

        {/* Photo mosaic — one lead image with two supporting frames */}
        <div
          className="home-fade-up mt-14 grid gap-4 lg:mt-16 lg:grid-cols-12 lg:gap-5"
          style={{ animationDelay: "120ms" }}
        >
          <figure className="group relative aspect-4/3 overflow-hidden rounded-3xl bg-zinc-200 shadow-[0_32px_80px_-32px_rgba(15,23,42,0.45)] ring-1 ring-zinc-900/5 lg:col-span-7 lg:aspect-16/11 dark:bg-zinc-800 dark:ring-white/10">
            <Image
              src={primary.src}
              alt={primary.alt}
              fill
              className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
              sizes="(max-width: 1024px) 100vw, 58vw"
            />
            <div
              className="absolute inset-0 bg-linear-to-t from-zinc-950/75 via-zinc-950/10 to-transparent"
              aria-hidden
            />
            <figcaption className="absolute bottom-5 left-5 right-5 flex items-end justify-between gap-4">
              <div className="min-w-0 rounded-2xl border border-white/15 bg-zinc-950/50 px-4 py-3 backdrop-blur-md">
                <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-300">
                  {locationLabel}
                </p>
                <p className="mt-0.5 truncate text-sm font-medium text-white">{locationTagline}</p>
              </div>
              <span
                className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-teal-500 to-teal-700 text-white shadow-lg sm:flex"
                aria-hidden
              >
                <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                  <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
                  <circle cx="12" cy="10" r="2.5" />
                </svg>
              </span>
            </figcaption>
          </figure>

          <div className="grid gap-4 sm:grid-cols-2 lg:col-span-5 lg:grid-cols-1 lg:grid-rows-2 lg:gap-5">
            {supporting.map((image) => (
              <figure
                key={image.src}
                className="group relative aspect-16/10 overflow-hidden rounded-3xl bg-zinc-200 shadow-[0_24px_60px_-32px_rgba(15,23,42,0.45)] ring-1 ring-zinc-900/5 lg:aspect-auto dark:bg-zinc-800 dark:ring-white/10"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  className="object-cover transition duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 40vw"
                />
              </figure>
            ))}
          </div>
        </div>

        {/* What the institute does */}
        <div
          className="home-fade-up mt-14 grid gap-4 sm:grid-cols-2 lg:mt-16 lg:gap-5"
          style={{ animationDelay: "260ms" }}
        >
          {focus.map((item, index) => (
            <article
              key={item.key}
              className="group relative overflow-hidden rounded-3xl border border-zinc-200/80 bg-white/90 p-7 shadow-sm backdrop-blur-sm transition hover:-translate-y-0.5 hover:border-teal-200/80 hover:shadow-md dark:border-zinc-800/80 dark:bg-zinc-900/50 dark:hover:border-teal-800/50 sm:p-8"
            >
              <div
                className="pointer-events-none absolute -right-10 -top-10 size-32 rounded-full bg-teal-400/10 blur-2xl transition group-hover:bg-teal-400/20"
                aria-hidden
              />
              <span className="relative inline-flex size-12 items-center justify-center rounded-2xl bg-teal-50 text-teal-700 ring-1 ring-teal-600/20 dark:bg-teal-950/50 dark:text-teal-300 dark:ring-teal-500/30">
                <FocusIcon index={index} />
              </span>
              <h3 className="relative mt-5 font-serif text-xl font-semibold tracking-tight text-zinc-900 dark:text-zinc-50">
                {item.title}
              </h3>
              <p className="relative mt-3 text-[15px] leading-relaxed text-zinc-600 dark:text-zinc-400">
                {item.body}
              </p>
            </article>
          ))}
        </div>

        {/* Welcome */}
        <div className="home-fade-up mt-16 lg:mt-20" style={{ animationDelay: "340ms" }}>
          <div className="relative overflow-hidden rounded-3xl bg-linear-to-br from-teal-700 via-teal-600 to-emerald-700 px-8 py-12 text-center shadow-[0_28px_70px_-28px_rgba(13,148,136,0.5)] ring-1 ring-teal-500/30 sm:px-14 sm:py-14 dark:from-teal-800 dark:via-teal-700 dark:to-emerald-800">
            <div
              className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_-20%,rgba(255,255,255,0.15),transparent_55%)]"
              aria-hidden
            />
            <div
              className="pointer-events-none absolute -right-16 bottom-0 h-48 w-48 rounded-full bg-violet-500/25 blur-3xl"
              aria-hidden
            />
            <p className="relative font-serif text-3xl font-semibold tracking-tight text-white sm:text-4xl">
              {welcome}
            </p>
            <p className="relative mx-auto mt-3 max-w-lg text-sm leading-relaxed text-teal-50/90 sm:text-base">
              {welcomeSub}
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
