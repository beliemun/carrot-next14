"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

export async function createChatRoomAction({ userId }: { userId: number }) {
  const session = await getSession();
  let room;

  room = await db.chatRoom.findFirst({
    where: {
      AND: [{ users: { some: { id: session.id! } } }, { users: { some: { id: userId } } }],
    },
  });
  if (!room) {
    room = await db.chatRoom.create({
      data: {
        users: {
          connect: [{ id: session.id! }, { id: userId }],
        },
      },
      select: {
        id: true,
      },
    });
  }

  redirect(`/chats/${room.id}`);
}
