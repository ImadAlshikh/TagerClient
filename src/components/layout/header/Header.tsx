"use client";
import SearchBar from "@/components/ui/search/SearchBar";
import UserProfile from "./UserProfile";
import { CiMenuBurger } from "react-icons/ci";
import { useState } from "react";
import Sidebar from "../sidebars/Sidebar";
import Link from "next/link";

export default function Header() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const [authed, setAuthed] = useState<boolean>(false);
  return (
    <header className="w-full bg-white overflow-x-clip relative border-b p-2 text-text border-border">
      <div className="header-container container mx-auto flex justify-between items-center ">
        <Link href={"/"} className="text-primary font-bold text-2xl">
          Tager
        </Link>
        <div className="flex items-center gap-1">
          <SearchBar />
          {authed ? (
            <UserProfile />
          ) : (
            <div className="flex items-center gap-0">
              <button
                type="button"
                className="bg-primary hover:bg-primary-dark text-white rounded-full px-3 py-1 font-bold flex-1"
              >
                Login
              </button>
              <span className="text-3xl">/</span>
              <button
                type="button"
                className="bg-white hover:bg-bg border border-primary text-primary font-bold flex-1 rounded-full px-3 py-1 "
              >
                Signin
              </button>
            </div>
          )}

          <button type="button" onClick={() => setShowMenu((prev) => !prev)}>
            <CiMenuBurger className="menu-button md:hidden" size={24} />
          </button>
        </div>
        <Sidebar visible={showMenu} />
      </div>
    </header>
  );
}
