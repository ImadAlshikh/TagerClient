"use client";
import React, { ReactNode, useEffect, useState } from "react";
import { SiTicktick } from "react-icons/si";
import { MdError, MdWarning } from "react-icons/md";
import { BsInfoCircleFill } from "react-icons/bs";

type MessageType = "info" | "success" | "error" | "warning";

export default function MessageCard({
  title,
  body,
  type,
  onClose,
}: {
  title: string;
  body?: string;
  type?: MessageType;
  onClose: () => void;
}) {
  const [show, setShow] = useState<boolean>(false);
  const duration = 1000;
  const messageType: MessageType = type ?? "info";
  const textColorMap: Record<MessageType, string> = {
    info: "text-text",
    success: "text-accent-green",
    error: "text-accent-red",
    warning: "text-accent-orange",
  };

  const iconMap: Record<MessageType, ReactNode> = {
    info: <BsInfoCircleFill className={`text-inherit`} />,
    success: <SiTicktick className={`text-inherit`} />,
    error: <MdError className={`text-inherit`} />,
    warning: <MdWarning className={`text-inherit`} />,
  };

  useEffect(() => {
    setShow(true);
    setTimeout(() => {
      setShow(false);
    }, duration*3);
    setTimeout(onClose, duration * 4);
  }, []);

  return (
    <div
      className={`message bg-white border border-border p-2 rounded-md flex flex-col fixed -left-full bottom-8 min-w-50 max-w-180!  text-wrap z-250 transition-all duration-${duration} ${
        show && "left-2"
      }`}
    >
      <div className={`flex items-center ${textColorMap[messageType]} gap-1`}>
        {iconMap[messageType]}
        <div className={`text-inherit text-lg font-semibold`}>{title}</div>
      </div>
      <div className="text-wrap text-gray-600 max-w-full px-1">{body}</div>
    </div>
  );
}
