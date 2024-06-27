import { getChatRoomAction } from "@/actions/chats";
import { notFound } from "next/navigation";

export default async function Chats({ params }: { params: { id: string } }) {
  console.log(0);
  const roomId = params.id;
  if (!roomId) {
    return notFound();
  }
  const room = await getChatRoomAction({ roomId });
  console.log("room:", room);
  if (!room) {
    return notFound();
  }
  console.log();
  return <>Chats!</>;
}
