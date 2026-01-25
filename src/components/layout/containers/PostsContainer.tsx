"use client";
import PostCard from "@/components/ui/cards/PostCard";
import SkeletonPostCard from "@/components/ui/cards/SkletonPostCard";
import { PostType } from "@/utils/validator";
import { useEffect, useRef, useState } from "react";

export default function PostsContainer({
  postsCount,
  showMore,
  posts,
  loading,
}: {
  postsCount?: number;
  showMore?: () => {};
  posts?: PostType[];
  loading: boolean;
}) {
  const [isWide, setIsWide] = useState<boolean>(false);
  const ref = useRef(null);
  useEffect(() => {
    if (!ref.current) return;
    const observer = new ResizeObserver(([entry]) => {
      if (entry.contentRect.width > 500 !== isWide)
        setIsWide(entry.contentRect.width > 500);
    });
    observer.observe(ref.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className="w-full! max-w-full h-full flex flex-col items-center gap-4"
    >
      {posts?.length ? (
        <>
          <div className="w-full flex flex-wrap gap-1">
            {posts?.map((post: any) => (
              <PostCard post={post} key={post.id} isWide={isWide} />
            ))}
          </div>
          {postsCount && posts.length < postsCount && (
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
          {Array.from({ length: 5 }).map((_, i) => (
            <SkeletonPostCard key={i} isWide={isWide} />
          ))}
        </>
      ) : (
        <div className="w-full h-full grid place-content-center text-gray-500">
          No post found
        </div>
      )}
    </div>
  );
}
