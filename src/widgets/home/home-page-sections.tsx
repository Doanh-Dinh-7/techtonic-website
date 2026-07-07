"use client";

import dynamic from "next/dynamic";

import { Hero } from "@/features/home/hero";
import { DeferredMount } from "@/shared/ui/deferred-mount";
import { HashScrollHandler } from "@/widgets/home/hash-scroll-handler";

const CoreValues = dynamic(() =>
  import("@/features/home/core-values").then((m) => ({ default: m.CoreValues }))
);

const Benefits = dynamic(() =>
  import("@/features/home/benefits").then((m) => ({ default: m.Benefits }))
);

const Video = dynamic(() => import("@/features/home/video").then((m) => ({ default: m.Video })));

const Activities = dynamic(() =>
  import("@/features/home/activities").then((m) => ({ default: m.Activities }))
);

const Achievements = dynamic(() =>
  import("@/features/home/achievements").then((m) => ({ default: m.Achievements }))
);

const Testimonials = dynamic(() =>
  import("@/features/home/testimonials").then((m) => ({ default: m.Testimonials }))
);

const FeaturedNews = dynamic(() =>
  import("@/features/home/featured-news").then((m) => ({ default: m.FeaturedNews }))
);

const Contact = dynamic(() =>
  import("@/features/home/contact").then((m) => ({ default: m.Contact }))
);

export function HomePageSections() {
  return (
    <>
      <HashScrollHandler />
      <Hero />
      <DeferredMount minHeight="16rem" rootMargin="400px 0px">
        <CoreValues />
      </DeferredMount>
      <DeferredMount minHeight="28rem" rootMargin="320px 0px">
        <Benefits />
      </DeferredMount>
      <DeferredMount minHeight="20rem" rootMargin="280px 0px">
        <Video />
      </DeferredMount>
      <DeferredMount minHeight="24rem" rootMargin="280px 0px">
        <Activities />
      </DeferredMount>
      <DeferredMount minHeight="22rem" rootMargin="260px 0px">
        <Achievements />
      </DeferredMount>
      <DeferredMount minHeight="24rem" rootMargin="240px 0px">
        <Testimonials />
      </DeferredMount>
      <DeferredMount minHeight="22rem" rootMargin="220px 0px">
        <FeaturedNews />
      </DeferredMount>
      <DeferredMount minHeight="20rem" rootMargin="200px 0px">
        <Contact />
      </DeferredMount>
    </>
  );
}
