import { AfricaHero } from "@/components/africa/AfricaHero";
import { AfricaCommunityUpdateSection } from "@/components/africa/AfricaCommunityUpdateSection";
import { AfricaHomeGallery } from "@/components/africa/AfricaHomeGallery";
import { AfricaImpactShowcase } from "@/components/africa/AfricaImpactShowcase";
import { AfricaHomePrograms } from "@/components/africa/AfricaHomePrograms";
import { AfricaLatestNews } from "@/components/africa/AfricaLatestNews";
import { africaRoutes } from "@/lib/africa-routes";
import { getAfricaPosts, getUpcomingEventsPage } from "@/lib/wp";
import { getUpcomingAfricaEventHighlight } from "@/lib/africa-events";

export async function AfricaHomeContent() {
  const [africaPosts, wpUpcomingEvent] = await Promise.all([getAfricaPosts(), getUpcomingEventsPage()]);
  const localHighlight = getUpcomingAfricaEventHighlight();
  const upcomingEvent = localHighlight ?? (wpUpcomingEvent ? { ...wpUpcomingEvent, link: africaRoutes.upcomingEvents } : null);
  const latestPosts = africaPosts.slice(0, 3);
  const featuredPost = latestPosts.find((post) => post.featuredImage) ?? latestPosts[0] ?? null;

  return (
    <>
      <AfricaHero featuredPost={featuredPost} upcomingEvent={upcomingEvent} />
      <AfricaCommunityUpdateSection />
      <AfricaLatestNews posts={latestPosts} />
      <AfricaHomeGallery />
      <AfricaImpactShowcase />
      <AfricaHomePrograms />
    </>
  );
}
