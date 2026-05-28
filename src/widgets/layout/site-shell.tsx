"use client";

import { usePathname } from "next/navigation";

import { Footer } from "@/widgets/layout/footer";
import { Header } from "@/widgets/layout/header";
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
      <div className="flex min-h-screen flex-col bg-[#0a0a0a]">
        <Header show={showHeader} onLogoClick={scrollToTop} />
        <main className={isHome ? "flex-1" : "flex-1 pt-16"}>{children}</main>
        <Footer />
        <BackToTop show={showBackToTop} onClick={scrollToTop} />
      </div>
    </LenisProvider>
  );
}
