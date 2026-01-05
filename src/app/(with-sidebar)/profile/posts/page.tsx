"use client";
import { useUser } from "@/cache/useUser";
import PostsContainer from "@/components/layout/containers/PostsContainer";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import axios from "axios";
import { useState, useEffect } from "react";
export default function page() {
  const { data: user, isLoading: userLoading } = useUser();

  const [loading, setLoading] = useState<boolean>(false);
  const [posts, setPosts] = useState<any>();

  useEffect(() => {
    try {
      if (!user) return;
      (async () => {
        setLoading(true);
        console.log(user.id)
        const res = await axios.get(
          `http://localhost:3001/posts/by-user/${user.id}`
        );
        console.log(res);
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
        <span className="font-medium text-text text-xl">My Posts</span>
        <PostsContainer posts={posts} loading={loading} />
      </div>
    </ProtectedRoute>
  );
}
