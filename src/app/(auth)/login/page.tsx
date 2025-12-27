"use client";
import GoogleAuthButton from "@/components/ui/buttons/GoogleAuthButton";
import { useUserStore } from "@/stores/useUserStore";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";

export default function page() {
  const { setUser } = useUserStore();
  const router = useRouter();
  const [error, setError] = useState<string>();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      e.preventDefault();
      const ctrl = new AbortController();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const res = await axios.post("http://localhost:3001/users/login", data, {
        signal: ctrl.signal,
        withCredentials: true,
      });
      if (!res.data.success) {
        return setError(res.data?.error);
      }
      setUser({ ...res.data.data, picture: res.data.data.picture?.secureUrl });
      return router.push("/");
    } catch (error: any) {
      return setError(error.response.data.error);
    }
  };

  return (
    <div className="h-[calc(100vh-72px)] w-full mx-auto">
      <div className="flex flex-col md:flex-row h-full min-h-fit">
        <div className="hidden md:block banner flex-1 bg-border animate-pulse rounded-md  min-h-full"></div>

        <form
          onSubmit={handleLogin}
          className="login-form flex flex-col justify-center items-center md:flex-1 bg-white border border-border p-4 min-h-fit m-10 rounded-md"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-primary font-bold text-2xl">Login</h2>
            <div className="text-lg">Welcome back!</div>
          </div>
          <div className="flex flex-col gap-4 w-90 max-w-full">
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
            <div className="flex flex-col relative">
              <button
                type="submit"
                className="bg-primary hover:bg-primary-dark text-white rounded-md px-2 py-2"
              >
                Login
              </button>
              {error && (
                <div className="absolute top-full text-start w-full text-sm text-red-500">
                  {error}
                </div>
              )}
            </div>
            <a
              href="/signin"
              className="text-center text-sm text-primary hover:text-primary-dark"
            >
              you haven't account yet? signin
            </a>
            <div className="flex items-center gap-2 text-gray-500">
              <div className="bg-gray-500 flex-1 h-[0.3px]" />
              <span className="text-inherit">Or continuo with</span>
              <div className="bg-gray-500 flex-1 h-[0.3px]" />
            </div>
            <GoogleAuthButton />
          </div>
        </form>
      </div>
    </div>
  );
}
