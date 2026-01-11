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

      const res = await axios.post("http://localhost:3001/users/signin", data, {
        withCredentials: true,
      });

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
        error.response?.data?.error || "An error occurred during registration"
      );
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary/5 via-white to-primary/10 flex items-center justify-center p-4">
      <div className="w-full max-w-6xl grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        {/* Left Side - Branding */}
        <div className="hidden lg:flex flex-col justify-center items-center p-12">
          <div className="w-full max-w-md">
            <img
              src="/signin.jpg"
              alt="Sign up illustration"
              className="w-full h-auto rounded-2xl shadow-2xl"
            />
            <div className="mt-8 text-center">
              <h1 className="text-4xl font-bold text-gray-900 mb-3">
                Join Us Today!
              </h1>
              <p className="text-lg text-gray-600">
                Create an account and start your journey
              </p>
            </div>
          </div>
        </div>

        {/* Right Side - Signin Form */}
        <div className="w-full max-w-md mx-auto">
          <div className="bg-white rounded-2xl shadow-xl border border-gray-100 p-8 md:p-10">
            {/* Mobile Header */}
            <div className="lg:hidden text-center mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">
                Get Started
              </h2>
              <p className="text-gray-600">Create your account</p>
            </div>

            {/* Desktop Header */}
            <div className="hidden lg:block mb-8">
              <h2 className="text-3xl font-bold text-gray-900 mb-2">Sign Up</h2>
              <p className="text-gray-600">
                Create your account to get started
              </p>
            </div>

            {/* Error Message */}
            {error && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
                <FiAlertCircle
                  className="text-red-600 mt-0.5 flex-shrink-0"
                  size={20}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-red-800">
                    Registration Failed
                  </p>
                  <p className="text-sm text-red-700 mt-1">{error}</p>
                </div>
              </div>
            )}

            {/* Success Message */}
            {success && (
              <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
                <FiCheckCircle
                  className="text-green-600 mt-0.5 flex-shrink-0"
                  size={20}
                />
                <div className="flex-1">
                  <p className="text-sm font-medium text-green-800">
                    Account Created!
                  </p>
                  <p className="text-sm text-green-700 mt-1">
                    Redirecting to your profile...
                  </p>
                </div>
              </div>
            )}

            {/* Sign Up Form */}
            <form onSubmit={handleSignUp} className="space-y-5">
              {/* Name Field */}
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Full Name
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiUser className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="text"
                    name="name"
                    id="name"
                    required
                    disabled={loading}
                    placeholder="John Doe"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              {/* Email Field */}
              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email Address
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiMail className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    required
                    disabled={loading}
                    placeholder="you@example.com"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
              </div>

              {/* Password Field */}
              <div>
                <label
                  htmlFor="password"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Password
                </label>
                <div className="relative">
                  <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                    <FiLock className="text-gray-400" size={20} />
                  </div>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    required
                    minLength={8}
                    disabled={loading}
                    placeholder="Create a strong password"
                    className="w-full pl-10 pr-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary outline-none transition-colors disabled:bg-gray-50 disabled:text-gray-500"
                  />
                </div>
                <p className="mt-1.5 text-xs text-gray-500">
                  Must be at least 8 characters long
                </p>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading || success}
                className="w-full bg-primary hover:bg-primary-dark text-white font-semibold py-3 px-4 rounded-lg transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed shadow-sm hover:shadow-md"
              >
                {loading
                  ? "Creating Account..."
                  : success
                  ? "Success!"
                  : "Create Account"}
              </button>

              {/* Sign In Link */}
              <p className="text-center text-sm text-gray-600">
                Already have an account?{" "}
                <Link
                  href="/signin"
                  className="text-primary hover:text-primary-dark font-medium hover:underline"
                >
                  Sign in
                </Link>
              </p>

              {/* Divider */}
              <div className="relative my-6">
                <div className="absolute inset-0 flex items-center">
                  <div className="w-full border-t border-gray-200"></div>
                </div>
                <div className="relative flex justify-center text-sm">
                  <span className="px-4 bg-white text-gray-500">
                    Or continue with
                  </span>
                </div>
              </div>

              {/* Google Auth */}
              <GoogleAuthButton />
            </form>
          </div>

          {/* Footer Note */}
          <p className="mt-6 text-center text-xs text-gray-500">
            By creating an account, you agree to our Terms of Service and
            Privacy Policy
          </p>
        </div>
      </div>
    </div>
  );
}
