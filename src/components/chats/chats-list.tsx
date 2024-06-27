"use client";

import { GetMessagesType } from "@/actions/chats/get-messages.action";
import { cn } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import Image from "next/image";
import { useState } from "react";

interface ChatListProps {
  initialMessages: GetMessagesType;
  userId: number;
}

export const ChatList = ({ initialMessages, userId }: ChatListProps) => {
  const [message, setMessages] = useState(initialMessages);
  return (
    <div className="min-h-screen space-y-2 flex flex-col justify-end p-4 pb-24">
      {message.map((message, index) => {
        return (
          <div
            className={cn("chat", userId !== message.userId ? "chat-start" : "chat-end")}
            key={index}
          >
            <div className="chat-image avatar">
              {message.user.avatar ? (
                <Image
                  className="size-12 rounded-full"
                  src={message.user.avatar}
                  alt="user-avatar"
                  width={36}
                  height={36}
                  priority
                />
              ) : (
                <div className="col-center size-12 rounded-full bg-base-300">
                  <UserIcon className="w-12 text-base opacity-50" />
                </div>
              )}
            </div>
            <div className="chat-bubble">{message.text}</div>
            <div className="chat-footer mt-1">{dayjs(message.createdAt).fromNow()}</div>
          </div>
        );
      })}
    </div>
  );
};
