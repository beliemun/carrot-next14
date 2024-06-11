"use client";

import { Input, Button, Icons } from "@/components";
import { signIn } from "../actions";
import { useFormState } from "react-dom";

export default function SignIn() {
  const [state, action] = useFormState(signIn, null);
  return (
    <main className="h-screen w-full">
      <div className="p-4">
        <h1 className="text-3xl">로그인</h1>
        <p className="mt-2">로그인을 위해 이메일과 비밀번호를 입력하세요.</p>
      </div>
      <div className="p-4 w-full">
        <form action={action} className="space-y-4">
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
          <Button className="w-full" type="Button" label="로그인" />
        </form>
        <div className="divider" />
        <div className="space-y-4">
          <Button className="w-full" type="Link" href="/sign-in/github" icon={Icons.Code} label="깃허브로 계속" />
          <Button className="w-full" type="Link" href="/sign-in/sms" icon={Icons.ChatBubble} label="SMS로 계속" />
        </div>
      </div>
    </main>
  );
}
