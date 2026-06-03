/**
 * Past-event photos in `public/assets/gallery/`.
 * Add or remove filenames here when the folder is reorganized.
 */
export const MAIN_GALLERY_BASE = "/assets/gallery";

export const MAIN_GALLERY_FILES = [
  "WhatsApp Image 2026-01-01 at 17.17.43.jpeg",
  "WhatsApp Image 2026-01-01 at 17.17.46.jpeg",
  "WhatsApp Image 2026-01-01 at 17.17.48.jpeg",
  "WhatsApp Image 2026-01-01 at 17.17.49.jpeg",
  "WhatsApp Image 2026-01-01 at 17.17.51.jpeg",
  "WhatsApp Image 2026-01-01 at 17.17.53.jpeg",
  "WhatsApp Image 2026-01-01 at 17.17.55.jpeg",
  "WhatsApp Image 2026-01-01 at 17.17.56.jpeg",
  "WhatsApp Image 2026-01-01 at 17.17.57.jpeg",
  "WhatsApp Image 2026-01-01 at 17.17.58.jpeg",
  "WhatsApp Image 2026-01-01 at 17.17.59.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.00.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.02.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.03.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.04.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.06.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.08.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.09.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.10.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.11.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.12.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.14.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.15.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.18.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.20.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.21.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.26.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.35.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.36.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.37.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.38.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.39.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.40.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.45.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.48.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.49.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.50.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.53.jpeg",
  "WhatsApp Image 2026-01-01 at 17.18.54.jpeg",
] as const;

export type MainGalleryFile = (typeof MAIN_GALLERY_FILES)[number];

export function mainGallerySrc(fileName: string): string {
  return `${MAIN_GALLERY_BASE}/${encodeURIComponent(fileName)}`;
}

export const MAIN_GALLERY_ITEMS = MAIN_GALLERY_FILES.map((file, index) => ({
  id: `gallery-${index}`,
  file,
  src: mainGallerySrc(file),
}));

/** Images per auto-scrolling film strip. */
export const MAIN_GALLERY_MARQUEE_COUNT = 10;

/** Slight tilts for polaroid wall (degrees). */
export const MAIN_GALLERY_POLAROID_ROTATIONS = [
  -5, 3, -2, 4, -4, 2, -3, 5, -1, 3, -4, 2, -2, 4, -3, 1, -5, 3,
] as const;

export function mainGalleryPolaroidRotate(index: number): number {
  return MAIN_GALLERY_POLAROID_ROTATIONS[index % MAIN_GALLERY_POLAROID_ROTATIONS.length];
}

export function mainGalleryPolaroidOffset(index: number): number {
  const offsets = [0, 6, -4, 10, -8, 4, -6, 8, -2, 12, -10, 5];
  return offsets[index % offsets.length];
}
