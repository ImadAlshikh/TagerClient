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
        console.log(res.data);
        return res.data.data;
      }
    },
    staleTime: 0,
    enabled: !!chatId,
    placeholderData: keepPreviousData,
  });
};
