"use server";

import { z } from "zod";
import validator from "validator";
import { CODE_MIN_MAX_ERROR, PHONE_INVALID_ERROR } from "@/lib/constants";
import { redirect } from "next/navigation";

const phoneSchema = z
  .string()
  .trim()
  .refine((phone) => validator.isMobilePhone(phone, "ko-KR"), PHONE_INVALID_ERROR);
// coerce는 원하는형태의 타입으로 변환을 시도하고, 문자가 있어서 변환에 실패할 경우 false를 준다.
const codeSchema = z.coerce
  .number({ invalid_type_error: "숫자만 입력해주세요." })
  .min(100000, CODE_MIN_MAX_ERROR)
  .max(999999, CODE_MIN_MAX_ERROR);

interface ActionState {
  token: boolean;
  message?: string[] | undefined;
}

export const signInBySms = async (prevState: ActionState, formData: FormData) => {
  const phone = formData.get("phone");
  const code = formData.get("code");

  if (!code) {
    const { success, error } = phoneSchema.safeParse(phone);
    error && console.log(error.flatten());
    if (success) {
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
