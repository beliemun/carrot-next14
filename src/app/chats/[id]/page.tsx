import { notFound } from "next/navigation";
import { getChatRoomAction } from "@/actions/chats";
import { ChatList } from "@/components/chats";
import { getUser } from "@/lib/get-user";
import { getMessagesAction } from "@/actions/chats/get-messages.action";

export default async function Chats({ params }: { params: { id: string } }) {
  const roomId = params.id;
  const room = await getChatRoomAction({ roomId });
  if (!room) {
    return notFound();
  }
  const messages = await getMessagesAction({ roomId });
  const user = await getUser();

  return (
    <main className="relative max-w-sm w-full min-h-screen">
      <ChatList initialMessages={messages} user={user} roomId={roomId} />
    </main>
  );
}
