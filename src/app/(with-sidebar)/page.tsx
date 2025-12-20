"use client";
import PostCard from "@/components/ui/cards/PostCard";
import Hero from "@/components/layout/hero/Hero";
import NavigationBar from "@/components/ui/navigation/NavigationBar";
import AddPostButton from "@/components/ui/buttons/AddPostButton";
import { usePosts } from "@/cache/usePosts";
import { PostType } from "@/utils/validator";
import PostsContainer from "@/components/layout/containers/PostsContainer";
import { useEffect, useState } from "react";
import axios from "axios";

export default function Home() {
  const [cursor, setCursor] = useState<string | undefined>();
  const [loadedPosts, setLoadedPosts] = useState<PostType[]>([]);
  const [postsCount, setPostsCount] = useState<number>(0);
  const [loading, setLoading] = useState<boolean>(false);
  const limit = 10;

  useEffect(() => {
    (async () => {
      setLoading(true);
      const res = await axios.get(
        `http://localhost:3001/posts?limit=${limit}&cursor=${cursor}`
      );
      if (res.data.success) {
        setLoadedPosts(res.data.data.posts);
        setCursor(res.data.data.posts.at(-1).created_at);
        setPostsCount(res.data.data.postsCount);
      }
      setLoading(false);
    })();
  }, []);

  const showMore = async () => {
    setLoading(true);
    const res = await axios.get(
      `http://localhost:3001/posts?limit=${limit}&cursor=${cursor}`
    );
    if (res.data.success) {
      setLoadedPosts((prev) => [...prev, ...res.data.data.posts]);
      setCursor(res.data.data.posts.at(-1).created_at);
      setPostsCount(res.data.data.postsCount);
    }
    setLoading(false);
  };

  return (
    <div className="relative w-full">
      <div className="flex w-full p-4 bg-bg flex-col gap-4 items-center">
        <AddPostButton />
        <Hero />

        <PostsContainer
          showMore={showMore}
          loadedPosts={loadedPosts}
          postsCount={postsCount}
          loading={loading}
        />
      </div>
    </div>
  );
}
