"use client";
import { useUser } from "@/cache/useUser";
import Link from "next/link";
import { FiEdit2 } from "react-icons/fi";

export default function EditButton({
  postId,
  ownerId,
}: {
  postId: string;
  ownerId: string;
}) {
  const { data: user } = useUser();

  if (!user || user.id !== ownerId) return null;

  return (
    <Link
      href={`/post/${postId}/edit`}
      className="flex items-center gap-2 bg-gray-100 hover:bg-gray-200 text-gray-700 px-4 py-1.5 rounded-full transition-colors text-sm font-medium"
    >
      <FiEdit2 size={14} />
      <span>Edit</span>
    </Link>
  );
}
