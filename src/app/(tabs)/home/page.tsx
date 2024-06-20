import { Prisma } from "@prisma/client";
import { ProductList } from "@/components/products";
import { fetchMoreProdcuts } from "@/actions/products";
// 선언된 함수를 기준으로 primsa가 output type을 생성해줄 수 있다.
export type InitialProducts = Prisma.PromiseReturnType<typeof fetchMoreProdcuts>;

export default async function Products() {
  const initialProducts = await fetchMoreProdcuts(0);
  return (
    <main className="w-full min-h-screen p-4">
      <ProductList initialProducts={initialProducts} />
    </main>
  );
}
