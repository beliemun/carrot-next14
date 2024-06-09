"use server";

import { NextResponse } from "next/server";

export const signIn = async (prev: any, formData: FormData) => {
  console.log("prev:", prev);
  console.log("formData:", formData.get("email"), formData.get("password"));
  await new Promise((resolve) => setTimeout(resolve, 2000));
  return NextResponse.json({ ok: true });
};
