import { Prisma } from "@prisma/client";
import { ProductList } from "@/components/products";
import { getProdcutsAction } from "@/actions/products";
import { unstable_cache } from "next/cache";
// 선언된 함수를 기준으로 primsa가 output type을 생성해줄 수 있다.
export type GetProdcutsType = Prisma.PromiseReturnType<typeof getProdcutsAction>;

const getCachedProducts = unstable_cache(
  async () => {
    // await new Promise((resolve) => setTimeout(resolve, 2000));
    return getProdcutsAction(0);
  },
  ["products"],
  { tags: ["products"] }
);

export const metadata = {
  title: "상품",
};

export default async function Products() {
  const initialProducts = await getCachedProducts();
  return (
    <main className="row-flex w-full min-h-screen p-4 space-y-4">
      <ProductList initialProducts={initialProducts} />
    </main>
  );
}
