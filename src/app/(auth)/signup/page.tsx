"use client";
import GoogleAuthButton from "@/components/ui/buttons/GoogleAuthButton";
import { queryClient } from "@/providers/QueryProvider";
import axios from "axios";
import { useRouter } from "next/navigation";
import { useState } from "react";
import {
  FiMail,
  FiLock,
  FiUser,
  FiAlertCircle,
  FiCheckCircle,
} from "react-icons/fi";
import Link from "next/link";

export default function SignUpPage() {
  const router = useRouter();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string>("");
  const [success, setSuccess] = useState<boolean>(false);

  const handleSignUp = async (e: React.FormEvent<HTMLFormElement>) => {
    try {
      setLoading(true);
      setError("");
      setSuccess(false);
      e.preventDefault();

      const formData = new FormData(e.currentTarget);
      const data = Object.fromEntries(formData.entries());

      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/signin`,
        data,
        {
          withCredentials: true,
        },
      );

      if (!res.data.success) {
        setError(res.data?.error || "Registration failed");
        setLoading(false);
        return;
      }

      setSuccess(true);
      queryClient.invalidateQueries({ queryKey: ["user"] });

      // Redirect after a short delay to show success message
      setTimeout(() => {
        router.push("/profile");
      }, 1000);
    } catch (error: any) {
      setLoading(false);
      setError(
        error.response?.data?.error || "An error occurred during registration",
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
          <Link href="/" className="inline-flex items-center gap-2 mb-8">
            <div className="size-10 rounded-xl bg-primary flex items-center justify-center text-white font-bold text-xl shadow-lg shadow-primary/30">
              T
            </div>
            <span className="text-2xl font-bold text-gray-900 tracking-tight">
              Tager
            </span>
          </Link>
          <h1 className="text-3xl font-bold text-gray-900 mb-2 tracking-tight">
            Join Us Today
          </h1>
          <p className="text-gray-500">
            Create an account and start your journey
          </p>
        </div>

        <div className="bg-white rounded-3xl shadow-xl shadow-gray-100/50 border border-gray-100 p-8 md:p-10 backdrop-blur-xl">
          {/* Error Message */}
          {error && (
            <div className="mb-6 p-4 bg-red-50/50 border border-red-100 rounded-xl flex items-start gap-3">
              <FiAlertCircle
                className="text-red-600 mt-0.5 flex-shrink-0"
                size={20}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-red-800">
                  Registration Failed
                </p>
                <p className="text-sm text-red-600/90 mt-1">{error}</p>
              </div>
            </div>
          )}

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50/50 border border-green-100 rounded-xl flex items-start gap-3">
              <FiCheckCircle
                className="text-green-600 mt-0.5 flex-shrink-0"
                size={20}
              />
              <div className="flex-1">
                <p className="text-sm font-medium text-green-800">
                  Account Created!
                </p>
                <p className="text-sm text-green-600/90 mt-1">
                  Redirecting to your profile...
                </p>
              </div>
            </div>
          )}

          {/* Sign Up Form */}
          <form onSubmit={handleSignUp} className="space-y-6">
            {/* Name Field */}
            <div className="space-y-2">
              <label
                htmlFor="name"
                className="text-sm font-semibold text-gray-700"
              >
                Full Name
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-primary text-gray-400">
                  <FiUser size={20} />
                </div>
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  disabled={loading}
                  placeholder="John Doe"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400 disabled:opacity-70"
                />
              </div>
            </div>

            {/* Email Field */}
            <div className="space-y-2">
              <label
                htmlFor="email"
                className="text-sm font-semibold text-gray-700"
              >
                Email Address
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-primary text-gray-400">
                  <FiMail size={20} />
                </div>
                <input
                  type="email"
                  name="email"
                  id="email"
                  required
                  disabled={loading}
                  placeholder="you@example.com"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400 disabled:opacity-70"
                />
              </div>
            </div>

            {/* Password Field */}
            <div className="space-y-2">
              <label
                htmlFor="password"
                className="text-sm font-semibold text-gray-700"
              >
                Password
              </label>
              <div className="relative group">
                <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none transition-colors group-focus-within:text-primary text-gray-400">
                  <FiLock size={20} />
                </div>
                <input
                  type="password"
                  name="password"
                  id="password"
                  required
                  minLength={8}
                  disabled={loading}
                  placeholder="Create a strong password"
                  className="w-full pl-11 pr-4 py-3 bg-gray-50/50 border border-gray-200 rounded-xl focus:bg-white focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all placeholder:text-gray-400 disabled:opacity-70"
                />
              </div>
              <p className="mt-1.5 text-xs text-gray-500 ml-1">
                Must be at least 8 characters long
              </p>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading || success}
              className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3.5 px-4 rounded-xl transition-all disabled:opacity-70 disabled:cursor-not-allowed shadow-lg shadow-primary/25 hover:shadow-primary/40 active:scale-[0.98]"
            >
              {loading ? (
                <span className="flex items-center justify-center gap-2">
                  <span className="size-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                  Creating Account...
                </span>
              ) : success ? (
                <span className="flex items-center justify-center gap-2">
                  <FiCheckCircle className="size-5" />
                  Success!
                </span>
              ) : (
                "Create Account"
              )}
            </button>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-gray-100"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-gray-500 font-medium">
                  Or continue with
                </span>
              </div>
            </div>

            {/* Google Auth */}
            <GoogleAuthButton />
          </form>
        </div>

        {/* Sign In Link */}
        <p className="mt-8 text-center text-sm text-gray-600">
          Already have an account?{" "}
          <Link
            href="/signin"
            className="text-primary hover:text-primary-dark font-semibold hover:underline decoration-2 underline-offset-2 transition-all"
          >
            Sign in
          </Link>
        </p>

        {/* Footer Note */}
        <div className="mt-8 flex justify-center gap-6 text-xs text-gray-400">
          <Link href="/terms" className="hover:text-gray-600 transition-colors">
            Terms
          </Link>
          <Link
            href="/privacy"
            className="hover:text-gray-600 transition-colors"
          >
            Privacy
          </Link>
          <Link href="/help" className="hover:text-gray-600 transition-colors">
            Help
          </Link>
        </div>
      </div>
    </div>
  );
}
