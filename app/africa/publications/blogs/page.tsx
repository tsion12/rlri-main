import type { Metadata } from "next";
import { AfricaBlogsPage } from "@/components/africa/AfricaBlogsPage";
import { getAfricaPosts } from "@/lib/wp";

export const metadata: Metadata = {
  title: "Blogs & Op-eds | Africa Program – Real Life Research Institute",
  description:
    "Research insights, field perspectives, and expert commentary from the Real Life Research Institute Africa Programs team.",
};

export default async function BlogsPage() {
  const posts = await getAfricaPosts();
  return <AfricaBlogsPage posts={posts} />;
}
