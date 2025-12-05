import React from "react";
import type { SearchParams } from "next/dist/server/request/search-params";

export default async function page({ params }: { params: { query: string } }) {
  const { query } = await params;
  return <div>{query}</div>;
}
