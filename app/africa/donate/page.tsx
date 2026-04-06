import type { Metadata } from "next";
import { AfricaDonatePage } from "@/components/africa/AfricaDonatePage";

export const metadata: Metadata = {
  title: "Donate | Africa Program – Real Life Research Institute",
  description:
    "Support the Real Life Research Institute Africa Program — literacy, humanitarian aid, research, and community-led initiatives. Submit a donation request securely.",
};

export default function DonatePage() {
  return <AfricaDonatePage />;
}
