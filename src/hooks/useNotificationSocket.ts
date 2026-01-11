"use client";
import { useUser } from "@/cache/useUser";
import { queryClient } from "@/providers/QueryProvider";
import { socket } from "@/socket/client";
import { useNotificationStore } from "@/stores/useNotificationStore";
import { useEffect } from "react";


export const UseNotificationSocket = () => {
  const { data: user } = useUser();
  const setNotification = useNotificationStore((s) => s.setNotification);
  const userId = user?.id;
  useEffect(() => {
    if (!userId) return;

    const subscribe = () => {

      socket.emit("subscribe-notification", userId);
    };

    if (!socket.connected) {
      socket.connect();
    }

    if (socket.connected) {
      subscribe();
    } else {
      socket.on("connect", subscribe);
    }

    const onNotification = (notif: any) => {
      if (!notif) return;
      notif = JSON.parse(notif);
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
