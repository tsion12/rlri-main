import type { Metadata } from "next";
import { AfricaUpcomingEventsPage } from "@/components/africa/AfricaUpcomingEventsPage";

export const metadata: Metadata = {
  title: "Upcoming Events | RLRI Africa Programs",
  description:
    "Register for upcoming RLRI Africa Program webinars and public dialogues. Join researchers, policy leaders, and communities tackling Africa's development challenges.",
};

export default function UpcomingEventsPage() {
  return <AfricaUpcomingEventsPage />;
}
