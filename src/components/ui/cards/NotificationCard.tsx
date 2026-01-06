"use client";
import { useNotificationStore } from "@/stores/useNotificationStore";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function NotificationCard({ notif }: { notif: any }) {
  const [show, setShow] = useState<boolean>(false);
  const duration = 1000;
  const closeNotification = useNotificationStore((s) => s.closeNotification);
  useEffect(() => {
    if (!notif) return;
    setShow(true);
    const hideTimeout = setTimeout(() => {
      setShow(false);
    }, duration * 3);

    const closeTimeout = setTimeout(() => {
      closeNotification();
    }, duration * 4);

    return () => {
      clearTimeout(hideTimeout);
      clearTimeout(closeTimeout);
    };
  }, [notif]);
  console.log("from card:", notif);
  return (
    <Link
      onClick={() => setShow(false)}
      href={`/chats/${notif?.chat.id}?postId=${notif?.chat?.post?.id}`}
      className={`message bg-white border border-border p-2 rounded-md flex flex-col fixed -left-full bottom-8 min-w-50 max-w-180!  text-wrap z-250 transition-all duration-${duration} ${
        show && "left-2"
      }`}
    >
      <div className={`flex items-center  gap-1`}>
        <div className={`text-inherit text-lg font-semibold line-clamp-1`}>
          {notif?.text}
        </div>
      </div>
      <div className='text-wrap text-gray-600 max-w-full px-1 line-clamp-2'>
        {notif?.text}
      </div>
    </Link>
  );
}
