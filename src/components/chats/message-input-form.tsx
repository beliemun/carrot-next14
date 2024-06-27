"use client";

import { createMessageAction } from "@/actions/chats";
import { Button } from "../common";
import Input from "../common/input";
import { useRef } from "react";

export const MessageInputForm = () => {
  const inputRef = useRef<HTMLInputElement | null>(null);

  return (
    <form action={createMessageAction} className="row-center w-full p-4 gap-4 bg-base-300">
      <Input name="message" className="w-full" ref={inputRef} />
      <Button className="flex justify-end" type="Button" label="입력" />
    </form>
  );
};
