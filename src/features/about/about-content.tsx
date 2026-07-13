import dynamic from "next/dynamic";

import { AboutHero } from "@/features/about/about-hero";
import { AboutIntro } from "@/features/about/about-intro";
import { AboutTimeline } from "@/features/about/about-timeline";
import { DeferredMount } from "@/shared/ui/deferred-mount";

const AboutVideo = dynamic(() =>
  import("@/features/about/about-video").then((m) => ({ default: m.AboutVideo }))
);

const DeferredAboutIdentitySection = dynamic(() =>
  import("@/features/about/about-identity-section").then((m) => ({
    default: m.AboutIdentitySection,
  }))
);

const DeferredAboutCulture = dynamic(() =>
  import("@/features/about/about-culture").then((m) => ({ default: m.AboutCulture }))
);

const DeferredAboutBenefits = dynamic(() =>
  import("@/features/about/about-benefits").then((m) => ({ default: m.AboutBenefits }))
);

const DeferredGallery = dynamic(() =>
  import("@/features/about/gallery").then((m) => ({ default: m.Gallery }))
);

const DeferredAboutFit = dynamic(() =>
  import("@/features/about/about-fit").then((m) => ({ default: m.AboutFit }))
);

const DeferredTeam = dynamic(() =>
  import("@/features/about/team").then((m) => ({ default: m.Team }))
);

export function AboutContent() {
  return (
    <div className="v2-dark-shell min-h-screen">
      <AboutHero />
      <AboutIntro />
      <AboutTimeline />
      <DeferredMount minHeight="24rem" rootMargin="360px 0px">
        <AboutVideo />
      </DeferredMount>
      <DeferredMount minHeight="28rem" rootMargin="320px 0px">
        <DeferredAboutIdentitySection />
      </DeferredMount>
      <DeferredMount minHeight="26rem" rootMargin="300px 0px">
        <DeferredAboutCulture />
      </DeferredMount>
      <DeferredMount minHeight="24rem" rootMargin="280px 0px">
        <DeferredAboutBenefits />
      </DeferredMount>
      <DeferredMount minHeight="30rem" rootMargin="260px 0px">
        <DeferredGallery />
      </DeferredMount>
      <DeferredMount minHeight="24rem" rootMargin="240px 0px">
        <DeferredAboutFit />
      </DeferredMount>
      <DeferredMount minHeight="32rem" rootMargin="220px 0px">
        <DeferredTeam />
      </DeferredMount>
    </div>
  );
}
