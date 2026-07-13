import React from "react";
import { vi } from "vitest";
import { mockUsePathname } from "./mocks";

if (typeof window !== "undefined") {
  Object.defineProperty(window, "matchMedia", {
    writable: true,
    value: vi.fn().mockImplementation((query: string) => ({
      matches: false,
      media: query,
      onchange: null,
      addListener: vi.fn(),
      removeListener: vi.fn(),
      addEventListener: vi.fn(),
      removeEventListener: vi.fn(),
      dispatchEvent: vi.fn(),
    })),
  });
}

vi.mock("next/navigation", () => ({
  usePathname: () => mockUsePathname(),
  useRouter: () => ({
    push: vi.fn(),
    replace: vi.fn(),
    prefetch: vi.fn(),
    back: vi.fn(),
  }),
}));

vi.mock("next/image", () => ({
  default: function NextImage(props: { alt?: string; src?: string }) {
    return React.createElement("img", {
      alt: props.alt ?? "",
      src: typeof props.src === "string" ? props.src : "",
    });
  },
}));

vi.mock("next/link", () => ({
  default: function NextLink({
    href,
    children,
    ...rest
  }: {
    href: string;
    children: React.ReactNode;
  }) {
    return React.createElement("a", { href, ...rest }, children);
  },
}));

vi.mock("framer-motion", () => {
  const motion = new Proxy(
    {},
    {
      get: (_target, tag: string) =>
        function MotionComponent({
          children,
          ...props
        }: React.PropsWithChildren<Record<string, unknown>>) {
          const domProps = { ...props };
          for (const key of [
            "whileHover",
            "whileTap",
            "whileInView",
            "initial",
            "animate",
            "transition",
          ]) {
            delete domProps[key];
          }
          return React.createElement(tag, domProps, children);
        },
    }
  );

  return {
    motion,
    AnimatePresence: ({ children }: { children: React.ReactNode }) => children,
    useScroll: vi.fn(() => ({
      scrollY: {
        get: vi.fn(() => 0),
        on: vi.fn(() => vi.fn()),
        off: vi.fn(),
      },
    })),
    useTransform: vi.fn(() => 0),
    useInView: vi.fn(() => false),
  };
});

vi.mock("@/hooks/use-toast", () => ({
  toast: vi.fn(),
}));
