import { getProductAction } from "@/actions/products";
import { getIsProductOwner } from "@/app/products";
import { Button, CloseModalButton } from "@/components/common";
import { DeleteProductForm } from "@/components/product";
import { OpenChatForm } from "@/components/product/open-chat-from";
import { getUser } from "@/lib/get-user";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

export default async function ProductModal({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getProductAction(id);
  if (!product) {
    return notFound();
  }
  const isProductOwner = await getIsProductOwner(product.userId);
  const user = await getUser();

  return (
    <div className="fixed top-0 left-0 right-0 mx-auto max-w-sm w-full min-h-screen col-center bg-neutral-800/90 p-8">
      <div className="relative w-full bg-black rounded-2xl">
        <section className="space-y-4 px-4 pt-4">
          <div className="relative aspect-square col-center rounded-lg overflow-hidden">
            <Image
              className="object-cover"
              // CF에서 제공하는 최대 해상도로 보기 위해서 '/public' variants 추가
              src={`${product.photo}/public`}
              alt={product.title}
              fill
              priority
            />
          </div>
          <div className="flex items-center gap-2">
            {user.avatar ? (
              <Image
                className="size-14 rounded-full"
                src={user.avatar}
                alt="user-avatar"
                width={56}
                height={56}
                priority
              />
            ) : (
              <div className="size-14 rounded-full bg-base-300 col-center">
                <UserIcon className="w-8 text-base opacity-50" />
              </div>
            )}
            <div className="flex flex-col flex-1">
              <span>{user.username}</span>
              <span className="text-sm opacity-50">{user.email}</span>
            </div>
          </div>
          <div className="flex flex-col *:rounded-lg gap-1">
            <span className="text-xl font-semibold">{product.title}</span>
            <span className="text-sm">{product.description}</span>
          </div>
          <div className="absolute -top-7 -right-3">
            <CloseModalButton />
          </div>
        </section>
        <div className="divider divide-slate-400" />
        <section className="flex flex-row justify-between items-center max-w-sm w-full px-4 pb-4 space-x-1">
          <span className="text-xl font-semibold">{product.price.toLocaleString("ko-KR")}원</span>
          {isProductOwner ? (
            <DeleteProductForm id={product.id} />
          ) : (
            <OpenChatForm userId={product.userId} />
          )}
        </section>
      </div>
    </div>
  );
}
