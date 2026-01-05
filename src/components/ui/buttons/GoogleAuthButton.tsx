"use client";
import { FcGoogle } from "react-icons/fc";

export default function GoogleAuthButton() {
  return (
    <button
      type="button"
      className="rounded-md border hover:bg-bg border-border p-2 flex items-center"
      onClick={() =>
        (window.location.href = "process.env.BACKEND_URL/auth/google")
      }
    >
      <FcGoogle size={24} />
      <span className="grow">Login With Google</span>
    </button>
  );
}
