"use client";

import { useEffect, useRef, useState } from "react";
import { Input, Button } from "@/components/common";
import { ChatBubbleItem } from "./chat-bubble-item";
import { User } from "@prisma/client";
import { RealtimeChannel, createClient } from "@supabase/supabase-js";
import { GetMessagesType, sendMessageAction } from "@/actions/chats";

interface ChatListProps {
  initialMessages: GetMessagesType;
  user: User;
  roomId: string;
}

const client = createClient(process.env.NEXT_PUBLIC_SB_URL!, process.env.NEXT_PUBLIC_SB_API_KEY!);

export const ChatList = ({ initialMessages, user, roomId }: ChatListProps) => {
  const [messages, setMessages] = useState(initialMessages);
  const [message, setMessage] = useState("");
  const inputRef = useRef<HTMLInputElement | null>(null);
  const channelRef = useRef<RealtimeChannel>();
  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setMessage(event.target.value);
  };
  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    const data = {
      user: {
        avatar: user.avatar,
      },
      id: new Date().toString(),
      createdAt: new Date(),
      updatedAt: new Date(),
      userId: user.id,
      chatRoomId: roomId,
      text: message,
    };
    setMessages((prev) => [...prev, data]);
    sendMessageAction({ text: message, roomId });
    channelRef.current?.send({
      type: "broadcast",
      event: "message",
      payload: { message: data },
    });
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  useEffect(() => {
    channelRef.current = client.channel(`room-${roomId}`);
    channelRef.current
      .on("broadcast", { event: "message" }, (data) => {
        setMessages((prev) => [...prev, data.payload.message]);
      })
      .subscribe();
    return () => {
      channelRef.current?.unsubscribe();
    };
  }, [roomId]);

  return (
    <>
      <div className="min-h-screen space-y-2 flex flex-col justify-end p-4 pb-24">
        {messages.map((message, index) => (
          <ChatBubbleItem key={index} userId={user.id} message={message} />
        ))}
      </div>
      <div className="absolute bottom-0 left-0 w-full h-20">
        <div className="fixed max-w-sm w-full">
          <form onSubmit={handleSubmit} className="row-center w-full p-4 gap-4 bg-base-300">
            <Input name="message" className="w-full" ref={inputRef} onChange={handleChange} />
            <Button className="flex justify-end" type="Button" label="입력" />
          </form>
        </div>
      </div>
    </>
  );
};
