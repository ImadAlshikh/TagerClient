"use client";

import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import React, { useState } from "react";
import { FiCheck } from "react-icons/fi";
import { useLoadCredits } from "@/cache/useLoadCredits";

const creditPackages = [
  {
    id: "basic",
    name: "Starter",
    credits: 50,
    price: 25,
    features: ["50 Credits", "Posts shown at top of list", "Fast support"],
    popular: false,
  },
  {
    id: "pro",
    name: "Pro",
    credits: 150,
    price: 60,
    features: [
      "150 Credits",
      "Posts shown at top of list",
      "Priority status",
      "Faster support",
      "Profile badge",
    ],
    popular: true,
  },
  {
    id: "business",
    name: "Business",
    credits: 500,
    price: 150,
    features: [
      "500 Credits",
      "Posts shown at top of list",
      "24/7 dedicated support",
      "Featured profile",
    ],
    popular: false,
  },
];

export default function CreditsPage() {
  const { mutate: loadCredits, isPending } = useLoadCredits();
  const [purchasingId, setPurchasingId] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{
    type: "success" | "error";
    message: string;
  } | null>(null);

  const handlePurchase = (pkg: (typeof creditPackages)[0]) => {
    setPurchasingId(pkg.id);
    setFeedback(null);

    loadCredits(
      { credits: pkg.credits },
      {
        onSuccess: (data) => {
          setFeedback({
            type: "success",
            message:
              data.message || `Successfully added ${pkg.credits} credits!`,
          });
          setPurchasingId(null);
        },
        onError: (error: any) => {
          setFeedback({
            type: "error",
            message:
              error.response?.data?.message ||
              "Failed to purchase credits. Please try again.",
          });
          setPurchasingId(null);
        },
      }
    );
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-6 p-4 md:p-8 max-w-7xl mx-auto w-full">
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
          {creditPackages.map((pkg) => (
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

              <div className="flex flex-col gap-4 flex-grow">
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
                </div>

                <div className="w-full h-px bg-gray-100 my-2" />

                <ul className="flex flex-col gap-3 mb-6">
                  {pkg.features.map((feature, i) => (
                    <li
                      key={i}
                      className="flex items-start gap-3 text-sm text-gray-600"
                    >
                      <FiCheck
                        className="mt-0.5 shrink-0 text-primary"
                        size={16}
                      />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
              </div>

              <button
                onClick={() => handlePurchase(pkg)}
                disabled={isPending && purchasingId === pkg.id}
                className="w-full mt-auto bg-primary hover:bg-primary-dark text-white font-medium py-2.5 px-4 rounded-lg transition-colors duration-200 disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isPending && purchasingId === pkg.id
                  ? "Processing..."
                  : "Purchase Package"}
              </button>
            </div>
          ))}
        </div>
      </div>
    </ProtectedRoute>
  );
}
