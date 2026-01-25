import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type PriceType = {
  id: string;
  credits: number;
  key: string;
};

export function usePrices() {
  return useQuery({
    queryKey: ["prices"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/credits/prices`,
      );
      return res.data.data as PriceType[];
    },
  });
}
