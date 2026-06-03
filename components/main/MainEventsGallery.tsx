"use client";

import Image from "next/image";
import { useCallback, useEffect, useId, useMemo, useState } from "react";
import { au } from "@/components/main/main-ui";
import { useTranslations } from "@/components/main/i18n/LocaleProvider";
import { MainLink } from "@/components/main/MainLink";
import {
  MAIN_GALLERY_ITEMS,
  MAIN_GALLERY_MARQUEE_COUNT,
  mainGalleryPolaroidOffset,
  mainGalleryPolaroidRotate,
} from "@/lib/main-gallery";
import { mainRoutes } from "@/lib/main-routes";

type GalleryItem = (typeof MAIN_GALLERY_ITEMS)[number];

function formatPhotoCount(template: string, total: number) {
  return template.replace("{total}", String(total));
}

const TAPE =
  "pointer-events-none absolute h-7 w-14 -rotate-12 bg-amber-100/90 shadow-sm ring-1 ring-amber-200/80 dark:bg-amber-900/50 dark:ring-amber-800/60";

type PolaroidProps = {
  item: GalleryItem;
  index: number;
  onClick: () => void;
  size?: "sm" | "lg";
  label: string;
  caption: string;
  float?: boolean;
};

function Polaroid({ item, index, onClick, size = "sm", label, caption, float }: PolaroidProps) {
  const rotate = mainGalleryPolaroidRotate(index);
  const offset = mainGalleryPolaroidOffset(index);

  const sizes = {
    sm: { frame: "w-36 sm:w-40", image: "aspect-4/5" },
    lg: { frame: "w-full max-w-md", image: "aspect-4/5" },
  }[size];

  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={label}
      className={`group polaroid-card relative shrink-0 cursor-pointer transition duration-500 ease-out hover:z-20 hover:scale-105 hover:rotate-0 focus-visible:z-20 focus-visible:scale-105 focus-visible:rotate-0 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-teal-500/60 focus-visible:ring-offset-2 ${sizes.frame} ${float ? "gallery-polaroid-float" : ""}`}
      style={
        {
          ["--polaroid-rotate" as string]: `${rotate}deg`,
          marginTop: size === "sm" ? 0 : offset,
          animationDelay: float ? `${(index % 6) * 0.35}s` : undefined,
          transform: float ? undefined : `rotate(${rotate}deg)`,
        } as React.CSSProperties
      }
    >
      <span className={`${TAPE} -left-2 -top-2`} aria-hidden />
      <span className={`${TAPE} -right-2 -top-1 rotate-6`} aria-hidden />

      <span className="block rounded-sm bg-white p-2.5 pb-10 shadow-[0_12px_40px_-12px_rgba(15,23,42,0.35)] ring-1 ring-zinc-200/90 transition duration-500 group-hover:shadow-[0_20px_50px_-12px_rgba(13,148,136,0.35)] dark:bg-zinc-100 dark:ring-zinc-300/80">
        <span className={`relative block overflow-hidden ${sizes.image} bg-zinc-100`}>
          <Image
            src={item.src}
            alt=""
            fill
            sizes={size === "lg" ? "(max-width: 768px) 90vw, 28rem" : "12rem"}
            className="object-cover transition duration-700 group-hover:scale-110"
            loading={index < 4 ? "eager" : "lazy"}
          />
        </span>
        <span
          className="absolute bottom-2.5 left-0 right-0 text-center font-serif text-[11px] italic text-zinc-500 dark:text-zinc-600"
          aria-hidden
        >
          {caption}
        </span>
      </span>
    </button>
  );
}

function MarqueeRow({
  items,
  reverse,
  onPhotoClick,
  imageAlt,
  caption,
}: {
  items: GalleryItem[];
  reverse?: boolean;
  onPhotoClick: (globalIndex: number) => void;
  imageAlt: string;
  caption: string;
}) {
  const track = [...items, ...items];

  return (
    <div
      className="relative overflow-hidden py-2"
      aria-hidden={false}
    >
      <div
        className={`flex w-max gap-5 px-2 ${reverse ? "gallery-marquee-reverse" : "gallery-marquee"}`}
      >
        {track.map((item, i) => {
          const globalIndex = MAIN_GALLERY_ITEMS.findIndex((g) => g.id === item.id);
          return (
            <Polaroid
              key={`${item.id}-${i}`}
              item={item}
              index={globalIndex}
              size="sm"
              float={i % 3 === 0}
              onClick={() => onPhotoClick(globalIndex)}
              label={`${imageAlt} ${globalIndex + 1}`}
              caption={caption}
            />
          );
        })}
      </div>
    </div>
  );
}

type LightboxProps = {
  open: boolean;
  index: number;
  onClose: () => void;
  onPrev: () => void;
  onNext: () => void;
  label: string;
  closeLabel: string;
  prevLabel: string;
  nextLabel: string;
  imageAlt: string;
};

