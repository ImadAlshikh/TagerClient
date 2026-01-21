"use client";
import { useUser } from "@/cache/useUser";
import axios from "axios";
import { useRouter } from "next/navigation";

export default function ContactButton({
  id,
  ownerId,
}: {
  id: string;
  ownerId: string;
}) {
  const { data: user } = useUser();
  const router = useRouter();
  if (!user) return;
  const contact = async () => {
    const res = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats`,
      { postId: id },
      { withCredentials: true },
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
