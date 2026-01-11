import { useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

interface LoadCreditsParams {
  credits: number;
}

export const useLoadCredits = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({ credits }: LoadCreditsParams) => {
      const res = await axios.post(
        "http://localhost:3001/credits/load",
        { credits },
        { withCredentials: true }
      );
      return res.data;
    },
    onSuccess: () => {
      // Invalidate user query to refresh wallet balance
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });
};
