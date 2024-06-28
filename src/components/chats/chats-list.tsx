"use client";

import { GetMessagesType } from "@/actions/chats/get-messages.action";
import { useRef, useState } from "react";
import { Input, Button } from "@/components/common";
import { ChatBubbleItem } from "./chat-bubble-item";
import { User } from "@prisma/client";

interface ChatListProps {
  initialMessages: GetMessagesType;
  user: User;
  roomId: string;
}

export const ChatList = ({ initialMessages, user, roomId }: ChatListProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    setMessages((prev) => [
      ...prev,
      {
        user: {
          avatar: "",
        },
        id: new Date().toString(),
        createdAt: new Date(),
        updatedAt: new Date(),
        userId: user.id,
        chatRoomId: roomId,
        text: message,
      },
    ]);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };
  return (
    <>
      <div className="min-h-screen space-y-2 flex flex-col justify-end p-4 pb-24">
        {messages.map((message, index) => (
          <ChatBubbleItem key={index} userId={user.id} message={message} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-20">
        <div className="fixed max-w-sm w-full">
          <form
            onSubmit={handleSubmit}
            className="row-center w-full p-4 gap-4 bg-base-300"
          >
            <Input
              name="message"
              className="w-full"
              ref={inputRef}
              onChange={handleChange}
            />
            <Button className="flex justify-end" type="Button" label="입력" />
          </form>
        </div>
      </div>
    </>
  );
};
