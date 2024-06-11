"use server";

import getSession from "@/lib/session";
import { redirect } from "next/navigation";

const signOut = async () => {
  const session = await getSession();
  session.destroy();
  redirect("/");
};

export default signOut;
