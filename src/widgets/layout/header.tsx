"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Menu, X, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/shared/ui/button";
import { ThemeToggle } from "@/widgets/layout/theme-toggle";
import { useHeaderNavigation } from "@/widgets/layout/hooks/use-header-navigation";

const mainNav = [
  { name: "Trang chủ", href: "/" },
  { name: "Giới thiệu", href: "/about" },
  { name: "Các ban", href: "/departments" },
  // { name: "Dự án", href: "/portfolio" },
  { name: "Hoạt động", href: "/events" },
  { name: "Tuyển thành viên", href: "/recruitment" },
] as const;

interface HeaderProps {
  show: boolean;
  onLogoClick: () => void;
}

/**
 * Top navigation with desktop/mobile variants and recruitment CTA.
 */
export function Header({ show, onLogoClick }: HeaderProps) {
  const pathname = usePathname();
  const { hasRegisterUrl, isNavActive, mobileMenuOpen, setMobileMenuOpen, handleJoinClick } =
    useHeaderNavigation({ pathname });

  return (
    <AnimatePresence>
      {show && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed left-0 right-0 top-0 z-50 border-b border-border/70 bg-background/90 shadow-lg backdrop-blur-md"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              <Link
                href="/"
                className="flex items-center gap-1 cursor-pointer"
                onClick={(e) => {
                  if (pathname === "/") {
                    e.preventDefault();
                    onLogoClick();
                  }
                }}
              >
                <motion.div className="flex items-center gap-1" whileHover={{ scale: 1.05 }}>
                  <Image
                    src="/element/logo_black.png"
                    alt="TechTonic Club"
                    className="h-10 w-10 object-contain dark:hidden"
                    width={40}
                    height={40}
                  />
                  <Image
                    src="/element/logo_white.png"
                    alt="TechTonic Club"
                    className="hidden h-10 w-10 object-contain dark:block"
                    width={40}
                    height={40}
                  />
                  <span className="font-paris2024 text-xl font-bold leading-none text-foreground">
                    TECH <br />
                    TONIC
                  </span>
                </motion.div>
              </Link>

              <nav
                aria-label="Điều hướng chính"
                className="hidden lg:flex items-center gap-4 xl:gap-6 flex-wrap justify-end max-w-[60%]"
              >
                {mainNav.map((item) => {
                  const active = isNavActive(item.href);
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      className={`text-sm font-medium transition-colors whitespace-nowrap ${
                        active ? "text-primary" : "text-muted-foreground hover:text-primary"
                      }`}
                    >
                      {item.name}
                    </Link>
                  );
                })}
              </nav>

              <div className="hidden shrink-0 items-center gap-3 lg:flex">
                <ThemeToggle />
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  {hasRegisterUrl ? (
                    <Button
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      onClick={handleJoinClick}
                    >
                      <Users className="mr-2 h-4 w-4" />
                      Tham gia ngay
                    </Button>
                  ) : (
                    <Button
                      className="bg-primary text-primary-foreground hover:bg-primary/90"
                      asChild
                    >
                      <Link href="/recruitment" className="inline-flex items-center">
                        <Users className="mr-2 h-4 w-4" />
                        Tham gia ngay
                      </Link>
                    </Button>
                  )}
                </motion.div>
              </div>

              <div className="flex items-center gap-2 lg:hidden">
                <ThemeToggle />
                <button
                  className="min-h-11 min-w-11 p-2"
                  type="button"
                  onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                  aria-label={mobileMenuOpen ? "Đóng menu điều hướng" : "Mở menu điều hướng"}
                  aria-expanded={mobileMenuOpen}
                  aria-controls="mobile-primary-nav"
                >
                  {mobileMenuOpen ? (
                    <X className="h-6 w-6 text-muted-foreground" />
                  ) : (
                    <Menu className="h-6 w-6 text-muted-foreground" />
                  )}
                </button>
              </div>
            </div>

            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.nav
                  id="mobile-primary-nav"
                  aria-label="Điều hướng chính"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="overflow-hidden border-t border-border bg-background lg:hidden"
                >
                  <div className="py-4 space-y-1">
                    {mainNav.map((item) => {
                      const active = isNavActive(item.href);
                      return (
                        <Link
                          key={item.href}
                          href={item.href}
                          className={`block w-full text-left px-4 py-2 rounded-md transition-colors ${
                            active
                              ? "bg-accent text-primary font-medium"
                              : "text-muted-foreground hover:bg-accent hover:text-primary"
                          }`}
                          onClick={() => setMobileMenuOpen(false)}
                        >
                          {item.name}
                        </Link>
                      );
                    })}
                    <div className="px-4 pt-2">
                      {hasRegisterUrl ? (
                        <Button
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                          onClick={() => {
                            setMobileMenuOpen(false);
                            handleJoinClick();
                          }}
                        >
                          <Users className="mr-2 h-4 w-4" />
                          Tham gia ngay
                        </Button>
                      ) : (
                        <Button
                          className="w-full bg-primary text-primary-foreground hover:bg-primary/90"
                          asChild
                        >
                          <Link href="/recruitment" onClick={() => setMobileMenuOpen(false)}>
                            <Users className="mr-2 h-4 w-4" />
                            Tham gia ngay
                          </Link>
                        </Button>
                      )}
                    </div>
                  </div>
                </motion.nav>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
