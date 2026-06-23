"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import { useEffect, useMemo, useState } from "react";

import { aboutGalleryCopy } from "@/lib/content/about";
import { SectionShell } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

const galleryItems = {
  row_1: [
    {
      id: "10",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206576/CSLT7_1_e6mce3.webp",
      alt: "Cslt 1",
    },
    {
      id: "11",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206580/tx1_ukiv2f.webp",
      alt: "TechXplore 1",
    },
    {
      id: "12",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206559/CSLT3_3_al7vxr.webp",
      alt: "Cslt 2",
    },
    {
      id: "13",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206575/tx2_mtobag.webp",
      alt: "TechXplore 2",
    },
    {
      id: "14",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206559/CSLT3_1_wlf7dl.webp",
      alt: "Cslt 3",
    },
    {
      id: "15",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206576/tx3_fcyobt.webp",
      alt: "TechXplore 3",
    },
    {
      id: "16",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206556/CSLT7_3_voldl1.webp",
      alt: "Cslt 4",
    },
    {
      id: "17",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206560/tx4_vgbytt.webp",
      alt: "TechXplore 4",
    },
    {
      id: "18",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206554/CSLT7_2_lk8cgv.webp",
      alt: "Cslt 5",
    },
    {
      id: "19",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206577/tx5_brjia6.webp",
      alt: "TechXplore 5",
    },
  ],
  row_2: [
    {
      id: "20",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206560/mm1_bk4o4u.webp",
      alt: "Mentor-Mentee 1",
    },
    {
      id: "21",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206577/mm2_gewykm.webp",
      alt: "Mentor-Mentee 2",
    },
    {
      id: "22",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206557/mm4_fc12rj.webp",
      alt: "Mentor-Mentee 4",
    },
    {
      id: "23",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206572/mm5_elp0af.webp",
      alt: "Mentor-Mentee 5",
    },
    {
      id: "24",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206578/mm6_nvs60b.webp",
      alt: "Mentor-Mentee 6",
    },
    {
      id: "25",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206573/mm7_sxeuow.webp",
      alt: "Mentor-Mentee 7",
    },
    {
      id: "26",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206573/mm8_zcnku6.webp",
      alt: "Mentor-Mentee 8",
    },
    {
      id: "27",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206584/mm9_u8uhve.webp",
      alt: "Mentor-Mentee 9",
    },
  ],
  row_3: [
    {
      id: "30",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206574/ntnm1_p4uehk.webp",
      alt: "Người trong ngành MIS 1",
    },
    {
      id: "31",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206580/ntnm2_pj15jw.webp",
      alt: "Người trong ngành MIS 2",
    },
    {
      id: "32",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206575/ntnm3_fiezhd.webp",
      alt: "Người trong ngành MIS 3",
    },
    {
      id: "33",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206578/tw1_egckia.webp",
      alt: "TechWare 1",
    },
    {
      id: "34",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206561/tw2_plxjv3.webp",
      alt: "TechWare 2",
    },
    {
      id: "35",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206581/tw3_vjo45k.webp",
      alt: "TechWare 3",
    },
    {
      id: "36",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206585/tw4_edkcqy.webp",
      alt: "TechWare 4",
    },
    {
      id: "37",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206582/tw5_wceecw.webp",
      alt: "TechWare 5",
    },
    {
      id: "38",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206583/tw6_mjz94x.webp",
      alt: "TechWare 6",
    },
    {
      id: "39",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206582/tw7_lkrisz.webp",
      alt: "TechWare 7",
    },
    {
      id: "310",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206579/tw8_bb1f0p.webp",
      alt: "TechWare 8",
    },
    {
      id: "311",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206584/tw9_pdf6kh.webp",
      alt: "TechWare 9",
    },
    {
      id: "312",
      src: "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206581/tw10_e2pf3b.webp",
      alt: "TechWare 10",
    },
  ],
};

type GalleryTileProps = {
  item: { id: string; src: string; alt: string };
  staggerClass: string;
};

