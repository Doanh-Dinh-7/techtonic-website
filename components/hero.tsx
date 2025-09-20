"use client";

import { useState, useEffect, useRef } from "react";
import {
  motion,
  AnimatePresence,
  useScroll,
  useTransform,
} from "framer-motion";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Code, Users, ChevronRight, ChevronDown } from "lucide-react";
import Image from "next/image";
import { toast } from "@/hooks/use-toast";

export function Hero() {
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

  const { scrollY } = useScroll();
  const heroRef = useRef(null);
  const [currentHeroImage, setCurrentHeroImage] = useState(0);

  // Parallax effect for hero background
  const viewportHeight =
    typeof window !== "undefined" ? window.innerHeight : 800;
  const heroY = useTransform(scrollY, [0, viewportHeight], [0, 150]);
  const heroScale = useTransform(scrollY, [0, viewportHeight], [1, 1.1]);

  const heroImages = [
    "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206566/mentor_mentee_ss1_wv08vr.webp",
    "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206566/tech_x_plore_cot6ms.webp",
    "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206584/cslt_1_ygk3oa.webp",
    "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206567/techware_ss1_ljlofj.webp",
    "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206585/nckh_s1_lfu4nn.webp",
    "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206579/mentor_mentee_ss2_th0fyt.webp",
  ];

  // Auto-rotate hero images every 5 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentHeroImage((prev) => (prev + 1) % heroImages.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [heroImages.length]);

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

  return (
    // background color: #3ca2d8, #3db4e7, #3654a5
    <section
      ref={heroRef}
      className="relative bg-gradient-to-br from-[#3654a5] via-[#3db4e7] to-[#3ca2d8] text-white overflow-hidden flex items-center min-h-screen"
    >
      {" "}
      <div className="absolute inset-0 bg-[url('/thumbnail.jpg')] bg-cover bg-center opacity-20"></div>
      <motion.div
        className="absolute inset-0 bg-black/20"
        style={{ y: heroY, scale: heroScale }}
      />
      <div className="relative container mx-auto px-4 py-10 lg:py-20 ">
        <div className="grid lg:grid-cols-2 gap-12 items-center justify-items-center">
          <div className="space-y-8 text-center lg:text-left">
            <motion.div
              className="space-y-4"
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: "easeOut" }}
            >
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2, duration: 0.6 }}
              >
                <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30">
                  <Image
                    src="https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206564/logo_school_mxtnzv.webp"
                    alt="Due"
                    width={20}
                    height={20}
                    className="mr-2"
                  />
                  Trường Đại học Kinh tế - Đại học Đà Nẵng
                </Badge>
              </motion.div>
              <motion.h1
                className="text-4xl lg:text-6xl font-bold leading-tight"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                TechTonic Club
              </motion.h1>
              <motion.p
                className="text-xl lg:text-2xl text-blue-100 font-medium"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Dream it – Code it
              </motion.p>
              <motion.p
                className="text-lg text-blue-50 max-w-lg"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Nơi nuôi dưỡng đam mê công nghệ và phát triển kỹ năng chuyên môn
              </motion.p>
            </motion.div>
            <motion.div
              className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                delay: 1,
                duration: 0.6,
                type: "spring",
                bounce: 0.4,
              }}
            >
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                  onClick={handleJoinClick}
                >
                  <Users className="mr-2 h-5 w-5" />
                  Tham gia ngay
                </Button>
              </motion.div>
              <motion.div
                whileHover={{
                  scale: 1.05,
                  boxShadow: "0 10px 25px rgba(0,0,0,0.2)",
                }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white text-white bg-blue-600 hover:bg-blue-500 hover:text-white "
                  onClick={() => {
                    window.open(
                      "https://www.facebook.com/TechTonic.Club17",
                      "_blank"
                    );
                  }}
                >
                  Khám phá thêm
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            className="relative items-center justify-center"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="relative h-[500px] w-[500px] rounded-2xl overflow-hidden shadow-2xl aspect-square">
              <AnimatePresence mode="sync">
                <motion.div
                  key={currentHeroImage}
                  initial={{ opacity: 0, scale: 1.1 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, scale: 0.9 }}
                  transition={{ duration: 0.8 }}
                  className="absolute inset-0"
                >
                  <Image
                    src={heroImages[currentHeroImage] || "/placeholder.svg"}
                    alt="TechTonic Club Activities"
                    fill
                    className="object-cover rounded-2xl"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.div
              className="absolute -bottom-6 -left-6 bg-white text-gray-800 p-4 rounded-xl shadow-lg"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
            >
              <div className="flex items-center gap-2">
                <Code className="h-6 w-6 text-blue-500" />
                <div>
                  <p className="font-semibold">100+ thành viên</p>
                  <p className="text-sm text-gray-600">Đam mê công nghệ</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      {/* Scroll indicator */}
      <button
        onClick={scrollToNext}
        className={`absolute bottom-1 left-1/2 transform -translate-x-1/2 text-white/70 hover:text-white transition-all duration-1000 delay-700 ${
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
