import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import {
  getPost,
  isWpSource,
  sourceDisplay,
  stripHtml,
  type WpSource,
} from "@/lib/wp";

type Props = {
  params: Promise<{ source: string; slug: string }>;
};

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { source: sourceParam, slug } = await params;
  if (!isWpSource(sourceParam)) return {};
  const post = await getPost(sourceParam, slug);
  if (!post) return {};
  return {
    title: stripHtml(post.title.rendered),
  };
}

function SourceBadge({ source }: { source: WpSource }) {
  const isMain = source === "main";
  return (
    <span
      className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold uppercase tracking-wider ${
        isMain
          ? "bg-stone-200/90 text-stone-700 dark:bg-zinc-800 dark:text-zinc-300"
          : "bg-emerald-950/25 text-emerald-900 dark:bg-emerald-950/50 dark:text-emerald-200"
      }`}
    >
      {sourceDisplay(source)}
    </span>
  );
}

export default async function BlogPostPage({ params }: Props) {
  const { source: sourceParam, slug } = await params;
  if (!isWpSource(sourceParam)) notFound();
  const source: WpSource = sourceParam;

  const post = await getPost(source, slug);
  if (!post) notFound();

  return (
    <article className="mx-auto max-w-2xl px-4 pb-24 pt-10 sm:px-6 sm:pt-14">
      <nav className="mb-10" aria-label="Breadcrumb">
        <Link
          href="/blog"
          className="inline-flex items-center gap-2 rounded-full border border-stone-200/90 bg-white/80 px-4 py-2 text-sm font-medium text-stone-600 shadow-sm transition-all hover:border-amber-200 hover:text-stone-900 dark:border-zinc-800 dark:bg-zinc-900/80 dark:text-zinc-400 dark:hover:border-zinc-600 dark:hover:text-zinc-100"
        >
          <span aria-hidden>←</span>
          All posts
        </Link>
      </nav>

      <header className="mb-12 border-b border-stone-200/80 pb-10 dark:border-zinc-800">
        <SourceBadge source={post.source} />
        <h1
          className="mt-4 text-balance text-3xl font-semibold leading-[1.15] tracking-tight text-stone-900 dark:text-zinc-50 sm:text-4xl sm:leading-[1.1]"
          dangerouslySetInnerHTML={{ __html: post.title.rendered }}
        />
      </header>

      <div
        className="wp-post-content text-stone-800 dark:text-zinc-300"
        dangerouslySetInnerHTML={{ __html: post.content.rendered }}
      />
    </article>
  );
}
