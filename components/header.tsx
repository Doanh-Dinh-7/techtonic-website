"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Button } from "@/components/ui/button";
import { Code, Menu, X, Users } from "lucide-react";
import { toast } from "@/hooks/use-toast";

interface HeaderProps {
  show: boolean;
  onLogoClick: () => void;
}

export function Header({ show, onLogoClick }: HeaderProps) {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

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
    { name: "Đội ngũ", href: "#team" },
    { name: "Liên hệ", href: "#contact" },
  ];

  const handleNavClick = (href: string) => {
    const element = document.querySelector(href);
    element?.scrollIntoView({ behavior: "smooth" });
    setMobileMenuOpen(false);
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
                className="flex items-center gap-2 cursor-pointer"
                onClick={onLogoClick}
                whileHover={{ scale: 1.05 }}
              >
                <img src="/logo.png" alt="TechTonic Club" className="h-8" />
                <span className="font-bold text-gray-900">TechTonic Club</span>
              </motion.div>

              {/* Desktop Navigation */}
              <nav className="hidden md:flex items-center space-x-8">
                {navigationItems.map((item) => (
                  <motion.a
                    key={item.name}
                    href={item.href}
                    className="text-gray-600 hover:text-blue-600 transition-colors font-medium"
                    whileHover={{ scale: 1.05 }}
                    onClick={(e) => {
                      e.preventDefault();
                      handleNavClick(item.href);
                    }}
                  >
                    {item.name}
                  </motion.a>
                ))}
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
                    {navigationItems.map((item) => (
                      <a
                        key={item.name}
                        href={item.href}
                        className="block px-4 py-2 text-gray-600 hover:text-blue-600 hover:bg-gray-50 transition-colors"
                        onClick={(e) => {
                          e.preventDefault();
                          handleNavClick(item.href);
                        }}
                      >
                        {item.name}
                      </a>
                    ))}
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
