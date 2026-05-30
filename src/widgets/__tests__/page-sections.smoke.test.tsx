/**
 * @vitest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { EventsPageContent } from "@/widgets/events/events-page-content";
import { HomePageSections } from "@/widgets/home/home-page-sections";
import { RecruitmentPageSections } from "@/widgets/recruitment/recruitment-page-sections";

describe("Route section smoke", () => {
  it("home: renders hero and core section landmarks", () => {
    render(<HomePageSections />);

    expect(screen.getByRole("heading", { level: 1, name: "TECHTONIC CLUB" })).toBeInTheDocument();
    expect(document.getElementById("core-values")).toBeTruthy();
    expect(document.getElementById("contact")).toBeTruthy();
  });

  it("recruitment: renders registration entry point", () => {
    render(<RecruitmentPageSections />);

    expect(
      screen.getByRole("heading", { name: /Sẵn sàng bắt đầu hành trình công nghệ/i })
    ).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /Điền form đăng ký/i })).toBeInTheDocument();
  });

  it("events: renders page hero title", () => {
    render(<EventsPageContent />);

    expect(screen.getByRole("heading", { name: /Lịch trình & cộng đồng/i })).toBeInTheDocument();
    expect(screen.getByText(/Sự kiện & Hoạt động/i)).toBeInTheDocument();
  });
});
