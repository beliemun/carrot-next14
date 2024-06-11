"use server";

import { MAX_LENGTH, MIN_LENGTH, PASSWORD_REGEX, MSG } from "@/lib/constants";
import db from "@/lib/db";
// zod는 백엔드용 validation library이다.
import { z } from "zod";
import bcrypt from "bcrypt";
import { redirect } from "next/navigation";
import getSession from "@/lib/session";

// validation 영역
const forbiddenUsernameList = ["admin", "test"];
const validateForbiddenUsername = (username: string) => !forbiddenUsernameList.includes(username);
const valiedatePassword = ({ password, confirm }: { password: string; confirm: string }) => password === confirm;

// required는 기본값, optional() 값을 주면 선택값.
const formSchema = z
  .object({
    username: z
      .string()
      .min(MIN_LENGTH, MSG.MIN_LENGTH_4)
      .max(MAX_LENGTH, MSG.MAX_LENGTH_12)
      .toLowerCase()
      .trim()
      .refine(validateForbiddenUsername, MSG.FOBIDDEN_USERNAME),
    email: z.string().email({ message: MSG.INVALID_EMAIL }),
    password: z.string().min(MIN_LENGTH, MSG.MIN_LENGTH_4),
    confirm: z.string().min(MIN_LENGTH, MSG.MIN_LENGTH_4),
  })

  // 기존의 모든 refine을 실행하여 db를 hit하는 것을 방지하기 위해서 superRefine을 사용한다.
  // RefinementCtx는 일종의 에러 묶음이다.
  // validate를 할 때, db를 hit하는 부분은 순차적으로 superRefine으로 만들어서 불필요한 db hit이 발생하지 않도록 만든다.
  .superRefine(async ({ username }, ctx) => {
    const user = await db.user.findUnique({
      where: { username },
      select: { id: true },
    });
    if (user) {
      // Refine Context의 addIssue()를 통해 에러를 추가할 수 있다.
      ctx.addIssue({
        code: "custom",
        message: MSG.EXISTED_USERNAME,
        // object를 대상으로 refine을 하기 때문에 오류가 발생된 feild를 지정한다.
        path: ["username"],
        fatal: true,
      });
      // Zod를 NEVER로 리턴하고 fatal을 true로 설정하면 이하의 refine은 실행되지 않는다.
      return z.NEVER;
    }
  })
  .superRefine(async ({ email }, ctx) => {
    const user = await db.user.findUnique({
      where: { email },
      select: { id: true },
    });
    if (user) {
      ctx.addIssue({
        code: "custom",
        message: MSG.EXISTED_EMAIL,
        path: ["email"],
        fatal: true,
      });
      return z.NEVER;
    }
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
    const session = await getSession();
    session.id = user.id;
    // save를 할 때 암화화가 진행된다.
    await session.save();
    redirect("/profile");
  }
};
