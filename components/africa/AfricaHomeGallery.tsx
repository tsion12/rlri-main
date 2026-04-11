"use client";

import Image from "next/image";
import { useEffect, useMemo, useState } from "react";
import { au } from "./africa-ui";

const galleryBasePath = "/assets/gallery";
const galleryImages = [
  "WhatsApp Image 2026-01-01 at 17.17.43.jpeg",
  "WhatsApp Image 2026-01-01 at 17.17.49.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.10.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.35.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.45.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.54.jpeg",
] as const;

export function AfricaHomeGallery() {
  const [slideIndex, setSlideIndex] = useState(0);
  const slides = useMemo(
    () =>
      galleryImages.map((fileName, index) => ({
        src: `${galleryBasePath}/${encodeURIComponent(fileName)}`,
        alt: `Africa Program field image ${index + 1}`,
        creditLabel: "RLRI Africa Program",
      })),
    [],
  );

  useEffect(() => {
    if (slides.length <= 1) return;
    const interval = window.setInterval(() => {
      setSlideIndex((idx) => (idx + 1) % slides.length);
    }, 5500);
    return () => window.clearInterval(interval);
  }, [slides.length]);

  return (
    <section className={`${au.home.section} pb-16 sm:pb-20 lg:pb-24`} aria-labelledby="africa-home-gallery-heading">
      <div className="border border-zinc-300 bg-white p-4 dark:border-zinc-700 dark:bg-zinc-900">
        <div className="flex flex-col justify-between gap-2 border-b border-zinc-200 pb-3 sm:flex-row sm:items-end dark:border-zinc-700">
          <div>
            <p className={au.home.eyebrow}>Field perspectives</p>
            <h2 id="africa-home-gallery-heading" className="mt-2 font-serif text-2xl text-zinc-900 dark:text-zinc-100">
              Work across communities
            </h2>
          </div>
          <p className="text-xs font-medium uppercase tracking-widest text-zinc-600 dark:text-zinc-400">
            {slideIndex + 1} / {slides.length}
          </p>
        </div>

        <div className="relative mt-4 aspect-21/9 overflow-hidden bg-zinc-100 dark:bg-zinc-950">
          {slides.map((slide, idx) => (
            <Image
              key={slide.src}
              src={slide.src}
              alt={slide.alt}
              fill
              priority={idx === 0}
              sizes="(max-width: 1024px) 100vw, 80vw"
              className={`object-cover transition-opacity duration-700 ${idx === slideIndex ? "opacity-100" : "opacity-0"}`}
            />
          ))}
        </div>

        <p className="mt-3 border-t border-zinc-200 pt-2 text-xs text-zinc-600 dark:border-zinc-700 dark:text-zinc-400">
          {slides[slideIndex]?.creditLabel ?? "Program photography"}
        </p>
      </div>
    </section>
  );
}
