"use client";

import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { Header } from "@/components/header";
import { Footer } from "@/components/footer";
import { BackToTop } from "@/components/ui/back-to-top";
import { LenisProvider } from "@/components/lenis-provider";

export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const [showHeader, setShowHeader] = useState(!isHome);
  const [showBackToTop, setShowBackToTop] = useState(!isHome);

  useEffect(() => {
    if (!isHome) {
      setShowHeader(true);
      setShowBackToTop(true);
      return;
    }

    const handleScroll = () => {
      const heroHeight = window.innerHeight;
      const scrolled = window.scrollY > heroHeight;
      setShowHeader(scrolled);
      setShowBackToTop(scrolled);
    };

    handleScroll();
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, [isHome]);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  return (
    <LenisProvider>
      <div className="min-h-screen bg-[#0a0a0a] flex flex-col">
        <Header show={showHeader} onLogoClick={scrollToTop} />
        <main className={isHome ? "flex-1" : "flex-1 pt-16"}>{children}</main>
        <Footer />
        <BackToTop show={showBackToTop} onClick={scrollToTop} />
      </div>
    </LenisProvider>
  );
}
