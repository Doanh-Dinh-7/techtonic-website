"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import { FileText, MessageCircle, Code2 } from "lucide-react";

const rounds = [
  {
    icon: FileText,
    title: "Hồ sơ & CV",
    desc: "Nộp form và giới thiệu bản thân, kinh nghiệm hoặc định hướng (nếu có).",
    sample: true,
  },
  {
    icon: MessageCircle,
    title: "Phỏng vấn / gặp gỡ",
    desc: "Trao đổi với ban chủ nhiệm hoặc đại diện ban để hiểu kỳ vọng hai bên.",
    sample: true,
  },
  {
    icon: Code2,
    title: "Bài test kỹ thuật (tuỳ đợt)",
    desc: "Tuỳ Ban Chuyên môn có thể có bài nhỏ hoặc task take-home — không cố định mọi kỳ.",
    sample: true,
  },
];

export function RecruitmentProcessExtra() {
  return (
    <section className="py-16 bg-gray-50 border-y border-gray-100">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center mb-10"
          initial={{ opacity: 0, y: 16 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-3 bg-indigo-100 text-indigo-800">
            Quy trình tuyển chọn
          </Badge>
          <h2 className="text-2xl lg:text-3xl font-bold text-gray-900 font-paris2024">
            Các vòng (tham khảo)
          </h2>
          <p className="text-sm text-gray-600 mt-2 max-w-xl mx-auto">
            Mô tả mang nhãn <span className="text-amber-600">(mẫu)</span> — điều chỉnh
            theo quy chế từng đợt tuyển của CLB.
          </p>
        </motion.div>
        <div className="grid md:grid-cols-3 gap-6 max-w-4xl mx-auto">
          {rounds.map((r, i) => (
            <motion.div
              key={r.title}
              className="bg-white rounded-xl p-6 border border-gray-200 shadow-sm"
              initial={{ opacity: 0, y: 12 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.08 }}
            >
              <div className="w-12 h-12 rounded-lg bg-indigo-100 flex items-center justify-center mb-4">
                <r.icon className="h-6 w-6 text-indigo-700" />
              </div>
              <h3 className="font-semibold text-gray-900 mb-2 flex items-center gap-2">
                {r.title}
                {r.sample && (
                  <span className="text-xs font-normal text-amber-600">(mẫu)</span>
                )}
              </h3>
              <p className="text-sm text-gray-600">{r.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
