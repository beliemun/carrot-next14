import db from "@/lib/db";
import { Prisma } from "@prisma/client";
import { ProductList } from "@/components/products";

async function getInitialProducts() {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      createdAt: true,
      photo: true,
    },
    take: 1,
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
}

// 선언된 함수를 기준으로 primsa가 output type을 생성해줄 수 있다.
export type InitialProducts = Prisma.PromiseReturnType<typeof getInitialProducts>;

export default async function Products() {
  const initialProducts = await getInitialProducts();
  return (
    <main className="h-screen w-full p-4">
      <ProductList initialProducts={initialProducts} />
    </main>
  );
}
