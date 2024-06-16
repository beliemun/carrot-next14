"use client";

import { signInAction } from "@/actions";
import { useFormState } from "react-dom";
import { Button, Input } from "../common";
import { LockClosedIcon, UserIcon } from "@heroicons/react/16/solid";

export const SignInForm = () => {
  const [state, action] = useFormState(signInAction, null);
  if (state?.fieldErrors) {
    (document as any).getElementById("root_alert").showModal();
  }
  return (
    <form action={action} className="space-y-4">
      <Input
        name="email"
        icon={<UserIcon className="size-4" />}
        placeholder="이메일"
        type="email"
        required
        errors={state?.fieldErrors.email}
      />
      <Input
        name="password"
        icon={<LockClosedIcon className="size-4" />}
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
