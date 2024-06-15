"use client";

import { Button, Icons } from "@/components/common";
import { SignUpForm } from "@/components/sign-up";

export default function SignUp() {
  return (
    <main className="h-screen w-full">
      <div className="p-4">
        <h1 className="text-3xl">환영합니다!</h1>
        <p className="mt-2">가입을 위해 아래의 양식을 작성해주세요.</p>
      </div>
      <div className="p-4 w-full">
        <SignUpForm />
        <div className="divider" />
        <div className="space-y-4">
          <Button
            className="w-full"
            type="Link"
            href="/sign-in/github"
            icon={Icons.Code}
            label="깃허브로 가입"
          />
          <Button
            className="w-full"
            type="Link"
            href="/sign-in/sms"
            icon={Icons.ChatBubble}
            label="전화 번호로 가입"
          />
        </div>
      </div>
    </main>
  );
}
