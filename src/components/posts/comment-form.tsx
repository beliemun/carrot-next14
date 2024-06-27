"use client";

import { createCommentAction } from "@/actions/posts";
import { Button } from "../common";
import Input from "../common/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CommentFormType, commentFormSchema } from "@/lib/schemas";
import { useRef } from "react";

interface CommentFormProps {
  postId: number;
  userId: number;
}

export const CommentForm = ({ postId, userId }: CommentFormProps) => {
  const inputRef = useRef<HTMLInputElement | null>(null);
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm<CommentFormType>({
    resolver: zodResolver(commentFormSchema),
  });
  const onSubmit = handleSubmit(async (data: CommentFormType) => {
    if (inputRef.current) {
      inputRef.current.value = "";
    }

    const formData = new FormData();
    formData.append("postId", String(data.postId));
    formData.append("userId", String(data.userId));
    formData.append("comment", data.comment);
    return await createCommentAction(formData);
  });
  const onValid = async () => {
    setValue("postId", postId);
    setValue("userId", userId);
    await onSubmit();
  };
  const { ref, ...rest } = register("comment");
  return (
    <form action={onValid} className="fixed bottom-0 row-center w-full p-4 gap-4 bg-base-300">
      <Input
        className="w-full"
        {...rest}
        errors={errors.comment?.message ? [errors.comment?.message] : undefined}
        ref={(e) => {
          ref(e);
          inputRef.current = e;
        }}
      />
      <Button className="flex justify-end" type="Button" label="입력" />
    </form>
  );
};
