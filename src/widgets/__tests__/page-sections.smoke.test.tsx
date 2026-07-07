/**
 * @vitest-environment jsdom
 */
import { render, screen, waitFor } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { AboutPageSections } from "@/widgets/about/about-page-sections";
import { EventsPageContent } from "@/widgets/events/events-page-content";
import { HomePageSections } from "@/widgets/home/home-page-sections";
import { RecruitmentPageSections } from "@/widgets/recruitment/recruitment-page-sections";

describe("Route section smoke", () => {
  it("home: renders hero and core section landmarks", async () => {
    render(<HomePageSections />);

    expect(screen.getByRole("heading", { level: 1, name: "TECHTONIC CLUB" })).toBeInTheDocument();

    await waitFor(() => {
      expect(document.getElementById("core-values")).toBeTruthy();
      expect(document.getElementById("contact")).toBeTruthy();
    });
  });

  it("recruitment: renders registration entry point", () => {
    render(<RecruitmentPageSections />);

    expect(
      screen.getByRole("heading", { name: /Sẵn sàng bắt đầu hành trình công nghệ/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Điền form đăng ký/i })).toBeInTheDocument();
  });

  it("about: renders hero, timeline and team sections", () => {
    render(<AboutPageSections />);

    expect(
      screen.getByRole("heading", { name: /Về TechTonic Club/i, level: 1 })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Hành trình phát triển/i })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Ban chủ nhiệm qua từng nhiệm kỳ/i })
    ).toBeInTheDocument();
    expect(document.getElementById("gallery")).toBeTruthy();
  });

  it("events: renders page hero title", () => {
    render(<EventsPageContent />);

    expect(screen.getByRole("heading", { name: /Hoạt động/i, level: 1 })).toBeInTheDocument();
    expect(
      screen.getByRole("heading", { name: /Hoạt động học thuật hằng tuần/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Hoạt động & sự kiện/i })).toBeInTheDocument();
  });
});
