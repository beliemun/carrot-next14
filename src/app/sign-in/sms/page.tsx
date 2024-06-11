"use client";

import { signInBySms } from "@/app/actions";
import { Input, Button, Icons } from "@/components";
import { useFormState } from "react-dom";

const initialState = {
  token: false,
  message: undefined,
};

export default function SignInBySms() {
  const [state, action] = useFormState(signInBySms, initialState);
  return (
    <main className="h-screen w-full">
      <div className="p-4">
        <h1 className="text-3xl">SMS 로그인</h1>
        <p className="mt-2">전화번호를 입력하세요.</p>
      </div>
      <div className="p-4 w-full">
        <form action={action} className="space-y-4">
          <Input
            name="phone"
            icon={Icons.User}
            placeholder="전화번호"
            type="text"
            required
            errors={state?.token ? undefined : state.error?.formErrors}
          />
          {state?.token ? (
            <Input
              name="code"
              icon={Icons.Password}
              placeholder="인증번호"
              type="text"
              required
              min={100000}
              max={999999}
              minLength={6}
              maxLength={6}
              errors={state.error?.formErrors}
            />
          ) : null}
          <Button className="w-full" type="Button" href="#" label="인증" />
        </form>
      </div>
    </main>
  );
}
