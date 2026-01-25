import { useQuery } from "@tanstack/react-query";
import axios from "axios";

export type PackageType = {
  id: string;
  name: string;
  credits: number;
  popular?: boolean;
  description?: string;
  price: {
    unit_amount: number;
    currency: string;
  };
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
