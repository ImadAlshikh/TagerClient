"use client";
import SearchBar from "@/components/ui/search/SearchBar";
import UserProfile from "./UserProfile";
import { CiMenuBurger } from "react-icons/ci";
import Link from "next/link";
import { useUser } from "@/cache/useUser";
import { useUiStore } from "@/stores/useUiStore";
import { useEffect, useState } from "react";

export default function Header() {
  const showSideBar = useUiStore((s) => s.showSideBar);
  const setShowSideBar = useUiStore((s) => s.setShowSideBar);
  const toggleShowSideBar = useUiStore((s) => s.toggleShowSideBar);
  const { data: user, isLoading } = useUser();

  return (
    <header className="select-none fixed z-50 h-14 w-full bg-white overflow-x-clip  border-b p-2 text-text border-border">
      <div className="header-container container mx-auto flex justify-between items-center ">
        <Link href={"/"} className="text-primary font-bold text-2xl">
          Tager
        </Link>
        <div className="flex items-center gap-1">
          <SearchBar />
          {isLoading ? (
            <div className="flex items-center">
              <div className="h-6 w-10 bg-gray-50 animate-pulse rounded-full"></div>
              <div className="w-8  aspect-square! bg-border animate-pulse rounded-full" />
            </div>
          ) : (
            <>
              {user?.id?.length ? (
                <>
                  <div className="flex items-center px-2 rounded-full bg-gray-50 gap-0.5">
                    <img src="/coin.png" className="size-5 rounded-full" />
                    <span>{user.wallet?.freePoints}</span>
                  </div>
                  <UserProfile />
                </>
              ) : (
                <div className="flex items-center gap-0">
                  <Link
                    href={"/login"}
                    type="button"
                    className="bg-primary hover:bg-primary-dark text-white rounded-full px-3 py-1 font-bold flex-1"
                  >
                    Login
                  </Link>
                  <span className="text-3xl">/</span>
                  <Link
                    href={"/signin"}
                    type="button"
                    className="bg-white hover:bg-bg border border-primary text-primary font-bold flex-1 rounded-full px-3 py-1 "
                  >
                    Signin
                  </Link>
                </div>
              )}
            </>
          )}

          <button
            type="button"
            onClick={(e) => {
              console.log("its", showSideBar);
              e.stopPropagation();
              if (showSideBar) {
                setShowSideBar(false);
              } else {
                setShowSideBar(true);
              }
            }}
          >
            <CiMenuBurger className="menu-button md:hidden" size={24} />
          </button>
        </div>
        {/* <Sidebar visible={showMenu} /> */}
      </div>
    </header>
  );
}
