"use client";
import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ContactButton({
  id,
  ownerId,
}: {
  id: string;
  ownerId: string;
}) {
  const { user } = useUserStore();
  if (!user) return;
  const router = useRouter();
  const contact = async () => {
    const res = await axios.post(
      "http://localhost:3001/chats",
      { postId: id },
      { withCredentials: true }
    );
    if (res.data.success) {
      router.push(`/chats/${res.data.data}?postId=${id}`);
    }
  };
  if (user && user.id === ownerId) return;
  return (
    <button
      onClick={contact}
      className="bg-primary select-none self-end hover:bg-primary-dark px-8 py-1 rounded-full text-center text-white cursor-pointer"
    >
      Contact
    </button>
  );
}
