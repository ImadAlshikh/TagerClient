import Footer from "@/components/layout/footer/Footer";
import React, { ReactNode } from "react";

export default function layout({ children }: { children: ReactNode }) {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>{children}</div>
      <Footer />
    </div>
  );
}
