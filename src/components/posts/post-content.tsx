import { EyeIcon, UserIcon } from "@heroicons/react/24/solid";
import { LikeButton } from "./like-button";
import { getLikeStatusAction, getPostAction } from "@/actions/posts";
import Image from "next/image";
import dayjs from "dayjs";
import { unstable_cache } from "next/cache";
import { notFound } from "next/navigation";

interface PostContentProps {
  postId: number;
  userId: number;
}

const getCachedPost = async ({ postId }: { postId: number }) =>
  unstable_cache(
    async () => {
      const post = await getPostAction({ postId });
      return post;
    },
    [`post_${postId}`],
    { tags: ["postDetail"] }
  );

const getCachedLike = async ({ postId, userId }: { postId: number; userId: number }) =>
  unstable_cache(
    async () => {
      const post = await getLikeStatusAction({ postId, userId });
      return post;
    },
    [`post-like-status`],
    { tags: [`like_status_${postId}`] }
  );

export const PostContent = async ({ userId, postId }: PostContentProps) => {
  const post = await (await getCachedPost({ postId: postId }))();
  if (!post) {
    return notFound();
  }
  const { isLiked, count } = await (await getCachedLike({ postId: post.id, userId }))();

  return post ? (
    <>
      {post.user.avatar ? (
        <Image
          className="size-14 rounded-full"
          src={post.user.avatar}
          alt="user-avatar"
          width={56}
          height={56}
          priority
        />
      ) : (
        <div className="size-14 rounded-full bg-base-300 col-center">
          <UserIcon className="w-8 text-base opacity-50" />
        </div>
      )}
      <div className="flex flex-col flex-1">
        <span>{post.user.username}</span>
        <span className="text-sm opacity-50">{dayjs(post.updatedAt).fromNow()}</span>
      </div>
      <div>
        <h1 className="font-semibold text-lg">{post.title}</h1>
        <p>{post.description}</p>
      </div>
      <div className="flex flex-row items-center gap-2 my-2">
        <EyeIcon className="size-6" />
        조회수 {post.views}
      </div>
      <LikeButton postId={post.id} userId={userId} isLiked={isLiked} count={count} />
    </>
  ) : null;
};
