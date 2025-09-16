"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Eye,
  Target,
  Gem,
  Heart,
  Handshake,
  Shield,
  Star,
  Flag,
} from "lucide-react";

export function About() {
  const values = [
    { icon: Heart, title: "Tinh thần chia sẻ", color: "red" },
    { icon: Handshake, title: "Sự tương trợ", color: "blue" },
    { icon: Shield, title: "Sự chân thành", color: "green" },
    { icon: Star, title: "Sự tôn trọng", color: "yellow" },
    { icon: Flag, title: "Sự trách nhiệm", color: "purple" },
  ];

  return (
    <section id="about" className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-blue-100 text-blue-700 hover:bg-blue-700 hover:text-blue-100">
            Về chúng tôi
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            TechTonic Club
          </h2>
        </motion.div>

        <div className="max-w-4xl mx-auto">
          <Tabs defaultValue="vision" className="w-full">
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger
                value="vision"
                className="flex items-center gap-2 data-[state=active]:text-blue-600"
              >
                <Eye className="h-4 w-4" />
                Tầm nhìn
              </TabsTrigger>
              <TabsTrigger
                value="mission"
                className="flex items-center gap-2 data-[state=active]:text-green-600"
              >
                <Target className="h-4 w-4" />
                Sứ mệnh
              </TabsTrigger>
              <TabsTrigger
                value="values"
                className="flex items-center gap-2 data-[state=active]:text-purple-600"
              >
                <Gem className="h-4 w-4" />
                Giá trị cốt lõi
              </TabsTrigger>
            </TabsList>

            <TabsContent value="vision" className="mt-8 ">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg shadow-blue-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                    <Eye className="h-6 w-6 text-blue-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Tầm nhìn</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Trở thành câu lạc bộ học thuật hàng đầu trực thuộc Hội Sinh
                  viên tại trường Đại học Kinh Tế - Đại học Đà Nẵng, nơi trao đi
                  những giá trị sâu sắc cho sinh viên trong khoảng thời gian học
                  đại học và tương lai.
                </p>
              </motion.div>
            </TabsContent>

            <TabsContent value="mission" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg shadow-green-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
                    <Target className="h-6 w-6 text-green-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">Sứ mệnh</h3>
                </div>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Mang đến một môi trường học thuật cạnh tranh, lành mạnh, giúp
                  cải thiện kiến thức, kỹ năng, kinh nghiệm, các mối quan hệ
                  theo đúng lĩnh vực công nghệ thông tin, phân tích trong kinh
                  doanh, thông qua sự dẫn dắt chân thành, lòng biết ơn, và trách
                  nhiệm cao của mỗi sinh viên là thành viên của câu lạc bộ.
                </p>
              </motion.div>
            </TabsContent>

            <TabsContent value="values" className="mt-8">
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="bg-white rounded-2xl p-8 shadow-lg shadow-purple-200"
              >
                <div className="flex items-center gap-4 mb-6">
                  <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                    <Gem className="h-6 w-6 text-purple-600" />
                  </div>
                  <h3 className="text-2xl font-bold text-gray-900">
                    Giá trị cốt lõi
                  </h3>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  {values.map((value, index) => (
                    <motion.div
                      key={index}
                      className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                    >
                      <div
                        className={`w-8 h-8 bg-${value.color}-100 rounded-lg flex items-center justify-center`}
                      >
                        {React.createElement(value.icon, {
                          className: `h-4 w-4 text-${value.color}-600`,
                        })}
                      </div>
                      <span className="font-medium text-gray-800">
                        {value.title}
                      </span>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
