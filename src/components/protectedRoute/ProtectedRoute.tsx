"use client";
import { useUserStore } from "@/stores/useUserStore";
import React, { JSX, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useUser } from "@/cache/useUser";

export default function ProtectedRoute({
  children,
}: Readonly<{
  children: React.ReactNode;
}>): React.ReactNode {
  const { data: user, isLoading } = useUser();
  const router = useRouter();
  useEffect(() => {
    if (!isLoading && !user) router.push("/login");
    return () => {};
  }, [user, router]);
  if (isLoading)
    return (
      <div className="text-primary w-full h-full font-bold text-2xl grid place-content-center">
        Loading...{" "}
      </div>
    );
  if (!user) router.push("/login");
  return <>{children}</>;
}
