"use server";

import { SIZE } from "@/lib/constants";
import db from "@/lib/db";

export const getProdcutsAction = async (page: number) => {
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
