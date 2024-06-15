"use client";

import { signInAction } from "@/app/actions";
import { useFormState } from "react-dom";
import { Button, Icons, Input } from "../common";

export const SignInForm = () => {
  const [state, action] = useFormState(signInAction, null);
  if (state?.fieldErrors) {
    (document as any).getElementById("root_alert").showModal();
  }
  return (
    <form action={action} className="space-y-4">
      <Input
        name="email"
        icon={Icons.User}
        placeholder="이메일"
        type="email"
        required
        errors={state?.fieldErrors.email}
      />
      <Input
        name="password"
        icon={Icons.Password}
        placeholder="비밀번호"
        type="password"
        minLength={4}
        required
        errors={state?.fieldErrors.password}
      />
      <Button className="w-full" type="Button" label="로그인" />
    </form>
  );
};
