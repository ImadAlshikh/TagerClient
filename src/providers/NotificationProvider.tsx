"use client";
import NotificationCard from "@/components/ui/cards/NotificationCard";
import { useNotificationStore } from "@/stores/useNotificationStore";

export default function NotificationProvider() {
  const notification = useNotificationStore((e) => e.notification);
  console.log("store from provider", useNotificationStore.getState());
  if (!notification) return null;
  return <NotificationCard notif={notification} />;
}
