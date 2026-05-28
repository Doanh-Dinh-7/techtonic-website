import { Achievements } from "@/features/home/achievements";
import { Activities } from "@/features/home/activities";
import { Benefits } from "@/features/home/benefits";
import { Contact } from "@/features/home/contact";
import { CoreValues } from "@/features/home/core-values";
import { FeaturedNews } from "@/features/home/featured-news";
import { Hero } from "@/features/home/hero";
import { Testimonials } from "@/features/home/testimonials";
import { Video } from "@/features/home/video";
import { HashScrollHandler } from "@/widgets/home/hash-scroll-handler";

export function HomePageSections() {
  return (
    <>
      <HashScrollHandler />
      <Hero />
      <CoreValues />
      <Benefits />
      <Video />
      <Activities />
      <Achievements />
      <Testimonials />
      <FeaturedNews />
      <Contact />
    </>
  );
}
