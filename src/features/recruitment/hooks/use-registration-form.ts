"use client";

import { useCallback, useMemo, useState, type FormEvent } from "react";
import { toast } from "@/hooks/use-toast";

type RegistrationFormData = {
  fullName: string;
  email: string;
  phone: string;
  studentId: string;
  class: string;
  facebookLink: string;
  gender: string;
  selfDescription: string;
  questions: string;
  whyJoin: string;
  knowAnyone: string;
  skills: string;
  whyChooseDepartment: string;
  department: string;
};

const INITIAL_FORM_DATA: RegistrationFormData = {
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
};

const GOOGLE_FORM_ENTRY_MAP: Record<keyof RegistrationFormData, string> = {
  class: "entry.637618999",
  studentId: "entry.2089236837",
  fullName: "entry.51064004",
  email: "entry.411338864",
  facebookLink: "entry.1511169545",
  phone: "entry.1869285708",
  selfDescription: "entry.1473075964",
  gender: "entry.1064324060",
  questions: "entry.643542381",
  whyJoin: "entry.861219170",
  skills: "entry.1806566794",
  whyChooseDepartment: "entry.508226384",
  department: "entry.705796435",
  knowAnyone: "entry.1701397463",
};

/**
 * Handles form state, validation, and Google Form prefill submission flow.
 */
export function useRegistrationForm() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<RegistrationFormData>(INITIAL_FORM_DATA);

  const handleInputChange = useCallback((field: keyof RegistrationFormData, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [field]: value,
    }));
  }, []);

  const isStep1Valid = useMemo(
    () =>
      formData.fullName.trim() !== "" &&
      formData.studentId.trim() !== "" &&
      formData.class.trim() !== "" &&
      formData.phone.trim() !== "" &&
      formData.email.trim() !== "" &&
      formData.gender.trim() !== "" &&
      formData.facebookLink.trim() !== "" &&
      formData.selfDescription.trim() !== "",
    [formData]
  );

  const isStep2Valid = useMemo(
    () =>
      formData.whyJoin.trim() !== "" &&
      formData.skills.trim() !== "" &&
      formData.department.trim() !== "" &&
      formData.whyChooseDepartment.trim() !== "",
    [formData]
  );

  const isFormComplete = isStep1Valid && isStep2Valid;

  const nextStep = useCallback(() => {
    if (currentStep === 1 && isStep1Valid) {
      setCurrentStep(2);
    }
  }, [currentStep, isStep1Valid]);

  const prevStep = useCallback(() => {
    if (currentStep === 2) {
      setCurrentStep(1);
    }
  }, [currentStep]);

  const resetForm = useCallback(() => {
    setFormData(INITIAL_FORM_DATA);
    setCurrentStep(1);
  }, []);

  const handleSubmit = useCallback(
    async (e: FormEvent) => {
      e.preventDefault();
      setIsSubmitting(true);

      try {
        const formId = process.env.NEXT_PUBLIC_FORM_ID;
        if (!formId) {
          throw new Error("Form ID không được cấu hình");
        }

        const baseUrl = `https://docs.google.com/forms/d/e/${formId}/viewform?usp=pp_url`;
        const params = new URLSearchParams();

        (Object.keys(formData) as Array<keyof RegistrationFormData>).forEach((key) => {
          const entry = GOOGLE_FORM_ENTRY_MAP[key];
          params.set(entry, formData[key]);
        });

        const formUrl = `${baseUrl}&${params.toString()}`;
        window.open(formUrl, "_blank", "noopener,noreferrer");

        toast({
          title: "Form đăng ký đã mở!",
          description:
            "Form đăng ký đã được mở trong tab mới. Vui lòng kiểm tra và hoàn tất đăng ký trong tab đó.",
          variant: "success",
        });

        setTimeout(() => {
          resetForm();
        }, 2000);
      } catch (error) {
        console.error("Lỗi khi mở form:", error);
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
    },
    [formData, resetForm]
  );

  return {
    currentStep,
    formData,
    handleInputChange,
    handleSubmit,
    isFormComplete,
    isStep1Valid,
    isSubmitting,
    nextStep,
    prevStep,
  };
}
