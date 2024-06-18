"use client";

import { InitialProducts } from "@/app/(tabs)/products/page";
import { ProductItem } from "./product-item";
import { useState } from "react";
import { Button } from "../common";
import { fetchMoreProdcuts } from "@/actions/products";

interface ProductListProps {
  initialProducts: InitialProducts;
}

export const ProductList = ({ initialProducts }: ProductListProps) => {
  const [products, setProducts] = useState(initialProducts);
  const [isLoading, setIsLoading] = useState(false);
  const handleFetchMore = async () => {
    setIsLoading(true);
    const newProducts = await fetchMoreProdcuts(1);
    setProducts((prev) => [...prev, ...newProducts]);
    setIsLoading(false);
  };
  return (
    <div>
      <h1 className="text-3xl mb-4">상품</h1>
      <div className="space-y-4">
        {products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
      <div className="row-center w-full my-4">
        <Button type="Button" label="더 보기" onClick={handleFetchMore} disabled={isLoading} />
      </div>
    </div>
  );
};
