import { mainGallerySrc } from "@/lib/main-gallery";

/** Hero and pillar imagery for the Arctic Security flagship page. */
export const ARCTIC_SECURITY_IMAGES = {
  hero: mainGallerySrc("WhatsApp Image 2026-01-01 at 17.18.35.jpeg"),
  pillar1Soccer: mainGallerySrc("WhatsApp Image 2026-01-01 at 17.18.20.jpeg"),
  pillar1Race: mainGallerySrc("WhatsApp Image 2026-01-01 at 17.17.57.jpeg"),
  pillar2Festival: mainGallerySrc("WhatsApp Image 2026-01-01 at 17.18.14.jpeg"),
  pillar3Dialogue: mainGallerySrc("WhatsApp Image 2026-01-01 at 17.17.49.jpeg"),
} as const;

export const ARCTIC_PILLAR_IDS = ["sports-community", "multiculturalism", "research-dialogue"] as const;
