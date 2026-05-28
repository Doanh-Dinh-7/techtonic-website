import type { Metadata } from "next";
import { AboutPageSections } from "@/widgets/about/about-page-sections";

export const metadata: Metadata = {
  title: "Giới thiệu",
  description: "Lịch sử, tầm nhìn, sứ mệnh, thư viện ảnh và Ban chủ nhiệm TechTonic Club.",
};

export default function AboutPage() {
  return <AboutPageSections />;
}
