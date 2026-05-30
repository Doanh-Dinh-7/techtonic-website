"use client";

import { motion } from "framer-motion";
import { Badge } from "@/shared/ui/badge";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/shared/ui/card";
import { Button } from "@/shared/ui/button";
import { featuredProjects } from "@/lib/content/projects";
import { clubAwards } from "@/lib/content/awards";
import { Trophy, Github, ExternalLink } from "lucide-react";
import Link from "next/link";

const githubOrg = process.env.NEXT_PUBLIC_GITHUB_ORG || "https://github.com/techtonic-club";

export function PortfolioContent() {
  return (
    <div className="min-h-screen bg-white pb-20">
      <section className="relative py-16 overflow-hidden bg-gradient-to-br from-slate-900 via-[#3654a5] to-[#3db4e7] text-white">
        <div className="container mx-auto px-4">
          <motion.div
            className="text-center space-y-4 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
          >
            <Badge className="bg-white/15 text-white border-white/25">
              <Trophy className="h-3 w-3 mr-1 inline" />
              Dự án &amp; Thành tích
            </Badge>
            <h1 className="text-3xl lg:text-5xl font-bold font-paris2024">Bảng vàng CLB</h1>
            <p className="text-blue-100 text-sm">
              Sản phẩm và giải thưởng có mục <span className="text-amber-200">(mẫu)</span> — bổ sung
              link repo và hình ảnh thật sau.
            </p>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto px-4 py-16 space-y-20">
        <section>
          <h2 className="text-2xl font-bold text-gray-900 font-paris2024 mb-8 text-center">
            Sản phẩm nổi bật
          </h2>
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            {featuredProjects.map((p, i) => (
              <motion.div
                key={p.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.06 }}
              >
                <Card className="h-full border-gray-200">
                  <CardHeader>
                    <div className="flex justify-between items-start gap-2">
                      <CardTitle className="text-lg">{p.title}</CardTitle>
                      {p.isSample && <span className="text-xs text-amber-800 shrink-0">(mẫu)</span>}
                    </div>
                    <CardDescription>{p.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-3">
                    <div className="flex flex-wrap gap-2">
                      {p.stack.map((s) => (
                        <Badge key={s} variant="secondary">
                          {s}
                        </Badge>
                      ))}
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {p.demoUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <Link href={p.demoUrl}>
                            <ExternalLink className="h-4 w-4 mr-1" />
                            Demo
                          </Link>
                        </Button>
                      )}
                      {p.repoUrl && (
                        <Button variant="outline" size="sm" asChild>
                          <a href={p.repoUrl} target="_blank" rel="noopener noreferrer">
                            <Github className="h-4 w-4 mr-1" />
                            Mã nguồn
                          </a>
                        </Button>
                      )}
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-bold text-gray-900 font-paris2024 mb-8 text-center">
            Giải thưởng &amp; cuộc thi
          </h2>
          <ul className="max-w-2xl mx-auto space-y-4">
            {clubAwards.map((a, i) => (
              <motion.li
                key={a.id}
                className="bg-gray-50 rounded-xl p-6 border border-gray-100"
                initial={{ opacity: 0, x: -12 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.05 }}
              >
                <div className="flex flex-wrap items-baseline gap-2 mb-1">
                  <span className="font-semibold text-gray-900">{a.name}</span>
                  <span className="text-sm text-blue-600">{a.year}</span>
                  {a.isSample && <span className="text-xs text-amber-800">(mẫu)</span>}
                </div>
                {a.detail && <p className="text-gray-600 text-sm">{a.detail}</p>}
              </motion.li>
            ))}
          </ul>
        </section>

        <section className="max-w-xl mx-auto text-center bg-gradient-to-br from-gray-900 to-[#3654a5] rounded-2xl p-10 text-white">
          <Github className="h-10 w-10 mx-auto mb-4 opacity-90" />
          <h2 className="text-xl font-bold font-paris2024 mb-2">Kho mã nguồn</h2>
          <p className="text-blue-100 text-sm mb-6">
            GitHub tổ chức chung của CLB (cấu hình qua{" "}
            <code className="text-xs bg-white/10 px-1 rounded">NEXT_PUBLIC_GITHUB_ORG</code>
            ). Link mẫu nếu chưa tạo org.
          </p>
          <Button asChild className="bg-white text-blue-700 hover:bg-blue-50">
            <a href={githubOrg} target="_blank" rel="noopener noreferrer">
              <Github className="h-4 w-4 mr-2" />
              Mở GitHub
            </a>
          </Button>
        </section>
      </div>
    </div>
  );
}
