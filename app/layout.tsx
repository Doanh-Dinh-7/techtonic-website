import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "TechTonic - Câu lạc bộ Công nghệ",
  description:
    "Câu lạc bộ công nghệ thông tin hàng đầu, nơi nuôi dưỡng đam mê và phát triển kỹ năng chuyên môn.",
  generator: "TechTonic",
  icons: "/logo.png",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={inter.className}>
        {children}
        <Analytics />
      </body>
    </html>
  );
}
