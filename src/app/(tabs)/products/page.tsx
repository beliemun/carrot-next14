import { Prisma } from "@prisma/client";
import { ProductList } from "@/components/products";
import { fetchMoreProdcuts } from "@/actions/products";
import { PlusIcon } from "@heroicons/react/24/solid";
import Link from "next/link";

// 선언된 함수를 기준으로 primsa가 output type을 생성해줄 수 있다.
export type InitialProducts = Prisma.PromiseReturnType<typeof fetchMoreProdcuts>;

export default async function Products() {
  const initialProducts = await fetchMoreProdcuts(0);
  return (
    <main className="w-full min-h-screen">
      <div className="p-4">
        <ProductList initialProducts={initialProducts} />
      </div>
      <div className="fixed top-0 max-w-sm w-full h-screen">
        <Link
          href={"/add-product"}
          className="absolute bottom-20 right-4 bg-primary rounded-full p-2 shadow-lg shadow-black/50 hover:scale-110 transition"
        >
          <PlusIcon className="text-base w-10" />
        </Link>
      </div>
    </main>
  );
}
