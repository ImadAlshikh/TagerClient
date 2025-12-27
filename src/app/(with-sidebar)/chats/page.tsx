"use client";
import { useChats } from "@/cache/useChats";
import { useUser } from "@/cache/useUser";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import ChatCard from "@/components/ui/cards/ChatCard";
import { useUserStore } from "@/stores/useUserStore";
import axios from "axios";
import Link from "next/link";
import { useEffect, useState } from "react";

interface PostCardType {
  id: string;
  userId: string;
  postId: string;
  post: {
    title: string;
    picture: string;
    owner: { id: string; name: string; surname?: string; picture?: string };
  };
  user: { id: string; name: string; surname?: string; picture?: string };
  messages: { senderId: string; text: string; created_at: string }[];
  lastMessage: { senderId: string; text: string; created_at: string };
}

export default function page() {
  const { data: user, isLoading: userLoading } = useUser();
  console.log(user);
  const { data: chats, isLoading } = useChats();
  console.log(chats);

  return (
    <ProtectedRoute>
      <div className="flex flex-col gap-2 p-4">
        <span className="font-medium text-text text-xl">Chats</span>
        {chats?.length ? (
          chats?.map((chat: any) => (
            <ChatCard
              key={chat.id}
              chatId={chat.id}
              postId={chat.postId}
              title={chat.post.title}
              picture={chat.post?.picture}
              user={
                user?.id === chat.user.id
                  ? {
                      ...chat.post.owner,
                      picture: chat.post.owner.picture?.secureUrl,
                    }
                  : { ...chat.user, picture: chat.user.picture?.secureUrl }
              }
              unReadedMessages={chat.messages.length}
              lastMessage={chat.lastMessage}
              isLastMessageFromYou={
                chat.lastMessage?.senderId === user?.id && true
              }
            />
          ))
        ) : isLoading ? (
          <div className="text-primary w-full h-[calc(100vh-150px)] font-bold text-2xl grid place-content-center">
            Loading...
          </div>
        ) : (
          <div className="text-primary w-full h-[calc(100vh-140px)] grid place-content-center">
            <div className="font-bold text-2xl text-primary">No Chat Found</div>
            <Link
              href={"/"}
              className="bg-primary hover:bg-primary-dark text-white rounded-full px-4 py-1  mx-auto"
            >
              Home page
            </Link>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
