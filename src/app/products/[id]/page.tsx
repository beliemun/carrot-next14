import { Button } from "@/components/common";
import { DeleteProductForm } from "@/components/product";
import db from "@/lib/db";
import { getUser } from "@/lib/get-user";
import { getSession } from "@/lib/session";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

const getProductDetail = async (id: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const product = await db.product.findUnique({
    where: { id: id },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
};

const getIsProdcutOwner = async (userId: number) => {
  const session = await getSession();
  return session.id === userId;
};

export default async function Product({ params }: { params: { id: string } }) {
  const id = Number(params.id);
  if (isNaN(id)) {
    return notFound();
  }
  const product = await getProductDetail(id);
  if (!product) {
    return notFound();
  }
  const isProductOwner = await getIsProdcutOwner(product.userId);
  const user = await getUser();

  return (
    <main className="h-screen w-full">
      <section className="space-y-4 p-4">
        <div className="relative aspect-square col-center rounded-lg overflow-hidden">
          <Image
            className="object-cover"
            // CF에서 제공하는 최대 해상도로 보기 위해서 '/public' variable 추가
            src={`${product.photo}/public`}
            alt={product.title}
            fill
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
      </section>
      <section className="fixed bottom-0 flex flex-row justify-between items-center max-w-sm w-full bg-base-300 p-4">
        <span className="text-xl font-semibold">{product.price.toLocaleString("ko-KR")}원</span>
        {isProductOwner ? (
          <DeleteProductForm id={product.id} />
        ) : (
          <Button type="Link" label="채팅하기" disabled />
        )}
      </section>
    </main>
  );
}
