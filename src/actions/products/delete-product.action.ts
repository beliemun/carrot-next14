"use server";

import db from "@/lib/db";
import { revalidatePath, revalidateTag } from "next/cache";

export async function deleteProductAction(id: number) {
  await db.product.delete({
    where: { id },
  });
  revalidateTag("products");
}
