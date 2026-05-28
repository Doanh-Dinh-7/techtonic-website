import type { Metadata } from "next";
import { PortfolioContent } from "@/components/portfolio-content";

export const metadata: Metadata = {
  title: "Dự án & thành tích",
  description:
    "Sản phẩm nổi bật, giải thưởng và liên kết mã nguồn GitHub của TechTonic Club.",
};

export default function PortfolioPage() {
  return <PortfolioContent />;
}
