import type { Metadata } from "next";
import { PortfolioPageContent } from "@/widgets/portfolio/portfolio-page-content";

export const metadata: Metadata = {
  title: "Dự án & thành tích",
  description: "Sản phẩm nổi bật, giải thưởng và liên kết mã nguồn GitHub của TechTonic Club.",
};

export default function PortfolioPage() {
  return <PortfolioPageContent />;
}
