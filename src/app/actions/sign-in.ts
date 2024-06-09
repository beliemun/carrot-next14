"use server";

import { redirect } from "next/navigation";

export const signInAction = async (prev: any, formData: FormData) => {
  await new Promise((resolve) => setTimeout(resolve, 2000));
  //   console.log(formData.get("email"), formData.get("password"));
  return {
    errors: [],
  };
};