function GalleryLightbox({
  open,
  index,
  onClose,
  onPrev,
  onNext,
  label,
  closeLabel,
  prevLabel,
  nextLabel,
  imageAlt,
}: LightboxProps) {
  const item = MAIN_GALLERY_ITEMS[index];

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") onPrev();
      if (e.key === "ArrowRight") onNext();
    };
    window.addEventListener("keydown", onKey);

    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, onClose, onPrev, onNext]);

  if (!open || !item) return null;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center bg-teal-950/85 p-4 backdrop-blur-md sm:p-8"
      role="dialog"
      aria-modal="true"
      aria-label={label}
      onClick={onClose}
    >
      <button
        type="button"
        className="absolute right-4 top-4 z-10 flex size-11 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:right-8 sm:top-8"
        onClick={(e) => {
          e.stopPropagation();
          onClose();
        }}
        aria-label={closeLabel}
      >
        <svg className="size-5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M6 6l12 12M18 6 6 18" strokeLinecap="round" />
        </svg>
      </button>

      <button
        type="button"
        className="absolute left-2 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:left-6 sm:flex"
        onClick={(e) => {
          e.stopPropagation();
          onPrev();
        }}
        aria-label={prevLabel}
      >
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M14 6l-6 6 6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <button
        type="button"
        className="absolute right-2 top-1/2 z-10 hidden size-12 -translate-y-1/2 items-center justify-center rounded-full border border-white/25 bg-white/15 text-white transition hover:bg-white/25 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-white/50 sm:right-6 sm:flex"
        onClick={(e) => {
          e.stopPropagation();
          onNext();
        }}
        aria-label={nextLabel}
      >
        <svg className="size-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" aria-hidden>
          <path d="M10 6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <figure
        className="relative flex max-h-[min(85vh,900px)] w-full max-w-4xl flex-col items-center"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative w-full rounded-sm bg-white p-3 pb-12 shadow-2xl ring-1 ring-zinc-200/80">
          <div className="relative aspect-4/3 w-full overflow-hidden bg-zinc-100 sm:aspect-video">
            <Image
              src={item.src}
              alt={`${imageAlt} ${index + 1}`}
              fill
              className="object-contain"
              sizes="(max-width: 1280px) 100vw, 896px"
              priority
            />
          </div>
          <figcaption className="absolute bottom-3 left-0 right-0 text-center font-serif text-sm italic text-zinc-500">
            {index + 1} / {MAIN_GALLERY_ITEMS.length}
          </figcaption>
        </div>
      </figure>
    </div>
  );
}

