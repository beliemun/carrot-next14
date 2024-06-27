import { notFound } from "next/navigation";
import { getChatRoomAction } from "@/actions/chats";
import getMessagesAction from "@/actions/chats/get-messages.action";
import { ChatList, MessageInputForm } from "@/components/chats";
import { getSession } from "@/lib/session";

export default async function Chats({ params }: { params: { id: string } }) {
  const roomId = params.id;
  const room = await getChatRoomAction({ roomId });
  if (!room) {
    return notFound();
  }
  const messages = await getMessagesAction({ roomId });
  const session = await getSession();
  const userId = session.id!;
  return (
    <main className="relative max-w-sm w-full min-h-screen">
      <div className="flex flex-col">
        <ChatList initialMessages={messages} userId={userId} />
      </div>
      <div className="absolute bottom-0 left-0 w-full h-20">
        <div className="fixed max-w-sm w-full">
          <MessageInputForm />
        </div>
      </div>
    </main>
  );
}
