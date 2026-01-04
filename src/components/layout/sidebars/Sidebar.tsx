"use client";
import { ReactElement, useEffect, useRef, useState } from "react";
import { IoChatbubblesSharp } from "react-icons/io5";
import { IoMdSettings } from "react-icons/io";
import { MdExplore } from "react-icons/md";
import { CgProfile } from "react-icons/cg";
import { FiPlus } from "react-icons/fi";
import Link from "next/link";
import { useUiStore } from "@/stores/useUiStore";

export default function Sidebar() {
  const sidebarRef = useRef<HTMLElement | null>(null);
  const [isSmallScreen, setIsSmallScreen] = useState<boolean>(false);
  const showSideBar = useUiStore((s) => s.showSideBar);
  const setShowSideBar = useUiStore((s) => s.setShowSideBar);

  useEffect(() => {
    const resizeHandler = () => {
      setIsSmallScreen(window.innerWidth < 768);
      console.log("sie:", window.innerWidth < 768);
    };
    resizeHandler();
    addEventListener("resize", resizeHandler);

    return () => removeEventListener("resize", resizeHandler);
  }, []);

  useEffect(() => {
    if (isSmallScreen && showSideBar) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }
  }, [isSmallScreen, showSideBar]);

  const sections: {
    url: string;
    name: string;
    icon?: ReactElement;
    color?: string;
  }[] = [
    { url: "/new-post", name: "New Post", icon: <FiPlus size={18} /> },
    { url: "/explore", name: "Explore", icon: <MdExplore size={18} /> },
    { url: "/chats", name: "Chats", icon: <IoChatbubblesSharp size={18} /> },
    { url: "/settings", name: "Settings", icon: <IoMdSettings size={18} /> },
    { url: "/profile", name: "Profile", icon: <CgProfile size={18} /> },
  ];

  return (
    <>
      <aside
        ref={sidebarRef}
        className={`side-bar ${
          isSmallScreen && "h-full"
        } absolute md:relative md:block  duration-150 transition-all select-none p-4  flex-col ltr:border-l rtl:border-r z-10 border-border bg-white w-80! min-h-[calc(100vh-56px)] ltr: translate-x-0 ${
          isSmallScreen && !showSideBar && "ltr:-translate-x-full"
        }`}
      >
        <div className="sticky top-18">
          <Link href={"/"} className="text-primary font-bold text-xl">
            Tager
          </Link>
          {sections.map((section, i) => (
            <Link
              key={i}
              href={section.url}
              className="px-2 py-1 flex items-center gap-1 rounded-md font-bold bg-white hover:bg-border"
            >
              {section.icon}
              <span>{section.name}</span>
            </Link>
          ))}
        </div>
      </aside>
      <div
        onClick={() => setShowSideBar(false)}
        className={`${
          showSideBar && isSmallScreen ? "fixed" : "hidden"
        } inset-0  bg-black/60 z-9`}
      >
        hello
      </div>
    </>
  );
}
