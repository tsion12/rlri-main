import { mainGallerySrc } from "@/lib/main-gallery";

/** Hero and pillar imagery for the Arctic Security flagship page. */
export const ARCTIC_SECURITY_IMAGES = {
  hero: mainGallerySrc("What makes people feel safe and at home in the North.webp"),
  pillar1Soccer: mainGallerySrc("Community Soccer initiative.jpeg"),
  pillar1Race: mainGallerySrc("WhatsApp Image 2025-08-23 at 19.07.54.jpeg"),
  pillar2Festival: mainGallerySrc("Multiculturalism & Food Festival.jpeg"),
  // The dialogue photo used on the home page would repeat here, so pillar 3
  // shows the delegate gathering from the research conference instead.
  pillar3Dialogue: mainGallerySrc("PXL_20230604_173520811.jpg"),
} as const;

export const ARCTIC_PILLAR_IDS = ["sports-community", "multiculturalism", "research-dialogue"] as const;
