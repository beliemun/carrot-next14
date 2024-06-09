"use client";

import { FormInput, FormButton, Icons } from "@/components";
import { signIn } from "../actions";
import { useFormState } from "react-dom";

export default () => {
  const [state, action] = useFormState(signIn, null);
  return (
    <main className="h-screen w-full">
      <div className="p-4">
        <h1 className="text-3xl">로그인</h1>
        <p className="mt-2">로그인을 위해 이메일과 비밀번호를 입력하세요.</p>
      </div>
      <div className="p-4 w-full">
        <form action={action} className="space-y-4">
          <FormInput name="email" icon={Icons.User} placeholder="이메일" type="email" required />
          <FormInput name="password" icon={Icons.Password} placeholder="비밀번호" type="password" required />
          <FormButton className="w-full" type="Button" label="로그인" />
        </form>
        <div className="divider" />
        <div className="space-y-4">
          <FormButton className="w-full" type="Link" href="#" icon={Icons.Code} label="깃허브로 계속" />
          <FormButton className="w-full" type="Link" href="/sms" icon={Icons.ChatBubble} label="SMS로 계속" />
        </div>
      </div>
    </main>
  );
};
