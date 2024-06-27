import { GetCommentsType, getCommentsAction } from "@/actions/posts";
import { UserIcon } from "@heroicons/react/24/solid";
import { unstable_cache } from "next/cache";
import Image from "next/image";

const getCachedComments = async ({ postId }: { postId: number }) => {
  const data = unstable_cache(
    async () => {
      // await new Promise((resolve) => setTimeout(resolve, 2000));
      const comments: GetCommentsType = await getCommentsAction({ postId });
      return comments;
    },
    ["post-comments"],
    { tags: [`post-comments-${postId}`] }
  );
  return data;
};

export const PostComments = async ({ postId }: { postId: number }) => {
  const comments = await (await getCachedComments({ postId }))();
  //   const comments = await getCommentsAction({ postId });
  return comments ? (
    <div className="flex flex-col gap-2">
      {comments.map((comment, index) => (
        <div className="flex flex-row gap-2" key={index}>
          {comment.user.avatar ? (
            <Image
              className="size-8 rounded-full"
              src={comment.user.avatar}
              alt="user-avatar"
              width={56}
              height={56}
              priority
            />
          ) : (
            <div className="size-8 rounded-full bg-base-300 col-center">
              <UserIcon className="w-5 text-base opacity-50" />
            </div>
          )}
          <div className="flex flex-col">
            <span className="font-semibold text-primary">{comment.user.username}</span>
            <span className="">{comment.text}</span>
          </div>
        </div>
      ))}
    </div>
  ) : null;
};
