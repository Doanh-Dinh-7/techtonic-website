"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Menu, X } from "lucide-react";

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled
          ? "bg-white shadow-md text-gray-900"
          : "bg-transparent text-white"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          <Link href="/" className="font-bold text-2xl">
            <div className="flex items-center space-x-2 gap-3">
              <img src="/logo.png" alt="TechTonic" className="h-8" />
              TechTonic Club
            </div>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            <Link href="/" className="hover:text-blue-500 transition-colors">
              Trang chủ
            </Link>
            <Link
              href="#about"
              className="hover:text-blue-500 transition-colors"
            >
              Giới thiệu
            </Link>
            <Link
              href="#leadership"
              className="hover:text-blue-500 transition-colors"
            >
              Ban chủ nhiệm
            </Link>
            <Link
              href="#activities"
              className="hover:text-blue-500 transition-colors"
            >
              Hoạt động
            </Link>
            <Link
              href="#gallery"
              className="hover:text-blue-500 transition-colors"
            >
              Hình ảnh
            </Link>
            <Button
              className={
                isScrolled
                  ? "bg-blue-600 hover:bg-blue-700"
                  : "bg-white text-blue-600 hover:bg-blue-50"
              }
            >
              <Link
                href="https://www.facebook.com/TechTonic.Club17"
                target="_blank"
              >
                Tham gia
              </Link>
            </Button>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Navigation */}
      {isMenuOpen && (
        <nav className="md:hidden bg-white text-gray-900 py-4 px-4 shadow-lg">
          <div className="flex flex-col space-y-4">
            <Link
              href="/"
              className="hover:text-blue-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Trang chủ
            </Link>
            <Link
              href="#about"
              className="hover:text-blue-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Giới thiệu
            </Link>
            <Link
              href="#leadership"
              className="hover:text-blue-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Ban chủ nhiệm
            </Link>
            <Link
              href="#activities"
              className="hover:text-blue-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Hoạt động
            </Link>
            <Link
              href="#gallery"
              className="hover:text-blue-500 transition-colors py-2"
              onClick={() => setIsMenuOpen(false)}
            >
              Hình ảnh
            </Link>
            <Button
              className="bg-blue-600 hover:bg-blue-700 w-full"
              onClick={() => setIsMenuOpen(false)}
            >
              Tham gia
            </Button>
          </div>
        </nav>
      )}
    </header>
  );
}
