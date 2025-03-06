import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

export default function Activities() {
  return (
    <section id="activities" className="py-24 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-16">
          Lĩnh vực hoạt động
        </h2>

        <Tabs defaultValue="programming" className="w-full">
          <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-8">
            <TabsTrigger value="programming">Cơ sở lập trình</TabsTrigger>
            <TabsTrigger value="web">Lập trình web</TabsTrigger>
            <TabsTrigger value="testing">Kiểm thử phần mềm</TabsTrigger>
            <TabsTrigger value="data">Khoa học dữ liệu & AI</TabsTrigger>
          </TabsList>

          <TabsContent value="programming" className="space-y-6">
            <Card>
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

            <Card>
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
                    <span>SQL và các hệ quản trị CSDL: MySQL, PostgreSQL</span>
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
            <Card>
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

            <Card>
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

            <Card>
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
            <Card>
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

            <Card>
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
            <Card>
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

            <Card>
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
    </section>
  );
}
