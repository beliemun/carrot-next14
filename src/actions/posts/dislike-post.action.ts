"use server";

import db from "@/lib/db";
import { revalidateTag } from "next/cache";

export const dislikePostAction = async ({ postId, userId }: { postId: number; userId: number }) => {
  try {
    await db.like.delete({
      where: {
        userId_postId: {
          postId,
          userId,
        },
      },
    });
    revalidateTag(`like_status_${postId}`);
  } catch {
    return null;
  }
};
