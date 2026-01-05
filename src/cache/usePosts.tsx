import { PostType } from "@/utils/validator";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

const LIMIT = 5;

export function usePosts() {
  return useInfiniteQuery({
    queryKey: ["posts"],
    queryFn: async ({ pageParam }) => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?limit=${LIMIT}&cursor=${pageParam}`
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
