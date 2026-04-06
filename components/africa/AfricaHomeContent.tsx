import { AfricaHero } from "@/components/africa/AfricaHero";
import { AfricaHomeCta } from "@/components/africa/AfricaHomeCta";
import { AfricaHomeNewsletter } from "@/components/africa/AfricaHomeNewsletter";
import { AfricaHomePrograms } from "@/components/africa/AfricaHomePrograms";
import { AfricaImpactShowcase } from "@/components/africa/AfricaImpactShowcase";
import { AfricaLatestNews } from "@/components/africa/AfricaLatestNews";
import { getLatestPosts, getUpcomingEventsPage } from "@/lib/wp";

export async function AfricaHomeContent() {
  const [latestPosts, upcomingEvent] = await Promise.all([getLatestPosts(6), getUpcomingEventsPage()]);
  const featuredPost = latestPosts.find((post) => post.featuredImage) ?? latestPosts[0] ?? null;

  return (
    <>
      <AfricaHero featuredPost={featuredPost} upcomingEvent={upcomingEvent} />
      <AfricaLatestNews posts={latestPosts} />
      <AfricaHomePrograms />
      <AfricaImpactShowcase />
      <AfricaHomeCta />
      <AfricaHomeNewsletter />
    </>
  );
}
