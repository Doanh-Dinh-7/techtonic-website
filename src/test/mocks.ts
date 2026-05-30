import { vi } from "vitest";

/** Override in tests that need a specific route (e.g. Header). */
export const mockUsePathname = vi.fn<() => string>(() => "/");
