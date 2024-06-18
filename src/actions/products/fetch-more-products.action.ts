"use server";

import { SIZE } from "@/lib/constants";
import db from "@/lib/db";

export const fetchMoreProdcuts = async (page: number) => {
  //   await new Promise((resolve) => setTimeout(resolve, 1000));
  const products = await db.product.findMany({
    select: {
      id: true,
      title: true,
      price: true,
      createdAt: true,
      photo: true,
    },
    skip: page * SIZE,
    take: SIZE,
    orderBy: {
      createdAt: "desc",
    },
  });
  return products;
};
