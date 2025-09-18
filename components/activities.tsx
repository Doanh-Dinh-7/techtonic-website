"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Badge } from "@/components/ui/badge";
import {
  BookOpenCheck,
  HeartHandshake,
  Trophy,
  LandPlot,
  Presentation,
} from "lucide-react";
import Image from "next/image";

export function Activities() {
  const [currentActivity, setCurrentActivity] = useState(0);

  const activities = [
    {
      title: "Chia sẻ - Hướng dẫn",
      description: (
        <>
          Với tinh thần{" "}
          <em>
            <strong>"Học để chia sẻ – Chia sẻ để phát triển"</strong>
          </em>
          , TechTonic tổ chức các <em>lớp chia sẻ nội bộ</em> hỗ trợ sinh viên
          củng cố kiến thức thực tế, tập trung vào các môn nền tảng như:{" "}
          <strong>Lập trình cơ bản bằng Python</strong>,{" "}
          <strong>Phân tích nghiệp vụ (BA)</strong>,{" "}
          <strong>Cơ sở dữ liệu</strong>, <strong>Lập trình Web (FE/BE)</strong>
          .
        </>
      ),
      image:
        "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206556/cshd_icrmfj.webp",
      icon: BookOpenCheck,
      position: "center",
    },
    {
      title: (
        <>
          Mentor-Mentee{" "}
          <span className="text-sm text-gray-500"> "From Us To You"</span>
        </>
      ),
      description: (
        <>
          Chương trình{" "}
          <em>
            <strong>Mentor–Mentee</strong>
          </em>{" "}
          kết nối <strong>sinh viên năm nhất, năm hai</strong> với{" "}
          <strong>anh chị giàu kinh nghiệm</strong>, tạo{" "}
          <em>không gian học hỏi</em> và <em>định hướng toàn diện</em>. Qua sự{" "}
          <strong>chia sẻ tận tâm</strong>, Mentee được hỗ trợ{" "}
          <strong>học tập, kỹ năng, ngoại khóa</strong> và{" "}
          <em>đời sống sinh viên</em>, mở rộng <strong>quan hệ</strong> và{" "}
          <em>phát triển bản thân bền vững</em>.
        </>
      ),
      image:
        "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206554/mentor_mentee_kjmjqd.webp",
      icon: HeartHandshake,
      position: "center",
    },
    {
      title: (
        <>
          ICPC-OLP, NCKH
          <span className="text-sm text-gray-500"> & Contest</span>
        </>
      ),
      description: (
        <>
          Các thành viên được tham gia <b>ICPC-OLP</b>, <em>Smart Campus</em>,{" "}
          <em>Hackathon</em> và <em>Nghiên cứu khoa học</em>, thử thách bản thân
          qua <strong>coding contest</strong>, rèn luyện{" "}
          <b>tư duy giải quyết vấn đề</b>, <i>tinh thần đồng đội</i> và tích lũy{" "}
          <strong>kinh nghiệm thực chiến</strong> cho{" "}
          <em>hành trình nghề nghiệp công nghệ</em>.
        </>
      ),
      image:
        "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206555/olp_icpc_qlzrul.webp",
      icon: Trophy,
      position: "top center",
    },
    {
      title: "TechWare",
      description: (
        <>
          <strong>TechWare</strong> là <em>chương trình nội bộ biểu tượng</em>{" "}
          của TechTonic, nơi <b>5 đội</b> (Dev, BA, Tester, UX, IT Support) cùng
          vượt <em>thử thách sáng tạo</em>, <i>phá mật thư</i>,{" "}
          <i>truy tìm kho báu</i>. Đây là <strong>sân chơi gắn kết</strong>,
          giúp thành viên <b>thấu hiểu</b>, <b>kết nối</b> và{" "}
          <em>xây dựng cộng đồng bền vững</em>.
        </>
      ),
      image:
        "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206574/techware_qb6urk.webp",
      icon: LandPlot,
      position: "center",
    },
    {
      title: "Người trong ngành MIS",
      description: (
        <>
          {" "}
          Buổi trò chuyện là <strong>cầu nối</strong> giữa{" "}
          <em>anh chị đi trước</em> và <em>sinh viên</em>, chia sẻ đa dạng chủ
          đề từ <b>AI, Chatbot, dữ liệu, công nghệ số</b> đến{" "}
          <b>lập trình, kiểm thử</b>. Qua <em>câu chuyện thực tế</em>, sinh viên
          nhận được <strong>góc nhìn nghề nghiệp</strong>,{" "}
          <b>kỹ năng thiết yếu</b> và <em>định hướng tương lai</em>.
        </>
      ),
      image:
        "https://res.cloudinary.com/dggsvq2tw/image/upload/v1758206555/ntn_mis_g8na7u.webp",
      icon: Presentation,
      position: "bottom center",
    },
  ];

  // Auto-rotate activities
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentActivity((prev) => (prev + 1) % activities.length);
    }, 5000);
    return () => clearInterval(interval);
  }, [activities.length]);

  return (
    <section id="activities" className="py-20">
      <div className="container mx-auto px-4">
        <motion.div
          className="text-center space-y-4 mb-16"
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <Badge className="bg-purple-100 text-purple-700 hover:bg-purple-700 hover:text-purple-100">
            Hoạt động
          </Badge>
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">
            Các hoạt động nổi bật
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Khám phá những chương trình đa dạng và bổ ích của TechTonic Club
          </p>
        </motion.div>

        {/* Activity Carousel */}
        <div className="relative max-w-5xl mx-auto">
          <div className="overflow-hidden rounded-2xl shadow-2xl shadow-purple-200">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentActivity}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
                className="bg-white rounded-2xl overflow-hidden"
              >
                <div className="grid lg:grid-cols-2 ">
                  <div className="relative h-[40vh]">
                    <Image
                      src={
                        activities[currentActivity].image || "/placeholder.svg"
                      }
                      alt={activities[currentActivity].title as string}
                      fill
                      className="object-cover object-center"
                      style={{
                        objectPosition: activities[currentActivity].position,
                      }} // có thể đổi: "top", "bottom", "left", "right"
                    />
                  </div>
                  <div className="p-8 flex flex-col justify-center">
                    <div className="flex items-center gap-3 mb-4">
                      <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center">
                        {React.createElement(activities[currentActivity].icon, {
                          className: "h-6 w-6 text-purple-600",
                        })}
                      </div>
                      <h3 className="text-2xl font-bold text-gray-900">
                        {activities[currentActivity].title}
                      </h3>
                    </div>
                    <p className="text-gray-600 leading-relaxed text-justify">
                      {activities[currentActivity].description}
                    </p>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Activity Indicators */}
          <div className="flex justify-center mt-6 gap-2">
            {activities.map((_, index) => (
              <button
                key={index}
                onClick={() => setCurrentActivity(index)}
                className={`w-3 h-3 rounded-full transition-colors ${
                  index === currentActivity ? "bg-purple-600" : "bg-gray-300"
                }`}
              />
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
