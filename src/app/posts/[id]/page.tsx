import { CommentForm, PostComments, PostContent } from "@/components/posts";
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
    <main className="min-h-screen">
      <div className="flex flex-col p-4 gap-2">
        <PostContent postId={postId} userId={userId} />
        <div className="divider" />
        <PostComments postId={postId} />
      </div>
      <CommentForm postId={postId} userId={userId} />
    </main>
  );
}
