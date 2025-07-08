"use client";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useIntersectionObserver } from "@/hooks/use-intersection-observer";

export default function Activities() {
  const { ref, hasIntersected } = useIntersectionObserver();

  return (
    <section id="activities" className="py-20 bg-white" ref={ref}>
      <div className="container mx-auto px-4">
        <h2
          className={`text-3xl md:text-4xl font-bold text-center mb-16 transition-all duration-1000 ${
            hasIntersected
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          Lĩnh vực hoạt động
        </h2>

        <div
          className={`transition-all duration-1000 delay-300 ${
            hasIntersected
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <Tabs defaultValue="programming" className="w-full">
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
              <TabsTrigger
                value="programming"
                className="transition-all hover:scale-105"
              >
                Cơ sở lập trình
              </TabsTrigger>
              <TabsTrigger
                value="web"
                className="transition-all hover:scale-105"
              >
                Lập trình web
              </TabsTrigger>
              <TabsTrigger
                value="testing"
                className="transition-all hover:scale-105"
              >
                Kiểm thử phần mềm
              </TabsTrigger>
              <TabsTrigger
                value="data"
                className="transition-all hover:scale-105"
              >
                Khoa học dữ liệu & AI
              </TabsTrigger>
            </TabsList>

            <TabsContent value="programming" className="space-y-6">
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle>Cơ sở lập trình</CardTitle>
                  <CardDescription>
                    Nền tảng cho mọi kỹ năng công nghệ
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Ngôn ngữ lập trình: C/C++, Java, Python</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Cấu trúc dữ liệu và giải thuật</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Lập trình hướng đối tượng</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle>Cơ sở dữ liệu</CardTitle>
                  <CardDescription>
                    Quản lý và xử lý dữ liệu hiệu quả
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>
                        SQL và các hệ quản trị CSDL: MySQL, PostgreSQL
                      </span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>NoSQL: MongoDB, Redis</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Thiết kế và tối ưu hóa cơ sở dữ liệu</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="web" className="space-y-6">
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle>Back-end</CardTitle>
                  <CardDescription>
                    Xây dựng nền tảng vững chắc cho ứng dụng web
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Node.js, Express, NestJS</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Java Spring Boot</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>API Development & RESTful Services</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle>Front-end</CardTitle>
                  <CardDescription>
                    Tạo giao diện người dùng hiện đại và trải nghiệm tuyệt vời
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>HTML, CSS, JavaScript</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>React, Vue, Angular</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Responsive Design & UI/UX Principles</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle>Phân tích nghiệp vụ</CardTitle>
                  <CardDescription>
                    Hiểu rõ yêu cầu để xây dựng giải pháp phù hợp
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Thu thập và phân tích yêu cầu</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Thiết kế hệ thống và kiến trúc phần mềm</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Agile & Scrum methodology</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="testing" className="space-y-6">
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle>Manual Testing</CardTitle>
                  <CardDescription>Đảm bảo chất lượng phần mềm</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Kiểm thử chức năng, UI/UX</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Kiểm thử hiệu năng và bảo mật</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Quản lý lỗi và báo cáo kiểm thử</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle>Automation Testing</CardTitle>
                  <CardDescription>
                    Tự động hóa quy trình kiểm thử
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Selenium, Cypress, Playwright</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>API Testing: Postman, RestAssured</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>CI/CD và Testing trong DevOps</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>

            <TabsContent value="data" className="space-y-6">
              <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle>Data Analyst</CardTitle>
                  <CardDescription>Khai phá giá trị từ dữ liệu</CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Thu thập và xử lý dữ liệu</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Phân tích thống kê và trực quan hóa dữ liệu</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Công cụ: Python, R, SQL, Power BI, Tableau</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>

              <Card className="hover:shadow-lg transition-all duration-300 transform hover:scale-[1.02]">
                <CardHeader>
                  <CardTitle>AI Engineer</CardTitle>
                  <CardDescription>
                    Xây dựng các giải pháp trí tuệ nhân tạo
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Machine Learning & Deep Learning</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Natural Language Processing</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Computer Vision</span>
                    </li>
                    <li className="flex items-start">
                      <span className="font-semibold mr-2">•</span>
                      <span>Frameworks: TensorFlow, PyTorch, scikit-learn</span>
                    </li>
                  </ul>
                </CardContent>
              </Card>
            </TabsContent>
          </Tabs>
        </div>
      </div>
    </section>
  );
}
