/**
 * @vitest-environment jsdom
 */
import { act, renderHook } from "@testing-library/react";
import { describe, expect, it, vi, beforeEach } from "vitest";
import { useRegistrationForm } from "./use-registration-form";

vi.mock("@/hooks/use-toast", () => ({
  toast: vi.fn(),
}));

describe("useRegistrationForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("starts on step 1 with empty validation", () => {
    const { result } = renderHook(() => useRegistrationForm());

    expect(result.current.currentStep).toBe(1);
    expect(result.current.isStep1Valid).toBe(false);
    expect(result.current.isFormComplete).toBe(false);
  });

  it("validates step 1 when required fields are filled", () => {
    const { result } = renderHook(() => useRegistrationForm());

    act(() => {
      result.current.handleInputChange("fullName", "Nguyen Van A");
      result.current.handleInputChange("studentId", "123");
      result.current.handleInputChange("class", "K24");
      result.current.handleInputChange("phone", "0900000000");
      result.current.handleInputChange("email", "a@example.com");
      result.current.handleInputChange("gender", "Nam");
      result.current.handleInputChange("facebookLink", "https://facebook.com/a");
      result.current.handleInputChange("selfDescription", "Mo ta");
    });

    expect(result.current.isStep1Valid).toBe(true);
  });

  it("advances to step 2 only when step 1 is valid", () => {
    const { result } = renderHook(() => useRegistrationForm());

    act(() => {
      result.current.nextStep();
    });
    expect(result.current.currentStep).toBe(1);

    act(() => {
      result.current.handleInputChange("fullName", "Nguyen Van A");
      result.current.handleInputChange("studentId", "123");
      result.current.handleInputChange("class", "K24");
      result.current.handleInputChange("phone", "0900000000");
      result.current.handleInputChange("email", "a@example.com");
      result.current.handleInputChange("gender", "Nam");
      result.current.handleInputChange("facebookLink", "https://facebook.com/a");
      result.current.handleInputChange("selfDescription", "Mo ta");
    });

    act(() => {
      result.current.nextStep();
    });

    expect(result.current.currentStep).toBe(2);
  });

  it("returns to step 1 from step 2 via prevStep", () => {
    const { result } = renderHook(() => useRegistrationForm());

    act(() => {
      result.current.handleInputChange("fullName", "Nguyen Van A");
      result.current.handleInputChange("studentId", "123");
      result.current.handleInputChange("class", "K24");
      result.current.handleInputChange("phone", "0900000000");
      result.current.handleInputChange("email", "a@example.com");
      result.current.handleInputChange("gender", "Nam");
      result.current.handleInputChange("facebookLink", "https://facebook.com/a");
      result.current.handleInputChange("selfDescription", "Mo ta");
      result.current.nextStep();
      result.current.prevStep();
    });

    expect(result.current.currentStep).toBe(1);
  });
});
