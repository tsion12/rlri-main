import type { Metadata } from "next";
import { AfricaTeamPage } from "@/components/africa/AfricaTeamPage";

export const metadata: Metadata = {
  title: "Team | Africa Program | Real Life Research Institute",
  description:
    "Meet the Real Life Research Institute Africa Program team and affiliates—staff, fellows, and research affiliates across Africa.",
};

export default function TeamPage() {
  return <AfricaTeamPage />;
}
