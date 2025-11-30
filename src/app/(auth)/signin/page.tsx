"use client";
import { FcGoogle } from "react-icons/fc";

export default function page() {
  return (
    <div className="h-full">
      <div className="flex flex-col md:flex-row h-full">
        <div className="hidden md:block banner flex-1 bg-border animate-pulse rounded-md  min-h-full"></div>

        <form className="login-form flex flex-col justify-center items-center md:flex-1 bg-white border border-border p-4  m-10 rounded-md">
          <div className="flex flex-col items-center">
            <h2 className="text-primary font-bold text-2xl">Signin</h2>
            <div className="text-lg">Welcome — let’s sign you in</div>
          </div>
          <div className="flex flex-col gap-4 w-90">
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
              type="button"
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
            <button
              type="button"
              onClick={() =>
                (window.location.href = "http://localhost:3001/auth/google")
              }
              className="rounded-md border hover:bg-bg border-border p-2 flex items-center"
            >
              <FcGoogle size={24} />
              <span className="grow">Signin With Google</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
