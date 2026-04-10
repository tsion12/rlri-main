import type { Metadata } from "next";
import { AfricaVolunteersPage } from "@/components/africa/AfricaVolunteersPage";

export const metadata: Metadata = {
  title: "Volunteers | Africa Program | Real Life Research Institute",
  description:
    "Volunteer with the Real Life Research Institute Africa Program—research dissemination, events, and program support.",
};

export default function AfricaVolunteersRoute() {
  return <AfricaVolunteersPage />;
}
