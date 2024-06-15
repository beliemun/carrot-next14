"use server";

import { MIN_LENGTH, MSG, PASSWORD_REGEX } from "@/lib/constants";
import db from "@/lib/db";
import { z } from "zod";
import bcrypt from "bcrypt";
import { signUserIn } from "@/lib/session";

const validateExistedEmail = async (email: string) => {
  const existedEmail = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return Boolean(existedEmail);
};

const formSchema = z.object({
  email: z
    .string()
    .email({ message: MSG.INVALID_EMAIL })
    .toLowerCase()
    .refine(validateExistedEmail, MSG.NOT_EXISTED_EMAIL),
  password: z.string().min(MIN_LENGTH, MSG.MIN_LENGTH_4),
  // .regex(PASSWORD_REGEX, MSG.INVALID_PASSWORD),
});

const signInAction = async (prev: any, formData: FormData) => {
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
      await signUserIn({ id: user.id, url: "/profile" });
    } else {
      return {
        fieldErrors: {
          password: [MSG.WRONG_PASSWORD],
        },
      };
    }
  }
};

export default signInAction;
