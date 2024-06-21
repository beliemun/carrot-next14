"use client";

import { cn } from "@/lib/utils";
import { XMarkIcon } from "@heroicons/react/24/solid";
import { useRouter } from "next/navigation";

interface CloseModalButtonProps {
  className?: string;
}

export const CloseModalButton = ({ className }: CloseModalButtonProps) => {
  const router = useRouter();
  const handleClickClose = () => router.back();
  return (
    <button
      className={cn("bg-white rounded-full p-2 bg-base-10", String(className))}
      onClick={handleClickClose}
    >
      <XMarkIcon className="size-4" />
    </button>
  );
};
