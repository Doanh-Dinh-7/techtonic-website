"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/shared/ui/badge";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/shared/ui/dialog";
import { cn } from "@/shared/utils";
import { Code, Network, Lightbulb, Trophy, GraduationCap, Handshake } from "lucide-react";
import Image from "next/image";

export function Benefits() {
  const benefits = [
    {
      icon: Code,
      title: "Kỹ năng lập trình",
      desc: "Học và thực hành các ngôn ngữ lập trình hiện đại, framework và công nghệ mới nhất trong ngành.",
      image:
        "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785313184/K%E1%BB%B9_n%C4%83ng_l%E1%BA%ADp_tr%C3%ACnh_xcccka.jpg",
      color: "blue",
      textColor: "text-blue-600",
      bgColor: "bg-blue-100",
      shadowColor: "shadow-blue-200",
      hoverShadowColor: "hover:shadow-blue-200",
      darkTextColor: "dark:text-blue-300",
      darkBgColor: "dark:bg-blue-400/15",
      darkCardColor: "dark:border-blue-300/20 dark:bg-blue-400/[0.06]",
      darkShadowColor: "dark:shadow-[0_0_28px_rgba(96,165,250,0.12)]",
      darkHoverShadowColor: "dark:hover:shadow-[0_0_36px_rgba(96,165,250,0.18)]",
    },
    {
      icon: Network,
      title: "Mạng lưới kết nối",
      desc: "Kết nối với sinh viên cùng đam mê, alumni và các chuyên gia trong ngành công nghệ thông tin.",
      image:
        "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785313184/M%E1%BA%A1ng_l%C6%B0%E1%BB%9Bi_k%E1%BA%BFt_n%E1%BB%91i_icp26e.jpg",
      color: "green",
      textColor: "text-green-600",
      bgColor: "bg-green-100",
      shadowColor: "shadow-green-200",
      hoverShadowColor: "hover:shadow-green-200",
      darkTextColor: "dark:text-emerald-300",
      darkBgColor: "dark:bg-emerald-400/15",
      darkCardColor: "dark:border-emerald-300/20 dark:bg-emerald-400/[0.06]",
      darkShadowColor: "dark:shadow-[0_0_28px_rgba(52,211,153,0.12)]",
      darkHoverShadowColor: "dark:hover:shadow-[0_0_36px_rgba(52,211,153,0.18)]",
    },
    {
      icon: Lightbulb,
      title: "Dự án thực tế",
      desc: "Tham gia các dự án thực tế, từ ý tưởng đến triển khai, giúp tích lũy kinh nghiệm làm việc.",
      image:
        "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785313740/D%E1%BB%B1_%C3%A1n_th%E1%BB%B1c_t%E1%BA%BF_tpzhbb.jpg",
      color: "yellow",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
      shadowColor: "shadow-yellow-200",
      hoverShadowColor: "hover:shadow-yellow-200",
      darkTextColor: "dark:text-yellow-200",
      darkBgColor: "dark:bg-yellow-300/15",
      darkCardColor: "dark:border-yellow-200/20 dark:bg-yellow-300/[0.06]",
      darkShadowColor: "dark:shadow-[0_0_28px_rgba(253,224,71,0.12)]",
      darkHoverShadowColor: "dark:hover:shadow-[0_0_36px_rgba(253,224,71,0.18)]",
    },
    {
      icon: Trophy,
      title: "Cơ hội thi đấu",
      desc: "Tham gia các cuộc thi lập trình, hackathon cấp trường, quốc gia và quốc tế.",
      image: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206555/olp_icpc_qlzrul.webp",
      color: "purple",
      textColor: "text-purple-600",
      bgColor: "bg-purple-100",
      shadowColor: "shadow-purple-200",
      hoverShadowColor: "hover:shadow-purple-200",
      darkTextColor: "dark:text-purple-300",
      darkBgColor: "dark:bg-purple-400/15",
      darkCardColor: "dark:border-purple-300/20 dark:bg-purple-400/[0.06]",
      darkShadowColor: "dark:shadow-[0_0_28px_rgba(192,132,252,0.12)]",
      darkHoverShadowColor: "dark:hover:shadow-[0_0_36px_rgba(192,132,252,0.18)]",
    },
    {
      icon: GraduationCap,
      title: "Phát triển bản thân",
      desc: "Rèn luyện kỹ năng mềm, leadership và khả năng làm việc nhóm thông qua các hoạt động CLB.",
      image:
        "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785313184/Ph%C3%A1t_tri%E1%BB%83n_b%E1%BA%A3n_th%C3%A2n_mnvjss.jpg",
      color: "red",
      textColor: "text-red-600",
      bgColor: "bg-red-100",
      shadowColor: "shadow-red-200",
      hoverShadowColor: "hover:shadow-red-200",
      darkTextColor: "dark:text-red-300",
      darkBgColor: "dark:bg-red-400/15",
      darkCardColor: "dark:border-red-300/20 dark:bg-red-400/[0.06]",
      darkShadowColor: "dark:shadow-[0_0_28px_rgba(248,113,113,0.12)]",
      darkHoverShadowColor: "dark:hover:shadow-[0_0_36px_rgba(248,113,113,0.18)]",
    },
    {
      icon: Handshake,
      title: "Cơ hội việc làm",
      desc: "Tiếp cận thông tin tuyển dụng, thực tập và cơ hội nghề nghiệp từ các đối tác doanh nghiệp.",
      image:
        "https://res.cloudinary.com/dggsvq2tw/image/upload/v1785313184/C%C6%A1_h%E1%BB%99i_ngh%E1%BB%81_nghi%E1%BB%87p_ayyaae.jpg",
      color: "orange",
      textColor: "text-orange-600",
      bgColor: "bg-orange-100",
      shadowColor: "shadow-orange-200",
      hoverShadowColor: "hover:shadow-orange-200",
      darkTextColor: "dark:text-orange-300",
      darkBgColor: "dark:bg-orange-400/15",
      darkCardColor: "dark:border-orange-300/20 dark:bg-orange-400/[0.06]",
      darkShadowColor: "dark:shadow-[0_0_28px_rgba(251,146,60,0.12)]",
      darkHoverShadowColor: "dark:hover:shadow-[0_0_36px_rgba(251,146,60,0.18)]",
    },
  ];

  return (
    <section id="benefits" className="bg-background py-20 text-foreground dark:bg-[#0a0a0a]">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-green-100 text-green-700 hover:bg-green-700 hover:text-green-100 dark:border-green-400/25 dark:bg-green-400/10 dark:text-green-100 dark:hover:bg-green-400/15">
            Lợi ích tham gia
          </Badge>
          <h2 className="font-paris2024 text-3xl font-bold text-foreground lg:text-5xl">
            Tại sao nên tham gia TechTonic?
          </h2>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            Khám phá những cơ hội tuyệt vời đang chờ đón bạn tại TechTonic Club
          </p>
        </motion.div>
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {benefits.map((benefit, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.8, y: 50 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              viewport={{ once: true }}
              whileHover={{
                scale: 1.05,
                y: -10,
                transition: { duration: 0.3 },
              }}
            >
              <Dialog>
                <DialogTrigger asChild>
                  <button
                    type="button"
                    aria-label={`Xem chi tiết: ${benefit.title}`}
                    className={cn(
                      "h-full w-full cursor-pointer rounded-xl border border-border bg-card text-left shadow-lg transition-shadow hover:shadow-xl focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
                      "dark:text-white",
                      benefit.shadowColor,
                      benefit.hoverShadowColor,
                      benefit.darkCardColor,
                      benefit.darkShadowColor,
                      benefit.darkHoverShadowColor
                    )}
                  >
                    <div className="flex flex-row items-center gap-4 p-6">
                      <motion.div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-lg",
                          benefit.bgColor,
                          benefit.darkBgColor
                        )}
                        whileHover={{
                          rotate: [0, -5, 5, -5, 0],
                          transition: { duration: 0.5 },
                        }}
                      >
                        {React.createElement(benefit.icon, {
                          className: cn("h-6 w-6", benefit.textColor, benefit.darkTextColor),
                        })}
                      </motion.div>
                      <span className="font-utm-akashi text-2xl font-normal text-card-foreground dark:text-white">
                        {benefit.title}
                      </span>
                    </div>
                    <p className="px-6 pb-6 text-muted-foreground dark:text-white/70">
                      {benefit.desc}
                    </p>
                  </button>
                </DialogTrigger>
                <DialogContent className={cn("dark:text-white", benefit.darkCardColor)}>
                  <DialogHeader>
                    <DialogTitle className="font-utm-akashi text-2xl font-normal">
                      {benefit.title}
                    </DialogTitle>
                  </DialogHeader>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={cn(
                          "flex h-12 w-12 items-center justify-center rounded-lg",
                          benefit.bgColor,
                          benefit.darkBgColor
                        )}
                      >
                        {React.createElement(benefit.icon, {
                          className: cn("h-6 w-6", benefit.textColor, benefit.darkTextColor),
                        })}
                      </div>
                    </div>
                    <Image
                      src={benefit.image || "/placeholder.svg"}
                      alt={benefit.title}
                      width={600}
                      height={300}
                      className="w-full rounded-lg"
                    />
                    <p className="leading-relaxed text-muted-foreground">{benefit.desc}</p>
                  </div>
                </DialogContent>
              </Dialog>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
