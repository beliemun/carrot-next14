"use server";

import { z } from "zod";

const formSchema = z.object({
  name: z.string().min(4).max(12),
  email: z.string().email(),
  password: z.string().min(4),
  confirm: z.string().min(4),
});

export const SignUp = async (prev: any, formData: FormData) => {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  };
  //   zod의 parse는 erorr를 throw하지만 safeParse는 결과 값을 줌
  const { error } = formSchema.safeParse(data);
  //   error의 flatten을 사용하면 erorr 내용을 요약해서 볼 수 있음
  if (error) {
    return error?.flatten();
  }
  //   await new Promise((resolver) => setTimeout(resolver, 2000));
};
