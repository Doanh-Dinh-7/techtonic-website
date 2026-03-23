"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";

const links = [
  { name: "Trang chủ", href: "/" },
  { name: "Giới thiệu", href: "/about" },
  { name: "Các ban", href: "/departments" },
  { name: "Dự án", href: "/portfolio" },
  { name: "Sự kiện", href: "/events" },
  { name: "Tuyển thành viên", href: "/recruitment" },
];

export function Footer() {
  return (
    <footer className="bg-gray-950 text-gray-400 py-10">
      <div className="container mx-auto px-4">
        <div className="flex flex-col lg:flex-row justify-between items-center gap-8">
          <motion.div
            className="flex items-center gap-2"
            whileHover={{ scale: 1.05 }}
          >
            <Link href="/" className="flex items-center gap-2">
              <Image
                src="/element/logo_white.png"
                alt="TechTonic Club"
                width={13}
                height={400}
                className="object-cover h-8"
              />
              <span className="font-semibold text-white font-paris2024 text-sm leading-none">
                TECH <br />
                TONIC
              </span>
            </Link>
          </motion.div>

          <nav className="flex flex-wrap justify-center gap-x-6 gap-y-2 text-sm">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                className="hover:text-white transition-colors"
              >
                {l.name}
              </Link>
            ))}
          </nav>

          <p className="text-sm text-center lg:text-right">
            © {new Date().getFullYear()} TechTonic Club. Tất cả quyền được bảo
            lưu.
          </p>
        </div>
      </div>
    </footer>
  );
}
