import { getPostAction } from "@/actions/posts";
import { getIsLiked } from "@/actions/posts/get-is-liked.action";
import { LikeButton } from "@/components/posts";
import { EyeIcon, UserIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import { unstable_cache } from "next/cache";
import Image from "next/image";
import { notFound } from "next/navigation";

const getCachedPost = async (id: number) =>
  unstable_cache(
    async () => {
      const post = await getPostAction(id);
      return post;
    },
    [`post_${id}`],
    { tags: ["postDetail"] }
  );

export default async function Post({ params }: { params: { id: number } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const post = await (await getCachedPost(id))();
  if (!post) {
    return notFound();
  }
  const isLiked = await getIsLiked({ postId: post.id });
  console.log("post", post);

  return (
    <main className="min-h-screen p-4">
      <div className="flex flex-col gap-2">
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
        <LikeButton isLiked={isLiked} postId={post.id} />
      </div>
    </main>
  );
}
