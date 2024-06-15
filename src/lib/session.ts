"use server";

import { getIronSession } from "iron-session";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

interface SessionContent {
  id?: number | undefined;
}

export const getSession = async () => {
  return await getIronSession<SessionContent>(cookies(), {
    // iron session은 "carrot-next14"이라는 쿠키를 찾을 것이고 없으면 새로 생성한다.
    cookieName: "carrot-next14",
    password: process.env.COOKIE_PASSWORD!,
  });
};

interface SignInProps extends SessionContent {
  url: string;
}

export const signUserIn = async ({ id, url }: SignInProps) => {
  const session = await getSession();
  session.id = id;
  await session.save();
  return redirect(url);
};

export const signUserOut = async () => {
  const session = await getSession();
  session.destroy();
  return redirect("/");
};
