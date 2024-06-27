"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";

export async function getChatRoomAction({ roomId }: { roomId: string }) {
  const room = await db.chatRoom.findUnique({
    where: {
      id: roomId,
    },
    select: {
      id: true,
      createdAt: true,
      users: {
        select: {
          id: true,
          username: true,
          avatar: true,
        },
      },
    },
  });
  const session = await getSession();
  const userId = session.id!;
  const hasRoom = Boolean(room?.users.find((room) => room.id === userId));
  console.log(room, hasRoom);
  if (!hasRoom) {
    return null;
  } else {
    return room;
  }
}
