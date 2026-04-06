import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BlogPostArticle } from "@/components/blog/BlogPostArticle";
import { getPost, isWpSource, stripHtml, type WpSource } from "@/lib/wp";

type Props = {
  params: Promise<{ source: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { source: sourceParam, slug } = await params;
  if (!isWpSource(sourceParam)) return {};
  const post = await getPost(sourceParam, slug);
  if (!post) return {};
  const title = stripHtml(post.title.rendered);
  const desc =
    post.excerpt?.rendered != null
      ? stripHtml(post.excerpt.rendered).slice(0, 160)
      : stripHtml(post.content.rendered).slice(0, 160);
  return {
    title: `${title} | RLRI Journal`,
    description: desc || undefined,
  };
}

export default async function BlogPostPage({ params }: Props) {
  const { source: sourceParam, slug } = await params;
  if (!isWpSource(sourceParam)) notFound();
  const source: WpSource = sourceParam;

  const post = await getPost(source, slug);
  if (!post) notFound();

  return <BlogPostArticle post={post} />;
}
