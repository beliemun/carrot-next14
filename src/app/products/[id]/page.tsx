import { getProductAction } from "@/actions/products";
import { Button } from "@/components/common";
import { DeleteProductForm } from "@/components/product";
import { OpenChatForm } from "@/components/product/open-chat-from";
import db from "@/lib/db";
import { getUser } from "@/lib/get-user";
import { getSession } from "@/lib/session";
import { UserIcon } from "@heroicons/react/24/solid";
import Image from "next/image";
import { notFound } from "next/navigation";

export async function getIsProductOwner(userId: number) {
  const session = await getSession();
  return session.id === userId;
}

export async function generateMetadata({ params }: { params: { id: string } }) {
  const product = await getProductAction(Number(params.id));
  return {
    title: product?.title,
  };
}

export default async function Product({ params }: { params: { id: string } }) {
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
    <main className="min-h-screen w-full">
      <section className="space-y-4 p-4">
        <div className="relative aspect-square col-center rounded-lg overflow-hidden">
          <Image
            className="object-cover"
            // CF에서 제공하는 최대 해상도로 보기 위해서 '/public' variants 추가
            src={`${product.photo}/public`}
            alt={product.title}
            fill
            priority
            blurDataURL="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAANkAAADoCAMAAABVRrFMAAAAIVBMVEUtLS1CQkIyMjI/Pz83NzcvLy8rKytEREQ7Ozs9PT00NDR2FmXVAAAEMElEQVR4nO2ciXakIBBF2QqQ///gAdRuFzg9KkqZ8+4kOdNJD+MVZCmoCAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAF4I5U9qzVhwR61b//v+ekoF1Zyg7r1tP62ECF46J1vjYpnadHQjGmTWcukjf/n8ZXol//OV2//MabKd5Czp9tW1Qtk+ZjeLxfrTqk8v4m+usSjnu4jR3V5JTXXwsssqu6v23NCjExlushmVppulH9eiVWNM1+Fa8m0Ej1fZykwP8U9TvvesQ2NcmMVhZzPwXBuH4kApv3X2fK0tzG4tm6HZ+Uktb7MrF8TbTNCfrDPldRoG9BBOXRdTMyvUkFdY4zrrzDKLqZnwq8mWG+jwGMDUzMdWKKd1ZP7Qh0cFnmbefWd904pbH704lmZG7okN8tjlcTSj4oLGmQtl8zCzlXX2wcUIPzMStUVoOF82CzOhSlapS/Hny+ZhFmphg+F82TzM6uGsQ6M1S7Oa2uvNalX2erPSOJ051u0zNAu1yOPr+8ZqqP/141ltDiIvlM3DTCgn3bZFxm+YSgdC5ZACR7PY7+utWlyvXSmbhRnlJ203prlaNISU8d7vn0GOZikq7jbdiKt1HyHfBbffJeNnNv5gLeakKQbobBjm9zkd1s8hT7NYa2bpNVTirGF5AzbxBJ5mCeV1bmZxjl9riWYT4BLLqDJfM2EFBWOCIlu5MLPy2sYTmJrR9GnnFwX8dP5jFossH0WmZmKSmw0LFGYqzttXtMbxHbVYXDFyp1cRMI5mRL82zsohhVhp5bLZmMUrmfqPQMWt2LCbWE5wb43pAF06UJGuvrTLFIpWedpcLpuN2SpkECfDZtWT2DxAl5uj/hzWZGo2rGbE0S3kAWB8+EL1FFqcQqpi2TzMyNLcEueKiJcc2+TYO1A9tpX+jS+WzcKM8lBVGKy0jx2K8bUoyYQmvq3RmlrH56TcL9y27wmlsnmYkb5ybO7TO/Izs8Ol49JOs22NarucPqqmCmWzMPvVRfw0M0zNirtnh8ymI6i8zOJ0sb5f8d8Uyu5u1qDKPg8aLzOqRr6PmBmGZkJc9vrsZ7Myo/oe9REzzc8sjtLXveYT0bzM2qRcjFNHXmbVIMAxPD+zRvk/Az8zapXJys5MVOOmF8t+2IwKs6uGpfetM72rs3Zly/k46+MZP7S5r23zMRcJpE49X2XLXKbmuDmXuUMuEy1ao2yefvalQ/6ZWCSJycZ8C3w+ZzCqVQNwLQ3983melNPf7lVzN3S7P73SF3N3laXlWp+E6rtTxd3Q65cy3Jjen3foD2edNBPL54bHgH1jkpc7dl68tVvwlyL51SpLSXkdf6fLuLIP5gbO5Rq+hr9tBwAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAACa8Q+nvzGcEJ0CsQAAAABJRU5ErkJggg=="
            placeholder="blur"
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
      </section>
      <section className="fixed bottom-0 flex flex-row justify-between items-center max-w-sm w-full bg-base-300 p-4">
        <span className="text-xl font-semibold">{product.price.toLocaleString("ko-KR")}원</span>
        {isProductOwner ? (
          <DeleteProductForm id={product.id} />
        ) : (
          <OpenChatForm userId={product.userId} />
        )}
      </section>
    </main>
  );
}

export async function generateStaticParams() {
  const products = await db.product.findMany({
    select: { id: true },
  });

  return products.map((product) => ({ id: String(3) }));
}
