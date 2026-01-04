import { socket } from "@/socket/client";
import { useEffect } from "react";

export const useChatSocket = (
  chatId: string,
  userId: string,
  onMessage: (msg: any) => void
) => {
  useEffect(() => {
    if (!userId || !chatId) return;
    const onConnect = () => {
      console.log("connected", chatId, userId);
      socket.emit("join-chat", { chatId, userId });
    };

    socket.on("connect", onConnect);
    socket.on("new-msg", onMessage);
    if (socket.connected) {
      onConnect();
    }

    return () => {
      socket.off("new-msg", onMessage);
      socket.emit("leave-chat", chatId);
    };
  }, [chatId, userId]);
};
