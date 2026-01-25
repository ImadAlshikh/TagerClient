"use client";
import { useChats } from "@/cache/useChats";
import { useUser } from "@/cache/useUser";
import ProtectedRoute from "@/components/protectedRoute/ProtectedRoute";
import ChatCard from "@/components/ui/cards/ChatCard";
import Link from "next/link";

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
  const { data: chats, isLoading } = useChats();

  return (
    <ProtectedRoute>
      <div className='flex flex-col gap-2 p-4 max-w-full'>
        <span className='font-bold text-text text-2xl'>Chats</span>
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
          <div className='text-primary w-full overflow-hidden h-[calc(100vh-56px)] font-bold text-2xl grid place-content-center place-items-center gap-8 animate-pulse'>
            <img src='/logo/textColor-logo.png' alt='' className='size-32 ' />
            <div>Loading</div>
          </div>
        ) : (
          <div className='text-primary w-full h-[calc(100vh-140px)] grid place-content-center'>
            <div className='font- text-gray-500'>No Chat Found</div>
            <Link
              href={"/"}
              className='bg-primary hover:bg-primary-dark text-white rounded-full px-4 py-1  mx-auto'
            >
              Home page
            </Link>
          </div>
        )}
      </div>
    </ProtectedRoute>
  );
}
