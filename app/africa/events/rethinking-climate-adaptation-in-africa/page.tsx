import type { Metadata } from "next";
import { AfricaEventClimateAdaptationPage } from "@/components/africa/AfricaEventClimateAdaptationPage";

export const metadata: Metadata = {
  title: "Rethinking Climate Adaptation in Africa | Events | RLRI Africa Programs",
  description:
    "Webinar details for RLRI Africa Programs: locally grounded climate adaptation in Africa, with evidence from the Sahel, insights on information integrity, and local practice from Sierra Leone.",
};

export default function AfricaEventClimateAdaptationRoute() {
  return <AfricaEventClimateAdaptationPage />;
}

