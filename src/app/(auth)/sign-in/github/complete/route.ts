import db from "@/lib/db";
import { signUserIn } from "@/lib/session";
import { badRequest } from "@/networks/common";
import { requestAccessToken, reqeustUserData } from "@/networks/github";
import { redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return badRequest();
  }
  const { access_token, error } = await requestAccessToken({ code });
  if (error) {
    return badRequest();
  }
  const { id, avatar_url, login, email } = await reqeustUserData({ access_token });
  const user = await db.user.findUnique({
    where: { githubId: String(id) },
    select: { id: true },
  });
  // 이미 깃허브 아이디에 연결된 유저가 있다면 해당 유저를 사용, 없으면 새로 만든다.
  let userId;
  if (user) {
    userId = user.id;
  } else {
    const newUser = await db.user.create({
      data: {
        // 기존 회원의 이름과 중복될 수 있다.
        username: `${login}-gh`,
        avatar: avatar_url,
        githubId: String(id),
        // email: Boolean(existedEmail) ? email : undefined,
      },
    });
    userId = newUser.id;
  }
  await signUserIn({ id: userId, url: "/profile" });
};
