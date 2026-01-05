import { IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { ReactElement, useState } from "react";
import axios from "axios";
import Link from "next/link";
import { useUser } from "@/cache/useUser";
import { useQueryClient } from "@tanstack/react-query";

export default function UserProfile() {
  const { data: user } = useUser();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const queryClient = useQueryClient();
  const sections: {
    name: string;
    icon?: ReactElement;
    color?: string;
    onClick?: () => void;
    href?: string;
  }[] = [
    {
      name: "Profile",
      icon: <CgProfile size={18} />,
      href: "/profile",
    },
    {
      name: "Settings",
      icon: <IoMdSettings size={18} />,
      href: "/settings",
    },

    {
      name: "Logout",
      icon: <FiLogOut color="red" size={18} />,
      color: "red",
    },
  ];

  return (
    <div
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      className="relative z-50"
    >
      <img
        src={user?.picture || "./userPlaceholder.png"}
        className="size-8 bg-border rounded-full"
      />
      {showMenu && (
        <div className="absolute p-2 z-10 left-1/2 -translate-x-1/2  bg-white border border-border rounded-md top-full">
          <Link
            href={"/profile"}
            className={`px-2 py-1 w-full flex items-center gap-1 rounded-md font-bold bg-white hover:bg-bg 
            }`}
          >
            <CgProfile size={18} />
            <div>Profile</div>
          </Link>
          <Link
            href={"/settings"}
            className={`px-2 py-1 w-full flex items-center gap-1 rounded-md font-bold bg-white hover:bg-bg 
            }`}
          >
            <IoMdSettings size={18} />
            <div>Settings</div>
          </Link>
          <div
            onClick={async () => {
              const res = await axios.delete(
                `${process.env.NEXT_PUBLIC_BACKEND_URL}/users/logout`,
                {
                  withCredentials: true,
                }
              );
              if (res.data.success) {
                queryClient.setQueryData(["user"], null);
              }
            }}
            className={`px-2 py-1 w-full flex items-center gap-1 rounded-md font-bold bg-white hover:bg-bg 
            }`}
          >
            <FiLogOut color="red" size={18} />
            <div className="text-red-500">Logout</div>
          </div>
        </div>
      )}
    </div>
  );
}
