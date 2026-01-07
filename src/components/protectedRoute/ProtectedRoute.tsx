"use client";
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
      <div className='text-primary w-full overflow-hidden h-[calc(100vh-56px)] font-bold text-2xl grid place-content-center place-items-center gap-8 animate-pulse'>
        <img src='/logo/textColor-logo.png' alt='' className='size-32 ' />
        <div>Loading</div>
      </div>
    );
  return <>{children}</>;
}
