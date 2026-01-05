import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useChats = () => {
  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const res = await axios.get(
        `process.env.NEXT_PUBLIC_BACKEND_URL/chats/by-user`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        return res.data.data;
      }
    },

    placeholderData: keepPreviousData,
  });
};
