"use client";

import { motion } from "framer-motion";
import { Code, Loader2 } from "lucide-react";

import { useRegistrationForm } from "@/features/recruitment/hooks/use-registration-form";
import {
  recruitmentDepartments,
  recruitmentRegistrationCopy,
  recruitmentSteps,
} from "@/lib/content/recruitment";
import { Input } from "@/shared/ui/input";
import { Textarea } from "@/shared/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/shared/ui/select";
import { GlassCard, NeonButton, SectionShell } from "@/shared/ui-v2";
import { cn } from "@/shared/utils";

const formFieldClass = cn(
  "border-border bg-background/80 text-foreground placeholder:text-muted-foreground/70",
  "focus-visible:border-neon-cyan/50 focus-visible:ring-neon-cyan/20",
  "dark:border-white/10 dark:bg-white/[0.06] dark:text-white dark:placeholder:text-white/40"
);

const selectContentClass =
  "border-border bg-popover text-popover-foreground dark:border-white/10 dark:bg-[#141414] dark:text-white";

const labelClass = "mb-2 block text-sm font-medium text-foreground dark:text-white/90";

export function Registration() {
  const {
    currentStep,
    formData,
    handleInputChange,
    handleSubmit,
    isFormComplete,
    isStep1Valid,
    isSubmitting,
    nextStep,
    prevStep,
  } = useRegistrationForm();

  return (
    <SectionShell
      id="registration"
      tone="dark"
      align="center"
      className="border-b border-white/10 bg-transparent pt-28"
      contentClassName="max-w-4xl"
    >
      <div className="mb-12 space-y-4 text-center">
        <span
          className={cn(
            "inline-block rounded-full border border-cyan-400/25 bg-cyan-400/10 px-4 py-2",
            "font-utm-akashi text-sm uppercase tracking-widest text-cyan-800",
            "dark:border-neon-cyan/10 dark:bg-neon-cyan/10 dark:text-neon-cyan"
          )}
        >
          {recruitmentRegistrationCopy.badge}
        </span>
        <h2
          className={cn(
            "font-paris2024 text-3xl font-bold tracking-tight sm:text-5xl",
            "bg-gradient-to-r from-neon-cyan to-neon-purple bg-clip-text text-transparent"
          )}
        >
          {recruitmentRegistrationCopy.title}
        </h2>
        <p className="text-lg leading-relaxed text-muted-foreground dark:text-white/68">
          {recruitmentRegistrationCopy.description}
        </p>
      </div>

      <div className="mb-12 grid gap-6 md:grid-cols-3">
        {recruitmentSteps.map((item, index) => (
          <motion.div
            key={item.step}
            className="rounded-xl border border-border bg-card/90 p-6 text-center shadow-sm dark:border-white/10 dark:bg-white/[0.03]"
            initial={{ opacity: 0, y: 12 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: index * 0.08 }}
          >
            <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-neon-cyan/10">
              <span className="font-paris2024 text-xl font-bold text-neon-cyan">{item.step}</span>
            </div>
            <h3 className="mb-2 font-utm-akashi text-lg text-foreground dark:text-white">
              {item.title}
            </h3>
            <p className="text-sm leading-relaxed text-muted-foreground dark:text-white/65">
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      <GlassCard glow="cyan" className="p-6 lg:p-8">
        <div className="mb-8 space-y-2 text-center">
          <h3 className="font-utm-akashi text-2xl text-foreground dark:text-white">
            {recruitmentRegistrationCopy.formTitle}
          </h3>
          <p className="text-sm text-muted-foreground dark:text-white/65">
            {recruitmentRegistrationCopy.formDescription}
          </p>
        </div>

        <div
          className="mb-8 flex items-center justify-center"
          role="group"
          aria-label="Tiến trình đăng ký"
        >
          <div className="flex items-center space-x-4">
            <div
              className={cn(
                "flex items-center space-x-2",
                currentStep >= 1
                  ? "text-foreground dark:text-white"
                  : "text-muted-foreground dark:text-white/50"
              )}
              aria-current={currentStep === 1 ? "step" : undefined}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                  currentStep >= 1
                    ? "bg-neon-cyan text-black"
                    : "bg-secondary text-muted-foreground dark:bg-white/10 dark:text-white/50"
                )}
              >
                1
              </div>
              <span className="text-sm">Thông tin cơ bản</span>
            </div>
            <div className="h-0.5 w-8 bg-border dark:bg-white/20" />
            <div
              className={cn(
                "flex items-center space-x-2",
                currentStep >= 2
                  ? "text-foreground dark:text-white"
                  : "text-muted-foreground dark:text-white/50"
              )}
              aria-current={currentStep === 2 ? "step" : undefined}
            >
              <div
                className={cn(
                  "flex h-8 w-8 items-center justify-center rounded-full text-sm font-semibold",
                  currentStep >= 2
                    ? "bg-neon-cyan text-black"
                    : "bg-secondary text-muted-foreground dark:bg-white/10 dark:text-white/50"
                )}
              >
                2
              </div>
              <span className="text-sm">Thông tin bổ sung</span>
            </div>
          </div>
        </div>

        <p className="sr-only" aria-live="polite" aria-atomic="true">
          {currentStep === 1 ? "Bước 1: Thông tin cơ bản" : "Bước 2: Thông tin bổ sung"}
        </p>

        <form
          onSubmit={handleSubmit}
          className="space-y-6"
          aria-label="Form đăng ký tham gia TechTonic Club"
        >
          {currentStep === 1 && (
            <div className="space-y-4 text-left">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="fullName" className={labelClass}>
                    * Họ và tên
                  </label>
                  <Input
                    id="fullName"
                    placeholder="Nhập họ và tên của bạn"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    required
                    className={formFieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="studentId" className={labelClass}>
                    * Mã số sinh viên
                  </label>
                  <Input
                    id="studentId"
                    placeholder="Nhập mã số sinh viên"
                    value={formData.studentId}
                    onChange={(e) => handleInputChange("studentId", e.target.value)}
                    required
                    className={formFieldClass}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="class" className={labelClass}>
                    * Lớp
                  </label>
                  <Input
                    id="class"
                    placeholder="Ví dụ: 48K14.2, 49K14.1..."
                    value={formData.class}
                    onChange={(e) => handleInputChange("class", e.target.value)}
                    required
                    className={formFieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="phone" className={labelClass}>
                    * Số điện thoại
                  </label>
                  <Input
                    id="phone"
                    placeholder="Nhập số điện thoại của bạn"
                    value={formData.phone}
                    onChange={(e) => handleInputChange("phone", e.target.value)}
                    required
                    className={formFieldClass}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="email" className={labelClass}>
                    * Email
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="Nhập địa chỉ email của bạn"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    required
                    className={formFieldClass}
                  />
                </div>
                <div>
                  <label htmlFor="gender" className={labelClass}>
                    * Giới tính
                  </label>
                  <Select
                    value={formData.gender}
                    onValueChange={(value) => handleInputChange("gender", value)}
                    required
                  >
                    <SelectTrigger id="gender" className={formFieldClass}>
                      <SelectValue placeholder="Chọn giới tính" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      <SelectItem value="Nam">Nam</SelectItem>
                      <SelectItem value="Nữ">Nữ</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div>
                <label htmlFor="facebookLink" className={labelClass}>
                  * Link Facebook
                </label>
                <Input
                  id="facebookLink"
                  placeholder="https://facebook.com/your-profile"
                  value={formData.facebookLink}
                  onChange={(e) => handleInputChange("facebookLink", e.target.value)}
                  required
                  className={formFieldClass}
                />
              </div>
              <div>
                <label htmlFor="selfDescription" className={labelClass}>
                  * Miêu tả bản thân
                </label>
                <Textarea
                  id="selfDescription"
                  placeholder="Hãy giới thiệu về bản thân, sở thích, mục tiêu..."
                  value={formData.selfDescription}
                  onChange={(e) => handleInputChange("selfDescription", e.target.value)}
                  required
                  className={formFieldClass}
                  rows={3}
                />
              </div>
            </div>
          )}

          {currentStep === 2 && (
            <div className="space-y-4 text-left">
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="department" className={labelClass}>
                    * Bạn muốn tham gia vào ban nào nhất
                  </label>
                  <Select
                    value={formData.department}
                    onValueChange={(value) => handleInputChange("department", value)}
                  >
                    <SelectTrigger id="department" className={formFieldClass}>
                      <SelectValue placeholder="Chọn ban bạn muốn tham gia" />
                    </SelectTrigger>
                    <SelectContent className={selectContentClass}>
                      {recruitmentDepartments.map((dept) => (
                        <SelectItem key={dept} value={dept}>
                          {dept}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div>
                  <label htmlFor="whyChooseDepartment" className={labelClass}>
                    * Lý do chọn ban
                  </label>
                  <Textarea
                    id="whyChooseDepartment"
                    placeholder="Hãy giải thích tại sao bạn chọn ban này và bạn có thể đóng góp gì?"
                    value={formData.whyChooseDepartment}
                    onChange={(e) => handleInputChange("whyChooseDepartment", e.target.value)}
                    required
                    className={formFieldClass}
                    rows={2}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="skills" className={labelClass}>
                    * Bạn nghĩ mình có kỹ năng/ tố chất gì phù hợp với ban trên
                  </label>
                  <Textarea
                    id="skills"
                    placeholder="Hãy chia sẻ về kỹ năng, kinh nghiệm hoặc điểm mạnh của bạn"
                    value={formData.skills}
                    onChange={(e) => handleInputChange("skills", e.target.value)}
                    required
                    className={formFieldClass}
                    rows={2}
                  />
                </div>
                <div>
                  <label htmlFor="whyJoin" className={labelClass}>
                    * Tại sao bạn muốn trở thành thành viên của TECHTONIC
                  </label>
                  <Textarea
                    id="whyJoin"
                    placeholder="Hãy chia sẻ lý do bạn muốn trở thành thành viên của TechTonic Club"
                    value={formData.whyJoin}
                    onChange={(e) => handleInputChange("whyJoin", e.target.value)}
                    required
                    className={formFieldClass}
                    rows={2}
                  />
                </div>
              </div>
              <div className="grid gap-4 md:grid-cols-2">
                <div>
                  <label htmlFor="knowAnyone" className={labelClass}>
                    Bạn có biết ai hay ấn tượng với ai trong TECHTONIC không
                  </label>
                  <Textarea
                    id="knowAnyone"
                    placeholder="Nếu có thì bạn có thể chia sẻ vì sao bạn biết hay ấn tượng với thành viên đó?"
                    value={formData.knowAnyone}
                    onChange={(e) => handleInputChange("knowAnyone", e.target.value)}
                    className={formFieldClass}
                    rows={2}
                  />
                </div>
                <div>
                  <label htmlFor="questions" className={labelClass}>
                    Câu hỏi hoặc thắc mắc
                  </label>
                  <Textarea
                    id="questions"
                    placeholder="Bạn còn câu hỏi hay thắc mắc nào không?"
                    value={formData.questions}
                    onChange={(e) => handleInputChange("questions", e.target.value)}
                    className={formFieldClass}
                    rows={2}
                  />
                </div>
              </div>
              <div className="space-y-3">
                <p className={labelClass}>* Upload CV và Minh chứng</p>
                <p className="text-xs leading-relaxed text-neon-cyan/80">
                  <span className="font-semibold">Lưu ý:</span> Ngoài CV, các ứng viên có thể tự do
                  tải lên những tài liệu về các bản thân nhằm giúp chúng mình hiểu rõ hơn về các bạn
                  nhé
                </p>
                <p className="text-xs leading-relaxed text-amber-200/90">
                  <span className="font-semibold">Quan trọng:</span> File upload sẽ được ghi nhận
                  trong form sau khi bạn gửi đăng ký.
                </p>
              </div>
            </div>
          )}

          <div className="flex justify-between border-t border-border pt-6 dark:border-white/10">
            {currentStep === 2 ? (
              <NeonButton type="button" variant="ghost" onClick={prevStep}>
                Quay lại
              </NeonButton>
            ) : (
              <div />
            )}

            {currentStep === 1 ? (
              <NeonButton type="button" variant="cyan" onClick={nextStep} disabled={!isStep1Valid}>
                Tiếp theo
              </NeonButton>
            ) : (
              <NeonButton type="submit" variant="cyan" disabled={!isFormComplete || isSubmitting}>
                {isSubmitting ? (
                  <>
                    <Loader2 className="h-5 w-5 animate-spin" />
                    Đang gửi...
                  </>
                ) : (
                  <>
                    <Code className="h-5 w-5" />
                    Mở form đăng ký
                  </>
                )}
              </NeonButton>
            )}
          </div>
        </form>
      </GlassCard>
    </SectionShell>
  );
}
