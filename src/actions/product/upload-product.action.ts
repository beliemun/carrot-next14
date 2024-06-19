"use server";

import { MSG } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import { getSession } from "@/lib/session";
import { redirect } from "next/navigation";

const productSchema = z.object({
  photo: z.string({ required_error: MSG.REQUIRED }),
  title: z.string({ required_error: MSG.REQUIRED }),
  price: z.coerce.number({ required_error: MSG.REQUIRED }),
  description: z.string({ required_error: MSG.REQUIRED }),
});

export const uploadProductAction = async (action: any, formData: FormData) => {
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
