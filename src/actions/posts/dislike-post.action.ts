"use server";

import db from "@/lib/db";
import { getSession } from "@/lib/session";
import { revalidatePath } from "next/cache";

export const dislikePostAction = async ({ postId }: { postId: number }) => {
  const session = await getSession();
  try {
    await db.like.delete({
      where: {
        userId_postId: {
          postId,
          userId: session.id!,
        },
      },
    });
    revalidatePath(`/posts/${postId}`);
  } catch {
    return null;
  }
};
