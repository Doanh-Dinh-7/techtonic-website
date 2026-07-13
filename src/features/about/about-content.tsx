import { AboutBenefits } from "@/features/about/about-benefits";
import { AboutCulture } from "@/features/about/about-culture";
import { AboutFit } from "@/features/about/about-fit";
import { AboutHero } from "@/features/about/about-hero";
import { AboutIdentitySection } from "@/features/about/about-identity-section";
import { AboutIntro } from "@/features/about/about-intro";
import { AboutTimeline } from "@/features/about/about-timeline";
import { AboutVideo } from "@/features/about/about-video";
import { Gallery } from "@/features/about/gallery";
import { Team } from "@/features/about/team";

export function AboutContent() {
  return (
    <div className="v2-dark-shell min-h-screen">
      <AboutHero />
      <AboutIntro />
      <AboutTimeline />
      <AboutVideo />
      <AboutIdentitySection />
      <AboutCulture />
      <AboutBenefits />
      <Gallery />
      <AboutFit />
      <Team />
    </div>
  );
}
