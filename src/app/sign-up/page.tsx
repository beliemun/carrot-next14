"use client";

import { Input, Button, Icons } from "@/components";
import { useFormState } from "react-dom";
import { signUp } from "../actions";

export default function SignUp() {
  const [state, action] = useFormState(signUp, null);
  return (
    <main className="h-screen w-full">
      <div className="p-4">
        <h1 className="text-3xl">환영합니다!</h1>
        <p className="mt-2">가입을 위해 아래의 양식을 작성해주세요.</p>
      </div>
      <div className="p-4 w-full">
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
          <Input name="email" icon={Icons.User} placeholder="이메일" type="email" required errors={state?.fieldErrors.email} />
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
        <div className="divider" />
        <div className="space-y-4">
          <Button className="w-full" type="Link" href="/sign-in/github" icon={Icons.Code} label="깃허브로 가입" />
          <Button className="w-full" type="Link" href="/sign-in/sms" icon={Icons.ChatBubble} label="전화 번호로 가입" />
        </div>
      </div>
    </main>
  );
}
