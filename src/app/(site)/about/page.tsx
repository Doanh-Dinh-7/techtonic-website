import type { Metadata } from "next";
import { AboutTimeline } from "@/components/about-timeline";
import { About } from "@/components/about";
import { Gallery } from "@/components/gallery";
import { Team } from "@/components/team";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description:
    "Lịch sử, tầm nhìn, sứ mệnh, thư viện ảnh và Ban chủ nhiệm TechTonic Club.",
};

export default function AboutPage() {
  return (
    <>
      <AboutTimeline />
      <About />
      <Gallery />
      <Team />
    </>
  );
}
