import type { Metadata } from "next";
import { AfricaFaqPage } from "@/components/africa/AfricaFaqPage";

export const metadata: Metadata = {
  title: "FAQs | Africa Program – Real Life Research Institute",
  description:
    "Frequently asked questions about the Real Life Research Institute Africa Program — our work, how to support us, scholarship opportunities, and how to get involved.",
};

export default function FaqPage() {
  return <AfricaFaqPage />;
}
