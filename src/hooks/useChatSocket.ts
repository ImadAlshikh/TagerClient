import { useUser } from "@/cache/useUser";
import { socket } from "@/socket/client";
import { useEffect } from "react";

export const useChatSocket = (
  chatId: string,
  onMessage: (msg: any) => void
) => {
  const { data: user } = useUser();
  const userId = user?.id;
  useEffect(() => {
    if (!userId || !chatId) return;
    const onConnect = () => {
      console.log("connected", chatId, userId);
      socket.emit("join-chat", { chatId, userId });
    };

    socket.on("new-msg", onMessage);
    if (socket.connected) {
      onConnect();
    } else {
      socket.on("connect", onConnect);
    }

    return () => {
      socket.off("new-msg", onMessage);
      socket.emit("leave-chat", chatId);
    };
  }, [chatId, userId]);
};
