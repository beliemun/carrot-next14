"use client";

import { signInBySmsAction } from "@/actions/sign-in";
import { Input, Button } from "@/components/common";
import { useAlertStore } from "@/stores";
import { LockClosedIcon, UserIcon } from "@heroicons/react/24/solid";
import { useEffect } from "react";
import { useFormState } from "react-dom";

const initialState = {
  token: false,
  error: undefined,
  alert: undefined,
};

export const SmsForm = () => {
  const [state, action] = useFormState(signInBySmsAction, initialState);
  const { show } = useAlertStore();
  useEffect(() => {
    if (state.alert) {
      const { title, message } = state.alert;
      show({ title, message });
    }
  }, [state]);
  return (
    <form action={action} className="space-y-4">
      <Input
        name="phone"
        icon={<UserIcon className="size-4" />}
        placeholder="전화번호"
        type="text"
        required
        errors={state?.token ? undefined : state.error?.formErrors}
      />
      {state?.token ? (
        <Input
          name="token"
          icon={<LockClosedIcon className="size-4" />}
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
