"use server";

import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export type GetMessagesType = Prisma.PromiseReturnType<typeof getMessagesAction>;

export async function getMessagesAction({ roomId }: { roomId: string }) {
  const messages = await db.message.findMany({
    where: { chatRoomId: roomId },
    include: {
      user: {
        select: {
          avatar: true,
        },
      },
    },
    orderBy: { createdAt: "asc" },
  });
  return messages;
}
