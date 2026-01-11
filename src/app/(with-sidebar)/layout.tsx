import Sidebar from "@/components/layout/sidebars/Sidebar";
import React from "react";

export default function layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-full">
      <Sidebar />
      <div className="flex-1 relative"> {children}</div>
    </div>
  );
}
