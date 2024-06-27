"use client";

import { createChatRoomAction } from "@/actions/chats";
import { Button } from "../common";

export const OpenChatForm = ({ userId }: { userId: number }) => {
  return (
    <form action={() => createChatRoomAction({ userId })}>
      <Button type="Button" label="채팅하기" />
    </form>
  );
};
