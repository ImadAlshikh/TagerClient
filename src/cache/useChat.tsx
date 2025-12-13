import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useChat = (chatId: string) => {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3001/chats/${chatId}`, {
        withCredentials: true,
      });
      if (res.data.success) {
        return res.data.data;
      }
    },
    staleTime: 1000 * 3,
    gcTime: 1000 * 60 * 3,
    enabled: !!chatId,
    placeholderData: keepPreviousData,
  });
};
