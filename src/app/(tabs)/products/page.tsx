import { ProductItem } from "@/components/products";
import db from "@/lib/db";

async function getProducts() {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      createdAt: true,
      photo: true,
    },
  });
  return products;
}

export default async function Products() {
  const products = await getProducts();
  return (
    <main className="h-screen w-full p-4">
      <h1 className="text-3xl mb-4">상품</h1>
      {products.map((product) => (
        <ProductItem key={product.id} {...product} />
      ))}
    </main>
  );
}