function GalleryTile({ item, staggerClass }: GalleryTileProps) {
  return (
    <motion.div
      className={cn(
        "relative w-56 shrink-0 overflow-hidden rounded-xl md:w-64 lg:w-72",
        staggerClass
      )}
      whileHover={{ scale: 1.05 }}
      transition={{ duration: 0.3 }}
    >
      <div
        className={cn(
          "v2-glass rounded-xl p-1 transition-shadow duration-300",
          "hover:shadow-[0_0_24px_rgba(0,245,255,0.22)]"
        )}
      >
        <div className="relative h-64 w-full overflow-hidden rounded-lg">
          <Image
            src={item.src}
            alt={item.alt}
            fill
            priority
            className="object-cover opacity-80 transition-opacity duration-300 hover:opacity-100"
            sizes="(max-width: 768px) 224px, (max-width: 1024px) 256px, 288px"
          />
        </div>
      </div>
    </motion.div>
  );
}

export function Gallery() {
  const [animationConfig, setAnimationConfig] = useState<{
    durations: number[];
    widths: number[];
    loaded: boolean;
  }>({ durations: [], widths: [], loaded: false });

  const rows = useMemo(() => Object.values(galleryItems), []);

  useEffect(() => {
    const calculateAnimationDuration = () => {
      const viewportWidth = window.innerWidth;
      let itemWidth: number;
      const spacing = 16;

      if (viewportWidth >= 1024) {
        itemWidth = 288;
      } else if (viewportWidth >= 768) {
        itemWidth = 256;
      } else {
        itemWidth = 224;
      }

      const durations: number[] = [];
      const widths: number[] = [];

      rows.forEach((row) => {
        const totalWidth = row.length * itemWidth + (row.length - 1) * spacing;
        const scrollSpeed = 100;
        const duration = totalWidth / scrollSpeed;
        durations.push(Math.max(10, Math.min(60, duration)));
        widths.push(totalWidth);
      });

      setAnimationConfig({ durations, widths, loaded: true });
    };

    calculateAnimationDuration();
    window.addEventListener("resize", calculateAnimationDuration);
    return () => window.removeEventListener("resize", calculateAnimationDuration);
  }, [rows]);

  return (
    <SectionShell
      id="gallery"
      tone="dark"
      align="center"
      className="overflow-hidden border-t border-white/10 bg-transparent py-16 lg:py-24"
      contentClassName="max-w-7xl"
      badge={aboutGalleryCopy.badge}
      title={aboutGalleryCopy.title}
      description={aboutGalleryCopy.description}
    >
      <div className="relative left-1/2 w-screen -translate-x-1/2">
        {!animationConfig.loaded ? (
          <div className="flex h-64 items-center justify-center">
            <div
              className="h-12 w-12 animate-spin rounded-full border-2 border-white/10 border-t-neon-cyan"
              role="status"
              aria-label="Đang tải thư viện ảnh"
            />
          </div>
        ) : (
          <div className="space-y-8">
            {rows.map((row, rowIndex) => (
              <div key={rowIndex} className="relative overflow-hidden">
                <motion.div
                  className={cn(
                    "flex space-x-4 hover:pause-animation",
                    rowIndex % 2 === 0 ? "scroll-left-dynamic" : "scroll-right-dynamic"
                  )}
                  style={
                    {
                      "--animation-duration": `${animationConfig.durations[rowIndex]}s`,
                      "--total-width": `${animationConfig.widths[rowIndex]}px`,
                    } as React.CSSProperties
                  }
                  initial={{ opacity: 0, y: 24 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.5 }}
                >
                  {row.map((item, itemIndex) => (
                    <GalleryTile
                      key={`first-${item.id}`}
                      item={item}
                      staggerClass={itemIndex % 2 === 0 ? "mt-0" : "mt-5"}
                    />
                  ))}
                  {row.map((item, itemIndex) => (
                    <GalleryTile
                      key={`second-${item.id}`}
                      item={item}
                      staggerClass={itemIndex % 2 === 0 ? "mt-5" : "mt-0"}
                    />
                  ))}
                </motion.div>
              </div>
            ))}
          </div>
        )}
      </div>
    </SectionShell>
  );
}
