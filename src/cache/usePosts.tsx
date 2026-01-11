import { PostType } from "@/utils/validator";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePosts(
  {
    limit,
    searchQuery,
  }: {
    limit?: number;
    searchQuery?: string;
  } = { limit: 10 }
) {
  return useInfiniteQuery({
    queryKey: ["posts", { limit, searchQuery }],
    queryFn: async ({ pageParam }) => {
      const res = await axios.get(
        `http://localhost:3001/posts?limit=${limit}&cursor=${pageParam}&searchQuery=${searchQuery}`
      );
      return res.data.data;
    },
    getNextPageParam: (lastPage: any) => {
      const posts: PostType[] = lastPage.posts;
      if (!posts.length) return undefined;
      return posts.at(-1)?.created_at;
    },
    initialPageParam: undefined,
  });
}
