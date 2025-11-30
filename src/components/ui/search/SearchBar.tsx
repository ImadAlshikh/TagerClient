import React from "react";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
  return (
    <div className="border px-2 max-md:aspect-square! border-border rounded-full flex justify-between items-center">
      <input
        name="search"
        id="search"
        placeholder="Search..."
        className="hidden md:block px-2 py-1  rounded-full focus:outline-0"
      />
      <IoSearch size={22} aria-label="search button" />
    </div>
  );
}
