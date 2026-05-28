import type { Metadata } from "next";
import { DepartmentsPageContent } from "@/widgets/departments/departments-page-content";

export const metadata: Metadata = {
  title: "Các ban",
  description:
    "Ban Sự kiện, Truyền thông, Nhân sự và Chuyên môn — hoạt động và định hướng từng ban.",
};

export default function DepartmentsPage() {
  return <DepartmentsPageContent />;
}
