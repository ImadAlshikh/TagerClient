"use client";
import axios from "axios";
import { use, useRef, useEffect, useState } from "react";
import { notFound, useSearchParams } from "next/navigation";
import { IoMdSend } from "react-icons/io";
import { io } from "socket.io-client";
import MessageNode from "@/components/ui/nodes/MessageNode";
import { useUserStore } from "@/stores/useUserStore";
import { unknown } from "zod";

const socket = io("http://localhost:3001");

export default function page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const { user } = useUserStore();
  const searchParams = useSearchParams();
  const postId = searchParams.get("postId");
  if (!postId) return notFound();
  const messageInputRef = useRef<HTMLInputElement>(null);
  const [messages, setMessges] = useState<
    {
      text: string;
      senderId: string;
      created_at: string;
    }[]
  >([]);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (bottomRef.current) {
      bottomRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages]);

  useEffect(() => {
    if (!user) return;
    socket.emit("join-chat", id);

    const listener = (msg: any) => {
      console.log(msg.senderId, user?.id, user);
      if (msg.senderId !== user?.id) {
        setMessges((prev) => [...prev, msg]);
      }
    };

    socket.on("new-msg", listener);

    return () => {
      socket.off("new-msg", listener);
    };
  }, [id, user]);

  useEffect(() => {
    (async () => {
      try {
        const res = await axios.get(`http://localhost:3001/chats/${id}`, {
          withCredentials: true,
        });
        console.log(res.data);
        setMessges(res.data.data.messages);
      } catch (error) {
        window.location.href = "/not-found";
      }
    })();
    return () => {};
  }, []);

  const sendMessage = async () => {
    if (messageInputRef.current) {
      const text = messageInputRef.current.value;
      messageInputRef.current.value = "";
      const res = await axios.post(
        "http://localhost:3001/chats/send",
        {
          postId: postId,
          chatId: id,
          text,
        },
        { withCredentials: true }
      );
      setMessges((prev) => [...prev, res.data.data]);
      console.log(res);
    }
  };

  return (
    <div className="-mt-4 overflow-y-hidden flex flex-col">
      <div className="head border-b py-6 mb-2 px-2 bg-white sticky! top-0 border-border w-full h-10 flex items-center gap-1">
        <div className="w-8 h-8 bg-border rounded-full" />
        <div>Imad Alshikh</div>
      </div>

      <div className="body grow overflow-y-auto flex flex-col gap-1 px-2 pb-24">
        {messages?.map((msg, i) => (
          <MessageNode
            key={i}
            text={msg.text}
            time={msg.created_at}
            isOwner={msg.senderId === user?.id}
          />
        ))}
        <div ref={bottomRef}></div>
      </div>

      <div className="foot fixed bottom-0 bg-white w-full md:w-[80%] border-t border-border h-12 flex items-center gap-2 px-2">
        <input
          type="text"
          ref={messageInputRef}
          placeholder="Enter a message"
          className="flex-1 h-full px-4 py-2 focus:outline-border"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="send bg-primary hover:bg-primary-dark p-2 rounded-lg"
        >
          <IoMdSend color="white" size={22} />
        </button>
      </div>
    </div>
  );
}
