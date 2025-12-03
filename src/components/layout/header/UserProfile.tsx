import { useUserStore } from "@/stores/useUserStore";
import { IoMdSettings } from "react-icons/io";
import { CgProfile } from "react-icons/cg";
import { FiLogOut } from "react-icons/fi";
import { ReactElement, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";

export default function UserProfile() {
  const { user, logout } = useUserStore();
  const [showMenu, setShowMenu] = useState<boolean>(false);
  const router = useRouter();

  const sections: {
    name: string;
    icon?: ReactElement;
    color?: string;
    onClick?: () => void;
  }[] = [
    {
      name: "Profile",
      icon: <CgProfile size={18} />,
      onClick: () => router.push("/profile"),
    },
    {
      name: "Settings",
      icon: <IoMdSettings size={18} />,
      onClick: () => router.push("/settings"),
    },

    {
      name: "Logout",
      icon: <FiLogOut color="red" size={18} />,
      color: "red",
      onClick: async () => {
        logout();
        await axios.delete("http://localhost:3001/users/logout", {
          withCredentials: true,
        });
      },
    },
  ];

  return (
    <div
      onMouseEnter={() => setShowMenu(true)}
      onMouseLeave={() => setShowMenu(false)}
      className="relative"
    >
      <img
        src={user?.picture}
        className="w-8  aspect-square! bg-border rounded-full"
      />
      {showMenu && (
        <div className="absolute p-2 z-10 left-1/2 -translate-x-1/2  bg-white border border-border rounded-md top-full">
          {sections.map((section, i) => (
            <button
              key={i}
              className={`px-2 py-1 w-full flex items-center gap-1 rounded-md font-bold bg-white hover:bg-bg  ${
                section.color?.length ? `text-red-500` : ""
              }`}
              onClick={section.onClick}
            >
              <div>{section.icon}</div>
              <div
                className={`${section.color && `text-${section.color}-500`}`}
              >
                {section.name}
              </div>
            </button>
          ))}
        </div>
      )}
    </div>
  );
}
