"use client";

import { useEffect } from "react";
import { Hero } from "@/components/hero";
import { CoreValues } from "@/components/core-values";
import { Benefits } from "@/components/benefits";
import { Video } from "@/components/video";
import { Activities } from "@/components/activities";
import { Achievements } from "@/components/achievements";
import { Testimonials } from "@/components/testimonials";
import { FeaturedNews } from "@/components/featured-news";
import { Contact } from "@/components/contact";

export default function HomePage() {
  useEffect(() => {
    const hash = window.location.hash;
    if (hash === "#contact") {
      requestAnimationFrame(() => {
        document.getElementById("contact")?.scrollIntoView({
          behavior: "smooth",
          block: "start",
        });
      });
    }
  }, []);

  return (
    <>
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
