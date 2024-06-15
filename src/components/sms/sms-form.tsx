"use client";

import { signInBySmsAction } from "@/app/actions";
import { Input, Button, Icons } from "@/components/common";
import { useFormState } from "react-dom";

const initialState = {
  token: false,
  message: undefined,
};

export const SmsForm = () => {
  const [state, action] = useFormState(signInBySmsAction, initialState);
  return (
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
  );
};
