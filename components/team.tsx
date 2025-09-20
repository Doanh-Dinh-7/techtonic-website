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
  const [selectedTerm, setSelectedTerm] = useState("2024");

  const teamData = {
    founder: [
      {
        name: "Nguyễn Văn Quang",
        role: "Co-Founder",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image:
          "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206572/Nguyen_Van_Quang_pqrrh1.jpg",
      },
      {
        name: "Đinh Sỹ Quốc Doanh",
        role: "Co-Founder",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image:
          "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206562/Dinh_Sy_Quoc_Doanh_hiqkcs.jpg",
      },
      {
        name: "Nguyễn Anh Tú",
        role: "Co-Founder",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image:
          "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206563/Nguyen_Anh_Tu_z0wpya.jpg",
      },
      {
        name: "Nguyễn Thị Kim Phượng",
        role: "Co-Founder",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image:
          "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206565/Nguyen_Thi_Kim_Phuong_tjgduj.jpg",
      },
      {
        name: "Phạm Bảo Hân",
        role: "Co-Founder",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image:
          "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206567/Pham_Bao_Han_wkv0s1.jpg",
      },
      {
        name: "Lê Minh Thư",
        role: "Co-Founder",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image:
          "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206563/Le_Minh_Thu_suucwn.jpg",
      },
      {
        name: "Nguyễn Thị Ánh Tuyết",
        role: "Co-Founder",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image:
          "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206563/Nguyen_Thi_Anh_Tuyet_an6hzg.jpg",
      },
      {
        name: "Nguyễn Đình Khoa",
        role: "Co-Founder",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image:
          "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206554/Nguyen_Dinh_Khoa_focqi8.jpg",
      },
    ],
    "2024": [
      {
        name: "Minh Anh",
        role: "Chủ nhiệm CLB",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image: "/ban_chu_nhiem/2024/Minh_Anh.jpg",
      },
      {
        name: "Nhung Nguyệt",
        role: "Trưởng ban Chuyên môn",
        desc: "Chuyên gia về Data Science và Machine Learning",
        image: "/ban_chu_nhiem/2024/Nhung_Nguyet.jpg",
      },
      {
        name: "Nguyễn Anh Tú",
        role: "Trưởng ban Sự kiện",
        desc: "Chuyên về Backend Development và Database",
        image: "/ban_chu_nhiem/2024/Nguyen_Anh_Tu.jpg",
      },
      {
        name: "Thảo Nguyễn",
        role: "Trưởng ban Nhân sự",
        desc: "Chuyên về Backend Development và Database",
        image: "/ban_chu_nhiem/2024/Thao_Nguyen.jpg",
      },
      {
        name: "Đình Khoa",
        role: "Trưởng ban Truyền thông",
        desc: "Chuyên về Frontend Development và UI/UX Design",
        image: "/ban_chu_nhiem/2024/Pham_Thi_Dung.jpg",
      },
    ],
    "2023": [
      {
        name: "Nguyễn Văn Quang",
        role: "Chủ nhiệm CLB",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image:
          "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206561/Nguyen_Van_Quang_hxn3vo.jpg",
      },
      {
        name: "Đinh Sỹ Quốc Doanh",
        role: "Trưởng ban Chuyên môn",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image:
          "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206558/Dinh_Sy_Quoc_Doanh_sjpkd6.jpg",
      },
      {
        name: "Nguyễn Anh Tú",
        role: "Trưởng ban Sự kiện",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image:
          "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206558/Nguyen_Anh_Tu_b5ntqm.jpg",
      },
      {
        name: "Nguyễn Thị Kim Phượng",
        role: "Trưởng ban Nhân sự",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image:
          "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206558/Nguyen_Thi_Kim_Phuong_b19fgp.jpg",
      },
      {
        name: "Phạm Bảo Hân",
        role: "Trưởng ban Truyền thông",
        desc: "Sinh viên xuất sắc, chuyên về Full-stack Development và AI",
        image:
          "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206562/Pham_Bao_Han_c5sxpd.jpg",
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
            <TabsList className="flex w-full mb-8 gap-2 bg-blue-200 rounded-lg p-7">
              {visibleTabs.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="px-4 py-2 rounded-md text-black data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                >
                  {tab.label}
                </TabsTrigger>
              ))}

              {hiddenTabs.length > 0 && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <TabsTrigger
                      value="more"
                      className="px-4 py-2 rounded-md text-black data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                    >
                      <MoreHorizontal className="w-4 h-4" />
                    </TabsTrigger>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent>
                    {hiddenTabs.map((tab) => (
                      <DropdownMenuItem key={tab.value} asChild>
                        <TabsTrigger
                          value={tab.value}
                          className="w-full text-black data-[state=active]:bg-blue-500 data-[state=active]:text-white"
                        >
                          {tab.label}
                        </TabsTrigger>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
            </TabsList>

            {Object.entries(teamData).map(([term, members]) => (
              <TabsContent key={term} value={term}>
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3  gap-8">
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
                      <Card className="text-center border-0 shadow-lg shadow-blue-200 h-full">
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
