"use client";
import { ReactElement, useEffect, useRef, useState } from "react";
import { IoSearch, IoChatbubblesSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { useUiStore } from "@/stores/useUiStore";

export default function Sidebar() {
  const { showSidebar } = useUiStore();
  const sidebarRef = useRef<HTMLElement>(null);

  useEffect(() => {
    // if (visiblity) {
    //   document.body.style.overflow = "hidden";
    // } else {
    //   document.body.style.overflow = "auto";
    // }
  }, []);

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
      className={`side-bar absolute md:static overflow-hidden  h-full duration-500 ltr:riht-0 rtl:-eft-[50%] transition-all select-none top-full p-4 flex flex-col ltr:border-l rtl:border-r z-10 border-border bg-white w-80! min-h-screen ${
        showSidebar ? "ltr: translate-x-0" : "ltr:translate-x-full"
      }`}
    >
      <h2 className="text-primary font-bold text-xl">Tager</h2>
      {sections.map((section, i) => (
        <div
          key={i}
          className={`px-2 py-1 flex items-center gap-1 rounded-md font-bold bg-white hover:bg-bg  ${
            section.color?.length ? `text-red-500` : ""
          }`}
        >
          <div>{section.icon}</div>
          <div className={`${section.color && `text-${section.color}-500`}`}>
            {section.name}
          </div>
        </div>
      ))}
    </aside>
  );
}
