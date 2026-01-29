"use client";
import { useUser } from "@/cache/useUser";
import PostsContainer from "@/components/layout/containers/PostsContainer";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import Link from "next/link";
import axios from "axios";
import { useState, useEffect } from "react";
import { FaArrowLeft } from "react-icons/fa";
export default function page() {
  const { data: user, isLoading: userLoading } = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    try {
      if (!user) return;
      (async () => {
        setLoading(true);
        const res = await axios.get(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts/by-user/${user.id}`,
        );
        setLoading(false);
        if (!res.data.success) {
          return setPosts(null);
        }
        setPosts(res.data.data);
      })();
    } catch (error) {}
  }, [user]);
  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-2 p-4">
        <div className="flex items-center justify-between mb-6">
          <div className="flex items-center gap-3">
            <Link
              href={"/profile"}
              className="hover:bg-gray-100 p-2 rounded-full transition-colors"
            >
              <FaArrowLeft size={18} />
            </Link>
            <h1 className="font-bold text-text text-2xl">My Posts</h1>
          </div>
        </div>
        <PostsContainer posts={posts} loading={loading} />
      </div>
    </ProtectedRoute>
  );
}
