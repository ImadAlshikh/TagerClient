"use client";
import PostCard from "@/components/ui/cards/PostCard";
import SkeletonPostCard from "@/components/ui/cards/SekeletonPostCard";
import { usePosts } from "@/cache/usePosts";
import { useEffect, useState } from "react";
import { PostType } from "@/utils/validator";
import NavigationBar from "@/components/ui/navigation/NavigationBar";
import axios from "axios";

export default function PostsContainer({
  postsCount,
  showMore,
  posts,
  loading,
}: {
  postsCount: number;
  showMore: () => {};
  posts?: PostType[];
  loading: boolean;
}) {
  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      {posts?.length ? (
        <>
          <div className="w-full flex flex-wrap gap-1">
            {posts?.map((post: any) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
          {posts.length < postsCount && (
            <span
              onClick={showMore}
              className="w-full text-center cursor-pointer text-primary hover:text-primary-dark pb-4"
            >
              {loading ? "Loading" : "Load more"}
            </span>
          )}
        </>
      ) : loading ? (
        <>
          {Array.from({ length: 3 }).map((_, i) => (
            <SkeletonPostCard key={i} />
          ))}
        </>
      ) : (
        <div className="w-full h-full grid place-content-center text-primary text-2xl font-medium">
          No post found
        </div>
      )}
    </div>
  );
}
