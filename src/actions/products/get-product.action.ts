"use server";

import db from "@/lib/db";

export async function getProductAction(id: number) {
  // await new Promise((resolve) => setTimeout(resolve, 2000));
  const product = await db.product.findUnique({
    where: { id: id },
    include: {
      user: {
        select: {
          username: true,
          avatar: true,
        },
      },
    },
  });
  return product;
}
