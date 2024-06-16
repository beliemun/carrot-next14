"use server";

import { z } from "zod";
import validator from "validator";
import { redirect } from "next/navigation";
import { MSG } from "@/lib/constants";
import db from "@/lib/db";
import { signUserIn } from "@/lib/session";
import twilio from "twilio";

const MIN_NUMBER = 100000;
const MAX_NUMBER = 999999;

const validateExsitedToken = async (token: number) => {
  const existedToken = await db.smsToken.findUnique({
    where: { token: String(token) },
    select: { id: true },
  });
  return Boolean(existedToken);
};

const phoneSchema = z
  .string()
  .trim()
  .refine((phone) => validator.isMobilePhone(phone, "ko-KR"), MSG.UNABLED_NUMBER);
// coerce는 원하는형태의 타입으로 변환을 시도하고, 문자가 있어서 변환에 실패할 경우 false를 준다.
const tokenSchema = z.coerce
  .number({ invalid_type_error: "숫자만 입력해주세요." })
  .min(MIN_NUMBER, MSG.MIN_LENGTH_6)
  .max(MAX_NUMBER, MSG.NOT_ENOUGH_CODE)
  .refine(validateExsitedToken, MSG.NOT_EXISTED_TOKEN);

const getToken = async (): Promise<string> => {
  const token = String(Math.floor(Math.random() * (MAX_NUMBER - MIN_NUMBER + 1)) + MIN_NUMBER);
  console.log("token:", token);
  const existedToken = await db.smsToken.findUnique({
    where: { token },
  });
  if (existedToken) {
    return await getToken();
  } else {
    return token;
  }
};

interface ActionState {
  token: boolean;
  error?: z.typeToFlattenedError<string, string> | undefined;
  alert?: { title: string; message: string } | undefined;
}

const signInBySms = async (prevState: ActionState, formData: FormData): Promise<ActionState> => {
  const phone = formData.get("phone");
  const token = formData.get("token");

  if (!token) {
    // 1. 핸드폰 번호 받는 첫번째 단계
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
      // twillio를 이용해서 토큰을 문자로 보낸다.
      // const twillioClient = twilio(process.env.TWILIO_ACCOUNT_SID, process.env.TWILIO_AUTH_TOKEN);
      // twillioClient.messages.create({
      //   body: `Your verification code is ${token}`,
      //   from: process.env.TWILIO_PHONE_NUMBER,
      //   to: "+821090374044", // input에서 받은 data가 되어야 함
      // });
      return {
        token: true,
        // 문자 대신 alert으로 보여줌
        alert: {
          title: "인증번호",
          message: `당신의 인증번호는 [${token}]입니다.`,
        },
      };
    } else {
      return {
        token: false,
        error: error.flatten(),
      };
    }
  } else {
    // 2. 토큰을 받는 두번째 단계
    const { success, error, data } = await tokenSchema.safeParseAsync(token);
    // 토큰 검증이 끝나면 토큰 아이디에 있는 로그인 아이디로 로그인 한다.
    if (success) {
      const token = await db.smsToken.findUnique({
        where: { token: String(data) },
        select: { userId: true },
      });
      return signUserIn({ id: token!.userId, url: "/" });
    } else {
      return {
        token: true,
        error: error.flatten(),
      };
    }
  }
};

export default signInBySms;
