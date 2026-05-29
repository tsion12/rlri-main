import type { Metadata } from "next";
import { AfricaProgramsPage } from "@/components/africa/AfricaProgramsPage";

export const metadata: Metadata = {
  title: "Programs | RLRI Africa Programs",
  description:
    "Explore the five thematic programs of the Real Life Research Institute – Africa Programs: Oceans, Digital Futures, Climate Adaptation & Resilience, Peacebuilding & Inclusive Dialogues, and Health Systems, Equity, and Social Transformation.",
};

export default function ProgramsPage() {
  return <AfricaProgramsPage />;
}
