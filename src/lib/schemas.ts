import { z } from "zod";
import { MIN_LENGTH, MSG } from "./constants";

export const productSchema = z.object({
  photo: z.string({ required_error: MSG.REQUIRED }),
  title: z.string({ required_error: MSG.REQUIRED }),
  price: z.coerce.number({ required_error: MSG.REQUIRED }),
  description: z.string({ required_error: MSG.REQUIRED }),
});

// react hook form을 사용할 때 아래와 같이 하면, 기존의 zod schema를 따라 form을 위한 타입을 생성할 수 있다.
export type ProductFormType = z.infer<typeof productSchema>;

export const commentFormSchema = z.object({
  postId: z.coerce.number(),
  userId: z.coerce.number(),
  comment: z.string().min(MIN_LENGTH, MSG.MIN_LENGTH_4),
});

export type CommentFormType = z.infer<typeof commentFormSchema>;
