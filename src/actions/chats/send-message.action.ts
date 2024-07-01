"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";

export async function sendMessageAction({ roomId, text }: { roomId: string; text: string }) {
  console.log(roomId, text);
  const sesson = await getSession();
  const userId = sesson.id!;
  const a = await db.message.create({
    data: {
      text,
      chatRoomId: roomId,
      userId,
    },
  });
  console.log(a);
}
