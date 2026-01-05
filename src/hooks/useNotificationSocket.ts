"use client";
import { useUser } from "@/cache/useUser";
import { socket } from "@/socket/client";
import { useEffect } from "react";

export const UseNotificationSocket = () => {
  const { data: user } = useUser();
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
      console.log("new notif:", notif);
    };

    socket.on("notification", onNotification);

    return () => {
      socket.off("connect", subscribe);
      socket.off("notification", onNotification);
    };
  }, [userId]);

  return null;
};
