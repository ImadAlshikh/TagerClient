"use client";
import SearchBar from "@/components/ui/search/SearchBar";
import UserProfile from "./UserProfile";
import { useUserStore } from "@/stores/useUserStore";
import { CiMenuBurger } from "react-icons/ci";
import { useEffect, useState } from "react";
import Sidebar from "../sidebars/Sidebar";
import Link from "next/link";
import axios from "axios";

export default function Header() {
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const { user, setUser, logout, loading, setLoading } = useUserStore();

  useEffect(() => {
    setLoading(true);
    axios
      .get("http://localhost:3001/users/profile", {
        withCredentials: true,
      })
      .then((res) => {
        if (!res.data.success) {
          return () => {
            logout();
            setLoading(false);
          };
        }
        setUser(res.data.data);
        localStorage.setItem("userPic", res.data.data?.picture);
        setLoading(false);
      })
      .catch((e) => {
        logout();
        setLoading(false);
      });
  }, []);

  return (
    <header className="select-none fixed z-50 h-14 w-full bg-white overflow-x-clip  border-b p-2 text-text border-border">
      <div className="header-container container mx-auto flex justify-between items-center ">
        <Link href={"/"} className="text-primary font-bold text-2xl">
          Tager
        </Link>
        <div className="flex items-center gap-1">
          <SearchBar />
          {loading ? (
            <div className="w-8  aspect-square! bg-border animate-pulse rounded-full" />
          ) : (
            <>
              {user?.id ? (
                <UserProfile />
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

          <button type="button" onClick={() => setShowMenu((prev) => !prev)}>
            <CiMenuBurger className="menu-button md:hidden" size={24} />
          </button>
        </div>
        {/* <Sidebar visible={showMenu} /> */}
      </div>
    </header>
  );
}
