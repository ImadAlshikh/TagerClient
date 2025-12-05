import Link from "next/link";
import { FiPlus } from "react-icons/fi";

export default function AddPostButton() {
  return (
    <Link
      href={"/new-post"}
      className="rounded-full self-start bg-primary text-white font-bold hover:bg-primary-dark px-4 py-1 flex items-center"
    >
      <FiPlus color="white" size={22} />
      Add Post
    </Link>
  );
}
