"use client";

import { Input, Button, Icons } from "@/components";
import { useFormState } from "react-dom";
import { smsVerification } from "../actions";

export default () => {
  const [state, action] = useFormState(smsVerification, null);
  return (
    <main className="h-screen w-full">
      <div className="p-4">
        <h1 className="text-3xl">SMS 로그인</h1>
        <p className="mt-2">전화번호를 입력하세요.</p>
      </div>
      <div className="p-4 w-full">
        <form action={action} className="space-y-4">
          <Input name="phone" icon={Icons.User} placeholder="전화번호" type="number" required errors={state?.fieldErrors.phone} />
          <Input
            name="code"
            icon={Icons.Password}
            placeholder="인증번호"
            type="number"
            required
            errors={state?.fieldErrors.code}
          />
        </form>
        <div className="space-y-4 mt-4">
          <Button className="w-full" type="Button" href="#" label="인증" />
        </div>
      </div>
    </main>
  );
};
