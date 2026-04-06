import type { Metadata } from "next";
import { AfricaEventsPage } from "@/components/africa/AfricaEventsPage";

export const metadata: Metadata = {
  title: "Events | RLRI Africa Programs",
  description:
    "Upcoming and past webinars, panels, and forums from the Real Life Research Institute – Africa Programs. Join researchers, policy leaders, and communities tackling Africa's development challenges.",
};

export default function EventsPage() {
  return <AfricaEventsPage />;
}
