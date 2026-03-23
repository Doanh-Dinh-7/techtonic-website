"use client";

import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";
import { recruitmentFaq } from "@/lib/content/faq";
import { HelpCircle } from "lucide-react";

export function RecruitmentFaq() {
  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4 max-w-2xl">
        <motion.div
          className="text-center mb-8"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
        >
          <Badge className="mb-3 bg-amber-100 text-amber-900">
            <HelpCircle className="h-3 w-3 mr-1 inline" />
            FAQ
          </Badge>
          <h2 className="text-2xl font-bold text-gray-900 font-paris2024">
            Câu hỏi thường gặp
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Nội dung <span className="text-amber-600">(mẫu)</span> — chỉnh theo quy định
            tuyển thành viên thực tế.
          </p>
        </motion.div>
        <Accordion type="single" collapsible className="w-full">
          {recruitmentFaq.map((item, i) => (
            <AccordionItem key={i} value={`faq-${i}`}>
              <AccordionTrigger className="text-left text-gray-900">
                {item.q}
                {item.isSample && (
                  <span className="ml-2 text-xs text-amber-600 font-normal">(mẫu)</span>
                )}
              </AccordionTrigger>
              <AccordionContent className="text-gray-600 text-sm leading-relaxed">
                {item.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}
