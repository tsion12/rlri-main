import type { Metadata } from "next";
import { AfricaEventNextWebinarPage } from "@/components/africa/AfricaEventNextWebinarPage";

export const metadata: Metadata = {
  title:
    "Tensions in the Middle East: Implications for African Security and Digital Infrastructure | Events | RLRI Africa Programs",
  description:
    "Webinar details, speakers, and registration for RLRI Africa Program's event on Middle East tensions and implications for African security and digital infrastructure.",
};

export default function AfricaEventNextWebinarRoute() {
  return <AfricaEventNextWebinarPage />;
}
