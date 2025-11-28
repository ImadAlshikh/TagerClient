import { ReactElement } from "react";
import { IoSearch } from "react-icons/io5";

export default function Sidebar() {
  const sections: { name: string; icon?: ReactElement }[] = [
    { name: "search", icon: <IoSearch size={22} /> },
  ];

  return (
    <div>
      {sections[0].name}
      {sections[0].icon}
    </div>
  );
}
