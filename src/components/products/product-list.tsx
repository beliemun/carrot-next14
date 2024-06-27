"use client";

import { ProductItem } from "./product-item";
import { useEffect, useRef, useState } from "react";
import { GetProdcutsType } from "@/app/(tabs)/home/page";
import { getProdcutsAction } from "@/actions/products";

interface ProductListProps {
  initialProducts: GetProdcutsType;
}

export const ProductList = ({ initialProducts }: ProductListProps) => {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(0);
  const divRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        if (entries[0].isIntersecting && divRef.current) {
          observer.unobserve(divRef.current);
          const newProducts = await getProdcutsAction(page + 1);
          if (newProducts.length !== 0) {
            setPage((prev) => prev + 1);
            setProducts((prev) => [...prev, ...newProducts]);
          }
        }
      }
    );
    if (divRef.current) {
      observer.observe(divRef.current);
    }
    return () => {
      observer.disconnect();
    };
  }, [page]);

  return (
    <div className="relative">
      <h1 className="text-3xl mb-4">상품</h1>
      <div className="space-y-4">
        {products.map((product) => (
          <ProductItem key={product.id} {...product} />
        ))}
      </div>
      <div className="col-center w-full p-4" ref={divRef}>
        <span className="loading loading-dots laoding-sm text-primary" />
      </div>
    </div>
  );
};
