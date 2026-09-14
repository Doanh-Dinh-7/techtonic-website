/**
 * @vitest-environment jsdom
 */

import { act, cleanup, fireEvent, render, screen } from "@testing-library/react";
import "@testing-library/jest-dom/vitest";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { homeTestimonials } from "../../lib/content/home";

import { Testimonials } from "./testimonials";

const motionPreference = vi.hoisted(() => ({ reducedMotion: false }));

vi.mock("@/hooks/use3d", () => ({
  useReducedMotionPreference: () => motionPreference.reducedMotion,
}));

function expectActiveTestimonial(index: number) {
  const testimonial = homeTestimonials[index];

  if (!testimonial) {
    throw new Error(`Không tìm thấy feedback tại vị trí ${index}`);
  }

  expect(screen.getByRole("heading", { name: testimonial.name, level: 3 })).toBeInTheDocument();
  expect(screen.getByRole("blockquote")).toHaveTextContent(testimonial.text);
  expect(screen.getAllByRole("img")).toHaveLength(1);
  expect(screen.getByRole("img", { name: `Ảnh của ${testimonial.name}` })).toBeInTheDocument();
}

function advanceTime(milliseconds: number) {
  act(() => {
    vi.advanceTimersByTime(milliseconds);
  });
}

describe("Testimonials", () => {
  beforeEach(() => {
    vi.useFakeTimers();
    vi.setSystemTime(new Date("2026-09-14T12:00:00+07:00"));
    motionPreference.reducedMotion = false;
  });

  it("keeps the existing feedback data and academic-year roles", () => {
    render(<Testimonials />);
    const academicRoles = homeTestimonials.map(({ year }) => {
      const academicYearDifference = 2026 - year;

      if (academicYearDifference >= 4) return "Cựu sinh viên";
      if (academicYearDifference < 1) return "Tân sinh viên";

      return `Sinh viên năm ${academicYearDifference + 1}`;
    });

    homeTestimonials.forEach((testimonial, index) => {
      expectActiveTestimonial(index);
      expect(screen.getByText(`${academicRoles[index]} - ${testimonial.role}`)).toBeInTheDocument();
      fireEvent.click(screen.getByRole("button", { name: "Cảm nhận tiếp theo" }));
    });
  });

  it("renders the configured image for every stacked testimonial", () => {
    const { container } = render(<Testimonials />);
    const imageSources = Array.from(container.querySelectorAll("img")).map((image) => image.src);

    expect(imageSources).toEqual(homeTestimonials.map((testimonial) => testimonial.image));
  });

  afterEach(() => {
    cleanup();
    vi.useRealTimers();
  });

  it("wraps both previous and next navigation", () => {
    render(<Testimonials />);

    fireEvent.click(screen.getByRole("button", { name: "Cảm nhận trước" }));
    expectActiveTestimonial(homeTestimonials.length - 1);

    fireEvent.click(screen.getByRole("button", { name: "Cảm nhận tiếp theo" }));
    expectActiveTestimonial(0);
  });

  it("automatically advances after 3000 ms", () => {
    render(<Testimonials />);

    advanceTime(2999);
    expectActiveTestimonial(0);
    advanceTime(1);
    expectActiveTestimonial(1);

    for (let index = 2; index <= homeTestimonials.length; index += 1) {
      advanceTime(3000);
      expectActiveTestimonial(index % homeTestimonials.length);
    }
  });

  it("starts a fresh autoplay delay after manual navigation", () => {
    render(<Testimonials />);

    advanceTime(2000);
    fireEvent.click(screen.getByRole("button", { name: "Cảm nhận tiếp theo" }));
    advanceTime(2999);
    expectActiveTestimonial(1);
    advanceTime(1);
    expectActiveTestimonial(2);
  });

  it("pauses while hovered and resumes after leaving", () => {
    render(<Testimonials />);
    const carousel = screen.getByRole("region", { name: "Cảm nhận của thành viên" });

    advanceTime(2000);
    fireEvent.mouseEnter(carousel);
    advanceTime(9000);
    expectActiveTestimonial(0);

    fireEvent.mouseLeave(carousel);
    advanceTime(2999);
    expectActiveTestimonial(0);
    advanceTime(1);
    expectActiveTestimonial(1);
  });

  it("allows readers to pause, navigate, and resume autoplay", () => {
    render(<Testimonials />);

    fireEvent.click(screen.getByRole("button", { name: "Tạm dừng chuyển cảm nhận" }));
    advanceTime(9000);
    expectActiveTestimonial(0);

    fireEvent.click(screen.getByRole("button", { name: "Cảm nhận tiếp theo" }));
    expectActiveTestimonial(1);
    advanceTime(9000);
    expectActiveTestimonial(1);

    fireEvent.click(screen.getByRole("button", { name: "Tiếp tục chuyển cảm nhận" }));
    advanceTime(2999);
    expectActiveTestimonial(1);
    advanceTime(1);
    expectActiveTestimonial(2);
  });

  it("disables autoplay for reduced motion while keeping manual navigation", () => {
    motionPreference.reducedMotion = true;
    render(<Testimonials />);

    advanceTime(9000);
    expectActiveTestimonial(0);

    fireEvent.click(screen.getByRole("button", { name: "Cảm nhận tiếp theo" }));
    expectActiveTestimonial(1);
    expect(
      screen.queryByRole("button", { name: "Tạm dừng chuyển cảm nhận" })
    ).not.toBeInTheDocument();
  });

  it("clears the autoplay timer when unmounted", () => {
    const { unmount } = render(<Testimonials />);

    expect(vi.getTimerCount()).toBe(1);
    unmount();
    expect(vi.getTimerCount()).toBe(0);
  });
});
