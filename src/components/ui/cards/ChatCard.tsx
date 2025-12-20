import Link from "next/link";
import React from "react";

export default function ChatCard({
  chatId,
  postId,
  title,
  picture,
  user,
  unReadedMessages,
  lastMessage,
  isLastMessageFromYou,
}: {
  chatId: string;
  postId: string;
  title: string;
  picture: string;
  user: { id: string; name: string; surame?: string; picture?: string };
  unReadedMessages: number;
  lastMessage: any;
  isLastMessageFromYou: boolean;
}) {
  return (
    <Link
      href={`/chats/${chatId}?postId=${postId}`}
      className="w-full rounded-md flex gap-4 bg-white border border-border  p-2 hover:scale-101  relative transition-all group duration-250"
    >
      <div className="relative aspect-square! min-h-22 max-w-22">
        <img
          src={user.picture || "./userPlaceholder.svg"}
          alt=""
          className="aspect-square! w-full rounded-full border-2 border-accent-green"
        />
      </div>

      <div
        className={`${
          !unReadedMessages && "hidden"
        } notification bg-accent-orange text-white rounded-full aspect-square! absolute w-6 text-sm grid place-content-center right-4`}
      >
        {unReadedMessages}
      </div>

      <div className="flex flex-col w-full justify-">
        <div className="flex flex-col">
          <div className="title text-accent-green font-semibold">
            {user.name} {user.surame !== "null" && user.surame}
          </div>
          <div className="w-[70%] flex items-end gap-5">
            <div className="last-msg max-w-[50%] text-gray-500 wrap-break-word line-clamp-1">
              {isLastMessageFromYou ? "you" : user.name}
              {": "}
              {lastMessage?.text}
            </div>
            <span className="text-gray-500 text-[9px]">
              {new Date(lastMessage.created_at).toLocaleTimeString([], {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
          </div>
          <div className="flex items-center gap-1">
            <img
              src={picture || "./postPlaceholder.svg"}
              alt=""
              className="w-10 border-2  border-accent-green  rounded-md aspect-square"
            />
            <div className="text-gray-500">{title}</div>
          </div>
        </div>
      </div>
    </Link>
  );
}
