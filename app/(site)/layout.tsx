import type { Metadata } from "next";
import { SiteShell } from "@/components/site-shell";

export const metadata: Metadata = {
  title: {
    default: "TechTonic - Câu lạc bộ Công nghệ",
    template: "%s | TechTonic Club",
  },
  description:
    "Câu lạc bộ công nghệ thông tin — nuôi dưỡng đam mê và kỹ năng chuyên môn tại Đại học Kinh tế Đà Nẵng.",
};

export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SiteShell>{children}</SiteShell>;
}
