import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export function usePosts() {
  return useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/posts");
      return res;
    },
    staleTime: 1000 * 30,
    gcTime: 1000 * 60 * 3,
  });
}
