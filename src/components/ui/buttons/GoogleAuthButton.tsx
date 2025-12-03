"use client";
import { useUserStore } from "@/stores/useUserStore";
import { FcGoogle } from "react-icons/fc";

export default function GoogleAuthButton() {
  return (
    <button
      type="button"
      className="rounded-md border hover:bg-bg border-border p-2 flex items-center"
      onClick={() =>
        (window.location.href = "http://localhost:3001/auth/google")
      }
    >
      <FcGoogle size={24} />
      <span className="grow">Login With Google</span>
    </button>
  );
}
