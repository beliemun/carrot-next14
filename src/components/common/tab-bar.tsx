"use client";

import { cn } from "@/lib/utils";
import {
  HomeIcon as HomeIconSolid,
  MapPinIcon as MapIconSolid,
  ChatBubbleBottomCenterIcon as ChatIconSolid,
  ShoppingBagIcon as ShopIconSolid,
  UserIcon as UserIconSolid,
  PlusIcon,
} from "@heroicons/react/24/solid";
import {
  HomeIcon as HomeIconOutline,
  MapPinIcon as MapIconOutline,
  ChatBubbleBottomCenterIcon as ChatIconOutline,
  ShoppingBagIcon as ShopIconOutline,
  UserIcon as UserIconOutline,
} from "@heroicons/react/24/outline";
import Link from "next/link";
import { usePathname } from "next/navigation";

export const TabBar = () => {
  const pathname = usePathname();
  const isCurrentPath = (url: string) => url === pathname;
  const getClassName = (url: string) =>
    cn(isCurrentPath(url) ? "text-primary active" : "text-primary");
  return (
    <div className="btm-nav max-w-sm left-0 right-0 mx-auto">
      <Link href={"/products"} className={getClassName("/products")}>
        {isCurrentPath("/products") ? (
          <HomeIconSolid className="size-8" />
        ) : (
          <HomeIconOutline className="size-8" />
        )}
      </Link>
      <Link href={"/life"} className={getClassName("/life")}>
        {isCurrentPath("/life") ? (
          <MapIconSolid className="size-8" />
        ) : (
          <MapIconOutline className="size-8" />
        )}
      </Link>
      <Link href={"/chats"} className={getClassName("/chats")}>
        {isCurrentPath("/chats") ? (
          <ChatIconSolid className="size-8" />
        ) : (
          <ChatIconOutline className="size-8" />
        )}
      </Link>
      <Link href={"/live"} className={getClassName("/live")}>
        {isCurrentPath("/live") ? (
          <ShopIconSolid className="size-8" />
        ) : (
          <ShopIconOutline className="size-8" />
        )}
      </Link>
      <Link href={"/profile"} className={getClassName("/profile")}>
        {isCurrentPath("/profile") ? (
          <UserIconSolid className="size-8" />
        ) : (
          <UserIconOutline className="size-8" />
        )}
      </Link>
      <Link
        href={"/add-product"}
        className={cn(
          "absolute bottom-20 right-4 bg-primary rounded-full size-14",
          "shadow-lg shadow-black/50 hover:scale-110 transition"
        )}
      >
        <PlusIcon className="text-base size-8" />
      </Link>
    </div>
  );
};
