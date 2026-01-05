"use client";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useUiStore } from "@/stores/useUiStore";

export default function UsePathChange() {
  const pathname = usePathname();
  const setShowSideBar = useUiStore((s) => s.setShowSideBar);
  useEffect(() => {
    window.scrollTo(0, 0);
    setShowSideBar(false);
  }, [pathname]);

  return null;
}
