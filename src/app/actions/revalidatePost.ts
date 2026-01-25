"use server";

import { updateTag } from "next/cache";

export const revalidatePost = async (id: string) => {
  updateTag(`post-${id}`);
};
