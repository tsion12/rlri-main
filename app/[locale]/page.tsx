import { MainHeroCarousel } from "@/components/main/MainHeroCarousel";
import { MainEventsGallery } from "@/components/main/MainEventsGallery";
import { MainJoinUs } from "@/components/main/MainJoinUs";
import { MainPartners } from "@/components/main/MainPartners";
import { MainWhoWeAre } from "@/components/main/MainWhoWeAre";

export default function MainHomePage() {
  return (
    <>
      <MainHeroCarousel />
      <MainWhoWeAre />
      <MainEventsGallery />
      <MainJoinUs />
      <MainPartners />
    </>
  );
}
