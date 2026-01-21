"use client";

import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { usePackages, PackageType } from "@/cache/usePackages";
import axios from "axios";

export default function CreditsPage() {
  const { data: packages, isLoading } = usePackages();
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handlePurchase = async (pkg: PackageType) => {
    try {
      setPurchasingId(pkg.id);
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/checkout/create-checkout`,
        { packageId: pkg.id },
        { withCredentials: true },
      );
      if (!res.data.success) {
        setPurchasingId(null);
        return;
      }
      window.location.href = res.data.data;
    } catch (error) {
      console.log(error);
      setPurchasingId(null);
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col min-h-full gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">
        <div className="flex flex-col gap-2">
          <h1 className="text-2xl font-bold text-gray-900">Load Credits</h1>
          <p className="text-gray-500">
            Choose a credit package that suits your needs.
          </p>
        </div>

        {feedback && (
          <div
            className={`p-4 rounded-lg ${
              feedback.type === "success"
                ? "bg-green-50 text-green-800 border border-green-200"
                : "bg-red-50 text-red-800 border border-red-200"
            }`}
          >
            {feedback.message}
          </div>
        )}

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-4">
          {isLoading
            ? // Loading skeleton
              Array.from({ length: 3 }).map((_, i) => (
                <div
                  key={i}
                  className="flex flex-col p-6 bg-white rounded-xl border border-border animate-pulse"
                >
                  <div className="h-6 bg-gray-200 rounded w-1/2 mb-4" />
                  <div className="h-10 bg-gray-200 rounded w-2/3 mb-2" />
                  <div className="h-5 bg-gray-200 rounded w-1/3 mb-4" />
                  <div className="h-px bg-gray-100 my-4" />
                  <div className="h-10 bg-gray-200 rounded w-full mt-auto" />
                </div>
              ))
            : packages?.map((pkg) => (
                <div
                  key={pkg.id}
                  className={`relative flex flex-col p-6 bg-white rounded-xl border transition-all duration-200 hover:shadow-lg ${
                    pkg.popular
                      ? "border-primary shadow-md scale-105 md:scale-105 z-10"
                      : "border-border hover:border-primary/50"
                  }`}
                >
                  {pkg.popular && (
                    <div className="absolute -top-3 left-1/2 -translate-x-1/2 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wider">
                      Most Popular
                    </div>
                  )}

                  <div className="flex flex-col gap-4 grow">
                    <div>
                      <h3 className="text-lg font-medium text-gray-900">
                        {pkg.name}
                      </h3>
                      <div className="mt-2 flex items-baseline gap-1">
                        <span className="text-3xl font-bold text-gray-900">
                          ${pkg.price}
                        </span>
                        <span className="text-sm text-gray-500">USD</span>
                      </div>
                      <div className="text-sm font-medium text-primary mt-1">
                        {pkg.credits} Credits
                      </div>
                      {pkg.description && (
                        <p className="text-sm text-gray-500 mt-2">
                          {pkg.description}
                        </p>
                      )}
                    </div>

                    <div className="w-full h-px bg-gray-100 my-2" />
                  </div>

                  <button
                    onClick={() => handlePurchase(pkg)}
                    disabled={purchasingId === pkg.id}
                    className="w-full mt-auto bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {purchasingId === pkg.id
                      ? "Processing..."
                      : "Purchase Package"}
                  </button>
                </div>
              ))}
        </div>
        {/* Trust Indicators */}
        <div className="mt-12 pt-10 border-t border-gray-100">
          <div className="flex flex-wrap items-center justify-center gap-10 text-base text-gray-500">
            <div className="flex items-center gap-3">
              <FiCheck size={20} className="text-primary" />
              <span>Secure checkout</span>
            </div>
            <div className="flex items-center gap-3">
              <FiCheck size={20} className="text-primary" />
              <span>Credits never expire</span>
            </div>
            <div className="flex items-center gap-3">
              <FiCheck size={20} className="text-primary" />
              <span>Instant delivery</span>
            </div>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
