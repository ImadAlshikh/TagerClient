"use client";
import SearchBar from "@/components/ui/search/SearchBar";
import UserProfile from "./UserProfile";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import Sidebar from "../sidebars/Sidebar";

export default function Header() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  return (
    <header className="w-full overflow-x-clip relative border-b p-2 text-text border-border">
      <div className="header-container container mx-auto flex justify-between items-center ">
        <h1 className="text-primary font-bold text-2xl">Tager</h1>
        <div className="flex items-center gap-1">
          <SearchBar />
          <UserProfile />
          <button type="button" onClick={() => setShowMenu((prev) => !prev)}>
            <CiMenuBurger className="md:hidden" size={24} />
          </button>
        </div>
        <Sidebar visible={showMenu} />
      </div>
    </header>
  );
}
