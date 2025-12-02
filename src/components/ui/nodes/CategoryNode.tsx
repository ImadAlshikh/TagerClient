import React from "react";

export default function CategoryNode({ category }: { category: string }) {
  return (
    <div className="bg-border opacity-80 rounded-full px-2 py-1">
      {category}
    </div>
  );
}
