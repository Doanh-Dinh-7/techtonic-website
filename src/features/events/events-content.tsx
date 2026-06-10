"use client";

import { EventTimelineSection } from "./event-timeline-section";
import { EventsHero } from "./events-hero";
import { HappyHourSection } from "./happy-hour-section";
import { StellarGallerySection } from "./stellar-gallery-section";
import { WeeklyAcademicSection } from "./weekly-academic-section";

export function EventsContent() {
  return (
    <div className="v2-dark-shell min-h-screen">
      <EventsHero />
      <WeeklyAcademicSection />
      <HappyHourSection />
      <EventTimelineSection />
      <StellarGallerySection />
    </div>
  );
}
