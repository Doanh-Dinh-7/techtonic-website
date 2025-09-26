"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code, Menu, X, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import Image from "next/image";

interface HeaderProps {
  show: boolean;
  onLogoClick: () => void;
}

export function Header({ show, onLogoClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("");

  // Intersection Observer để theo dõi section hiện tại
  useEffect(() => {
    const sections = navigationItems.map((item) => item.href.substring(1));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(entry.target.id);
          }
        });
      },
      {
        threshold: 0.3,
        rootMargin: "-50px 0px -50px 0px",
      }
    );

    // Quan sát tất cả các section
    sections.forEach((sectionId) => {
      const element = document.getElementById(sectionId);
      if (element) {
        observer.observe(element);
      }
    });

    return () => {
      sections.forEach((sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
          observer.unobserve(element);
        }
      });
    };
  }, []);

  const handleJoinClick = () => {
    const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL || null;

    if (registerUrl) {
      window.open(registerUrl, "_blank");
    } else {
      toast({
        title: "Coming soon!",
        description: "Tính năng đăng ký sẽ sớm ra mắt",
        variant: "success",
      });
    }
  };

  const navigationItems = [
    { name: "Giới thiệu", href: "#about" },
    { name: "Lợi ích", href: "#benefits" },
    { name: "Hoạt động", href: "#activities" },
    { name: "Thành tích", href: "#achievements" },
    { name: "Cảm nhận", href: "#testimonials" },
    { name: "Đội ngũ", href: "#team" },
    { name: "Liên hệ", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    // Close mobile menu first
    setMobileMenuOpen(false);

    // Add a small delay to ensure menu closes and DOM is ready
    setTimeout(() => {
      const element = document.querySelector(href);

      if (element) {
        // Get element position
        const elementRect = element.getBoundingClientRect();
        const elementTop = elementRect.top + window.pageYOffset;
        const headerHeight = 80; // Approximate header height

        // Try scrollIntoView first
        try {
          element.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        } catch (error) {
          console.error("ScrollIntoView failed:", error);
        }

        // Also try window.scrollTo as backup
        setTimeout(() => {
          window.scrollTo({
            top: elementTop - headerHeight,
            behavior: "smooth",
          });

          // Force scroll if smooth doesn't work
          setTimeout(() => {
            if (
              Math.abs(window.pageYOffset - (elementTop - headerHeight)) > 50
            ) {
              window.scrollTo(0, elementTop - headerHeight);
            }
          }, 500);
        }, 100);
      } else {
        // Try to find by ID instead
        const sectionId = href.substring(1);
        const elementById = document.getElementById(sectionId);
        if (elementById) {
          elementById.scrollIntoView({
            behavior: "smooth",
            block: "start",
            inline: "nearest",
          });
        }
      }
    }, 100); // Small delay to ensure menu closes
  };

  return (
    <AnimatePresence>
      {show && (
        <motion.header
          initial={{ y: -100, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          exit={{ y: -100, opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed top-0 left-0 right-0 bg-white/95 backdrop-blur-md shadow-lg z-50 border-b border-gray-200"
        >
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between h-16">
              {/* Logo */}
              <motion.div
                className="flex items-center gap-1 cursor-pointer"
                onClick={onLogoClick}
                whileHover={{ scale: 1.05 }}
              >
                <Image
                  src="/element/logo_black.png"
                  alt="TechTonic Club"
                  className="object-cover h-10"
                  width={17}
                  height={400}
                />
                <span className="font-bold text-gray-900 font-paris2024 text-xl leading-none">
                  TECH <br />
                  TONIC
                </span>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navigationItems.map((item) => {
                  const isActive = activeSection === item.href.substring(1);
                  return (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      className={`transition-colors font-medium ${
                        isActive
                          ? "text-blue-600 scale-105"
                          : "text-gray-600 hover:text-blue-600"
                      }`}
                      whileHover={{ scale: 1.05 }}
                      onClick={(e) => {
                        e.preventDefault();
                        handleNavClick(item.href);
                      }}
                    >
                      {item.name}
                    </motion.a>
                  );
                })}
              </nav>

              {/* CTA Button */}
              <div className="hidden md:block">
                <motion.div
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    className="bg-gradient-to-r from-[#3756a6] to-[#667ee4] hover:from-[#3756a6] hover:to-[#667ee4]"
                    onClick={handleJoinClick}
                  >
                    <Users className="mr-2 h-4 w-4" />
                    Tham gia ngay
                  </Button>
                </motion.div>
              </div>

              {/* Mobile Menu Button */}
              <button
                className="md:hidden p-2"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              >
                {mobileMenuOpen ? (
                  <X className="h-6 w-6 text-gray-600" />
                ) : (
                  <Menu className="h-6 w-6 text-gray-600" />
                )}
              </button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
              {mobileMenuOpen && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="md:hidden border-t border-gray-200 bg-white"
                >
                  <div className="py-4 space-y-4">
                    {navigationItems.map((item) => {
                      const isActive = activeSection === item.href.substring(1);
                      return (
                        <button
                          key={item.name}
                          className={`w-full text-left px-4 py-2 transition-colors ${
                            isActive
                              ? "text-blue-600 bg-blue-50 font-medium"
                              : "text-gray-600 hover:text-blue-600 hover:bg-gray-50"
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            handleNavClick(item.href);
                          }}
                        >
                          {item.name}
                        </button>
                      );
                    })}
                    <div className="px-4">
                      <Button
                        className="w-full bg-gradient-to-r from-[#3756a6] to-[#667ee4] hover:from-[#3756a6] hover:to-[#667ee4]"
                        onClick={handleJoinClick}
                      >
                        <Users className="mr-2 h-4 w-4" />
                        Tham gia ngay
                      </Button>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.header>
      )}
    </AnimatePresence>
  );
}
