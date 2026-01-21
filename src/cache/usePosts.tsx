import { PostType } from "@/utils/validator";
import { useInfiniteQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePosts({
  limit = 10,
  searchQuery,
  orderBy,
  orderDir,
  category,
}: {
  limit?: number;
  searchQuery?: string;
  orderBy?: string;
  orderDir?: string;
  category?: string;
} = {}) {
  return useInfiniteQuery({
    queryKey: ["posts", { limit, searchQuery, orderBy, orderDir, category }],
    queryFn: async ({ pageParam }) => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/posts?limit=${limit}&cursor=${
          pageParam ?? ""
        }&searchQuery=${searchQuery ?? ""}&orderBy=${orderBy ?? ""}&orderDir=${
          orderDir ?? ""
        }&category=${category ?? ""}`,
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
