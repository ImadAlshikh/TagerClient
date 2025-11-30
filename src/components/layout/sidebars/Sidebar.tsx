"use client";
import { ReactElement, useEffect, useRef } from "react";
import { IoSearch } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { motion } from "motion/react";

export default function Sidebar({ visible }: { visible: boolean }) {
  const sidebarRef = useRef<HTMLElement>(null);
  console.log("visible:", visible);
  useEffect(() => {
    if (visible) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [visible]);

  const sections: { name: string; icon?: ReactElement; color?: string }[] = [
    { name: "search", icon: <IoSearch size={18} /> },
    { name: "explore", icon: <MdExplore size={18} /> },
    { name: "settings", icon: <IoMdSettings size={18} /> },
    { name: "profile", icon: <CgProfile size={18} /> },
    {
      name: "logout",
      icon: <FiLogOut color="red" size={18} />,
      color: "red",
    },
  ];

  return (
    <aside
      ref={sidebarRef}
      className={`side-bar visible md:hidden absolute overflow-hidden  h-full duration-500 ltr:right-0 rtl:-left-[50%] transition-all  select-none top-full p-4 flex flex-col ltr:border-l rtl:border-r z-10 border-border bg-white w-80! min-h-screen ${
        visible ? "ltr: translate-x-0" : "ltr:translate-x-full"
      }`}
    >
      <h2 className="text-primary font-bold text-xl">Tager</h2>
      {sections.map((section, i) => (
        <div
          key={i}
          className={`px-2 flex items-center gap-1 font-bold bg-white ${
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
