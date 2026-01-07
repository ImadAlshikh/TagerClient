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
  let posts;
  const { q } = await searchParams;
  const searchQuery = Array.isArray(q) ? q : q ? [q] : [];
  try {
    const res = await axios.get(
      `http://localhost:3001/posts/search?query=${searchQuery}`
    );
    posts = res.data.data;
    console.log(posts);
  } catch (error) {}

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
        <div className='w-full flex flex-wrap gap-1 justify-center '>
          {posts?.map((post: PostType) => (
            <PostCard post={post} key={post.id} />
          ))}
        </div>
      </div>
    </div>
  );
}
