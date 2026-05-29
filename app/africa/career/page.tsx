import type { Metadata } from "next";
import { AfricaCareerPage } from "@/components/africa/AfricaCareerPage";

export const metadata: Metadata = {
  title: "Career | Africa Program | Real Life Research Institute",
  description:
    "Careers with the Real Life Research Institute Africa Program—the Assistant Editor (remote) role is currently closed.",
};

export default function CareerPage() {
  return <AfricaCareerPage />;
}
