"use server";

import db from "@/lib/db";

export const deleteProductAction = async (id: number) => {
  await db.product.delete({
    where: { id },
  });
};
