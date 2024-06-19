import { z } from "zod";
import { MSG } from "./constants";

export const productSchema = z.object({
  photo: z.string({ required_error: MSG.REQUIRED }),
  title: z.string({ required_error: MSG.REQUIRED }),
  price: z.coerce.number({ required_error: MSG.REQUIRED }),
  description: z.string({ required_error: MSG.REQUIRED }),
});

// react hook form을 사용할 때 아래와 같이 하면, 기존의 zod schema를 따라 form을 위한 타입을 생성할 수 있다.
export type ProductFormType = z.infer<typeof productSchema>;
