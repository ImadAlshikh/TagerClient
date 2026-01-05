"use client";
import { ReactNode, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useSidebarStore } from "@/stores/useSidebarStore";

export default function UsePathChange() {
  const pathname = usePathname();
  const setShowSidebar = useSidebarStore((s) => s.setShowSidebar);
  useEffect(() => {
    window.scrollTo(0, 0);
    setShowSidebar(false);
  }, [pathname]);

  return null;
}
