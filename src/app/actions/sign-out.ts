"use server";

import getSession from "@/lib/session";
import { redirect } from "next/navigation";

export const signOut = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};