export function MainEventsGallery() {
  const t = useTranslations();
  const headingId = useId();
  const [lightboxIndex, setLightboxIndex] = useState<number | null>(null);
  const [spotlightIndex, setSpotlightIndex] = useState(0);

  const total = MAIN_GALLERY_ITEMS.length;

  const marqueeA = useMemo(
    () => MAIN_GALLERY_ITEMS.slice(0, MAIN_GALLERY_MARQUEE_COUNT),
    [],
  );
  const marqueeB = useMemo(
    () =>
      MAIN_GALLERY_ITEMS.slice(
        MAIN_GALLERY_MARQUEE_COUNT,
        MAIN_GALLERY_MARQUEE_COUNT * 2,
      ),
    [],
  );

  const spotlightItem = MAIN_GALLERY_ITEMS[spotlightIndex] ?? MAIN_GALLERY_ITEMS[0];

  const openLightbox = useCallback((index: number) => setLightboxIndex(index), []);
  const closeLightbox = useCallback(() => setLightboxIndex(null), []);

  const goPrev = useCallback(() => {
    setLightboxIndex((idx) =>
      idx === null ? null : (idx - 1 + MAIN_GALLERY_ITEMS.length) % MAIN_GALLERY_ITEMS.length,
    );
  }, []);

  const goNext = useCallback(() => {
    setLightboxIndex((idx) => (idx === null ? null : (idx + 1) % MAIN_GALLERY_ITEMS.length));
  }, []);

  const imageAlt = t("home.eventsGallery.imageAlt");
  const polaroidCaption = t("home.eventsGallery.polaroidCaption");

  return (
    <section
      id="main-events-gallery"
      className={`relative overflow-hidden border-b border-zinc-200/80 bg-teal-50/40 dark:border-zinc-800 dark:bg-teal-950/20 ${au.home.sectionPad}`}
      aria-labelledby={headingId}
    >
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,rgba(20,184,166,0.12)_1px,transparent_0)] bg-size-[28px_28px] opacity-60"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -right-24 top-10 h-96 w-96 rounded-full bg-teal-300/20 blur-3xl"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute -left-16 bottom-20 h-72 w-72 rounded-full bg-violet-300/15 blur-3xl"
        aria-hidden
      />

      <div className={`${au.home.section} relative`}>
        {/* Story + spotlight */}
        <div className="grid items-center gap-10 lg:grid-cols-[1fr_minmax(280px,380px)] lg:gap-14">
          <header className="text-center lg:text-left">
            <span className="inline-flex items-center gap-2 rounded-full border border-teal-200/80 bg-white/80 px-3 py-1 text-[11px] font-semibold uppercase tracking-[0.2em] text-teal-700 shadow-sm dark:border-teal-800/60 dark:bg-zinc-900/80 dark:text-teal-300">
              <span className="size-1.5 rounded-full bg-teal-500" aria-hidden />
              {t("home.eventsGallery.eyebrow")}
            </span>
            <h2
              id={headingId}
              className="mt-5 font-serif text-3xl font-semibold tracking-tight text-zinc-900 sm:text-4xl lg:text-[2.5rem] lg:leading-[1.1] dark:text-zinc-50"
            >
              {t("home.eventsGallery.title")}
            </h2>
            <p className={`${au.home.lead} mx-auto mt-4 lg:mx-0`}>{t("home.eventsGallery.lead")}</p>

            <div className="mt-8 flex flex-col items-center gap-4 sm:flex-row lg:items-start">
              <MainLink href={mainRoutes.events} className={au.header.donate}>
                {t("home.eventsGallery.viewEvents")}
              </MainLink>
              <p className="text-sm font-medium text-zinc-500 dark:text-zinc-400">
                {formatPhotoCount(t("home.eventsGallery.photoCount"), total)}
              </p>
            </div>
          </header>

          <div className="relative mx-auto w-full max-w-md lg:mx-0 lg:max-w-none">
            <div
              className="pointer-events-none absolute -inset-6 rounded-[2rem] bg-linear-to-br from-teal-200/50 via-transparent to-violet-200/40 blur-2xl"
              aria-hidden
            />
            <Polaroid
              item={spotlightItem}
              index={spotlightIndex}
              size="lg"
              onClick={() => openLightbox(spotlightIndex)}
              label={`${imageAlt} ${spotlightIndex + 1}`}
              caption={polaroidCaption}
            />
          </div>
        </div>

        {/* Pick spotlight */}
        <div className="mt-10 overflow-x-auto pb-2">
          <p className="mb-3 text-center text-xs font-medium uppercase tracking-widest text-zinc-400">
            {t("home.eventsGallery.featuredLabel")}
          </p>
          <div className="flex w-max gap-2 px-4 sm:mx-auto sm:justify-center">
            {MAIN_GALLERY_ITEMS.slice(0, 12).map((item, index) => {
              const active = index === spotlightIndex;
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => setSpotlightIndex(index)}
                  className={`relative size-14 shrink-0 overflow-hidden rounded-lg ring-2 transition sm:size-16 ${
                    active
                      ? "scale-105 ring-teal-500"
                      : "opacity-70 ring-transparent hover:opacity-100 hover:ring-teal-300/60"
                  }`}
                  aria-label={`${imageAlt} ${index + 1}`}
                  aria-pressed={active}
                >
                  <Image src={item.src} alt="" fill className="object-cover" sizes="4rem" />
                </button>
              );
            })}
          </div>
        </div>

        {/* Film strips */}
        <div className="relative mt-14 sm:mt-16">
          <div
            className="pointer-events-none absolute inset-y-0 left-0 z-10 w-16 bg-linear-to-r from-teal-50/95 to-transparent dark:from-teal-950/30"
            aria-hidden
          />
          <div
            className="pointer-events-none absolute inset-y-0 right-0 z-10 w-16 bg-linear-to-l from-teal-50/95 to-transparent dark:from-teal-950/30"
            aria-hidden
          />
          <p className="mb-3 text-center text-[10px] font-semibold uppercase tracking-[0.35em] text-teal-600/80 dark:text-teal-400/80">
            ◆ {t("home.eventsGallery.runBanner")} ◆
          </p>
          <MarqueeRow
            items={marqueeA}
            onPhotoClick={openLightbox}
            imageAlt={imageAlt}
            caption={polaroidCaption}
          />
          <MarqueeRow
            items={marqueeB}
            reverse
            onPhotoClick={openLightbox}
            imageAlt={imageAlt}
            caption={polaroidCaption}
          />
        </div>
      </div>

      <GalleryLightbox
        open={lightboxIndex !== null}
        index={lightboxIndex ?? 0}
        onClose={closeLightbox}
        onPrev={goPrev}
        onNext={goNext}
        label={t("home.eventsGallery.lightboxLabel")}
        closeLabel={t("home.eventsGallery.close")}
        prevLabel={t("home.eventsGallery.previous")}
        nextLabel={t("home.eventsGallery.next")}
        imageAlt={imageAlt}
      />
    </section>
  );
}
