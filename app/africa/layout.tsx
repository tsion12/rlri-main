import type { Metadata } from "next";
import { AfricaPageShell } from "@/components/africa/AfricaPageShell";

export const metadata: Metadata = {
  title: "Africa Program | Real Life Research Institute",
  description:
    "Pan-African programs for climate resilience, energy access, urban sustainability, and food security.",
  icons: {
    icon: [{ url: "/icon.png", sizes: "512x512", type: "image/png" }],
    apple: [{ url: "/icon.png", sizes: "180x180", type: "image/png" }],
    shortcut: ["/icon.png"],
  },
};

export default function AfricaLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <AfricaPageShell>{children}</AfricaPageShell>;
}
