"use client";

import { motion } from "framer-motion";
import { Facebook, Instagram, Mail, MapPin, Phone, Youtube } from "lucide-react";
import Link from "next/link";
import { SiThreads as Threads } from "react-icons/si";

import { GlassCard, GradientOrb, SectionShell } from "@/shared/ui-v2";

const contactInfo = [
  {
    icon: Mail,
    title: "Email",
    info: "techtonic.clb@gmail.com",
    bgColor: "bg-blue-600",
  },
  {
    icon: Phone,
    title: "Hotline",
    info: "077 249 3327",
    bgColor: "bg-green-600",
  },
  {
    icon: MapPin,
    title: "Địa chỉ",
    info: "71 Ngũ Hành Sơn, Phường Ngũ Hành Sơn, Đà Nẵng, Việt Nam",
    bgColor: "bg-red-600",
  },
];

const socialLinks = [
  {
    icon: Facebook,
    label: "Facebook TechTonic Club",
    bgColor: "bg-blue-600",
    hoverBgColor: "hover:bg-blue-700",
    href: "https://www.facebook.com/TechTonic.Club17",
  },
  {
    icon: Youtube,
    label: "Youtube TechTonic Club",
    bgColor: "bg-red-600",
    hoverBgColor: "hover:bg-red-700",
    href: "https://www.youtube.com/@TechTonicClub-1724",
  },
  {
    icon: Instagram,
    label: "Instagram TechTonic Club",
    bgColor: "bg-pink-600",
    hoverBgColor: "hover:bg-pink-700",
    href: "https://www.instagram.com/techtonic.club",
  },
  {
    icon: Threads,
    label: "Threads TechTonic Club",
    bgColor: "bg-neutral-600",
    hoverBgColor: "hover:bg-neutral-700",
    href: "https://www.threads.com/@techtonic.club",
  },
];

export function Contact() {
  return (
    <SectionShell
      id="contact"
      badge="Liên hệ"
      title="Kết nối với TechTonic Club"
      description="Luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn"
      className="py-20"
      contentClassName="max-w-2xl"
    >
      <GradientOrb className="-left-24 top-0" color="blue" />
      <GradientOrb className="-right-16 bottom-0" color="purple" />

      <motion.div
        initial={{ opacity: 0, y: 50 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        viewport={{ once: true }}
      >
        <GlassCard glow="cyan" className="p-8">
          <div className="space-y-6">
            {contactInfo.map((contact, index) => (
              <motion.div
                key={contact.title}
                className="flex items-center gap-4"
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ delay: index * 0.2, duration: 0.6 }}
                viewport={{ once: true }}
              >
                <motion.div
                  className={`flex h-12 w-12 items-center justify-center rounded-lg ${contact.bgColor}`}
                  whileHover={{
                    scale: 1.1,
                    rotate: 360,
                    transition: { duration: 0.5 },
                  }}
                >
                  <contact.icon className="h-6 w-6" aria-hidden />
                </motion.div>
                <div>
                  <h3 className="font-semibold">{contact.title}</h3>
                  <p className="text-white/70">{contact.info}</p>
                </div>
              </motion.div>
            ))}
          </div>

          <motion.div
            className="mt-8 border-t border-white/20 pt-6"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            viewport={{ once: true }}
          >
            <h3 className="mb-4 font-utm-akashi text-xl font-medium">Theo dõi chúng tôi</h3>
            <div className="flex justify-center gap-4">
              {socialLinks.map((social) => (
                <motion.div
                  key={social.label}
                  whileHover={{
                    y: -5,
                    rotate: [0, -10, 10, -10, 0],
                    transition: { duration: 0.5 },
                  }}
                  whileTap={{ scale: 0.9 }}
                >
                  <Link
                    href={social.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={social.label}
                    className={`flex h-12 w-12 min-h-11 min-w-11 items-center justify-center rounded-lg ${social.bgColor} ${social.hoverBgColor} transition-colors`}
                  >
                    <social.icon className="h-6 w-6" aria-hidden />
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </GlassCard>
      </motion.div>
    </SectionShell>
  );
}
