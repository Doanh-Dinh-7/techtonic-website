"use client";

import { useCallback, useMemo, useState, type Dispatch, type SetStateAction } from "react";

type UseHeaderNavigationParams = {
  pathname: string;
};

type UseHeaderNavigationResult = {
  hasRegisterUrl: boolean;
  isNavActive: (href: string) => boolean;
  mobileMenuOpen: boolean;
  setMobileMenuOpen: Dispatch<SetStateAction<boolean>>;
  handleJoinClick: () => void;
};

/**
 * Encapsulates navigation and CTA behavior for the site header.
 */
export function useHeaderNavigation({
  pathname,
}: UseHeaderNavigationParams): UseHeaderNavigationResult {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const registerUrl = process.env.NEXT_PUBLIC_REGISTER_URL || null;

  const hasRegisterUrl = useMemo(() => Boolean(registerUrl), [registerUrl]);

  const handleJoinClick = useCallback(() => {
    if (registerUrl) {
      window.open(registerUrl, "_blank", "noopener,noreferrer");
    } else {
      window.location.href = "/recruitment";
    }
  }, [registerUrl]);

  const isNavActive = useCallback(
    (href: string) => {
      if (href === "/") return pathname === "/";
      return pathname === href || pathname.startsWith(`${href}/`);
    },
    [pathname]
  );

  return {
    hasRegisterUrl,
    isNavActive,
    mobileMenuOpen,
    setMobileMenuOpen,
    handleJoinClick,
  };
}
