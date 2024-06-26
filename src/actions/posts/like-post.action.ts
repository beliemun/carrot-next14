"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export const likePostAction = async ({ postId }: { postId: number }) => {
  const session = await getSession();
  try {
    await db.like.create({
      data: {
        userId: session.id!,
        postId,
      },
    });
    revalidatePath(`/posts/${postId}`);
  } catch {
    return null;
  }
};
