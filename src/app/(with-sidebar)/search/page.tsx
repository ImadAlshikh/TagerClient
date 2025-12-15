import axios from "axios";
import { SearchParams } from "next/dist/server/request/search-params";
import PostCard from "@/components/ui/cards/PostCard";
import type { PostType } from "@/utils/validator";
import React from "react";
import { div } from "motion/react-client";

export default async function page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const { q } = await searchParams;
  const searchQuery = Array.isArray(q) ? q : q ? [q] : [];
  const res = await axios.post(`http://localhost:3001/posts/search`, {
    query: searchQuery,
  });
  const posts = res.data.data;
  return (
    <div className="p-4 flex flex-col">
      <h2 className="px-2 max-w-full line-clamp-1">
        Search results for{" "}
        <span className="font-semibold">{searchQuery.join(",")}</span>
      </h2>
      <div className="w-full flex flex-wrap gap-1 justify-center ">
        {posts?.map((post: PostType) => (
          <PostCard post={post} key={post.id} />
        ))}
      </div>
    </div>
  );
}
