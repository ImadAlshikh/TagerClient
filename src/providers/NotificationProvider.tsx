"use client";
import NotificationCard from "@/components/ui/cards/NotificationCard";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

export default function NotificationProvider() {
  const notification = useNotificationStore((s) => s.notification);
  const closeNotification = useNotificationStore((s) => s.closeNotification);
  const pathname = usePathname();
  useEffect(() => {
    if (!notification) return;
    if (pathname.startsWith(`/chats/${notification.chat.id}`))
      return closeNotification();
  }, [pathname, notification, closeNotification]);
  if (!notification) return null;
  return <NotificationCard notif={notification} />;
}
