import { CommentInputForm, PostComments, PostContent } from "@/components/posts";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { notFound } from "next/navigation";

export default async function Post({ params }: { params: { id: number } }) {
  const postId = Number(params.id);
  if (isNaN(postId)) {
    return notFound();
  }
  revalidateTag(`post-comments-${postId}`);
  const session = await getSession();
  const userId = session.id!;

  return (
    <main className="relative max-w-sm w-full min-h-screen">
      <div className="flex flex-col p-4 gap-2">
        <PostContent postId={postId} userId={userId} />
        <div className="divider" />
        <PostComments postId={postId} />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-20">
        <div className="fixed max-w-sm w-full">
          <CommentInputForm postId={postId} userId={userId} />
        </div>
      </div>
    </main>
  );
}
