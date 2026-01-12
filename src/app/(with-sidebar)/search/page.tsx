"use client";
import { Suspense } from "react";
import { usePosts } from "@/cache/usePosts";
import PostsContainer from "@/components/layout/containers/PostsContainer";
import { useSearchParams } from "next/navigation";

import { useState } from "react";

import { POST_CATEGORIES } from "@/constants/categories";

function Page() {
  const searchParams = useSearchParams();
  const q = searchParams.get("q");
  let searchQuery = Array.isArray(q) ? q : q ? [q] : [];

  const [sortOrder, setSortOrder] = useState<
    "newest" | "price_asc" | "price_desc"
  >("newest");
  const [selectedCategory, setSelectedCategory] = useState<string>("");

  let orderBy: string | undefined;
  let orderDir: string | undefined;

  if (sortOrder === "newest") {
    orderBy = "created_at";
    orderDir = "desc";
  } else if (sortOrder === "price_asc") {
    orderBy = "price";
    orderDir = "asc";
  } else if (sortOrder === "price_desc") {
    orderBy = "price";
    orderDir = "desc";
  }

  const { data, fetchNextPage, isLoading, isFetching } = usePosts({
    searchQuery: searchQuery.join(" "),
    orderBy,
    orderDir,
    category: selectedCategory || undefined,
  });

  const posts = data?.pages.flatMap((page) => page.posts);
  const postsCount = data?.pages.flatMap((page) => page)[0]?.postsCount;

  return (
    <div className="flex w-full gap-4 p-4">
      <div className=" flex w-full flex-col">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6 gap-4">
          <h2 className="px-2 w-full md:max-w-[60%] line-clamp-1 text-lg">
            Search results for
            <span className="font-semibold px-2 ">{searchQuery.join(" ")}</span>
          </h2>
          <div className="flex flex-wrap items-center gap-4 w-full md:w-auto">
            <div className="flex items-center gap-2 flex-1 sm:flex-none">
              <span className="text-gray-600 text-sm whitespace-nowrap">
                Category:
              </span>
              <select
                value={selectedCategory}
                onChange={(e) => setSelectedCategory(e.target.value)}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white outline-none focus:border-primary w-full sm:w-[150px]"
              >
                <option value="">All Categories</option>
                {POST_CATEGORIES.filter((c) => c.value).map((category) => (
                  <option key={category.value} value={category.value}>
                    {category.label}
                  </option>
                ))}
              </select>
            </div>
            <div className="hidden sm:block h-6 w-[1px] bg-gray-300"></div>
            <div className="flex items-center gap-2 flex-1 sm:flex-none">
              <span className="text-gray-600 text-sm whitespace-nowrap">
                Order by:
              </span>
              <select
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value as any)}
                className="border border-gray-300 rounded-md px-2 py-1 text-sm bg-white outline-none focus:border-primary w-full sm:w-auto"
              >
                <option value="newest">Newest</option>
                <option value="price_asc">Price: Low to High</option>
                <option value="price_desc">Price: High to Low</option>
              </select>
            </div>
          </div>
        </div>
        <PostsContainer
          showMore={fetchNextPage}
          posts={posts}
          postsCount={postsCount}
          loading={isLoading || isFetching}
        />
      </div>
    </div>
  );
}

export default function SuspensedPage() {
  return (
    <Suspense
      fallback={
        <div className="text-primary w-full overflow-hidden h-[calc(100vh-56px)] font-bold text-2xl grid place-content-center place-items-center gap-8 animate-pulse">
          <img src="/logo/textColor-logo.png" alt="" className="size-32 " />
          <div>Loading</div>
        </div>
      }
    >
      <Page />
    </Suspense>
  );
}
