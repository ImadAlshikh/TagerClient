"use client";

import PostCard from "@/components/ui/cards/PostCard";
import AddPostButton from "@/components/ui/buttons/AddPostButton";
import { usePosts } from "@/cache/usePosts";
import { useEffect, useState } from "react";
import { PostType } from "@/utils/validator";
import NavigationBar from "@/components/ui/navigation/NavigationBar";
import axios from "axios";

export default function PostsContainer({
  postsCount,
  showMore,
  loadedPosts,
  loading,
}: {
  postsCount: number;
  showMore: () => {};
  loadedPosts: PostType[];
  loading: boolean;
}) {

  return (
    <div className="w-full h-full flex flex-col items-center gap-4">
      {loadedPosts?.length ? (
        <>
          <div className="w-full flex flex-wrap gap-1">
            {loadedPosts?.map((post: any) => (
              <PostCard post={post} key={post.id} />
            ))}
          </div>
          {loadedPosts.length < postsCount && (
            <span
              onClick={showMore}
              className="w-full text-center cursor-pointer text-primary hover:text-primary-dark pb-4"
            >
              {loading ? "Loading" : "Load more"}
            </span>
          )}
        </>
      ) : loading ? (
        <div className="w-full h-full grid place-content-center text-primary text-2xl font-medium">
          Loading...
        </div>
      ) : (
        <div className="w-full h-full grid place-content-center text-primary text-2xl font-medium">
          No post found
        </div>
      )}
    </div>
  );
}
