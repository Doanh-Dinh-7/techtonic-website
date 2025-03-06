import type React from "react";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/navbar";

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
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="vi" className="scroll-smooth">
      <body className={inter.className}>
        <Navbar />
        {children}
      </body>
    </html>
  );
}

import "./globals.css";
