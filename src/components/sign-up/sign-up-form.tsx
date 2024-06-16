"use client";

import { signUpAction } from "@/actions";
import { Input, Button } from "@/components/common";
import { EnvelopeIcon, LockClosedIcon, UserIcon } from "@heroicons/react/16/solid";
import { useFormState } from "react-dom";

export const SignUpForm = () => {
  const [state, action] = useFormState(signUpAction, null);
  return (
    <form className="space-y-4" action={action}>
      <Input
        name="username"
        icon={<EnvelopeIcon className="size-4" />}
        placeholder="이름"
        type="text"
        minLength={4}
        maxLength={12}
        required
        errors={state?.fieldErrors.username}
      />
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
      <Input
        name="confirm"
        icon={<LockClosedIcon className="size-4" />}
        placeholder="비밀번호 확인"
        type="password"
        minLength={4}
        required
        errors={state?.fieldErrors.confirm}
      />
      <Button className="w-full" type="Button" label="계정 생성" />
    </form>
  );
};
