"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Code } from "lucide-react";

export function Registration() {
  const steps = [
    {
      step: "1",
      title: "Điền form đăng ký",
      desc: "Cung cấp thông tin cơ bản và lĩnh vực quan tâm",
    },
    {
      step: "2",
      title: "Tham gia buổi giới thiệu",
      desc: "Gặp gỡ các thành viên và tìm hiểu hoạt động CLB",
    },
    {
      step: "3",
      title: "Bắt đầu coding",
      desc: "Tham gia các dự án và phát triển kỹ năng",
    },
  ];

  return (
    <section className="py-20 bg-gradient-to-r from-blue-600 to-purple-600 text-white">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <motion.div
            className="space-y-4"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Badge className="bg-white/20 text-white border-white/30">
              Tham gia ngay
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold">
              Sẵn sàng bắt đầu hành trình công nghệ?
            </h2>
            <p className="text-xl text-blue-100">
              Chỉ cần 3 bước đơn giản để trở thành thành viên của TechTonic Club
            </p>
          </motion.div>

          <div className="grid md:grid-cols-3 gap-8 my-12">
            {steps.map((item, index) => (
              <motion.div
                key={index}
                className="text-center space-y-4"
                initial={{ opacity: 0, y: 50 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto"
                  whileHover={{
                    scale: 1.1,
                    backgroundColor: "rgba(255,255,255,0.3)",
                    transition: { duration: 0.3 },
                  }}
                >
                  <span className="text-2xl font-bold">{item.step}</span>
                </motion.div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-blue-100">{item.desc}</p>
              </motion.div>
            ))}
          </div>

          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  Đăng ký tham gia TechTonic Club
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Điền thông tin để chúng tôi liên hệ với bạn
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      placeholder="Họ và tên"
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-all"
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      type="email"
                      placeholder="Email"
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-all"
                    />
                  </motion.div>
                </div>
                <div className="grid md:grid-cols-2 gap-4">
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      placeholder="Số điện thoại"
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-all"
                    />
                  </motion.div>
                  <motion.div whileFocus={{ scale: 1.02 }}>
                    <Input
                      placeholder="Lớp/Khóa"
                      className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-all"
                    />
                  </motion.div>
                </div>
                <motion.div whileFocus={{ scale: 1.02 }}>
                  <Textarea
                    placeholder="Lĩnh vực công nghệ quan tâm (tùy chọn)"
                    className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-all"
                  />
                </motion.div>
                <motion.div
                  whileHover={{
                    scale: 1.05,
                    boxShadow: "0 0 20px rgba(255,255,255,0.3)",
                  }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Button
                    size="lg"
                    className="w-full bg-white text-blue-600 hover:bg-blue-50 font-semibold"
                  >
                    <Code className="mr-2 h-5 w-5" />
                    Gửi đăng ký
                  </Button>
                </motion.div>
              </CardContent>
            </Card>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
