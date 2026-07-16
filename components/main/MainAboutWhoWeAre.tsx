"use client";

import Image from "next/image";
import { au } from "@/components/shared/africa-ui";

type Props = {
  eyebrow: string;
  heading: string;
  originTitle: string;
  mottoLabel: string;
  motto: string;
  sloganLabel: string;
  slogan: string;
  locationLabel: string;
  locationTagline: string;
  tags: string[];
  imageSrc: string;
  imageAlt: string;
  welcome: string;
  welcomeSub: string;
  originBody: string;
};

export function MainAboutWhoWeAre({
  eyebrow,
  heading,
  originTitle,
  mottoLabel,
  motto,
  sloganLabel,
  slogan,
  locationLabel,
  locationTagline,
  tags,
  imageSrc,
  imageAlt,
  welcome,
  welcomeSub,
  originBody,
}: Props) {
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
        {/* Header */}
        <header className="home-fade-up relative max-w-4xl" style={{ animationDelay: "40ms" }}>
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
          <ul className="relative mt-8 flex flex-wrap gap-2">
            {tags.map((tag) => (
              <li key={tag}>
                <span className="inline-flex items-center gap-1.5 rounded-full border border-zinc-200/90 bg-white/80 px-3 py-1.5 text-xs font-semibold text-zinc-700 shadow-sm backdrop-blur-sm dark:border-zinc-700 dark:bg-zinc-900/80 dark:text-zinc-300">
                  <span className="size-1.5 rounded-full bg-teal-500" aria-hidden />
                  {tag}
                </span>
              </li>
            ))}
          </ul>
        </header>

        {/* Origin feature */}
        <div
          className="home-fade-up mt-14 grid items-start gap-10 lg:mt-20 lg:grid-cols-12 lg:gap-8 xl:gap-12"
          style={{ animationDelay: "100ms" }}
        >
          <div className="relative lg:col-span-5 lg:sticky lg:top-28">
            <div
              className="pointer-events-none absolute -bottom-3 -right-3 hidden h-full w-full rounded-3xl border-2 border-teal-500/35 lg:block dark:border-teal-500/25"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-3xl bg-zinc-200 shadow-[0_32px_80px_-32px_rgba(15,23,42,0.45)] ring-1 ring-zinc-900/5 dark:bg-zinc-800 dark:ring-white/10">
              <div className="aspect-4/5 sm:aspect-5/6 lg:aspect-4/5">
                <Image
                  src={imageSrc}
                  alt={imageAlt}
                  fill
                  className="object-cover transition duration-700 ease-out hover:scale-[1.02]"
                  sizes="(max-width: 1024px) 100vw, 40vw"
                />
              </div>
              <div
                className="absolute inset-0 bg-linear-to-t from-zinc-950/70 via-transparent to-zinc-950/5"
                aria-hidden
              />
              <div className="absolute bottom-5 left-5 right-5">
                <div className="flex items-end justify-between gap-4">
                  <div className="min-w-0 rounded-2xl border border-white/15 bg-zinc-950/50 px-4 py-3 backdrop-blur-md">
                    <p className="text-[10px] font-semibold uppercase tracking-[0.22em] text-teal-300">
                      {locationLabel}
                    </p>
                    <p className="mt-0.5 truncate text-sm font-medium text-white">{locationTagline}</p>
                  </div>
                  <div
                    className="hidden size-14 shrink-0 items-center justify-center rounded-2xl bg-linear-to-br from-teal-500 to-teal-700 text-white shadow-lg sm:flex"
                    aria-hidden
                  >
                    <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.75">
                      <path d="M12 21s7-4.5 7-11a7 7 0 1 0-14 0c0 6.5 7 11 7 11Z" />
                      <circle cx="12" cy="10" r="2.5" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="lg:col-span-7">
            <div className="relative overflow-hidden rounded-3xl bg-white/90 p-8 shadow-[0_20px_50px_-24px_rgba(15,23,42,0.2)] ring-1 ring-zinc-200/90 backdrop-blur-sm dark:bg-zinc-900/80 dark:ring-zinc-800/90 sm:p-10 lg:p-11">
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-1 bg-linear-to-r from-violet-700 via-teal-600 to-teal-400"
                aria-hidden
              />
              <p className={au.about.sectionTitle}>{originTitle}</p>
              <p className="about-dropcap mt-6 text-lg leading-[1.82] text-zinc-700 dark:text-zinc-300">
                {originBody}
              </p>
            </div>
          </div>
        </div>

        {/* Identity band */}
        <div
          className="home-fade-up relative mt-14 overflow-hidden rounded-3xl lg:mt-16"
          style={{ animationDelay: "180ms" }}
        >
          <div className="absolute inset-0 bg-linear-to-br from-zinc-900 via-zinc-900 to-teal-950 dark:from-zinc-950 dark:to-teal-950" />
          <div
            className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_80%_80%_at_0%_0%,rgba(45,212,191,0.18),transparent_50%),radial-gradient(ellipse_60%_50%_at_100%_100%,rgba(91,33,182,0.15),transparent_50%)]"
            aria-hidden
          />
          <div className="relative grid gap-10 px-8 py-10 sm:px-10 sm:py-12 lg:grid-cols-[1fr_auto_1fr] lg:items-center lg:gap-12">
            <figure>
              <figcaption className="text-[10px] font-semibold uppercase tracking-[0.24em] text-teal-400">
                {mottoLabel}
              </figcaption>
              <blockquote className="mt-3 font-serif text-2xl font-medium leading-snug text-white sm:text-[1.65rem]">
                &ldquo;{motto}&rdquo;
              </blockquote>
            </figure>
            <div
              className="hidden h-24 w-px bg-linear-to-b from-transparent via-white/20 to-transparent lg:block"
              aria-hidden
            />
            <figure className="lg:text-right">
              <figcaption className="text-[10px] font-semibold uppercase tracking-[0.24em] text-zinc-500">
                {sloganLabel}
              </figcaption>
              <blockquote className="mt-3 text-lg font-semibold leading-snug text-zinc-200 sm:text-xl">
                {slogan}
              </blockquote>
            </figure>
          </div>
        </div>

        {/* Welcome */}
        <div
          className="home-fade-up mt-16 lg:mt-20"
          style={{ animationDelay: "320ms" }}
        >
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
