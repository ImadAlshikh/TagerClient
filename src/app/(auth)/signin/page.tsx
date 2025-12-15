"use client";
import GoogleAuthButton from "@/components/ui/buttons/GoogleAuthButton";
import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect } from "react";
export default function page() {

  const { setUser } = useUserStore();
  const router = useRouter();
  const handleSignin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const data = Object.fromEntries(formData.entries());
    const res = await axios.post("http://localhost:3001/users/signin", data, {
      withCredentials: true,
    });
    if (res.data.success) {
      setUser({ ...res.data.data, picture: res.data.data.picture?.secureUrl });
      return router.push("/profile");
    }
  };

  return (
    <div className="h-[calc(100vh-72px)]">
      <div className="flex flex-col md:flex-row h-full">
        <div className="hidden md:block banner flex-1 bg-border animate-pulse rounded-md  min-h-full"></div>

        <form
          onSubmit={handleSignin}
          className="signin-form flex flex-col justify-center items-center md:flex-1 bg-white border border-border p-4  m-10 rounded-md"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-primary font-bold text-2xl">Signin</h2>
            <div className="text-lg">Welcome — let’s sign you in</div>
          </div>
          <div className="flex flex-col gap-4 w-90 max-w-full">
            <div className="flex flex-col">
              <label htmlFor="email">Name</label>
              <input
                type="text"
                name="name"
                id="name"
                placeholder="Name"
                className="px-2 py-2 ml-1 outline-text border border-border rounded-md focus:outline-2"
              />
            </div>
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="text"
                name="email"
                id="email"
                placeholder="Email"
                className="px-2 py-2 ml-1 outline-text border border-border rounded-md focus:outline-2"
              />
            </div>
            <div className="flex flex-col ">
              <label htmlFor="password">Password</label>
              <input
                type="text"
                name="password"
                id="password"
                placeholder="Password"
                className="px-2 py-2 ml-1 outline-text border border-border  rounded-md focus:outline-2"
              />
            </div>
            <button
              type="submit"
              className="bg-primary hover:bg-primary-dark text-white rounded-md px-2 py-2 flex items-center"
            >
              <span className="text-white grow">Signin</span>
              <img src="/right-arrow.svg" alt="" className="w-[10%]" />
            </button>
            <a
              href="/login"
              className="text-center text-sm text-primary hover:text-primary-dark"
            >
              you already have a account? login
            </a>
            <div className="flex items-center gap-0.5">
              <hr className="bg-text flex-1" />
              <span>or continuo with</span>
              <hr className="bg-text flex-1" />
            </div>
            <GoogleAuthButton />
          </div>
        </form>
      </div>
    </div>
  );
}
