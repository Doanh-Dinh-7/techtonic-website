"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import Link from "next/link";
import { Newspaper, ArrowRight } from "lucide-react";
import { featuredNews } from "@/lib/content/news";

export function FeaturedNews() {
  return (
    <section id="news" className="py-20 bg-white">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-4 mb-12"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-slate-100 text-slate-700">
            <Newspaper className="h-3 w-3 mr-1 inline" />
            Tin nổi bật
          </Badge>
          <h2 className="text-3xl lg:text-5xl font-bold text-gray-900 font-paris2024">
            Cập nhật mới nhất
          </h2>
          <p className="text-gray-600 max-w-2xl mx-auto text-sm">
            Một số mục mang nhãn <span className="text-amber-600">(mẫu)</span> —
            thay nội dung và liên kết thật khi CLB công bố chính thức.
          </p>
        </motion.div>

        <div className="grid md:grid-cols-3 gap-8">
          {featuredNews.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.08, duration: 0.5 }}
              viewport={{ once: true }}
            >
              <Card className="h-full border-gray-200 hover:shadow-md transition-shadow">
                <CardHeader>
                  <div className="flex items-center justify-between gap-2 mb-1">
                    {item.badge && (
                      <Badge variant="secondary" className="text-xs">
                        {item.badge}
                      </Badge>
                    )}
                    {item.isSample && (
                      <span className="text-xs text-amber-600">(mẫu)</span>
                    )}
                  </div>
                  <CardTitle className="text-lg leading-snug">{item.title}</CardTitle>
                  <CardDescription>{item.date}</CardDescription>
                </CardHeader>
                <CardContent className="space-y-4">
                  <p className="text-gray-600 text-sm">{item.excerpt}</p>
                  {item.href.startsWith("http") || item.external ? (
                    <a
                      href={item.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center text-blue-600 text-sm font-medium hover:underline"
                    >
                      Xem thêm <ArrowRight className="ml-1 h-4 w-4" />
                    </a>
                  ) : item.href === "#" ? (
                    <span className="text-sm text-gray-400">Liên kết sẽ cập nhật</span>
                  ) : (
                    <Link
                      href={item.href}
                      className="inline-flex items-center text-blue-600 text-sm font-medium hover:underline"
                    >
                      Xem thêm <ArrowRight className="ml-1 h-4 w-4" />
                    </Link>
                  )}
                </CardContent>
              </Card>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
