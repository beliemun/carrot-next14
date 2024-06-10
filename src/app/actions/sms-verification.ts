"use server";

import { z } from "zod";

const formSchema = z.object({
  phone: z.string(),
  code: z.string(),
});

export const smsVerification = async (prev: any, formData: FormData) => {
  const data = {
    phone: formData.get("phpne"),
    code: formData.get("code"),
  };
  const result = formSchema.safeParse(data);
  if (result.error) {
    return result.error.flatten();
  } else {
    console.log(result.success);
  }
};
