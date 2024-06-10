"use server";

import {
  EMAIL_INVALID,
  NAME_MAX_LENGTH,
  NAME_MAX_LENGTH_ERROR,
  NAME_MIN_LENGTH,
  NAME_MIN_LENGTH_ERROR,
  NAME_REFINE_ERROR,
  PASSWORD_MIN_LENGTH,
  PASSWORD_MIN_LENGTH_ERROR,
  PASSWORD_REGEX,
  PASSWORD_REGEX_ERROR,
} from "@/lib/constants";
// zod는 백엔드용 validation library이다.
import { z } from "zod";

const refineList = ["admin", "test"];
const validateName = (name: string) => !refineList.includes(name);
const valiedatePassword = ({ password, confirm }: { password: string; confirm: string }) => password === confirm;

// required는 기본값, optional() 값을 주면 선택값.
const formSchema = z
  .object({
    name: z
      .string()
      .min(NAME_MIN_LENGTH, NAME_MIN_LENGTH_ERROR)
      .max(NAME_MAX_LENGTH, NAME_MAX_LENGTH_ERROR)
      .toLowerCase()
      .trim()
      .refine(validateName, NAME_REFINE_ERROR),
    email: z.string().email({ message: EMAIL_INVALID }),
    password: z.string().min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR).regex(PASSWORD_REGEX, PASSWORD_REGEX_ERROR),
    confirm: z.string().min(PASSWORD_MIN_LENGTH, PASSWORD_MIN_LENGTH_ERROR),
  })
  .refine(valiedatePassword, {
    // 이곳에서 나타나는 에러는 필드(fieldErrors)가 아닌 폼(formErrors)에서 일어났다고 알려주므로,
    // path를 통해 어떤 필드의 에러인지 선택해줄 수 있다.
    message: "두 비밀번호가 일치하지 않습니다.",
    path: ["confirm"],
  });

export const SignUp = async (prev: any, formData: FormData) => {
  const data = {
    name: formData.get("name"),
    email: formData.get("email"),
    password: formData.get("password"),
    confirm: formData.get("confirm"),
  };
  //   zod의 parse는 erorr를 throw하지만 safeParse는 결과 값을 줌
  const result = formSchema.safeParse(data);
  //   error의 flatten을 사용하면 erorr 내용을 요약해서 볼 수 있음
  if (result.error) {
    console.log(result.error?.flatten());
    return result.error?.flatten();
  } else {
    console.log(result.data);
  }
};
