import { keepPreviousData, useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useChats = () => {
  return useQuery({
    queryKey: ["chats"],
    queryFn: async () => {
      const res = await axios.get(`http://localhost:3001/chats/by-user`, {
        withCredentials: true,
      });
      if (res.data.success) {
        return res.data.data;
      }
    },

    placeholderData: keepPreviousData,
  });
};
