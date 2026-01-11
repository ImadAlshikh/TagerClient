"use client";
import { useNotificationStore } from "@/stores/useNotificationStore";
import Link from "next/link";
import { IoIosNotifications } from "react-icons/io";
import { useEffect, useState } from "react";
import { formatRelativeDate } from "@/utils/Date";

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
      setShow(false);
      clearTimeout(hideTimeout);
      clearTimeout(closeTimeout);
    };
  }, [notif]);
  return (
    <Link
      onClick={() => setShow(false)}
      href={`/chats/${notif?.chat.id}?postId=${notif?.chat?.post?.id}`}
      className={`message z-502 bg-white border border-border p-2 rounded-md flex flex-col fixed -left-full bottom-8 min-w-50 max-w-180!  text-wrap z-250 transition-all duration-${duration} ${
        show && "left-2"
      }`}
    >
      <div className={`flex flex-co items-center  gap-1`}>
        <IoIosNotifications size={18} />
        <div className={`text-text text-lg font-semibold line-clamp-1`}>
          {notif?.senderUser.name} {notif.senderUser.surname}
        </div>
      </div>
      <div className='max-w-full flex items-end'>
        <div className='text-wrap text-gray-600 max-w-full px-1 line-clamp-2'>
          {notif?.text}
        </div>
        <span className='text-gray text-[10px]'>
          {formatRelativeDate(notif.created_at)}
        </span>
      </div>
    </Link>
  );
}
