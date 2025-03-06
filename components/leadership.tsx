"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { useState } from "react";

interface LeaderProps {
  name: string;
  position: string;
  image: string;
}

function LeaderCard({ name, position, image }: LeaderProps) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <div className="aspect-square relative">
        <Image
          src={imgSrc}
          alt={name}
          fill
          className="object-cover"
          onError={() => setImgSrc("/placeholder.svg")}
        />
      </div>
      <CardContent className="p-4 text-center">
        <h3 className="font-bold text-lg">{name}</h3>
        <p className="text-gray-600">{position}</p>
      </CardContent>
    </Card>
  );
}

export default function Leadership() {
  const leaders = [
    {
      name: "Nguyễn Văn Quang",
      position: "Chủ nhiệm",
      image: "/ban_chu_nhiem/Nguyen_Van_Quang.jpg",
    },
    {
      name: "Nguyễn Anh Tú",
      position: "PCN. TB Sự kiện",
      image: "/ban_chu_nhiem/Nguyen_Anh_Tu.jpg",
    },
    {
      name: "Nguyễn Thị Kim Phượng",
      position: "PCN. TB Nhân sự",
      image: "/ban_chu_nhiem/Nguyen_Thi_Kim_Phuong.jpg",
    },
    {
      name: "Phạm Bảo Hân",
      position: "PCN. TB Truyền thông",
      image: "/ban_chu_nhiem/Pham_Bao_Han.jpg",
    },
    {
      name: "Đinh Sỹ Quốc Doanh",
      position: "PCN. TB Chuyên môn",
      image: "/ban_chu_nhiem/Dinh_Sy_Quoc_Doanh.jpg",
    },
  ];

  return (
    <section id="leadership" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Ban chủ nhiệm
        </h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {leaders.map((leader, index) => (
            <LeaderCard key={index} {...leader} />
          ))}
        </div>
      </div>
    </section>
  );
}
