import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export const useUser = () => {
  return useQuery({
    queryKey: ["user"],
    queryFn: async () => {
      try {
        const res = await axios.get(
          "process.env.NEXT_PUBLIC_BACKEND_URL/users/profile",
          {
            withCredentials: true,
          }
        );
        if (!res.data.success) {
          return null;
        }
        return { ...res.data.data, picture: res.data.data.picture?.secureUrl };
      } catch (error) {
        return null;
      }
    },
    retry: false,
    staleTime: 0,
  });
};
