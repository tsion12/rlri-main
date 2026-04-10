import type { Metadata } from "next";
import { AfricaCareerPage } from "@/components/africa/AfricaCareerPage";

export const metadata: Metadata = {
  title: "Career | Africa Program | Real Life Research Institute",
  description:
    "Career opportunities with the Real Life Research Institute Africa Program—stay tuned for future openings.",
};

export default function CareerPage() {
  return <AfricaCareerPage />;
}
