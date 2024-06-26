"use server";

import db from "@/lib/db";

export const getPostsAction = async () => {
  const posts = await db.post.findMany({
    select: {
      id: true,
      title: true,
      description: true,
      views: true,
      createdAt: true,
      _count: {
        select: {
          likes: true,
          comments: true,
        },
      },
    },
  });
  return posts;
};
