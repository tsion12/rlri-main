import type { Metadata } from "next";
import { AfricaVolunteersPage } from "@/components/africa/AfricaVolunteersPage";

export const metadata: Metadata = {
  title: "Volunteers | Africa Program | Real Life Research Institute",
  description:
    "Volunteer with RLRI Africa—including the Iqaluit summer student volunteer program. Events, program support, and more.",
};

export default function AfricaVolunteersRoute() {
  return <AfricaVolunteersPage />;
}
