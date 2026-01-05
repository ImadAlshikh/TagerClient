"use client";
import GoogleAuthButton from "@/components/ui/buttons/GoogleAuthButton";
import axios, { AxiosError } from "axios";
import { useRouter } from "next/navigation";
import { useEffect, useLayoutEffect, useState } from "react";
import { queryClient } from "@/providers/QueryProvider";
import MessageCard from "@/components/ui/cards/MessageCard";
export default function page() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<{
    title: string;
    body?: string;
    onClose: () => void;
  } | null>();

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      e.preventDefault();
      const ctrl = new AbortController();
      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/login`,
        data,
        {
          signal: ctrl.signal,
          withCredentials: true,
        }
      );
      if (!res.data.success) {
        return setError({
          title: "Login Error",
          body: res.data?.error,
          onClose: () => setError(null),
        });
      }
      queryClient.invalidateQueries({ queryKey: ["user"] });
      setLoading(false);
      return router.push("/");
    } catch (error: any) {
      setLoading(false);
      return setError({
        title: "Login Error",
        body: error.response.data.error,
        onClose: () => setError(null),
      });
    }
  };

  return (
    <div className="h-[calc(100vh-56px-40px)] overflow-hidden w-full mx-auto">
      {error && (
        <MessageCard
          title={error.title}
          body={error.body}
          onClose={error.onClose}
          type="warning"
        />
      )}
      <div className="flex flex-col md:flex-row h-full min-h-fit">
        <img
          src={"/login.svg"}
          className="hidden md:block banner bg-white flex-1 m-10 border border-border rounded-md  max-h-full"
        ></img>

        <form
          onSubmit={handleLogin}
          className="login-form flex flex-col justify-center items-center
            md:flex-1 bg-white border border-border p-4 h-full md:m-10 rounded-md"
        >
          <div className="flex flex-col items-center">
            <h2 className="text-primary font-bold text-2xl">Login</h2>
            <div className="text-lg">Welcome back!</div>
          </div>
          <div className="flex flex-col gap-4 w-90 max-w-full">
            <div className="flex flex-col">
              <label htmlFor="email">Email</label>
              <input
                type="email"
                name="email"
                id="email"
                disabled={loading}
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
                disabled={loading}
                placeholder="Password"
                className="px-2 py-2 ml-1 outline-text border border-border  rounded-md focus:outline-2"
              />
            </div>
            <div className="flex flex-col relative">
              <button
                type="submit"
                disabled={loading}
                className="bg-primary hover:bg-primary-dark text-white rounded-md px-2 py-2 disabled:bg-border"
              >
                Login
              </button>
              {error && (
                <div className="absolute top-full text-start w-full text-sm text-red-500">
                  {error.body}
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
