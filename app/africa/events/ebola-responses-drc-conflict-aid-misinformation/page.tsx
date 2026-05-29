import type { Metadata } from "next";
import { AfricaEventEbolaDrcPage } from "@/components/africa/AfricaEventEbolaDrcPage";

export const metadata: Metadata = {
  title: "Ebola Responses in DRC | Events | RLRI Africa Programs",
  description:
    "Webinar on conflict, aid cuts, and misinformation in DRC Ebola responses—and lessons from past outbreaks for stopping transmission at the source.",
};

export default function AfricaEventEbolaDrcRoute() {
  return <AfricaEventEbolaDrcPage />;
}
