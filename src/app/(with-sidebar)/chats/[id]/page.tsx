"use client";
import axios from "axios";
import { use, useRef, useEffect, useState, useLayoutEffect } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { IoMdSend } from "react-icons/io";
import { queryClient } from "@/providers/QueryProvider";
import MessageNode from "@/components/ui/nodes/MessageNode";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import { BiSolidLeftArrow } from "react-icons/bi";
import { useChat } from "@/cache/useChat";
import { useUser } from "@/cache/useUser";
import { useChatSocket } from "@/hooks/useChatSocket";

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { data: user } = useUser();
  const { data, isLoading, refetch } = useChat(id);

  useChatSocket(id, (msg: any) => {
    if (msg.senderId !== user?.id) {
      setMessages((prev) => [...prev, msg]);
    }
  });
  const userData =
    user?.id === data?.user.id
      ? {
          name: data?.post.owner.name,
          surname: data?.post.owner.surname,
          picture: data?.post.owner.picture?.secureUrl,
        }
      : {
          name: data?.user?.name,
          surname: data?.user?.surname,
          picture: data?.user?.picture.secureUrl,
        };

  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  if (!postId) return notFound();
  const messageInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();
  const [messages, setMessages] = useState<
    { tempId?: string; text: string; senderId: string; created_at: string }[]
  >([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current)
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    queryClient.invalidateQueries({ queryKey: ["chats"] });
  }, [id]);

  useLayoutEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
    queryClient.invalidateQueries({ queryKey: ["chats"] });
  }, [messages]);

  useLayoutEffect(() => {
    (async () => {
      setMessages(data?.messages);
    })();
    return () => {};
  }, [isLoading, data]);

  const sendMessage = async () => {
    if (messageInputRef.current) {
      const text = messageInputRef.current.value.trim();
      if (!text.length) return;
      const tempId = new Date().toISOString();
      setMessages((prev) => [
        ...prev,
        {
          tempId: tempId,
          text,
          senderId: user!.id,
          created_at: new Date().toISOString(),
        },
      ]);
      messageInputRef.current.value = "";
      const res = await axios.post(
        "http://localhost:3001/chats/send",
        {
          postId: postId,
          chatId: id,
          text,
        },
        { withCredentials: true },
      );
      if (!res.data.success) {
        setMessages((prev) => prev.filter((msg) => msg?.tempId !== tempId));
        return;
      }
      setMessages((prev) =>
        prev.map((msg) => (msg?.tempId === tempId ? res.data.data : msg)),
      );
    }
  };

  return (
    <ProtectedRoute>
      <div className="flex flex-col h-full">
        <div className="head border-b py-6 mb-2 px-2 bg-white sticky top-[3.5rem] z-10 border-border w-full h-10 flex items-center gap-1 shadow-sm">
          <button
            onClick={() => router.push("/chats")}
            className="p-1 hover:bg-gray-100 rounded-full transition-colors"
          >
            <BiSolidLeftArrow size={18} />
          </button>
          {userData.name ? (
            <div className="flex items-center gap-2">
              <img
                src={userData.picture || "/userPlaceholder.png"}
                className="size-8 bg-border rounded-full object-cover"
              />
              <div className="font-semibold text-gray-800">
                {userData.name + " " + (userData?.surname ?? "")}
              </div>
            </div>
          ) : (
            <div className="flex items-center gap-2">
              <div className="size-8 bg-gray-200 rounded-full animate-pulse" />
              <div className="w-32 h-4 rounded-md bg-gray-200 animate-pulse" />
            </div>
          )}
        </div>

        <div className="body grow overflow-y-auto flex flex-col gap-1 px-2 pb-24 max-w-full">
          {messages?.length ? (
            <>
              {messages?.map((msg, i) => (
                <MessageNode
                  key={i}
                  text={msg.text}
                  time={msg.created_at}
                  isOwner={msg.senderId === user?.id}
                />
              ))}
            </>
          ) : (
            <div className="w-full h-full flex items-center justify-center text-gray-500">
              No messages yet
            </div>
          )}
          <div ref={bottomRef}></div>
        </div>

        <div className="foot sticky bottom-0 bg-white w-full border-t border-border p-3 flex items-center gap-2 shadow-[0_-4px_6px_-1px_rgba(0,0,0,0.05)]">
          <div className="relative flex-1">
            <input
              type="text"
              ref={messageInputRef}
              placeholder="Type a message..."
              className="w-full pl-4 pr-10 py-2.5 bg-gray-50 border border-gray-200 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button
              onClick={sendMessage}
              className="absolute right-1.5 top-1/2 -translate-y-1/2 p-1.5 bg-primary/10 hover:bg-primary/20 text-primary rounded-full transition-colors"
            >
              <IoMdSend size={18} />
            </button>
          </div>
        </div>
      </div>
    </ProtectedRoute>
  );
}
