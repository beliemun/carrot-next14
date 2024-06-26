"use server";

import db from "@/lib/db";
import { revalidateTag } from "next/cache";

export const likePostAction = async ({ postId, userId }: { postId: number; userId: number }) => {
  try {
    await db.like.create({
      data: {
        userId,
        postId,
      },
    });
    revalidateTag(`like_status_${postId}`);
  } catch {
    return null;
  }
};
