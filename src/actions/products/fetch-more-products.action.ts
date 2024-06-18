"use server";

import db from "@/lib/db";

export const fetchMoreProdcuts = async (page: number) => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      createdAt: true,
      photo: true,
    },
    skip: 1,
    take: 1,
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};
