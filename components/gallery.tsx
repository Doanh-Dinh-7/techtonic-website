"use client";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import Carousel from "./carousel";

export default function Gallery() {
  const { ref, hasIntersected } = useIntersectionObserver();

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
        name: "Lê Minh Thư",
        image: "/founders/Le_Minh_Thu.jpg",
      },
      {
        name: "Nguyễn Thị Ánh Tuyết",
        image: "/founders/Nguyen_Thi_Anh_Tuyet.jpg",
      },
      {
        name: "Nguyễn Đình Khoa",
        image: "/founders/Nguyen_Dinh_Khoa.jpg",
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
        image: "/cau_lac_bo/Dinh_Sy_Quoc_Doanh.jpg",
      },
      {
        name: "Thành viên ban nhân sự",
        image: "/cau_lac_bo/Dinh_Sy_Quoc_Doanh.jpg",
      },
      {
        name: "Thành viên ban truyền thông",
        image: "/cau_lac_bo/Dinh_Sy_Quoc_Doanh.jpg",
      },
      {
        name: "Thành viên ban chuyên môn",
        image: "/cau_lac_bo/Dinh_Sy_Quoc_Doanh.jpg",
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
        image: "/hoat_dong/nguoi_trong_nganh_mis.jpg",
      },
      {
        name: "TECHWARE SEASON 1",
        image: "/hoat_dong/IMG_7815.jpeg",
      },
      {
        name: "Tên hoạt động",
        image: "/hoat_dong/Dinh_Sy_Quoc_Doanh.jpg",
      },
      {
        name: "Tên hoạt động",
        image: "/hoat_dong/Dinh_Sy_Quoc_Doanh.jpg",
      },
    ],
  };
  const tabData = [
    {
      value: "founders",
      label: "Founders",
      description: "Những người sáng lập câu lạc bộ",
    },
    {
      value: "membership",
      label: "Ban chủ nhiệm",
      description: "Đội ngũ lãnh đạo hiện tại",
    },
    {
      value: "club",
      label: "Câu lạc bộ",
      description: "Hình ảnh tổng quan về câu lạc bộ",
    },
    {
      value: "activities",
      label: "Hoạt động",
      description: "Các hoạt động và sự kiện của câu lạc bộ",
    },
  ];

  return (
    <section id="gallery" className="py-20 bg-gray-50" ref={ref}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-1000 ${
            hasIntersected
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          Thư viện hình ảnh
        </h2>

        <div
          className={`transition-all duration-1000 delay-300 ${
            hasIntersected
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <Tabs defaultValue="activities" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              {tabData.map((tab) => (
                <TabsTrigger
                  key={tab.value}
                  value={tab.value}
                  className="transition-all hover:scale-105"
                >
                  {tab.label}
                </TabsTrigger>
              ))}
            </TabsList>

            {tabData.map((tab) => (
              <TabsContent
                key={tab.value}
                value={tab.value}
                className="space-y-6"
              >
                <div className="text-center mb-8">
                  <h3 className="text-2xl font-semibold mb-2">{tab.label}</h3>
                  <p className="text-gray-600">{tab.description}</p>
                </div>

                <div className="transform transition-all duration-500 hover:scale-[1.02]">
                  <Carousel
                    images={galleries[tab.value as keyof typeof galleries]}
                    autoPlay={true}
                    interval={4000}
                    categoryName={tab.value}
                  />
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </div>
      </div>
    </section>
  );
}
