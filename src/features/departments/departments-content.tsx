"use client";

import { motion } from "framer-motion";
import { Card, CardContent } from "@/shared/ui/card";
import { Badge } from "@/shared/ui/badge";
import { Button } from "@/shared/ui/button";
import { departments } from "@/lib/content/departments";
import { LayoutGrid, Users, Megaphone, BookOpen, Briefcase, type LucideIcon } from "lucide-react";
import Link from "next/link";
import { toast } from "@/hooks/use-toast";

const colorMap = {
  blue: {
    bg: "bg-blue-50",
    icon: "text-blue-600",
    badge: "bg-blue-100 text-blue-700",
    dot: "bg-blue-600",
  },
  purple: {
    bg: "bg-purple-50",
    icon: "text-purple-600",
    badge: "bg-purple-100 text-purple-700",
    dot: "bg-purple-600",
  },
  green: {
    bg: "bg-green-50",
    icon: "text-green-600",
    badge: "bg-green-100 text-green-700",
    dot: "bg-green-600",
  },
  orange: {
    bg: "bg-orange-50",
    icon: "text-orange-600",
    badge: "bg-orange-100 text-orange-700",
    dot: "bg-orange-600",
  },
  yellow: {
    bg: "bg-yellow-50",
    icon: "text-yellow-600",
    badge: "bg-yellow-100 text-yellow-700",
    dot: "bg-yellow-600",
  },
  red: {
    bg: "bg-red-50",
    icon: "text-red-600",
    badge: "bg-red-100 text-red-700",
    dot: "bg-red-600",
  },
} as const;

type ColorKey = keyof typeof colorMap;

const deptPresentation: Record<string, { icon: LucideIcon; color: ColorKey; members: string }> = {
  tech: { icon: BookOpen, color: "orange", members: "15 thành viên" },
  media: { icon: Megaphone, color: "green", members: "12 thành viên" },
  hr: { icon: Users, color: "yellow", members: "10 thành viên" },
  events: { icon: Briefcase, color: "red", members: "13 thành viên" },
};

/** Thứ tự hiển thị: Sự kiện → Truyền thông → Nhân sự → Chuyên môn */
const displayOrder = ["events", "media", "hr", "tech"] as const;

export function DepartmentsContent() {
  const ordered = displayOrder
    .map((id) => departments.find((d) => d.id === id))
    .filter(Boolean) as typeof departments;

  const handleLearnMore = () => {
    toast({
      title: "Coming soon!",
      description: "Chúng tôi sẽ cập nhật thông tin sớm nhất có thể.",
      variant: "info",
    });
  };

  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-[#3654a5] via-[#3db4e7] to-[#3ca2d8] text-white">
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center space-y-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-white/20 text-white border-white/30">
              <LayoutGrid className="h-3 w-3 mr-1 inline" />
              Các ban
            </Badge>
            <h1 className="text-3xl lg:text-5xl font-bold font-paris2024">
              Hoạt động theo từng mảng
            </h1>
            <p className="text-blue-50 text-sm md:text-base">
              Khám phá các lĩnh vực và chọn ban phù hợp. Mô tả mang nhãn{" "}
              <span className="text-amber-200">(mẫu)</span> — chỉnh theo đặc thù từng kỳ.
            </p>
          </motion.div>
        </div>
      </section>

      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <div className="grid md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {ordered.map((dept, index) => {
              const meta = deptPresentation[dept.id];
              if (!meta) return null;
              const Icon = meta.icon;
              const colors = colorMap[meta.color];

              return (
                <motion.div
                  key={dept.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <Card
                    className={`h-full hover:shadow-xl transition-shadow border-gray-200/80 ${colors.bg}`}
                  >
                    <CardContent className="p-6 md:p-8 space-y-6">
                      <div className="flex items-start justify-between gap-3">
                        <div className="space-y-2 min-w-0">
                          <div className="flex items-center gap-3 flex-wrap">
                            <Icon className={`h-8 w-8 shrink-0 ${colors.icon}`} />
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                              {dept.name}
                            </h3>
                            {dept.isSample && (
                              <span className="text-xs text-amber-800 font-normal">(mẫu)</span>
                            )}
                          </div>
                          <p className="text-gray-600 text-sm md:text-base leading-relaxed">
                            {dept.description}
                          </p>
                        </div>
                      </div>

                      <Badge className={colors.badge}>
                        {meta.members} <span className="opacity-80 font-normal">(mẫu)</span>
                      </Badge>

                      <div className="space-y-3">
                        <h4 className="font-semibold text-gray-900">Nhiệm vụ chính:</h4>
                        <ul className="space-y-2">
                          {dept.highlights.map((resp) => (
                            <li key={resp} className="flex items-start gap-3">
                              <span
                                className={`h-2 w-2 rounded-full mt-2 shrink-0 ${colors.dot}`}
                              />
                              <span className="text-gray-700 text-sm md:text-base">{resp}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.02 }}
                        whileTap={{ scale: 0.98 }}
                        onClick={handleLearnMore}
                        className={`w-full py-3 rounded-lg font-medium ${colors.badge} hover:opacity-90 transition-opacity`}
                      >
                        Tìm hiểu thêm
                      </motion.button>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="flex justify-center mt-12">
            <Button
              asChild
              variant="outline"
              size="lg"
              className="bg-white text-blue-600 hover:bg-blue-50 font-semibold"
            >
              <Link href="/recruitment">Đăng ký tham gia CLB</Link>
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
