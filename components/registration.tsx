"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Code, Loader2 } from "lucide-react";
import { toast } from "@/hooks/use-toast";

export function Registration() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    // Thông tin cơ bản
    fullName: "",
    email: "",
    phone: "",
    studentId: "",
    class: "",
    facebookLink: "",
    gender: "",
    selfDescription: "",

    // Thông tin bổ sung
    questions: "",
    whyJoin: "",
    knowAnyone: "",
    skills: "",
    whyChooseDepartment: "",
    department: "",
  });

  const steps = [
    {
      step: "1",
      title: "Điền form đăng ký",
      desc: "Cung cấp thông tin cơ bản và lĩnh vực quan tâm",
    },
    {
      step: "2",
      title: "Tham gia buổi giới thiệu",
      desc: "Gặp gỡ các thành viên và tìm hiểu hoạt động CLB",
    },
    {
      step: "3",
      title: "Bắt đầu coding",
      desc: "Tham gia các dự án và phát triển kỹ năng",
    },
  ];

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  // Validation cho step 1 (thông tin cơ bản)
  const isStep1Valid = () => {
    return (
      formData.fullName.trim() !== "" &&
      formData.studentId.trim() !== "" &&
      formData.class.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.gender.trim() !== "" &&
      formData.facebookLink.trim() !== "" &&
      formData.selfDescription.trim() !== ""
    );
  };

  // Validation cho step 2 (thông tin bổ sung)
  const isStep2Valid = () => {
    return (
      formData.whyJoin.trim() !== "" &&
      formData.skills.trim() !== "" &&
      formData.department.trim() !== "" &&
      formData.whyChooseDepartment.trim() !== ""
    );
  };

  // Kiểm tra tất cả trường bắt buộc đã được điền
  const isFormComplete = () => {
    return isStep1Valid() && isStep2Valid();
  };

  const nextStep = () => {
    if (currentStep === 1 && isStep1Valid()) {
      setCurrentStep(2);
    }
  };

  const prevStep = () => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const formId = process.env.NEXT_PUBLIC_FORM_ID;
      if (!formId) {
        throw new Error("Form ID không được cấu hình");
      }

      const formUrl = `https://docs.google.com/forms/d/e/${formId}/formResponse`;

      // Tạo form ẩn để submit đến Google Forms
      const hiddenForm = document.createElement("form");
      hiddenForm.action = formUrl;
      hiddenForm.method = "POST";
      hiddenForm.target = "_blank";
      hiddenForm.style.display = "none";

      // Thêm các trường input ẩn
      const fields = {
        "entry.637618999": formData.class,
        "entry.2089236837": formData.studentId,
        "entry.51064004": formData.fullName,
        "entry.411338864": formData.email,
        "entry.1511169545": formData.facebookLink,
        "entry.1869285708": formData.phone,
        "entry.1473075964": formData.selfDescription,
        "entry.1064324060": formData.gender,
        "entry.643542381": formData.questions,
        "entry.861219170": formData.whyJoin,
        "entry.1806566794": formData.skills,
        "entry.508226384": formData.whyChooseDepartment,
        "entry.705796435": formData.department,
        "entry.1701397463": formData.knowAnyone,
      };

      // Thêm các trường vào form
      Object.entries(fields).forEach(([name, value]) => {
        const input = document.createElement("input");
        input.type = "hidden";
        input.name = name;
        input.value = value || "";
        hiddenForm.appendChild(input);
      });

      // Thêm form vào DOM và submit
      document.body.appendChild(hiddenForm);
      hiddenForm.submit();
      document.body.removeChild(hiddenForm);

      // Hiển thị thông báo thành công
      toast({
        title: "Đăng ký thành công!",
        description:
          "Cảm ơn bạn đã đăng ký tham gia TechTonic Club. Chúng tôi sẽ liên hệ với bạn sớm nhất.",
        variant: "success",
      });

      // Reset form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        studentId: "",
        class: "",
        facebookLink: "",
        gender: "",
        selfDescription: "",
        questions: "",
        whyJoin: "",
        knowAnyone: "",
        skills: "",
        whyChooseDepartment: "",
        department: "",
      });
      setCurrentStep(1);
    } catch (error) {
      console.error("Lỗi khi gửi form:", error);
      toast({
        title: "Có lỗi xảy ra",
        description:
          error instanceof Error
            ? error.message
            : "Vui lòng thử lại sau hoặc liên hệ trực tiếp với chúng tôi.",
        variant: "destructive",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      id="registration"
      className="py-20 bg-gradient-to-r from-[#3756a6] to-[#667ee4] text-white"
    >
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          <div className="space-y-4">
            <Badge className="bg-white/20 text-white border-white/30 hover:bg-white/30 hover:text-white">
              Tham gia ngay
            </Badge>
            <h2 className="text-3xl lg:text-4xl font-bold">
              Sẵn sàng bắt đầu hành trình công nghệ
            </h2>
            <p className="text-xl text-blue-100">
              Chỉ cần 3 bước đơn giản để trở thành thành viên của TechTonic Club
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 my-12">
            {steps.map((item, index) => (
              <div key={index} className="text-center space-y-4">
                <div className="w-16 h-16 bg-white/20 rounded-full flex items-center justify-center mx-auto hover:bg-white/30 transition-colors duration-300">
                  <span className="text-2xl font-bold">{item.step}</span>
                </div>
                <h3 className="text-xl font-semibold">{item.title}</h3>
                <p className="text-blue-100">{item.desc}</p>
              </div>
            ))}
          </div>

          <div>
            <Card className="bg-white/10 border-white/20 backdrop-blur-sm">
              <CardHeader>
                <CardTitle className="text-white text-2xl">
                  Đăng ký tham gia TechTonic Club
                </CardTitle>
                <CardDescription className="text-blue-100">
                  Điền đầy đủ thông tin để chúng tôi có thể liên hệ với bạn
                </CardDescription>
              </CardHeader>
              <CardContent>
                {/* Step Indicator */}
                <div className="flex items-center justify-center mb-8">
                  <div className="flex items-center space-x-4">
                    <div
                      className={`flex items-center space-x-2 ${
                        currentStep >= 1 ? "text-white" : "text-white/50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          currentStep >= 1
                            ? "bg-white text-blue-600"
                            : "bg-white/20 text-white/50"
                        }`}
                      >
                        1
                      </div>
                      <span className="text-sm">Thông tin cơ bản</span>
                    </div>
                    <div className="w-8 h-0.5 bg-white/30"></div>
                    <div
                      className={`flex items-center space-x-2 ${
                        currentStep >= 2 ? "text-white" : "text-white/50"
                      }`}
                    >
                      <div
                        className={`w-8 h-8 rounded-full flex items-center justify-center text-sm font-semibold ${
                          currentStep >= 2
                            ? "bg-white text-blue-600"
                            : "bg-white/20 text-white/50"
                        }`}
                      >
                        2
                      </div>
                      <span className="text-sm">Thông tin bổ sung</span>
                    </div>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {/* Step 1: Thông tin cơ bản */}
                  {currentStep === 1 && (
                    <div className="space-y-4 text-left">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="group">
                          <label
                            htmlFor="fullName"
                            className="block text-sm font-medium text-white mb-2"
                          >
                            * Họ và tên
                          </label>
                          <Input
                            id="fullName"
                            placeholder="Nhập họ và tên của bạn"
                            value={formData.fullName}
                            onChange={(e) =>
                              handleInputChange("fullName", e.target.value)
                            }
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-colors duration-200 group-hover:bg-white/15"
                          />
                        </div>

                        <div className="group">
                          <label
                            htmlFor="studentId"
                            className="block text-sm font-medium text-white mb-2"
                          >
                            * Mã số sinh viên
                          </label>
                          <Input
                            id="studentId"
                            placeholder="Nhập mã số sinh viên"
                            value={formData.studentId}
                            onChange={(e) =>
                              handleInputChange("studentId", e.target.value)
                            }
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-colors duration-200 group-hover:bg-white/15"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="group">
                          <label
                            htmlFor="class"
                            className="block text-sm font-medium text-white mb-2"
                          >
                            * Lớp
                          </label>
                          <Input
                            id="class"
                            placeholder="Ví dụ: 48K14.2, 49K14.1..."
                            value={formData.class}
                            onChange={(e) =>
                              handleInputChange("class", e.target.value)
                            }
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-colors duration-200 group-hover:bg-white/15"
                          />
                        </div>

                        <div className="group">
                          <label
                            htmlFor="phone"
                            className="block text-sm font-medium text-white mb-2"
                          >
                            * Số điện thoại
                          </label>
                          <Input
                            id="phone"
                            placeholder="Nhập số điện thoại của bạn"
                            value={formData.phone}
                            onChange={(e) =>
                              handleInputChange("phone", e.target.value)
                            }
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-colors duration-200 group-hover:bg-white/15"
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="group">
                          <label
                            htmlFor="email"
                            className="block text-sm font-medium text-white mb-2"
                          >
                            * Email
                          </label>
                          <Input
                            id="email"
                            type="email"
                            placeholder="Nhập địa chỉ email của bạn"
                            value={formData.email}
                            onChange={(e) =>
                              handleInputChange("email", e.target.value)
                            }
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-colors duration-200 group-hover:bg-white/15"
                          />
                        </div>

                        <div className="group">
                          <label
                            htmlFor="gender"
                            className="block text-sm font-medium text-white mb-2"
                          >
                            * Giới tính
                          </label>
                          <Select
                            value={formData.gender}
                            onValueChange={(value) =>
                              handleInputChange("gender", value)
                            }
                            required
                          >
                            <SelectTrigger
                              id="gender"
                              className="bg-white/10 border-white/20 text-white focus:border-white/50 transition-colors duration-200 group-hover:bg-white/15"
                            >
                              <SelectValue placeholder="Chọn giới tính" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Nam">Nam</SelectItem>
                              <SelectItem value="Nữ">Nữ</SelectItem>
                            </SelectContent>
                          </Select>
                        </div>
                      </div>
                      <div className="group">
                        <label
                          htmlFor="facebookLink"
                          className="block text-sm font-medium text-white mb-2"
                        >
                          * Link Facebook
                        </label>
                        <Input
                          id="facebookLink"
                          placeholder="https://facebook.com/your-profile"
                          value={formData.facebookLink}
                          onChange={(e) =>
                            handleInputChange("facebookLink", e.target.value)
                          }
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-colors duration-200 group-hover:bg-white/15"
                        />
                      </div>

                      <div className="group">
                        <label
                          htmlFor="selfDescription"
                          className="block text-sm font-medium text-white mb-2"
                        >
                          * Miêu tả bản thân
                        </label>
                        <Textarea
                          id="selfDescription"
                          placeholder="Hãy giới thiệu về bản thân, sở thích, mục tiêu..."
                          value={formData.selfDescription}
                          onChange={(e) =>
                            handleInputChange("selfDescription", e.target.value)
                          }
                          required
                          className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-colors duration-200 group-hover:bg-white/15"
                          rows={3}
                        />
                      </div>
                    </div>
                  )}

                  {/* Step 2: Thông tin bổ sung */}
                  {currentStep === 2 && (
                    <div className="space-y-4 text-left">
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="group">
                          <label
                            htmlFor="department"
                            className="block text-sm font-medium text-white mb-2"
                          >
                            * Bạn muốn tham gia vào ban nào nhất
                          </label>
                          <Select
                            value={formData.department}
                            onValueChange={(value) =>
                              handleInputChange("department", value)
                            }
                          >
                            <SelectTrigger
                              id="department"
                              className="bg-white/10 border-white/20 text-white focus:border-white/50 transition-colors duration-200 group-hover:bg-white/15"
                            >
                              <SelectValue placeholder="Chọn ban bạn muốn tham gia" />
                            </SelectTrigger>
                            <SelectContent>
                              <SelectItem value="Ban Sự kiện">
                                Ban Sự kiện
                              </SelectItem>
                              <SelectItem value="Ban Truyền thông">
                                Ban Truyền thông
                              </SelectItem>
                              <SelectItem value="Ban Nhân sự">
                                Ban Nhân sự
                              </SelectItem>
                              <SelectItem value="Ban Chuyên môn">
                                Ban Chuyên môn
                              </SelectItem>
                            </SelectContent>
                          </Select>
                        </div>

                        <div className="group">
                          <label
                            htmlFor="whyChooseDepartment"
                            className="block text-sm font-medium text-white mb-2"
                          >
                            * Lý do chọn ban
                          </label>
                          <Textarea
                            id="whyChooseDepartment"
                            placeholder="Hãy giải thích tại sao bạn chọn ban này và bạn có thể đóng góp gì?"
                            value={formData.whyChooseDepartment}
                            onChange={(e) =>
                              handleInputChange(
                                "whyChooseDepartment",
                                e.target.value
                              )
                            }
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-colors duration-200 group-hover:bg-white/15"
                            rows={2}
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="group">
                          <label
                            htmlFor="skills"
                            className="block text-sm font-medium text-white mb-2"
                          >
                            * Bạn nghĩ mình có kỹ năng/ tố chất gì phù hợp với
                            ban trên
                          </label>
                          <Textarea
                            id="skills"
                            placeholder="Hãy chia sẻ về kỹ năng, kinh nghiệm hoặc điểm mạnh của bạn"
                            value={formData.skills}
                            onChange={(e) =>
                              handleInputChange("skills", e.target.value)
                            }
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-colors duration-200 group-hover:bg-white/15"
                            rows={2}
                          />
                        </div>

                        <div className="group">
                          <label
                            htmlFor="whyJoin"
                            className="block text-sm font-medium text-white mb-2"
                          >
                            * Tại sao bạn muốn trở thành thành viên của
                            TECHTONIC
                          </label>
                          <Textarea
                            id="whyJoin"
                            placeholder="Hãy chia sẻ lý do bạn muốn trở thành thành viên của TechTonic Club"
                            value={formData.whyJoin}
                            onChange={(e) =>
                              handleInputChange("whyJoin", e.target.value)
                            }
                            required
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-colors duration-200 group-hover:bg-white/15"
                            rows={2}
                          />
                        </div>
                      </div>
                      <div className="grid md:grid-cols-2 gap-4">
                        <div className="group">
                          <label
                            htmlFor="knowAnyone"
                            className="block text-sm font-medium text-white mb-2"
                          >
                            Bạn có biết ai hay ấn tượng với ai trong TECHTONIC
                            không
                          </label>
                          <Textarea
                            id="knowAnyone"
                            placeholder="Nếu có thì bạn có thể chia sẻ vì sao bạn biết hay ấn tượng với thành viên đó?"
                            value={formData.knowAnyone}
                            onChange={(e) =>
                              handleInputChange("knowAnyone", e.target.value)
                            }
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-colors duration-200 group-hover:bg-white/15"
                            rows={2}
                          />
                        </div>

                        <div className="group">
                          <label
                            htmlFor="questions"
                            className="block text-sm font-medium text-white mb-2"
                          >
                            Câu hỏi hoặc thắc mắc
                          </label>
                          <Textarea
                            id="questions"
                            placeholder="Bạn còn câu hỏi hay thắc mắc nào không?"
                            value={formData.questions}
                            onChange={(e) =>
                              handleInputChange("questions", e.target.value)
                            }
                            className="bg-white/10 border-white/20 text-white placeholder:text-blue-200 focus:border-white/50 transition-colors duration-200 group-hover:bg-white/15"
                            rows={2}
                          />
                        </div>
                      </div>
                      <div className="space-y-4">
                        <label className="block text-sm font-medium text-white mb-2">
                          * Upload CV và Minh chứng
                        </label>
                        <p className="text-xs text-green-300">
                          ✅<span className="font-semibold">Lưu ý:</span> Ngoài
                          CV, các ứng viên có thể tự do tải lên những tài liệu
                          về các bản thân nhằm giúp chúng mình hiểu rõ hơn về
                          các bạn nhé
                        </p>

                        <p className="text-xs text-yellow-300">
                          ⚠️ <span className="font-semibold">Quan trọng:</span>{" "}
                          File upload sẽ được ghi nhận trong form sau khi bạn
                          gửi đăng ký.
                        </p>
                      </div>
                    </div>
                  )}

                  {/* Navigation Buttons */}
                  <div className="flex justify-between pt-6 border-t border-white/20">
                    {currentStep === 1 ? (
                      <div></div>
                    ) : (
                      <Button
                        type="button"
                        variant="outline"
                        onClick={prevStep}
                        className="bg-white/10 border-white/20 text-white hover:bg-white/20"
                      >
                        Quay lại
                      </Button>
                    )}

                    {currentStep === 1 ? (
                      <Button
                        type="button"
                        onClick={nextStep}
                        disabled={!isStep1Valid()}
                        className="bg-white text-blue-600 hover:bg-blue-50 font-semibold disabled:opacity-50"
                      >
                        Tiếp theo
                      </Button>
                    ) : (
                      <Button
                        type="submit"
                        disabled={!isFormComplete() || isSubmitting}
                        className="bg-white text-blue-600 hover:bg-blue-50 font-semibold disabled:opacity-50"
                      >
                        {isSubmitting ? (
                          <>
                            <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                            Đang gửi...
                          </>
                        ) : (
                          <>
                            <Code className="mr-2 h-5 w-5" />
                            Gửi đăng ký
                          </>
                        )}
                      </Button>
                    )}
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </section>
  );
}
