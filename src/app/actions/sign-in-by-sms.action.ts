"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import { MSG } from "@/lib/constants";
import db from "@/lib/db";
import { create } from "domain";

const MIN_NUMBER = 100000;
const MAX_NUMBER = 999999;

const phoneSchema = z
  .string()
  .trim()
  .refine((phone) => validator.isMobilePhone(phone, "ko-KR"), MSG.UNABLED_NUMBER);
// coerce는 원하는형태의 타입으로 변환을 시도하고, 문자가 있어서 변환에 실패할 경우 false를 준다.
const codeSchema = z.coerce
  .number({ invalid_type_error: "숫자만 입력해주세요." })
  .min(MIN_NUMBER, MSG.MIN_LENGTH_6)
  .max(MAX_NUMBER, MSG.NOT_ENOUGH_CODE);

interface ActionState {
  token: boolean;
  message?: string[] | undefined;
}

const getToken = async (): Promise<string> => {
  const token = String(Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER);
  console.log("token:", token);
  const existedToken = await db.smsToken.findUnique({
    where: { token },
  });
  if (existedToken) {
    console.log("again");
    return await getToken();
  } else {
    return token;
  }
};

const signInBySms = async (prevState: ActionState, formData: FormData) => {
  const phone = formData.get("phone");
  const code = formData.get("code");

  if (!code) {
    const { success, error, data } = phoneSchema.safeParse(phone);
    if (success) {
      // 사용자가 유효한 전화번호를 제공하면
      await db.smsToken.deleteMany({
        where: { user: { phone: data } },
      });
      // 해당 전화번호와 연결된 모든 토큰을 삭제하고, 새로운 토큰을 만드는데
      const token = await getToken();
      await db.smsToken.create({
        data: {
          token,
          user: {
            connectOrCreate: {
              // 이미 전화번호로 가입되어 있는 유저가 있는지 확인하고 있으면, 해당 유저와 연결하고
              where: {
                phone: data,
              },
              // 없다면 새로운 유저를 생성해서 연결한다.
              create: {
                username: crypto.randomUUID(),
                phone: data,
              },
            },
          },
        },
      });
      // send the token using twillio
      return {
        token: true,
      };
    } else {
      return {
        token: false,
        error: error.flatten(),
      };
    }
  } else {
    const { success, error } = codeSchema.safeParse(code);
    if (success) {
      redirect("/");
    } else {
      return {
        token: true,
        error: error.flatten(),
      };
    }
  }
};

export default signInBySms;
