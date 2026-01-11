"use client";

import { usePosts } from "@/cache/usePosts";
import PostCard from "@/components/ui/cards/PostCard";
import { PostType } from "@/utils/validator";

export default function RelatedPosts({
  category,
  currentPostId,
}: {
  category: string;
  currentPostId: string;
}) {
  const { data, isLoading } = usePosts({ searchQuery: category, limit: 5 });

  const posts = data?.pages
    .flatMap((page: any) => page.posts)
    .filter((post: PostType) => post.id !== currentPostId);

  if (!posts?.length && !isLoading) return null;

  return (
    <div className="flex flex-col gap-4 mt-8">
      <h3 className="text-xl font-bold">Related Posts</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {isLoading
          ? Array.from({ length: 3 }).map((_, i) => (
              <div
                key={i}
                className="h-50 bg-gray-100 animate-pulse rounded-md"
              />
            ))
          : posts
              ?.slice(0, 3)
              .map((post: PostType) => <PostCard key={post.id} post={post} />)}
      </div>
    </div>
  );
}
