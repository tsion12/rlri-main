import type { Metadata } from "next";
import { AfricaPublicationsHub } from "@/components/africa/AfricaPublicationsHub";
import { getAfricaPosts } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Publications | Africa Program – Real Life Research Institute",
  description:
    "Research insights, field stories, and policy content from the Real Life Research Institute Africa Programs.",
};

export default async function PublicationsPage() {
  const latestPosts = await getAfricaPosts();
  return <AfricaPublicationsHub latestPosts={latestPosts} />;
}
