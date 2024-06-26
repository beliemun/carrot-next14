import { getPostsAction } from "@/actions/posts";
import { ChatBubbleBottomCenterIcon, HandThumbUpIcon } from "@heroicons/react/24/outline";
import dayjs from "dayjs";
import { unstable_cache } from "next/cache";
import Link from "next/link";

const getCachedPosts = unstable_cache(
  async () => {
    await new Promise((resolve) => setTimeout(resolve, 2000));
    return getPostsAction();
  },
  ["posts"],
  { tags: ["posts"] }
);

export const metadata = {
  title: "라이프",
};

export default async function Life() {
  const posts = await getCachedPosts();
  return (
    <main className="min-h-screen w-full p-4">
      <div className="space-y-8">
        {posts.map((post, index) => {
          return (
            <div className="flex flex-col gap-2" key={index}>
              <div className="divider my-1 first:hidden" />
              <Link href={`/posts/${post.id}`}>
                <h1 className="font-semibold text-lg">{post.title}</h1>
                <p>{post.description}</p>
              </Link>
              <div>{dayjs(post.createdAt).fromNow()}</div>
              <div className="flex flex-row *:gap-2 ">
                <div className="row-center">
                  <HandThumbUpIcon className="size-5" />
                  {post._count.likes}
                </div>
                <div className="w-[0.5px] mx-4 bg-slate-400 opacity-50" />
                <div className="row-center">
                  <ChatBubbleBottomCenterIcon className="size-5" />
                  {post._count.comments}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </main>
  );
}
