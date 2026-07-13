"use client";

import dynamic from "next/dynamic";

import { DeferredMount } from "@/shared/ui/deferred-mount";

import { EventsHero } from "./events-hero";

const WeeklyAcademicSection = dynamic(() =>
  import("./weekly-academic-section").then((m) => ({ default: m.WeeklyAcademicSection }))
);

const HappyHourSection = dynamic(() =>
  import("./happy-hour-section").then((m) => ({ default: m.HappyHourSection }))
);

const EventTimelineSection = dynamic(() =>
  import("./event-timeline-section").then((m) => ({ default: m.EventTimelineSection }))
);

const StellarGallerySection = dynamic(
  () => import("./stellar-gallery-section").then((m) => ({ default: m.StellarGallerySection })),
  { ssr: false }
);

export function EventsContent() {
  return (
    <div className="v2-dark-shell min-h-screen">
      <EventsHero />
      <DeferredMount minHeight="28rem" rootMargin="340px 0px">
        <WeeklyAcademicSection />
      </DeferredMount>
      <DeferredMount minHeight="24rem" rootMargin="300px 0px">
        <HappyHourSection />
      </DeferredMount>
      <DeferredMount minHeight="32rem" rootMargin="260px 0px">
        <EventTimelineSection />
      </DeferredMount>
      <DeferredMount minHeight="34rem" rootMargin="220px 0px">
        <StellarGallerySection />
      </DeferredMount>
    </div>
  );
}
