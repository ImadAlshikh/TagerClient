"use client";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";

export default function SearchBar({ placeholder }: { placeholder: string }) {
  const router = useRouter();

  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value.trim();
      if (!value.length) {
        return;
      }
      router.push(`/search?q=${value}`);
    }
  };
  return (
    <div className="border px-2 border-border rounded-full flex justify-between items-center">
      <input
        name="search"
        id="search"
        placeholder={`${placeholder}...`}
        className="block w-[120px] md:w-auto px-2 py-1 rounded-full focus:outline-0 bg-transparent text-sm"
        onKeyDown={handleSearch}
      />
      <IoSearch
        size={20}
        aria-label="search button"
        className="text-gray-500"
      />
    </div>
  );
}
