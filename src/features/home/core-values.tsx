"use client";

import { motion } from "framer-motion";
import { Flag, Gem, Handshake, Heart, Shield, Star } from "lucide-react";
import Link from "next/link";

import { Card3D, GlassCard, NeonButton, SectionShell } from "@/shared/ui-v2";

const valueItems = [
  {
    icon: Heart,
    title: "Tinh thần chia sẻ",
    iconWrap: "bg-red-100",
    iconColor: "text-red-600",
    glow: "magenta" as const,
  },
  {
    icon: Handshake,
    title: "Sự tương trợ",
    iconWrap: "bg-blue-100",
    iconColor: "text-blue-600",
    glow: "cyan" as const,
  },
  {
    icon: Shield,
    title: "Sự chân thành",
    iconWrap: "bg-green-100",
    iconColor: "text-green-600",
    glow: "cyan" as const,
  },
  {
    icon: Star,
    title: "Sự tôn trọng",
    iconWrap: "bg-yellow-100",
    iconColor: "text-yellow-600",
    glow: "purple" as const,
  },
  {
    icon: Flag,
    title: "Sự trách nhiệm",
    iconWrap: "bg-purple-100",
    iconColor: "text-purple-600",
    glow: "purple" as const,
  },
];

export function CoreValues() {
  return (
    <SectionShell
      id="core-values"
      tone="light"
      badge={
        <>
          <Gem className="mr-1 inline h-3 w-3" />
          Giá trị cốt lõi
        </>
      }
      title="Những điều chúng mình cùng giữ"
      description="Nền tảng văn hóa TechTonic — xem thêm tầm nhìn & sứ mệnh đầy đủ tại trang Giới thiệu."
    >
      <div className="mx-auto mb-10 grid max-w-5xl gap-4 sm:grid-cols-2 lg:grid-cols-5">
        {valueItems.map((v, index) => (
          <motion.div
            key={v.title}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.06, duration: 0.5 }}
            viewport={{ once: true }}
          >
            <Card3D intensity={8}>
              <GlassCard
                glow={v.glow}
                className="flex flex-col items-center border-border bg-card/90 p-4 text-center text-card-foreground shadow-sm before:opacity-30 dark:border-white/10 dark:bg-white/[0.06] dark:text-white"
              >
                <div
                  className={`mb-3 flex h-12 w-12 items-center justify-center rounded-lg ${v.iconWrap} dark:bg-white/10`}
                >
                  <v.icon className={`h-6 w-6 ${v.iconColor}`} />
                </div>
                <span className="text-sm font-medium">{v.title}</span>
              </GlassCard>
            </Card3D>
          </motion.div>
        ))}
      </div>

      <div className="flex justify-center">
        <NeonButton
          asChild
          variant="purple"
          className="border-purple-400/50 bg-purple-600/10 text-purple-900 dark:text-purple-100"
        >
          <Link href="/about">Xem Giới thiệu đầy đủ</Link>
        </NeonButton>
      </div>
    </SectionShell>
  );
}
