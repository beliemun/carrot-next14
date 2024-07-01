"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";

export async function sendMessageAction({ roomId, text }: { roomId: string; text: string }) {
  const sesson = await getSession();
  const userId = sesson.id!;
  db.message.create({
    data: {
      text,
      chatRoomId: roomId,
      userId,
    },
  });
}
