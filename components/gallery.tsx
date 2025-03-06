"use client";

import Image from "next/image";
import { Card, CardContent } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useState } from "react";

interface GallyProps {
  name: string;
  image: string;
}

function PhotoCard({ name, image }: GallyProps) {
  const [imgSrc, setImgSrc] = useState(image);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-all">
      <CardContent className="p-0 text-center">
        <div className="aspect-video relative">
          <Image
            src={imgSrc}
            alt={image}
            fill
            className="object-cover"
            onError={() => setImgSrc("/placeholder.svg")}
          />
        </div>
        <h3 className="font-bold text-lg py-1">{name}</h3>
      </CardContent>
    </Card>
  );
}

export default function Gallery() {
  // Sample gallery data - replace with actual images
  const galleries = {
    founders: [
      {
        name: "Nguyễn Văn Quang",
        image: "/founders/Nguyen_Van_Quang.jpg",
      },
      {
        name: "Đinh Sỹ Quốc Doanh",
        image: "/founders/Dinh_Sy_Quoc_Doanh.jpg",
      },
      {
        name: "Nguyễn Anh Tú",
        image: "/founders/Nguyen_Anh_Tu.jpg",
      },
      {
        name: "Nguyễn Thị Kim Phượng",
        image: "/founders/Nguyen_Thi_Kim_Phuong.jpg",
      },
      {
        name: "Phạm Bảo Hân",
        image: "/founders/Pham_Bao_Han.jpg",
      },
      {
        name: "Nguyễn Đình Khoa",
        image: "/founders/Nguyen_Dinh_Khoa.jpg",
      },
      {
        name: "Lê Minh Thư",
        image: "/founders/Le_Minh_Thu.jpg",
      },
      {
        name: "Nguyễn Thị Ánh Tuyết",
        image: "/founders/Nguyen_Thi_Anh_Tuyet.jpg",
      },
    ],
    membership: [
      {
        name: "Nguyễn Văn Quang",
        image: "/membership/Nguyen_Van_Quang.jpg",
      },
      {
        name: "Nguyễn Anh Tú",
        image: "/membership/Nguyen_Anh_Tu.jpg",
      },
      {
        name: "Nguyễn Thị Kim Phượng",
        image: "/membership/Nguyen_Thi_Kim_Phuong.jpg",
      },
      {
        name: "Phạm Bảo Hân",
        image: "/membership/Pham_Bao_Han.jpg",
      },
      {
        name: "Đinh Sỹ Quốc Doanh",
        image: "/membership/Dinh_Sy_Quoc_Doanh.jpg",
      },
      {
        name: "Đinh Sỹ Quốc Doanh",
        image: "/membership/Dinh_Sy_Quoc_Doanh.jpg",
      },
    ],
    club: [
      {
        name: "Thành viên ban sự kiện",
        image: "/ban_chu_nhiem/Dinh_Sy_Quoc_Doanh.jpg",
      },
      {
        name: "Thành viên ban nhân sự",
        image: "/ban_chu_nhiem/Dinh_Sy_Quoc_Doanh.jpg",
      },
      {
        name: "Thành viên ban truyền thông",
        image: "/ban_chu_nhiem/Dinh_Sy_Quoc_Doanh.jpg",
      },
      {
        name: "Thành viên ban chuyên môn",
        image: "/ban_chu_nhiem/Dinh_Sy_Quoc_Doanh.jpg",
      },
    ],
    activities: [
      {
        name: "MEMTOR-MENTEE SEASON 1",
        image: "/hoat_dong/mentor_mentee.jpg",
      },
      {
        name: "MEETING MEMBER - TECH 1",
        image: "/hoat_dong/gap_mat_gen1.jpg",
      },
      {
        name: 'NGƯỜI TRONG NGÀNH "MIS"',
        image: "/ban_chu_nhiem/Dinh_Sy_Quoc_Doanh.jpg",
      },
      {
        name: "TECHWARE SEASON 1",
        image: "/ban_chu_nhiem/Dinh_Sy_Quoc_Doanh.jpg",
      },
      {
        name: "Tên hoạt động",
        image: "/ban_chu_nhiem/Dinh_Sy_Quoc_Doanh.jpg",
      },
      {
        name: "Tên hoạt động",
        image: "/ban_chu_nhiem/Dinh_Sy_Quoc_Doanh.jpg",
      },
    ],
  };

  return (
    <section id="gallery" className="py-24 bg-gray-50">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Thư viện hình ảnh
        </h2>

        <Tabs defaultValue="activities" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="founders">Founders</TabsTrigger>
            <TabsTrigger value="membership">
              Thành viên ban chủ nhiệm
            </TabsTrigger>
            <TabsTrigger value="club">Câu lạc bộ</TabsTrigger>
            <TabsTrigger value="activities">Hoạt động</TabsTrigger>
          </TabsList>

          {Object.entries(galleries).map(([category, images]) => (
            <TabsContent key={category} value={category}>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                {images.map((image, index) => (
                  <PhotoCard key={index} {...image} />
                ))}
              </div>
            </TabsContent>
          ))}
        </Tabs>
      </div>
    </section>
  );
}
