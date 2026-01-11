"use client";
import { useRouter } from "next/navigation";
import { IoSearch } from "react-icons/io5";

export default function SearchBar() {
  const router = useRouter();
  const handleSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      const value = e.currentTarget.value.trim();
      if (!value.length) {
        return router.push("/");
      }
      router.push(`/search?q=${value}`);
    }
  };
  return (
    <div className='border px-2 max-md:aspect-square! border-border rounded-full flex justify-between items-center'>
      <input
        name='search'
        id='search'
        placeholder='Search...'
        className='hidden md:block px-2 py-1  rounded-full focus:outline-0'
        onKeyDown={handleSearch}
      />
      <IoSearch size={22} aria-label='search button' />
    </div>
  );
}
