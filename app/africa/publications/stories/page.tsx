import type { Metadata } from "next";
import { AfricaStoriesPage } from "@/components/africa/AfricaPublicationsSubPages";
import { getAfricaStories } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Stories | Africa Program – Real Life Research Institute",
  description:
    "First-hand accounts and field stories from the Real Life Research Institute Africa Programs and the communities we work with.",
};

export default async function StoriesPage() {
  const posts = await getAfricaStories();
  return <AfricaStoriesPage posts={posts} />;
}
