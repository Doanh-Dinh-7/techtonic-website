"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import {
  Code,
  Network,
  Lightbulb,
  Trophy,
  GraduationCap,
  Handshake,
} from "lucide-react";
import Image from "next/image";

export function Benefits() {
  const benefits = [
    {
      icon: Code,
      title: "Kỹ năng lập trình",
      desc: "Học và thực hành các ngôn ngữ lập trình hiện đại, framework và công nghệ mới nhất trong ngành.",
      image: "/placeholder.svg?height=300&width=400&text=Programming+Skills",
      color: "blue",
      textColor: "text-blue-600",
      bgColor: "bg-blue-100",
      shadowColor: "shadow-blue-200",
      hoverShadowColor: "hover:shadow-blue-200",
    },
    {
      icon: Network,
      title: "Mạng lưới kết nối",
      desc: "Kết nối với sinh viên cùng đam mê, alumni và các chuyên gia trong ngành công nghệ thông tin.",
      image: "/placeholder.svg?height=300&width=400&text=Networking",
      color: "green",
      textColor: "text-green-600",
      bgColor: "bg-green-100",
      shadowColor: "shadow-green-200",
      hoverShadowColor: "hover:shadow-green-200",
    },
    {
      icon: Lightbulb,
      title: "Dự án thực tế",
      desc: "Tham gia các dự án thực tế, từ ý tưởng đến triển khai, giúp tích lũy kinh nghiệm làm việc.",
      image: "/placeholder.svg?height=300&width=400&text=Real+Projects",
      color: "yellow",
      textColor: "text-yellow-600",
      bgColor: "bg-yellow-100",
      shadowColor: "shadow-yellow-200",
      hoverShadowColor: "hover:shadow-yellow-200",
    },
    {
      icon: Trophy,
      title: "Cơ hội thi đấu",
      desc: "Tham gia các cuộc thi lập trình, hackathon cấp trường, quốc gia và quốc tế.",
      image: "/placeholder.svg?height=300&width=400&text=Competitions",
      color: "purple",
      textColor: "text-purple-600",
      bgColor: "bg-purple-100",
      shadowColor: "shadow-purple-200",
      hoverShadowColor: "hover:shadow-purple-200",
    },
    {
      icon: GraduationCap,
      title: "Phát triển bản thân",
      desc: "Rèn luyện kỹ năng mềm, leadership và khả năng làm việc nhóm thông qua các hoạt động CLB.",
      image: "/placeholder.svg?height=300&width=400&text=Personal+Development",
      color: "red",
      textColor: "text-red-600",
      bgColor: "bg-red-100",
      shadowColor: "shadow-red-200",
      hoverShadowColor: "hover:shadow-red-200",
    },
    {
      icon: Handshake,
      title: "Cơ hội việc làm",
      desc: "Tiếp cận thông tin tuyển dụng, thực tập và cơ hội nghề nghiệp từ các đối tác doanh nghiệp.",
      image: "/placeholder.svg?height=300&width=400&text=Job+Opportunities",
      color: "orange",
      textColor: "text-orange-600",
      bgColor: "bg-orange-100",
      shadowColor: "shadow-orange-200",
      hoverShadowColor: "hover:shadow-orange-200",
    },
  ];

  return (
    <section id="benefits" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-green-100 text-green-700 hover:bg-green-700 hover:text-green-100">
            Lợi ích tham gia
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 font-paris2024">
            Tại sao nên tham gia TechTonic?
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
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
                  <Card
                    className={`border-0 shadow-lg hover:shadow-xl transition-shadow h-full cursor-pointer ${benefit.shadowColor} ${benefit.hoverShadowColor}`}
                  >
                    <CardHeader className="flex-row items-center gap-4">
                      <motion.div
                        className={`w-12 h-12 ${benefit.bgColor} rounded-lg flex items-center justify-center`}
                        whileHover={{
                          rotate: [0, -5, 5, -5, 0],
                          transition: { duration: 0.5 },
                        }}
                      >
                        {React.createElement(benefit.icon, {
                          className: `h-6 w-6 ${benefit.textColor}`,
                        })}
                      </motion.div>
                      <CardTitle className="font-utm-akashi text-2xl font-normal">
                        {benefit.title}
                      </CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-gray-600">{benefit.desc}</p>
                    </CardContent>
                  </Card>
                </DialogTrigger>
                <DialogContent>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div
                        className={`w-12 h-12 ${benefit.bgColor} rounded-lg flex items-center justify-center`}
                      >
                        {React.createElement(benefit.icon, {
                          className: `h-6 w-6 ${benefit.textColor}`,
                        })}
                      </div>
                      <h3 className="text-2xl font-normal font-utm-akashi">
                        {benefit.title}
                      </h3>
                    </div>
                    <Image
                      src={benefit.image || "/placeholder.svg"}
                      alt={benefit.title}
                      width={600}
                      height={300}
                      className="rounded-lg w-full"
                    />
                    <p className="text-gray-600 leading-relaxed">
                      {benefit.desc}
                    </p>
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
