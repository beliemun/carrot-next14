"use server";

import db from "@/lib/db";

export const getLikeStatusAction = async ({
  postId,
  userId,
}: {
  postId: number;
  userId: number;
}) => {
  const session = 7;
  const like = await db.like.findUnique({
    where: {
      userId_postId: {
        postId,
        userId,
      },
    },
  });
  const post = await db.post.findUnique({
    where: { id: postId },
    select: {
      _count: {
        select: {
          likes: true,
        },
      },
    },
  });
  return {
    isLiked: Boolean(like),
    count: post?._count.likes,
  };
};
