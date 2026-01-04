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
  const { data, fetchNextPage, isLoading, isFetching } = usePosts();

  const posts = data?.pages.flatMap((page) => page.posts);
  const postsCount = data?.pages.flatMap((page) => page)[0].postsCount;
  // if (!posts) return;
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
