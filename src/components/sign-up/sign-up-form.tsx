"use client";

import { signUpAction } from "@/app/actions";
import { Input, Button, Icons } from "@/components/common";
import { useFormState } from "react-dom";

export const SignUpForm = () => {
  const [state, action] = useFormState(signUpAction, null);
  return (
    <form className="space-y-4" action={action}>
      <Input
        name="username"
        icon={Icons.Email}
        placeholder="이름"
        type="text"
        minLength={4}
        maxLength={12}
        required
        errors={state?.fieldErrors.username}
      />
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
      <Input
        name="confirm"
        icon={Icons.Password}
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
