"use server";

import { MAX_LENGTH, MIN_LENGTH, PASSWORD_REGEX, MSG } from "@/lib/constants";
import db from "@/lib/db";
// zod는 백엔드용 validation library이다.
import { z } from "zod";
import bcrypt from "bcrypt";
import { hash } from "crypto";
import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

// validation 영역
const forbiddenUsernameList = ["admin", "test"];
const validateForbiddenUsername = (username: string) => !forbiddenUsernameList.includes(username);
const valiedatePassword = ({ password, confirm }: { password: string; confirm: string }) => password === confirm;
const validateExistedUsername = async (username: string) => {
  const existedUser = await db.user.findUnique({
    where: { username },
    select: { id: true },
  });
  return !Boolean(existedUser);
};
const validateExistedEmail = async (email: string) => {
  const existedUser = await db.user.findUnique({
    where: { email },
    select: { id: true },
  });
  return !Boolean(existedUser);
};

// required는 기본값, optional() 값을 주면 선택값.
const formSchema = z
  .object({
    username: z
      .string()
      .min(MIN_LENGTH, MSG.MIN_LENGTH_4)
      .max(MAX_LENGTH, MSG.MAX_LENGTH_12)
      .toLowerCase()
      .trim()
      .refine(validateForbiddenUsername, MSG.FOBIDDEN_USERNAME)
      // 여기까지가 일반적인 input 값에 대한 validation
      // 여기서부터는 백엔드에서 db를 생성하기 전에 이미 있는 값인지 판별하는 validation.
      // validation 영역이 확실하게 구분된다.
      .refine(validateExistedUsername, MSG.EXISTED_USERNAME),
    email: z.string().email({ message: MSG.INVALID_EMAIL }).refine(validateExistedEmail, MSG.EXISTED_EMAIL),
    password: z.string().min(MIN_LENGTH, MSG.MIN_LENGTH_4),
    // .regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR)
    confirm: z.string().min(MIN_LENGTH, MSG.MIN_LENGTH_4),
  })
  .refine(valiedatePassword, {
    // 이곳에서 나타나는 에러는 필드(fieldErrors)가 아닌 폼(formErrors)에서 일어났다고 알려주므로,
    // path를 통해 어떤 필드의 에러인지 선택해줄 수 있다.
    message: MSG.PASSWORD_MISMATCH,
    path: ["confirm"],
  });

export const SignUp = async (prev: any, formData: FormData) => {
  const data = {
    username: formData.get("username"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  };
  // zod의 parse는 erorr를 throw하지만 safeParse는 결과 값을 줌
  const result = await formSchema.safeParseAsync(data);
  // error의 flatten을 사용하면 erorr 내용을 요약해서 볼 수 있음
  if (result.error) {
    return result.error?.flatten();
  } else {
    // hash password
    const { username, email, password } = result.data;
    const hashedPassword = await bcrypt.hash(password, 12);
    // save the user to db
    const user = await db.user.create({
      data: {
        username,
        email,
        passwrod: hashedPassword,
      },
      select: { id: true },
    });
    // log the user in
    const cookie = await getIronSession(cookies(), {
      // iron session은 "carrot-next14"이라는 쿠키를 찾을 것이고 없으면 새로 생성한다.
      // password로 암호화를 하고, password로 복호화도 한다.
      cookieName: "carrot-next14",
      password: process.env.COOKIE_PASSWORD!,
    });
    // @ts-ignore
    cookie.id = user.id;
    // save를 할 때 암화화가 진행된다.
    await cookie.save();
    // redirect "/home"
    redirect("/profile");
  }
};
