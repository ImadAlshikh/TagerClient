"use client";
import { useUser } from "@/cache/useUser";
import { queryClient } from "@/providers/QueryProvider";
import { socket } from "@/socket/client";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useEffect } from "react";

console.log("store from socket", useNotificationStore.getState());

export const UseNotificationSocket = () => {
  const { data: user } = useUser();
  const setNotification = useNotificationStore((s) => s.setNotification);
  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;

    const subscribe = () => {
      console.log("subscribe user:", userId);
      socket.emit("subscribe-notification", userId);
    };

    if (socket.connected) {
      subscribe();
    } else {
      socket.on("connect", subscribe);
    }

    const onNotification = (notif: any) => {
      if (!notif) return;
      notif = JSON.parse(notif);
      console.log("new notif:", notif);
      setNotification(notif);
      queryClient.refetchQueries({ queryKey: ["chats"] });
      queryClient.refetchQueries({ queryKey: ["chat", notif?.chat?.id] });
    };

    socket.on("notification", onNotification);

    return () => {
      socket.off("connect", subscribe);
      socket.off("notification", onNotification);
    };
  }, [userId]);

  return null;
};
