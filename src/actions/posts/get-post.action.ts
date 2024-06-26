import db from "@/lib/db";

export async function getPostAction(id: number) {
  // where 문으로 post가 찾아지지 않을 경우 에러가 발생하니 try catch문으로 감싸준다.
  try {
    const post = await db.post.update({
      where: {
        id,
      },
      data: {
        views: {
          // 조회수를 1씩 증가시킴
          increment: 1,
        },
      },
      include: {
        user: {
          select: {
            username: true,
            email: true,
            avatar: true,
          },
        },
        _count: {
          select: {
            comments: true,
            likes: true,
          },
        },
      },
    });
    return post;
  } catch {
    return null;
  }
}
