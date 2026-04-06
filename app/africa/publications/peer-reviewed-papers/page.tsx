import type { Metadata } from "next";
import { AfricaPapersPage } from "@/components/africa/AfricaPublicationsSubPages";

export const metadata: Metadata = {
  title: "Peer-Reviewed Papers | Africa Program – Real Life Research Institute",
  description:
    "Scholarly research articles from the Real Life Research Institute Africa Programs, connecting African voices to global academic and policy conversations.",
};

export default function PapersPage() {
  return <AfricaPapersPage />;
}
