/**
 * @vitest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { BackToTop } from "./back-to-top";

describe("BackToTop", () => {
  it("exposes an accessible name when visible", () => {
    render(<BackToTop show onClick={vi.fn()} />);

    expect(screen.getByRole("button", { name: "Cuộn lên đầu trang" })).toBeInTheDocument();
  });

  it("is hidden when show is false", () => {
    render(<BackToTop show={false} onClick={vi.fn()} />);

    expect(screen.queryByRole("button", { name: "Cuộn lên đầu trang" })).not.toBeInTheDocument();
  });
});
