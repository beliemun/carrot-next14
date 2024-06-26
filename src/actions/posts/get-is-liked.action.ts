"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export const getIsLiked = async ({ postId }: { postId: number }) => {
  const session = await getSession();
  const like = await db.like.findUnique({
    where: {
      userId_postId: {
        userId: session.id!,
        postId,
      },
    },
  });
  return Boolean(like);
};
