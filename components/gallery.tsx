"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

export function Gallery() {
  const [animationConfig, setAnimationConfig] = useState<{
    durations: number[];
    widths: number[];
    loaded: boolean;
  }>({ durations: [], widths: [], loaded: false });

  // Tạo dữ liệu gallery với nhiều hình ảnh hơn để tạo hiệu ứng scroll
  const galleryItems = {
    row_1: [
      {
        id: "10",
        src: "/gallery/cslt/cslt3_1.webp",
        alt: "Cslt 1",
      },
      {
        id: "11",

        src: "/gallery/techxplore/tx1.webp",
        alt: "TechXplore 1",
      },
      {
        id: "12",
        src: "/gallery/cslt/cslt7_1.webp",
        alt: "Cslt 4",
      },
      {
        id: "13",
        src: "/gallery/techxplore/tx3.webp",
        alt: "TechXplore 3",
      },
      {
        id: "14",
        src: "/gallery/cslt/cslt7_3.webp",
        alt: "Cslt 6",
      },
      {
        id: "15",
        src: "/gallery/techxplore/tx4.webp",
        alt: "TechXplore 4",
      },
      {
        id: "16",
        src: "/gallery/cslt/cslt3_3.webp",
        alt: "Cslt 3",
      },
      {
        id: "17",
        src: "/gallery/techxplore/tx2.webp",
        alt: "TechXplore 2",
      },
      {
        id: "18",
        src: "/gallery/cslt/cslt7_2.webp",
        alt: "Cslt 5",
      },
      {
        id: "19",
        src: "/gallery/techxplore/tx5.webp",
        alt: "TechXplore 5",
      },
    ],
    row_2: [
      {
        id: "20",
        src: "/gallery/mm/mm1.webp",
        alt: "Mentor-Mentee 1",
      },
      {
        id: "21",
        src: "/gallery/mm/mm2.webp",
        alt: "Mentor-Mentee 2",
      },
      {
        id: "23",
        src: "/gallery/mm/mm4.webp",
        alt: "Mentor-Mentee 4",
      },
      {
        id: "24",
        src: "/gallery/mm/mm5.webp",
        alt: "Mentor-Mentee 5",
      },
      {
        id: "24",
        src: "/gallery/mm/mm6.webp",
        alt: "Mentor-Mentee 6",
      },
      {
        id: "24",
        src: "/gallery/mm/mm7.webp",
        alt: "Mentor-Mentee 7",
      },
      {
        id: "24",
        src: "/gallery/mm/mm8.webp",
        alt: "Mentor-Mentee 8",
      },
      {
        id: "24",
        src: "/gallery/mm/mm9.webp",
        alt: "Mentor-Mentee 9",
      },
    ],
    row_3: [
      {
        id: "30",
        src: "/gallery/ntnm/ntnm1.webp",
        alt: "Người trong ngành MIS 1",
      },
      {
        id: "31",
        src: "/gallery/ntnm/ntnm2.webp",
        alt: "Người trong ngành MIS 2",
      },
      {
        id: "32",
        src: "/gallery/ntnm/ntnm3.webp",
        alt: "Người trong ngành MIS 3",
      },
      {
        id: "33",
        src: "/gallery/tw/tw1.webp",
        alt: "TechWare 1",
      },
      {
        id: "34",
        src: "/gallery/tw/tw2.webp",
        alt: "TechWare 2",
      },
      {
        id: "35",
        src: "/gallery/tw/tw3.webp",
        alt: "TechWare 3",
      },
      {
        id: "36",
        src: "/gallery/tw/tw4.webp",
        alt: "TechWare 4",
      },
      {
        id: "37",
        src: "/gallery/tw/tw5.webp",
        alt: "TechWare 5",
      },
      {
        id: "38",
        src: "/gallery/tw/tw6.webp",
        alt: "TechWare 6",
      },
      {
        id: "39",
        src: "/gallery/tw/tw7.webp",
        alt: "TechWare 7",
      },
      {
        id: "310",
        src: "/gallery/tw/tw8.webp",
        alt: "TechWare 8",
      },
      {
        id: "311",
        src: "/gallery/tw/tw9.webp",
        alt: "TechWare 9",
      },
      {
        id: "312",
        src: "/gallery/tw/tw10.webp",
        alt: "TechWare 10",
      },
    ],
  };

  const rows = useMemo(() => Object.values(galleryItems), [galleryItems]);

  // Tính toán thời gian animation dựa trên kích thước thực tế
  useEffect(() => {
    const calculateAnimationDuration = () => {
      const viewportWidth = window.innerWidth;

      // Kích thước ảnh theo breakpoint (w-56 md:w-64 lg:w-72)
      let itemWidth: number;
      let spacing: number = 16; // space-x-4 = 16px

      if (viewportWidth >= 1024) {
        // lg
        itemWidth = 288; // w-72 = 72 * 4 = 288px
      } else if (viewportWidth >= 768) {
        // md
        itemWidth = 256; // w-64 = 64 * 4 = 256px
      } else {
        // mobile
        itemWidth = 224; // w-56 = 56 * 4 = 224px
      }

      const durations: number[] = [];
      const widths: number[] = [];

      rows.forEach((row) => {
        // Tổng chiều rộng của một set (items + spacing)
        const totalWidth = row.length * itemWidth + (row.length - 1) * spacing;

        // Tốc độ scroll (pixel per second) - có thể điều chỉnh
        const scrollSpeed = 100; // 100px/s

        // Thời gian = khoảng cách / tốc độ
        const duration = (totalWidth * 2) / scrollSpeed;

        // Đảm bảo thời gian tối thiểu là 10s và tối đa là 60s
        durations.push(Math.max(10, Math.min(60, duration)));
        widths.push(totalWidth);
      });

      setAnimationConfig({
        durations,
        widths,
        loaded: true,
      });
    };

    calculateAnimationDuration();

    let timeout: NodeJS.Timeout;
    const handleResize = () => {
      clearTimeout(timeout);
      timeout = setTimeout(() => calculateAnimationDuration(), 200); // debounce 200ms
    };

    window.addEventListener("resize", handleResize);
    return () => {
      clearTimeout(timeout);
      window.removeEventListener("resize", handleResize);
    };
  }, [rows]);

  return (
    <section className="py-20 bg-gray-50">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-orange-100 text-orange-700 hover:bg-orange-700 hover:text-orange-100">
            Thư viện ảnh
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Khoảnh khắc đáng nhớ
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Những hình ảnh sinh động về các hoạt động của TechTonic Club
          </p>
        </motion.div>
      </div>

      {/* Animated Gallery Rows */}
      <div className="w-[100%] relative left-1/2 right-1/2 -mx-[50vw]">
        {!animationConfig.loaded ? (
          <div className="flex justify-center items-center h-64">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-orange-600"></div>
          </div>
        ) : (
          <div className="space-y-8">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="relative overflow-hidden">
                <motion.div
                  className={`flex space-x-4 hover:pause-animation ${
                    rowIndex % 2 === 0
                      ? "scroll-left-dynamic"
                      : "scroll-right-dynamic"
                  }`}
                  style={
                    {
                      "--animation-duration": `${animationConfig.durations[rowIndex]}s`,
                      "--total-width": `${animationConfig.widths[rowIndex]}px`,
                    } as React.CSSProperties
                  }
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: rowIndex * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  {/* First set */}
                  {row.map((item, itemIndex) => (
                    <motion.div
                      key={`first-${item.id}`}
                      className={`relative w-56 md:w-64 lg:w-72 rounded-lg overflow-hidden shrink-0 
                        ${itemIndex % 2 === 0 ? "mt-0" : "mt-5"}`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative h-64 w-full shadow-lg">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                    </motion.div>
                  ))}
                  {/* Duplicate set for seamless loop */}
                  {row.map((item, itemIndex) => (
                    <motion.div
                      key={`second-${item.id}`}
                      className={`relative w-56 md:w-64 lg:w-72 rounded-lg overflow-hidden shrink-0 
                        ${itemIndex % 2 === 0 ? "mt-5" : "mt-0"}`}
                      whileHover={{ scale: 1.05 }}
                      transition={{ duration: 0.3 }}
                    >
                      <div className="relative h-64 w-full shadow-lg">
                        <Image
                          src={item.src}
                          alt={item.alt}
                          fill
                          className="object-cover"
                          loading="lazy"
                        />
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
