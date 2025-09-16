"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Image from "next/image";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";
import { MoreHorizontal } from "lucide-react";

export function Team() {
  const [selectedTerm, setSelectedTerm] = useState("founder");

  const teamData = {
    founder: [
      {
        name: "Nguyễn Văn An",
        role: "Chủ tịch CLB",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image: "/placeholder.svg?height=120&width=120&text=President",
      },
    ],
    "2024": [
      {
        name: "Nguyễn Văn An",
        role: "Chủ tịch CLB",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image: "/placeholder.svg?height=120&width=120&text=President",
      },
      {
        name: "Trần Thị Bình",
        role: "Phó chủ tịch",
        desc: "Chuyên gia về Data Science và Machine Learning",
        image: "/placeholder.svg?height=120&width=120&text=Vice+President",
      },
      {
        name: "Lê Văn Cường",
        role: "Trưởng ban Học thuật",
        desc: "Chuyên về Backend Development và Database",
        image: "/placeholder.svg?height=120&width=120&text=Academic+Head",
      },
      {
        name: "Phạm Thị Dung",
        role: "Trưởng ban Truyền thông",
        desc: "Chuyên về Frontend Development và UI/UX Design",
        image: "/placeholder.svg?height=120&width=120&text=PR+Head",
      },
    ],
    "2023": [
      {
        name: "Hoàng Văn Nam",
        role: "Cựu Chủ tịch",
        desc: "Hiện đang làm Senior Developer tại FPT Software",
        image: "/placeholder.svg?height=120&width=120&text=Ex+President",
      },
      {
        name: "Võ Thị Hoa",
        role: "Cựu Phó chủ tịch",
        desc: "Hiện đang làm Data Analyst tại Viettel",
        image: "/placeholder.svg?height=120&width=120&text=Ex+VP",
      },
    ],
  };

  const tabs = [
    { value: "founder", label: "Founder" },
    // Thêm nhiệm kỳ mới ở đây
    { value: "2024", label: "Nhiệm kỳ 2024" },
    { value: "2023", label: "Nhiệm kỳ 2023" },
  ];

  // Giới hạn số tab hiển thị trực tiếp
  const visibleTabs = tabs.slice(0, 5);
  const hiddenTabs = tabs.slice(5);

  return (
    <section id="team" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-red-100 text-red-700 hover:bg-red-700 hover:text-red-100">
            Đội ngũ
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Ban điều hành & Mentor
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Đội ngũ lãnh đạo và mentor giàu kinh nghiệm, luôn sẵn sàng hỗ trợ
            thành viên
          </p>
        </motion.div>

        <div className="max-w-7xl mx-auto">
          <Tabs
            value={selectedTerm}
            onValueChange={setSelectedTerm}
            className="w-full"
          >
            <TabsList className="flex w-full mb-8 gap-2">
              {visibleTabs.map((tab) => (
                <TabsTrigger key={tab.value} value={tab.value}>
                  {tab.label}
                </TabsTrigger>
              ))}

              {hiddenTabs.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <TabsTrigger value="more">
                      <MoreHorizontal className="w-4 h-4" />
                    </TabsTrigger>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {hiddenTabs.map((tab) => (
                      <DropdownMenuItem key={tab.value} asChild>
                        <TabsTrigger value={tab.value}>{tab.label}</TabsTrigger>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </TabsList>

            {Object.entries(teamData).map(([term, members]) => (
              <TabsContent key={term} value={term}>
                <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
                  {members.map((member, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 50 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1, duration: 0.6 }}
                      viewport={{ once: true }}
                      whileHover={{
                        y: -10,
                        boxShadow: "0 20px 40px rgba(0,0,0,0.1)",
                        transition: { duration: 0.3 },
                      }}
                    >
                      <Card className="text-center border-0 shadow-lg h-full">
                        <CardHeader>
                          <motion.div
                            whileHover={{ scale: 1.1 }}
                            transition={{ duration: 0.3 }}
                          >
                            <Image
                              src={member.image || "/placeholder.svg"}
                              alt={member.name}
                              width={120}
                              height={120}
                              className="rounded-full mx-auto mb-4"
                            />
                          </motion.div>
                          <CardTitle>{member.name}</CardTitle>
                          <CardDescription>{member.role}</CardDescription>
                        </CardHeader>
                        <CardContent>
                          <motion.p
                            className="text-sm text-gray-600"
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ delay: 0.5, duration: 0.6 }}
                            viewport={{ once: true }}
                          >
                            {member.desc}
                          </motion.p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
