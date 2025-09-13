"use client";

import { useState, useEffect } from "react";
import { Header } from "@/components/header";
import { Hero } from "@/components/hero";
import { About } from "@/components/about";
import { Benefits } from "@/components/benefits";
import { Video } from "@/components/video";
import { Activities } from "@/components/activities";
import { Gallery } from "@/components/gallery";
import { Achievements } from "@/components/achievements";
import { Testimonials } from "@/components/testimonials";
import { Registration } from "@/components/registration";
import { Team } from "@/components/team";
import { Contact } from "@/components/contact";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/ui/back-to-top";

export default function TechTonicClubLanding() {
  const [showHeader, setShowHeader] = useState(false);
  const [showBackToTop, setShowBackToTop] = useState(false);

  // Handle scroll for header and back-to-top visibility
  useEffect(() => {
    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrolled = window.scrollY > heroHeight;
      setShowHeader(scrolled);
      setShowBackToTop(scrolled);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  // Scroll to top function
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <div className="min-h-screen bg-white">
      {/* Sticky Header */}
      <Header show={showHeader} onLogoClick={scrollToTop} />

      {/* Hero Section */}
      <Hero />

      {/* About Section */}
      <About />

      {/* Benefits Section */}
      <Benefits />

      {/* Video Section */}
      <Video />

      {/* Activities Section */}
      <Activities />

      {/* Gallery Section */}
      <Gallery />

      {/* Achievements Section */}
      <Achievements />

      {/* Testimonials Section */}
      <Testimonials />

      {/* Registration Section */}
      <Registration />

      {/* Team Section */}
      <Team />

      {/* Contact Section */}
      <Contact />

      {/* Back to Top Button */}
      <BackToTop show={showBackToTop} onClick={scrollToTop} />

      {/* Footer */}
      <Footer />
    </div>
  );
}
