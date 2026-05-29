import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { AfricaProgramPublicationsPage } from "@/components/africa/AfricaProgramPublicationsPage";
import { getPolicyBriefsForProgram } from "@/lib/africa-policy-briefs";
import {
  getAfricaPosts,
  getAfricaProgramLabel,
  parseAfricaProgram,
  postMatchesAfricaProgram,
} from "@/lib/wp";

type PageProps = {
  searchParams: Promise<{
    program?: string | string[];
  }>;
};

export default async function ProgramPublicationsPage({ searchParams }: PageProps) {
  const [posts, params] = await Promise.all([getAfricaPosts(), searchParams]);
  const rawProgram = Array.isArray(params.program) ? params.program[0] : params.program;
  const program = parseAfricaProgram(rawProgram);

  if (!program) notFound();

  const filteredPosts = posts.filter((post) => postMatchesAfricaProgram(post, program));
  const briefs = getPolicyBriefsForProgram(program);

  return (
    <AfricaProgramPublicationsPage program={program} posts={filteredPosts} briefs={briefs} />
  );
}

export async function generateMetadata({ searchParams }: PageProps): Promise<Metadata> {
  const params = await searchParams;
  const rawProgram = Array.isArray(params.program) ? params.program[0] : params.program;
  const program = parseAfricaProgram(rawProgram);
  if (!program) return {};

  const label = getAfricaProgramLabel(program);
  return {
    title: `${label} | Publications | RLRI Africa Programs`,
    description: `Blogs, op-eds, and policy briefs from the ${label} program.`,
  };
}
