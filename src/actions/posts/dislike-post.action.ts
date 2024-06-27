"use server";

import db from "@/lib/db";
import { revalidateTag } from "next/cache";

export const dislikePostAction = async ({ postId, userId }: { postId: number; userId: number }) => {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
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
