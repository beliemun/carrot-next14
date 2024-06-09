"use server";

// zod는 백엔드용 validation library이다.
import { z } from "zod";

const refineList = ["admin", "test"];
const validateName = (name: string) => !refineList.includes(name);
const valiedatePassword = ({ password, confirm }: { password: string; confirm: string }) => password === confirm;
const passwordRegex = new RegExp(/^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$%^&*-]).+$/);

// required는 기본값, optional() 값을 주면 선택값.
const formSchema = z
  .object({
    name: z
      .string({ invalid_type_error: "이름은 문자만 입력이 가능합니다." })
      .min(4, "이름은 최소 4글자를 입력해야 합니다.")
      .max(12, "이름은 최대 12글자까지 입력이 가능합니다.")
      .toLowerCase()
      .trim()
      .refine(validateName, "사용할 수 없는 이름입니다."),
    email: z.string({ invalid_type_error: "이메일은 문자만 입력이 가능합니다." }).email(),
    password: z
      .string({ invalid_type_error: "비밀번호는 문자만 입력이 가능합니다." })
      .min(4, "이름은 최소 4글자를 입력해야 합니다.")
      .regex(passwordRegex, "비밀번호는 소문자, 대문자, 숫자, 특수문자를 포함해야 합니다."),
    confirm: z
      .string({ invalid_type_error: "비밀번호는 문자만 입력이 가능합니다." })
      .min(4, "이름은 최소 4글자를 입력해야 합니다."),
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
