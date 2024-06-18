"use client";

import { InitialProducts } from "@/app/(tabs)/products/page";
import { ProductItem } from "./product-item";
import { useState } from "react";
import { Button } from "../common";
import { fetchMoreProdcuts } from "@/actions/products";
import { useAlertStore } from "@/stores";

interface ProductListProps {
  initialProducts: InitialProducts;
}

export const ProductList = ({ initialProducts }: ProductListProps) => {
  const { show } = useAlertStore();
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [isLastPage, setIsLatPage] = useState(false);
  const handleFetchMore = async () => {
    setIsLoading(true);
    const newProducts = await fetchMoreProdcuts(page + 1);
    if (newProducts.length !== 0) {
      setPage((prev) => prev + 1);
      setProducts((prev) => [...prev, ...newProducts]);
    } else {
      setIsLatPage(true);
      show({
        title: "불러오기 오류",
        message: "더 이상 불러올 상품이 없습니다.",
      });
    }
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
      {!isLastPage ? (
        <div className="row-center w-full my-4">
          <Button type="Button" label="더 보기" onClick={handleFetchMore} disabled={isLoading} />
        </div>
      ) : null}
    </div>
  );
};
