"use server";

import { MIN_LENGTH, MSG, PASSWORD_REGEX } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const validateExistedEmail = async (email: string) => {
  const existedEmail = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(existedEmail);
};

const formSchema = z.object({
  email: z.string().email({ message: MSG.INVALID_EMAIL }).toLowerCase().refine(validateExistedEmail, MSG.NOT_EXISTED_EMAIL),
  password: z.string().min(MIN_LENGTH, MSG.MIN_LENGTH_4),
  // .regex(PASSWORD_REGEX, MSG.INVALID_PASSWORD),
});

export const signIn = async (prev: any, formData: FormData) => {
  const data = {
    email: formData.get("email"),
    password: formData.get("password"),
  };
  const result = await formSchema.safeParseAsync(data);
  if (result.error) {
    return result.error.flatten();
  } else {
    const { email, password } = result.data;
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true, passwrod: true },
    });
    if (!user) {
      return {
        fieldErrors: {
          email: [MSG.NOT_EXISTED_EMAIL],
        },
      };
    }
    const ok = await bcrypt.compare(password, user?.passwrod ?? "");
    if (ok) {
      const session = await getSession();
      session.id = user!.id;
      // session을 만들고 반드시 save()를 해야 쿠키에 저장된다.
      await session.save();
      redirect("/profile");
    } else {
      return {
        fieldErrors: {
          password: [MSG.WRONG_PASSWORD],
        },
      };
    }
  }
};
