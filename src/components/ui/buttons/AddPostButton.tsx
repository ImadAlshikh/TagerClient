import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default function AddPostButton() {
  return (
    <Link
      href={"/new-post"}
      className="add-post-button rounded-full self-start fixed z-52 right-4 md:right-12 bottom-16 aspect-square! bg-primary text-white font-bold hover:bg-primary-dark px-4 py-1 flex items-center"
    >
      <FiPlus color="white" size={22} />
    </Link>
  );
}
