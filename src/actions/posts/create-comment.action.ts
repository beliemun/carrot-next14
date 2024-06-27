"use server";

import db from "@/lib/db";
import { commentFormSchema } from "@/lib/schemas";
import { revalidateTag } from "next/cache";

export async function createCommentAction(formData: FormData) {
  try {
    const data = {
      postId: formData.get("postId"),
      userId: formData.get("userId"),
      comment: formData.get("comment"),
    };

    const result = commentFormSchema.safeParse(data);
    if (result.error) {
      return result.error.flatten();
    } else {
      const { comment, postId, userId } = result.data;
      const c = await db.comment.create({
        data: {
          postId,
          userId,
          text: comment,
        },
        select: {
          id: true,
        },
      });
      revalidateTag(`post-comments-${postId}`);
      revalidateTag(`posts`);
    }
  } catch (e) {
    console.log(e);
  }
}
