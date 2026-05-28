"use client";

import { motion } from "framer-motion";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardHeader, CardTitle } from "@/shared/ui/card";
import { upcomingWorkshops } from "@/lib/content/events";
import { techBlogTeasers } from "@/lib/content/blog-posts";
import { Calendar, PartyPopper, BookOpen } from "lucide-react";
import Link from "next/link";

function formatDate(iso: string) {
  try {
    return new Date(iso).toLocaleString("vi-VN", {
      weekday: "short",
      day: "numeric",
      month: "long",
      year: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  } catch {
    return iso;
  }
}

export function EventsContent() {
  return (
    <div className="min-h-screen bg-gray-50 pb-20">
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-emerald-900 via-[#3654a5] to-cyan-600 text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center space-y-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-white/15 text-white border-white/25">
              <Calendar className="h-3 w-3 mr-1 inline" />
              Sự kiện &amp; Hoạt động
            </Badge>
            <h1 className="text-3xl lg:text-5xl font-bold font-paris2024">
              Lịch trình &amp; cộng đồng
            </h1>
            <p className="text-emerald-100 text-sm">
              Workshop, kỷ niệm cuộc thi nội bộ và blog công nghệ — một phần là{" "}
              <span className="text-amber-200">(mẫu)</span>.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-20">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 font-paris2024 mb-2 flex items-center justify-center gap-2">
            <Calendar className="h-7 w-7 text-blue-600" />
            Lịch workshop &amp; seminar
          </h2>
          <p className="text-center text-gray-600 text-sm mb-10 max-w-xl mx-auto">
            Cập nhật lịch thật trên fanpage / nhóm CLB khi có thông báo chính thức.
          </p>
          <div className="grid md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {upcomingWorkshops.map((e, i) => (
              <motion.div
                key={e.id}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="h-full border-gray-200">
                  <CardHeader>
                    <div className="flex justify-between gap-2">
                      <CardTitle className="text-lg">{e.title}</CardTitle>
                      {e.isSample && <span className="text-xs text-amber-600 shrink-0">(mẫu)</span>}
                    </div>
                    <p className="text-sm text-blue-600 font-medium">{formatDate(e.date)}</p>
                  </CardHeader>
                  <CardContent className="text-gray-600 text-sm space-y-2">
                    {e.location && <p>📍 {e.location}</p>}
                    {e.description && <p>{e.description}</p>}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 font-paris2024 mb-2 flex items-center justify-center gap-2">
            <PartyPopper className="h-7 w-7 text-amber-500" />
            Cuộc thi nội bộ &amp; kỷ niệm
          </h2>
          <p className="text-center text-gray-600 text-sm mb-8 max-w-xl mx-auto">
            Album ảnh chính nằm ở trang Giới thiệu (thư viện). Tại đây có thể thêm recap từng mùa
            giải khi CLB soạn nội dung.
          </p>
          <div className="max-w-2xl mx-auto bg-white rounded-xl border border-dashed border-gray-300 p-10 text-center text-gray-500 text-sm">
            (Mẫu) Khu vực dành cho mô tả cuộc thi nội bộ, đội thắng cuộc và hình ảnh — thêm khi có
            dữ liệu.
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 font-paris2024 mb-8 flex items-center justify-center gap-2">
            <BookOpen className="h-7 w-7 text-purple-600" />
            Blog công nghệ
          </h2>
          <div className="grid md:grid-cols-3 gap-6 max-w-5xl mx-auto">
            {techBlogTeasers.map((b, i) => (
              <motion.div
                key={b.id}
                initial={{ opacity: 0, y: 12 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <Card className="h-full border-gray-200 hover:shadow-md transition-shadow">
                  <CardHeader>
                    <div className="flex justify-between gap-2">
                      <CardTitle className="text-base leading-snug">{b.title}</CardTitle>
                      {b.isSample && <span className="text-xs text-amber-600 shrink-0">(mẫu)</span>}
                    </div>
                    {b.date && <p className="text-xs text-gray-500">{b.date}</p>}
                  </CardHeader>
                  <CardContent className="text-sm text-gray-600">
                    <p className="mb-4">{b.excerpt}</p>
                    {b.href !== "#" ? (
                      <Link href={b.href} className="text-blue-600 font-medium hover:underline">
                        Đọc thêm
                      </Link>
                    ) : (
                      <span className="text-gray-400">Bài đăng sẽ cập nhật</span>
                    )}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
