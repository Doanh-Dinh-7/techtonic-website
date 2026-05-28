import { About } from "@/features/about/about";
import { AboutTimeline } from "@/features/about/about-timeline";
import { Gallery } from "@/features/about/gallery";
import { Team } from "@/features/about/team";

export function AboutPageSections() {
  return (
    <>
      <AboutTimeline />
      <About />
      <Gallery />
      <Team />
    </>
  );
}
