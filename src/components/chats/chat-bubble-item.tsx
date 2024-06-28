import { cn } from "@/lib/utils";
import { UserIcon } from "@heroicons/react/24/solid";
import dayjs from "dayjs";
import Image from "next/image";

interface ChatBubbleItemProps {
  message: {
    user: {
      avatar: string | null;
    };
  } & {
    id: string;
    createdAt: Date;
    updatedAt: Date;
    userId: number;
    chatRoomId: string;
    text: string;
  };
  userId: number;
}

export const ChatBubbleItem = ({ message, userId }: ChatBubbleItemProps) => {
  return (
    <div
      className={cn(
        "chat",
        userId !== message.userId ? "chat-start" : "chat-end"
      )}
    >
      <div className="chat-image avatar">
        {message.user.avatar ? (
          <Image
            className="size-12 rounded-full"
            src={message.user.avatar}
            alt="user-avatar"
            width={36}
            height={36}
            priority
          />
        ) : (
          <div className="col-center size-12 rounded-full bg-base-300">
            <UserIcon className="w-12 text-base opacity-50" />
          </div>
        )}
      </div>
      <div className="chat-bubble">{message.text}</div>
      <div className="chat-footer mt-1">
        {dayjs(message.createdAt).fromNow()}
      </div>
    </div>
  );
};
