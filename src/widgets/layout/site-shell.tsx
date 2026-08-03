"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/widgets/layout/footer";
import { Header } from "@/widgets/layout/header";
import { AnimationReadyProvider } from "@/widgets/layout/animation-ready-provider";
import { LenisProvider } from "@/widgets/layout/lenis-provider";
import { BackToTop } from "@/shared/ui/back-to-top";
import { useSiteShellVisibility } from "@/widgets/layout/hooks/use-site-shell-visibility";

/**
 * Shared shell for all `(site)` routes.
 */
export function SiteShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const isHome = pathname === "/";
  const { showBackToTop, showHeader, scrollToTop } = useSiteShellVisibility(isHome);

  return (
    <LenisProvider>
      <AnimationReadyProvider>
        <div className="flex min-h-screen flex-col bg-background text-foreground">
          <a
            href="#main-content"
            className="sr-only focus:not-sr-only focus:absolute focus:left-4 focus:top-4 focus:z-[100] focus:rounded-md focus:bg-background focus:px-4 focus:py-2 focus:text-sm focus:font-semibold focus:text-foreground focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-ring"
          >
            Bỏ qua đến nội dung chính
          </a>
          <Header show={showHeader} onLogoClick={scrollToTop} />
          <main
            id="main-content"
            tabIndex={-1}
            className={isHome ? "flex-1 outline-none" : "flex-1 pt-16 outline-none"}
          >
            {children}
          </main>
          <Footer />
          <BackToTop show={showBackToTop} onClick={scrollToTop} />
        </div>
      </AnimationReadyProvider>
    </LenisProvider>
  );
}
