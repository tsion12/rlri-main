import { mainGallerySrc } from "@/lib/main-gallery";

/** Hero and pillar imagery for the Arctic Security flagship page. */
export const ARCTIC_SECURITY_IMAGES = {
  hero: mainGallerySrc("What makes people feel safe and at home in the North.webp"),
  pillar1Soccer: mainGallerySrc("PXL_20230604_173520811.jpg"),
  pillar1Race: mainGallerySrc("WhatsApp Image 2025-08-23 at 19.07.54.jpeg"),
  pillar2Festival: mainGallerySrc("Multiculturalism & Food Festival.jpeg"),
  pillar3Dialogue: mainGallerySrc("Research & Northern – Southern Dialogue.webp"),
} as const;

export const ARCTIC_PILLAR_IDS = ["sports-community", "multiculturalism", "research-dialogue"] as const;
