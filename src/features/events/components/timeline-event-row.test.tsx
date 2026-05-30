/**
 * @vitest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import type { TermEvent } from "@/lib/content/types";
import { TimelineEventRow } from "./timeline-event-row";

const sampleEvent: TermEvent = {
  id: "test",
  order: 1,
  label: "Sự kiện mở đầu",
  title: "Mentor - Mentee",
  summary: "From Us To You — định hướng sinh viên.",
  tagline: "From Us To You.",
  description: "From Us To You.",
  detailSections: [
    {
      id: "goals",
      title: "Mục tiêu",
      items: ["Nâng cao hình ảnh CLB."],
    },
  ],
  side: "left",
  accent: "cyan",
  imageSrc: "/placeholder.svg",
  imageAlt: "Mô tả ảnh sự kiện",
};

describe("TimelineEventRow", () => {
  it("renders event title, summary and per-section accordions", () => {
    render(<TimelineEventRow event={sampleEvent} />);

    expect(screen.getByText("Sự kiện mở đầu")).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: "Mentor - Mentee" })).toBeInTheDocument();
    expect(screen.getByText(/định hướng sinh viên/i)).toBeInTheDocument();
    expect(screen.getByRole("button", { name: "Mục tiêu" })).toBeInTheDocument();
  });
});
