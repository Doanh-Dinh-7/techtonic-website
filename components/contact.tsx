"use client";

import React from "react";
import { motion } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  Mail,
  Phone,
  MapPin,
  Facebook,
  Instagram,
  Youtube,
} from "lucide-react";
import { SiThreads as Threads } from "react-icons/si";
import Link from "next/link";

export function Contact() {
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
      bgColor: "bg-blue-600",
      hoverBgColor: "hover:bg-blue-700",
      href: "https://www.facebook.com/TechTonic.Club17",
    },
    {
      icon: Instagram,
      bgColor: "bg-pink-600",
      hoverBgColor: "hover:bg-pink-700",
      href: "https://www.instagram.com/techtonic.club",
    },
    {
      icon: Threads,
      bgColor: "bg-neutral-600",
      hoverBgColor: "hover:bg-neutral-700",
      href: "https://www.threads.com/@techtonic.club",
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-gray-900 text-white relative overflow-hidden"
    >
      {/* Animated background */}
      <motion.div
        className="absolute inset-0 opacity-10"
        animate={{
          background: [
            "linear-gradient(45deg, #3b82f6, #8b5cf6)",
            "linear-gradient(45deg, #8b5cf6, #3b82f6)",
            "linear-gradient(45deg, #3b82f6, #8b5cf6)",
          ],
        }}
        transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY }}
      />

      <div className="container mx-auto px-4 relative">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:text-white">
            Liên hệ
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold">
            Kết nối với TechTonic Club
          </h2>
          <p className="text-lg text-gray-300 max-w-2xl mx-auto">
            Luôn sẵn sàng hỗ trợ và giải đáp mọi thắc mắc của bạn
          </p>
        </motion.div>

        <div className="max-w-2xl mx-auto">
          <motion.div
            className="bg-white/5 rounded-2xl p-8"
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="space-y-6">
              {contactInfo.map((contact, index) => (
                <motion.div
                  key={index}
                  className="flex items-center gap-4"
                  initial={{ opacity: 0, x: -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.2, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <motion.div
                    className={`w-12 h-12 ${contact.bgColor} rounded-lg flex items-center justify-center`}
                    whileHover={{
                      scale: 1.1,
                      rotate: 360,
                      transition: { duration: 0.5 },
                    }}
                  >
                    {React.createElement(contact.icon, {
                      className: "h-6 w-6",
                    })}
                  </motion.div>
                  <div>
                    <h3 className="font-semibold">{contact.title}</h3>
                    <p className="text-gray-300">{contact.info}</p>
                  </div>
                </motion.div>
              ))}
            </div>

            <motion.div
              className="mt-8 pt-6 border-t border-white/20"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6, duration: 0.6 }}
              viewport={{ once: true }}
            >
              <h3 className="text-xl font-semibold mb-4">Theo dõi chúng tôi</h3>
              <div className="flex gap-4 justify-center">
                {socialLinks.map((social, index) => (
                  <motion.div
                    key={index}
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
                      className={`w-12 h-12 ${social.bgColor} rounded-lg flex items-center justify-center ${social.hoverBgColor} transition-colors`}
                    >
                      {React.createElement(social.icon, {
                        className: "h-6 w-6",
                      })}
                    </Link>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
