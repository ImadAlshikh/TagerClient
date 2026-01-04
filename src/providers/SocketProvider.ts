"use client";
import { ReactNode, useContext, useEffect, useRef } from "react";
import { socket } from "@/socket/client";

export const SocketProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    socket.connect();
    return () => {
      socket.disconnect();
    };
  }, []);
  return children;
};
