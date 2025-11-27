import React from "react";

export default function NavigationButton({ number }: { number: number }) {
  return (
    <button
      type="button"
      className="bg-primary rounded-md p-2 aspect-square! w-10 hover:bg-primary-dark text-white font-bold"
    >
      {number}
    </button>
  );
}
