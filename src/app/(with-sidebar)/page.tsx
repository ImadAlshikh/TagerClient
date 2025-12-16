"use client";
import PostCard from "@/components/ui/cards/PostCard";
import Hero from "@/components/layout/hero/Hero";
import NavigationBar from "@/components/ui/navigation/NavigationBar";
import AddPostButton from "@/components/ui/buttons/AddPostButton";
import { usePosts } from "@/cache/usePosts";
import { PostType } from "@/utils/validator";
import PostsContainer from "@/components/layout/containers/PostsContainer";

export default function Home() {
  const { data: posts, isLoading, isFetching } = usePosts();

  if (isLoading) {
    return (
      <div className="text-primary w-full h-[calc(100vh-78px)] grid place-content-center font-bold text-2xl">
        <AddPostButton />
        Loading...
      </div>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <div className="text-primary w-full h-[calc(100vh-78px)] flex items-center justify-center font-bold text-2xl">
        <AddPostButton />
        No Post Found
      </div>
    );
  }

  return (
    <div className="relative w-full">
      {isFetching && (
        <div className="fixed top-2 right-2 text-sm text-primary">
          <AddPostButton />
          Updating...
        </div>
      )}

      <div className="flex w-full p-4 bg-bg flex-col gap-4 items-center">
        <AddPostButton />
        <Hero />

        <PostsContainer posts={posts} />

      </div>
    </div>
  );
}
