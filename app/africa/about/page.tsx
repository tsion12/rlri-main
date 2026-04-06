import type { Metadata } from "next";
import { AfricaAboutPage } from "@/components/africa/AfricaAboutPage";

export const metadata: Metadata = {
  title: "About Us | Africa Program | Real Life Research Institute",
  description:
    "Who we are, vision, mission, and policies of the Real Life Research Institute Africa Program—Pan-African research and community-driven solutions.",
};

export default function AfricaAboutRoute() {
  return <AfricaAboutPage />;
}
