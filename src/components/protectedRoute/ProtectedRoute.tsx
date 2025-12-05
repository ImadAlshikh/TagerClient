"use client";
import { useUserStore } from "@/stores/useUserStore";
import React, { useEffect } from "react";
import { useRouter } from "next/navigation";

export default function ProtectedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const { user, loading } = useUserStore();
  const router = useRouter();
  useEffect(() => {
    if (!loading && !user) router.push("/login");
    return () => {};
  }, [user, router]);
  if (loading)
    return (
      <div className="text-primary w-full h-full font-bold text-2xl grid place-content-center">Loading... </div>
    );
  if (!user) return null;
  return <>{children}</>;
}
