"use client";
import { ReactElement, useEffect, useRef, useState } from "react";
import { IoSearch, IoChatbubblesSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiLogOut, FiPlus } from "react-icons/fi";
import Link from "next/link";

export default function Sidebar() {
  const showSidebar = true;
  const sidebarRef = useRef<HTMLElement>(null);

  // useEffect(() => {
  //   if (showSidebar) {
  //     document.body.style.overflow = "hidden";
  //   } else {
  //     document.body.style.overflow = "auto";
  //   }
  // }, []);

  // useEffect(() => {
  //   const checkOutClick = (e: MouseEvent) => {
  //     if (
  //       sidebarRef.current &&
  //       e.target instanceof Node &&
  //       !(
  //         e.target instanceof HTMLElement &&
  //         e.target.classList.contains("menu-button")
  //       ) &&
  //       !sidebarRef.current.contains(e.target)
  //     ) {
  //       setVisiblity(false);
  //     }
  //   };

  //   addEventListener("mousedown", checkOutClick);
  //   return () => removeEventListener("mousedown", checkOutClick);
  // }, []);

  const sections: { name: string; icon?: ReactElement; color?: string }[] = [
    { name: "Search", icon: <IoSearch size={18} /> },
    { name: "Explore", icon: <MdExplore size={18} /> },
    { name: "Chats", icon: <IoChatbubblesSharp size={18} /> },
    { name: "Settings", icon: <IoMdSettings size={18} /> },
    { name: "Profile", icon: <CgProfile size={18} /> },
    {
      name: "Logout",
      icon: <FiLogOut color="red" size={18} />,
      color: "red",
    },
  ];

  return (
    <aside
      ref={sidebarRef}
      className={`side-bar absolute md:relative  duration-500 ltr:riht-0 rtl:-eft-[50%] transition-all select-none p-4 flex flex-col ltr:border-l rtl:border-r z-10 border-border bg-white w-80! min-h-[calc(100vh-56px)] ${
        showSidebar ? "ltr: translate-x-0" : "ltr:-translate-x-full hidden"
      }`}
    >
      <div className="sticky top-18">
        <Link href={"/"} className="text-primary font-bold text-xl">
          Tager
        </Link>
        <Link
          href="/search"
          className="px-2 py-1 flex items-center gap-1 rounded-md font-bold bg-white hover:bg-bg"
        >
          <IoSearch size={18} />
          <span>Search</span>
        </Link>
        <Link
          href="/explore"
          className="px-2 py-1 flex items-center gap-1 rounded-md font-bold bg-white hover:bg-bg"
        >
          <MdExplore size={18} />
          <span>Explore</span>
        </Link>
        <Link
          href="/chats"
          className="px-2 py-1 flex items-center gap-1 rounded-md font-bold bg-white hover:bg-bg"
        >
          <IoChatbubblesSharp size={18} />
          <span>Chats</span>
        </Link>
        <Link
          href="/new-post"
          className="px-2 py-1 flex items-center gap-1 rounded-md font-bold bg-white hover:bg-bg"
        >
          <div className="bg-text rounded-full">
            <FiPlus size={18} color="white" />
          </div>

          <span>New Post</span>
        </Link>
        <Link
          href="/settings"
          className="px-2 py-1 flex items-center gap-1 rounded-md font-bold bg-white hover:bg-bg"
        >
          <IoMdSettings size={18} />
          <span>Settings</span>
        </Link>
        <Link
          href="/profile"
          className="md:hidden px-2 py-1 flex items-center gap-1 rounded-md font-bold bg-white hover:bg-bg"
        >
          <CgProfile size={18} />
          <span>Profile</span>
        </Link>
        <Link
          href=""
          className="md:hidden px-2 py-1 flex items-center gap-1 rounded-md font-bold bg-white hover:bg-bg text-red-500"
        >
          <FiLogOut size={18} color="red" />
          <span className="text-inherit">Logout</span>
        </Link>
      </div>

      {/* {sections.map((section, i) => (
        <Link
          href={
            section.name.toLowerCase() !== "logout"
              ? section.name.toLowerCase()
              : ""
          }
          key={i}
          className={`px-2 py-1 flex items-center gap-1 rounded-md font-bold bg-white hover:bg-bg  ${
            section.color?.length ? `text-red-500` : ""
          }`}
        >
          <div>{section.icon}</div>
          <div className={`${section.color && `text-${section.color}-500`}`}>
            {section.name}
          </div>
        </Link>
      ))} */}
    </aside>
  );
}
