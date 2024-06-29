import { notFound } from "next/navigation";
import { getChatRoomAction } from "@/actions/chats";
import getMessagesAction from "@/actions/chats/get-messages.action";
import { ChatList, MessageInputForm } from "@/components/chats";
import { getSession } from "@/lib/session";
import { getUser } from "@/lib/get-user";

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
