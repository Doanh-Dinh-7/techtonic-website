/**
 * @vitest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";
import { mockUsePathname } from "@/test/mocks";
import { Header } from "./header";

describe("Header", () => {
  beforeEach(() => {
    mockUsePathname.mockReturnValue("/events");
    delete process.env.NEXT_PUBLIC_REGISTER_URL;
  });

  it("renders main navigation links when visible", () => {
    render(<Header show onLogoClick={vi.fn()} />);

    expect(
      screen.getAllByRole("navigation", { name: "Điều hướng chính" }).length
    ).toBeGreaterThanOrEqual(1);
    expect(screen.getByRole("link", { name: "Trang chủ" })).toHaveAttribute("href", "/");
    expect(screen.getByRole("link", { name: "Sự kiện" })).toHaveAttribute("href", "/events");
    expect(screen.getByRole("link", { name: "Tuyển thành viên" })).toHaveAttribute(
      "href",
      "/recruitment"
    );
  });

  it("highlights active route", () => {
    render(<Header show onLogoClick={vi.fn()} />);

    const eventsLink = screen.getByRole("link", { name: "Sự kiện" });
    expect(eventsLink.className).toMatch(/text-blue-600/);
  });

  it("does not render when show is false", () => {
    render(<Header show={false} onLogoClick={vi.fn()} />);

    expect(screen.queryByRole("link", { name: "Trang chủ" })).not.toBeInTheDocument();
  });

  it("mobile menu button exposes expanded state", async () => {
    const { userEvent } = await import("@testing-library/user-event");
    const user = userEvent.setup();

    render(<Header show onLogoClick={vi.fn()} />);

    const menuButton = screen.getByRole("button", { name: "Mở menu điều hướng" });
    expect(menuButton).toHaveAttribute("aria-expanded", "false");

    await user.click(menuButton);

    const closeButton = screen.getByRole("button", { name: "Đóng menu điều hướng" });
    expect(closeButton).toHaveAttribute("aria-expanded", "true");
  });

  it("join CTA points to recruitment without external register URL", () => {
    render(<Header show onLogoClick={vi.fn()} />);

    const joinCta = screen.getAllByRole("link", { name: /Tham gia ngay/i })[0];
    expect(joinCta).toHaveAttribute("href", "/recruitment");
  });
});
