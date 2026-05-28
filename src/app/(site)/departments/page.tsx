import type { Metadata } from "next";
import { DepartmentsContent } from "@/components/departments-content";

export const metadata: Metadata = {
  title: "Các ban",
  description:
    "Ban Sự kiện, Truyền thông, Nhân sự và Chuyên môn — hoạt động và định hướng từng ban.",
};

export default function DepartmentsPage() {
  return <DepartmentsContent />;
}
