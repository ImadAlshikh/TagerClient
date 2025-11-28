import React from "react";
import type { SearchParams } from "next/dist/server/request/search-params";

export default async function page({
  searchParams,
}: {
  searchParams: SearchParams;
}) {
  const query = searchParams.query || "";
  return <div>{query}</div>;
}
