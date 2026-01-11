"use client";
import React, { Suspense } from "react";
import { SearchParams } from "next/dist/server/request/search-params";
import { usePosts } from "@/cache/usePosts";
import PostsContainer from "@/components/layout/containers/PostsContainer";
import { useSearchParams } from "next/navigation";

function Page() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  let searchQuery = Array.isArray(q) ? q : q ? [q] : [];
  const { data, fetchNextPage, isLoading, isFetching } = usePosts({
    searchQuery: searchQuery.join(" "),
    limit: 2,
  });

  const posts = data?.pages.flatMap((page) => page.posts);
  const postsCount = data?.pages.flatMap((page) => page)[0].postsCount;

  return (
    <div className='flex w-full gap-4 p-4'>
      <div className=' flex w-full flex-col'>
        <div className='flex justify-between items-center '>
          <h2 className='px-2 max-w-[70%] line-clamp-1 '>
            Search results for
            <span className='font-semibold px-2 '>{searchQuery.join(" ")}</span>
          </h2>
          <div className='flex'>order by:</div>
        </div>
        <PostsContainer
          showMore={fetchNextPage}
          posts={posts}
          postsCount={postsCount}
          loading={isLoading || isFetching}
        />{" "}
      </div>
    </div>
  );
}

export default function SuspensedPage() {
  return (
    <Suspense
      fallback={
        <div className='text-primary w-full overflow-hidden h-[calc(100vh-56px)] font-bold text-2xl grid place-content-center place-items-center gap-8 animate-pulse'>
          <img src='/logo/textColor-logo.png' alt='' className='size-32 ' />
          <div>Loading</div>
        </div>
      }
    >
      <Page />
    </Suspense>
  );
}
