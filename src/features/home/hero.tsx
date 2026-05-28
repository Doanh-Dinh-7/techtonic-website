"use client";

import { AnimatePresence, motion } from "framer-motion";
import { ChevronDown, ChevronRight, Code, Users } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

import { Badge, Button } from "@/shared/ui";
import { useHeroSection } from "@/features/home/hooks/use-hero-section";

/**
 * Main hero section for homepage with animated CTA and rotating media.
 */
export function Hero() {
  const { currentHeroImage, heroImages, heroRef, heroScale, heroY, isLoaded, scrollToNext } =
    useHeroSection();

  return (
    <section
      ref={heroRef}
      className="relative flex min-h-screen items-center overflow-hidden bg-gradient-to-br from-[#3654a5] via-[#3db4e7] to-[#3ca2d8] text-white"
    >
      <div className="absolute inset-0 bg-[url('/thumbnail.jpg')] bg-cover bg-center opacity-20" />
      <motion.div className="absolute inset-0 bg-black/20" style={{ y: heroY, scale: heroScale }} />
      <div className="relative container mx-auto px-4 py-10 lg:py-20">
        <div className="grid items-center justify-items-center gap-12 lg:grid-cols-2">
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
                <Badge className="border-white/30 bg-white/20 text-white hover:bg-white/30">
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
                className="font-paris2024 text-4xl font-bold leading-tight lg:text-6xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4, duration: 0.8 }}
              >
                TECHTONIC CLUB
              </motion.h1>
              <motion.p
                className="font-utm-akashi text-xl font-medium text-blue-100 lg:text-2xl"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6, duration: 0.8 }}
              >
                Dream it – Code it
              </motion.p>
              <motion.p
                className="max-w-lg text-lg text-blue-50"
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.8, duration: 0.8 }}
              >
                Nơi nuôi dưỡng đam mê công nghệ và phát triển kỹ năng chuyên môn
              </motion.p>
            </motion.div>
            <motion.div
              className="flex flex-col justify-center gap-4 sm:flex-row lg:justify-start"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1, duration: 0.6, type: "spring", bounce: 0.4 }}
            >
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                {process.env.NEXT_PUBLIC_REGISTER_URL ? (
                  <Button
                    size="lg"
                    className="bg-white font-semibold text-blue-600 hover:bg-blue-50"
                    onClick={() => window.open(process.env.NEXT_PUBLIC_REGISTER_URL!, "_blank")}
                  >
                    <Users className="mr-2 h-5 w-5" />
                    Tham gia ngay
                  </Button>
                ) : (
                  <Button
                    size="lg"
                    className="bg-white font-semibold text-blue-600 hover:bg-blue-50"
                    asChild
                  >
                    <Link href="/recruitment" className="inline-flex items-center">
                      <Users className="mr-2 h-5 w-5" />
                      Tham gia ngay
                    </Link>
                  </Button>
                )}
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05, boxShadow: "0 10px 25px rgba(0,0,0,0.2)" }}
                whileTap={{ scale: 0.95 }}
              >
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white bg-blue-600 text-white hover:bg-blue-500 hover:text-white"
                  onClick={() => {
                    window.open("https://www.facebook.com/TechTonic.Club17", "_blank");
                  }}
                >
                  Khám phá thêm
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
              </motion.div>
            </motion.div>
          </div>
          <motion.div
            className="relative mx-auto w-full max-w-lg items-center justify-center lg:max-w-none"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
          >
            <div className="aspect-square h-[300px] max-w-[500px] w-full overflow-hidden rounded-2xl shadow-2xl sm:h-[400px] md:h-[450px] lg:h-[500px]">
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
                    className="rounded-2xl object-cover"
                  />
                </motion.div>
              </AnimatePresence>
            </div>
            <motion.div
              className="absolute -bottom-3 -left-3 max-w-[200px] rounded-xl bg-white p-3 text-gray-800 shadow-lg sm:-bottom-4 sm:-left-4 sm:max-w-none sm:p-4 lg:-bottom-6 lg:-left-6"
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 1.5, duration: 0.6, type: "spring" }}
            >
              <div className="flex items-center gap-2">
                <Code className="h-5 w-5 flex-shrink-0 text-blue-500 sm:h-6 sm:w-6" />
                <div className="min-w-0">
                  <p className="text-sm font-semibold sm:text-base">100+ thành viên</p>
                  <p className="text-xs text-gray-600 sm:text-sm">Đam mê công nghệ</p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
      <button
        onClick={scrollToNext}
        className={`absolute bottom-1 left-1/2 -translate-x-1/2 transform text-white/70 transition-all delay-700 duration-1000 hover:text-white ${
          isLoaded ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0"
        }`}
      >
        <div className="flex animate-bounce flex-col items-center">
          <span className="mb-2 text-sm">Cuộn xuống</span>
          <ChevronDown size={24} />
        </div>
      </button>
    </section>
  );
}
