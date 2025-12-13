import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useChats = (userId?: string) => {
  return useQuery({
    queryKey: ["chats", userId],
    queryFn: async () => {
      const res = await axios.get(
        `http://localhost:3001/chats/by-user/${userId}`,
        { withCredentials: true }
      );
      if (res.data.success) {
        return res.data.data;
      }
    },
    staleTime: 1000 * 3,
    gcTime: 1000 * 60 * 3,
    enabled: !!userId,
    placeholderData: keepPreviousData,
  });
};
