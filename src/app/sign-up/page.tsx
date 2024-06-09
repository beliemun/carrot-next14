"use client";

import { FormInput, FormButton, Icons } from "@/components";
import { useFormState } from "react-dom";
import { SignUp } from "../actions";

export default () => {
  const [state, action] = useFormState(SignUp, null);
  return (
    <main className="h-screen w-full">
      <div className="p-4">
        <h1 className="text-3xl">환영합니다!</h1>
        <p className="mt-2">가입을 위해 아래의 양식을 작성해주세요.</p>
      </div>
      <div className="p-4 w-full">
        <form className="space-y-4" action={action}>
          <FormInput name="name" icon={Icons.Email} placeholder="이름" type="text" required errors={state?.fieldErrors.name} />
          <FormInput
            name="email"
            icon={Icons.User}
            placeholder="이메일"
            type="email"
            required
            errors={state?.fieldErrors.email}
          />
          <FormInput
            name="password"
            icon={Icons.Password}
            placeholder="비밀번호"
            type="password"
            required
            errors={state?.fieldErrors.password}
          />
          <FormInput
            name="confirm"
            icon={Icons.Password}
            placeholder="비밀번호 확인"
            type="password"
            required
            errors={state?.fieldErrors.confirm}
          />
          <FormButton className="w-full" type="Button" label="계정 생성" />
        </form>
        <div className="divider" />
        <div className="space-y-4">
          <FormButton className="w-full" type="Link" href="/" icon={Icons.Code} label="깃허브로 가입" />
          <FormButton className="w-full" type="Link" href="/sms" icon={Icons.ChatBubble} label="전화 번호로 가입" />
        </div>
      </div>
    </main>
  );
};
