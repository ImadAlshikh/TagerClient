"use client";
import Hero from "@/components/layout/hero/Hero";
import AddPostButton from "@/components/ui/buttons/AddPostButton";
import { usePosts } from "@/cache/usePosts";
import PostsContainer from "@/components/layout/containers/PostsContainer";

export default function Home() {
  const { data, fetchNextPage, isLoading, isFetching } = usePosts();

  const posts = data?.pages.flatMap((page) => page.posts);
  const postsCount = data?.pages.flatMap((page) => page)[0].postsCount;

  return (
    <div className="relative w-full max-w-full">
      <div className="flex w-full p-4 bg-bg flex-col gap-4 items-center">
        <AddPostButton />
        <Hero />
        <PostsContainer
          showMore={fetchNextPage}
          posts={posts}
          postsCount={postsCount}
          loading={isLoading}
        />
      </div>
    </div>
  );
}
