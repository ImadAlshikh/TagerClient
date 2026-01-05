"use client";
import axios from "axios";
import { use, useRef, useEffect, useState, useLayoutEffect } from "react";
import { notFound, useRouter, useSearchParams } from "next/navigation";
import { IoMdSend } from "react-icons/io";
import { io } from "socket.io-client";
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
  useChatSocket(id, user?.id, (msg: any) => {
    console.log(msg);
    if (msg.senderId !== user?.id) {
      setMessges((prev) => [...prev, msg]);
    }
  });
  const userData =
    user?.id === data?.userId
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
  const [messages, setMessges] = useState<
    { tempId?: string; text: string; senderId: string; created_at: string }[]
  >([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  // useEffect(() => {
  //   if (!user || !id) return;
  //   socket.emit("join-chat", { chatId: id, userId: user!.id });

  //   const listener = (msg: any) => {
  //     if (msg.senderId !== user?.id) {
  //       setMessges((prev) => [...prev, msg]);
  //     }
  //   };

  //   socket.on("new-msg", listener);

  //   return () => {
  //     socket.off("new-msg", listener);
  //     socket.emit("leave-chat", id);
  //   };
  // }, [id, user]);

  useLayoutEffect(() => {
    (async () => {
      setMessges(data?.messages);
    })();
    return () => {};
  }, [isLoading]);
  const sendMessage = async () => {
    if (messageInputRef.current) {
      const text = messageInputRef.current.value.trim();
      if (!text.length) return;
      const tempId = new Date().toISOString();
      setMessges((prev) => [
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
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/chats/send`,
        {
          postId: postId,
          chatId: id,
          text,
        },
        { withCredentials: true }
      );
      if (!res.data.success) {
        setMessges((prev) => prev.filter((msg) => msg?.tempId !== tempId));
        return;
      }
      setMessges((prev) =>
        prev.map((msg) => (msg?.tempId === tempId ? res.data.data : msg))
      );
      refetch();
    }
  };

  return (
    <ProtectedRoute>
      <div className='flex flex-col'>
        <div className='head border-b py-6 mb-2 px-2  bg-white sticky! top-14 border-border w-full h-10 flex items-center gap-1'>
          <BiSolidLeftArrow size={18} onClick={() => router.push("/chats")} />
          {userData.name ? (
            <>
              <img
                src={userData.picture || "/userPlaceholder.png"}
                className='size-8 bg-border rounded-full'
              />
              <div>{userData.name + " " + (userData?.surname ?? "")}</div>
            </>
          ) : (
            <>
              <div className='size-8 bg-gray-300 rounded-full animate-pulse' />
              <div className='w-24 h-4 rounded-md bg-gray-300 animate-pulse' />
            </>
          )}
        </div>

        <div className='body grow overflow-y-auto flex flex-col gap-1 px-2 pb-24'>
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
            <div className='w-full grid place-content-center'>
              No there messages yet
            </div>
          )}
          <div ref={bottomRef}></div>
        </div>

        <div className='foot fixed bottom-0 bg-white w-full md:max-w-[calc(100%-320px)] border-t border-border h-12 flex items-center gap-2 px-2'>
          <input
            type='text'
            ref={messageInputRef}
            placeholder='Enter a message'
            className='flex-1 h-full px-4 py-2 focus:outline-border'
            onKeyDown={(e) => e.key === "Enter" && sendMessage()}
          />
          <button
            onClick={sendMessage}
            className='send bg-primary hover:bg-primary-dark p-2 rounded-lg'
          >
            <IoMdSend color='white' size={22} />
          </button>
        </div>
      </div>
    </ProtectedRoute>
  );
}
