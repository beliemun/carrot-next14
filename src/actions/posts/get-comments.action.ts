import db from "@/lib/db";
import { Prisma } from "@prisma/client";

export type GetCommentsType = Prisma.PromiseReturnType<typeof getCommentsAction>;

export async function getCommentsAction({ postId }: { postId: number }) {
  const comments = await db.comment.findMany({
    where: {
      postId,
    },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
    orderBy: {
      createdAt: "desc",
    },
  });
  return comments;
}
