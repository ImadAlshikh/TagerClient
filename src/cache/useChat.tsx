import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useChat = (chatId: string) => {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const res = await axios.get(
        `process.env.NEXT_PUBLIC_BACKEND_URL/chats/${chatId}`,
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        return res.data.data;
      }
    },
    staleTime: 0,
    enabled: !!chatId,
    placeholderData: keepPreviousData,
  });
};
