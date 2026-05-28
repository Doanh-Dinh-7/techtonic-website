"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { clubTimeline } from "@/lib/content/timeline";
import { History } from "lucide-react";

export function AboutTimeline() {
  return (
    <div className="relative">
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-[#312e81] via-[#6d28d9] to-[#0f766e] text-white">
        <div
          className="pointer-events-none absolute inset-0 opacity-40"
          style={{
            backgroundImage:
              "radial-gradient(circle at 75% 20%, rgba(192,132,252,0.25) 0%, transparent 45%), radial-gradient(circle at 15% 80%, rgba(45,212,191,0.2) 0%, transparent 40%)",
          }}
        />
        <div className="container mx-auto px-4 relative">
          <motion.div
            className="text-center space-y-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <Badge className="bg-violet-400/25 text-white border-violet-200/35 hover:bg-violet-400/35">
              <History className="h-3 w-3 mr-1 inline" />
              Lịch sử hình thành
            </Badge>
            <h1 className="text-3xl lg:text-5xl font-bold font-paris2024 leading-tight drop-shadow-sm">
              Chặng đường phát triển
            </h1>
            <p className="text-violet-100/95 text-sm md:text-base">
              Các mốc dưới đây có nhãn <span className="text-amber-200 font-medium">(mẫu)</span> —
              cập nhật năm và sự kiện chính xác khi có biên bản CLB.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Nội dung timeline */}
      <section className="bg-gray-50 border-b border-gray-100 pb-16 pt-0">
        <div className="container mx-auto px-4 -mt-8 relative z-10">
          <motion.div
            className="max-w-3xl mx-auto bg-white rounded-2xl border border-violet-100/80 shadow-lg shadow-violet-500/10 p-6 md:p-10"
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
          >
            <div className="relative">
              <div className="absolute left-[11px] top-2 bottom-2 w-0.5 bg-gradient-to-b from-violet-500 via-violet-300 to-teal-400 hidden sm:block" />
              <ul className="space-y-8 sm:space-y-10">
                {clubTimeline.map((entry, i) => (
                  <motion.li
                    key={entry.year + entry.title}
                    className="relative sm:pl-10"
                    initial={{ opacity: 0, x: -12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: i * 0.08, duration: 0.45 }}
                  >
                    <span className="hidden sm:flex absolute left-0 top-1.5 w-6 h-6 rounded-full bg-gradient-to-br from-violet-600 to-teal-500 border-4 border-white shadow-md items-center justify-center" />
                    <div className="bg-gradient-to-br from-violet-50/80 to-white rounded-xl p-5 md:p-6 border border-violet-100/90 shadow-sm hover:shadow-md hover:border-teal-200/70 transition-shadow">
                      <div className="flex flex-wrap items-baseline gap-2 mb-2">
                        <span className="text-lg font-bold bg-gradient-to-r from-violet-700 to-teal-600 bg-clip-text text-transparent font-utm-akashi">
                          {entry.year}
                        </span>
                        {entry.isSample && <span className="text-xs text-amber-600">(mẫu)</span>}
                      </div>
                      <h3 className="text-lg font-semibold text-gray-900 mb-2">{entry.title}</h3>
                      <p className="text-gray-600 leading-relaxed text-sm md:text-base">
                        {entry.description}
                      </p>
                    </div>
                  </motion.li>
                ))}
              </ul>
            </div>
          </motion.div>
        </div>
      </section>
    </div>
  );
}
