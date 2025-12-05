import React from "react";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa6";

export default function page() {
  return (
    <div className="flex flex-col">
      <div className="flex items-center gap-1">
        <Link href={"/"}>
          <FaArrowLeft size={18} />
        </Link>
        <span className="font-bold text-primary text-xl">Profile</span>
      </div>
      <div className="bg-white rounded-md p-4"></div>
    </div>
  );
}
