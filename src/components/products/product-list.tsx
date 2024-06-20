"use client";

import { ProductItem } from "./product-item";
import { useEffect, useRef, useState } from "react";
import { fetchMoreProdcuts } from "@/actions/products";
import { InitialProducts } from "@/app/(tabs)/home/page";

interface ProductListProps {
  initialProducts: InitialProducts;
}

export const ProductList = ({ initialProducts }: ProductListProps) => {
  const [products, setProducts] = useState(initialProducts);
  const [page, setPage] = useState(0);
  const trigger = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const observer = new IntersectionObserver(
      async (entries: IntersectionObserverEntry[], observer: IntersectionObserver) => {
        if (entries[0].isIntersecting && trigger.current) {
          observer.unobserve(trigger.current);
          const newProducts = await fetchMoreProdcuts(page + 1);
          if (newProducts.length !== 0) {
            setPage((prev) => prev + 1);
            setProducts((prev) => [...prev, ...newProducts]);
          }
        }
      }
    );
    if (trigger.current) {
      observer.observe(trigger.current);
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
      <div className="col-center w-full p-4" ref={trigger}>
        <span className="loading loading-dots laoding-sm text-primary" />
      </div>
    </div>
  );
};
