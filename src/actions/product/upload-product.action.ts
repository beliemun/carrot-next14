"use server";

import db from "@/lib/db";
import { productSchema } from "@/lib/schemas";
import { getSession } from "@/lib/session";
import { revalidateTag } from "next/cache";
import { redirect } from "next/navigation";

// react hook form 에서 state를 관리하므로 state가 있을 필요가 없다.
export const uploadProductAction = async (formData: FormData) => {
  const data = {
    photo: formData.get("photo"),
    title: formData.get("title"),
    price: formData.get("price"),
    description: formData.get("description"),
  };
  // 이미지 업로드
  const result = productSchema.safeParse(data);
  if (result.error) {
    return result.error.flatten();
  } else {
    const session = await getSession();
    if (session.id) {
      const product = await db.product.create({
        data: {
          photo: result.data?.photo,
          title: result.data?.title,
          price: result.data?.price,
          description: result.data?.description,
          user: { connect: { id: session.id } },
        },
        select: { id: true },
      });
      revalidateTag("products");
      redirect(`/products/${product.id}`);
    }
  }
};

export const getUploadUrl = async () => {
  const response = await fetch(
    `https://api.cloudflare.com/client/v4/accounts/${process.env.CF_ACCOUNT_ID}/images/v2/direct_upload`,
    {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.CF_API_TOKEN}`,
      },
    }
  );
  const data = await response.json();
  return data;
};
