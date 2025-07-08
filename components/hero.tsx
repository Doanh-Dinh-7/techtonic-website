"use client";

import { Button } from "@/components/ui/button";
import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { useEffect, useState } from "react";

export default function Hero() {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    setIsLoaded(true);
  }, []);

  const scrollToNext = () => {
    const nextSection = document.getElementById("about");
    if (nextSection) {
      nextSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    // background gradient from #00A3FF #337AB7 to #1A2D46
    <section className="relative h-screen flex items-center justify-center bg-gradient-to-r from-[#337AB7] to-[#1A2D46] text-white overflow-hidden">
      <div className="absolute inset-0 bg-[url('/thumbnail.jpg')] bg-cover bg-center opacity-20"></div>

      {/* Animated background particles */}
      <div className="absolute inset-0">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-2 h-2 bg-white/20 rounded-full animate-pulse"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${Math.random() * 3}s`,
              animationDuration: `${2 + Math.random() * 2}s`,
            }}
          />
        ))}
      </div>

      <div className="container mx-auto px-4 z-10 text-center">
        <h1
          className={`text-5xl md:text-7xl font-bold mb-6 transition-all duration-1000 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          TechTonic Club
        </h1>
        <p
          className={`text-xl md:text-2xl mb-8 max-w-3xl mx-auto transition-all duration-1000 delay-300 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          Nơi nuôi dưỡng đam mê công nghệ và phát triển kỹ năng chuyên môn
        </p>
        <div
          className={`flex flex-col sm:flex-row gap-4 justify-center transition-all duration-1000 delay-500 ${
            isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
          }`}
        >
          <Button className="bg-white text-blue-600 hover:bg-blue-50 transform hover:scale-105 transition-all duration-300">
            <Link href="#about">Tìm hiểu thêm</Link>
          </Button>
          <Button
            // variant="outline"
            className="bg-[#00A3FF] text-white hover:bg-blue-600 transform hover:scale-105 transition-all duration-300"
          >
            <Link
              href="https://www.facebook.com/TechTonic.Club17"
              target="_blank"
            >
              Đăng ký tham gia
            </Link>
          </Button>
        </div>
      </div>

      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className={`absolute bottom-8 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-all duration-1000 delay-700 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="flex flex-col items-center animate-bounce">
          <span className="text-sm mb-2">Cuộn xuống</span>
          <ChevronDown size={24} />
        </div>
      </button>
    </section>
  );
}
