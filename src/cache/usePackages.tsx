import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type PackageType = {
  id: string;
  name: string;
  description: string | null;
  stripePriceId: string | null;
  price: number;
  discount: number | null;
  credits: number;
  popular: boolean;
};

export function usePackages() {
  return useQuery({
    queryKey: ["packages"],
    queryFn: async () => {
      const res = await axios.get(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/credits/packages`,
      );
      return res.data.data as PackageType[];
    },
  });
}
