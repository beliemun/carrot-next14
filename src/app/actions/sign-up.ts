"use server";

import { MAX_LENGTH, MIN_LENGTH, PASSWORD_REGEX, MSG } from "@/lib/constants";
import db from "@/lib/db";
// zod는 백엔드용 validation library이다.
import { z } from "zod";
import bcrypt from "bcrypt";
import { hash } from "crypto";

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
    const hashedPassword = await bcrypt.hash(result.data.password, 12);
    const user = await db.user.create({
      data: {
        username,
        email,
        passwrod: hashedPassword,
      },
      select: { id: true },
    });
    console.log(user);
    // save the user to db
    // log the user in
    // redirect "/home"
  }
};
