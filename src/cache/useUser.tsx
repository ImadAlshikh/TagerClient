import { useQuery } from "@tanstack/react-query";
import axios from "axios";
import { picture } from "motion/react-client";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      const res = await axios.get("http://localhost:3001/users/profile", {
        withCredentials: true,
      });
      if (!res.data.success) {
        return null;
      }
      return { ...res.data.data, picture: res.data.data.picture.secureUrl };
    },
    retry: false,
    staleTime: 0,
  });
};
