import db from "@/lib/db";
import getSession from "@/lib/session";
import { notFound, redirect } from "next/navigation";
import { NextRequest } from "next/server";

export const GET = async (request: NextRequest) => {
  // 1단계: 사용자가 깃허브에서 로그인을 허용하면 code가 나오는데, code로 url을 생성한다.
  const code = request.nextUrl.searchParams.get("code");
  if (!code) {
    return notFound();
  }
  const BASE_URL = "https://github.com/login/oauth/access_token";
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    client_secret: process.env.GITHUB_CLIENT_SECRETS!,
    code,
  };
  const formattedParams = new URLSearchParams(params).toString();
  const url = `${BASE_URL}?${formattedParams}`;
  //   2단계: access token으로 post 요청을 하면 scope에 설정했던 정보를 받을 수 있다.
  const accessTokenResponse = await fetch(url, {
    method: "POST",
    headers: { Accept: "application/json" },
  });
  const { error, access_token } = await accessTokenResponse.json();
  if (error) {
    return Response.redirect(new URL("/", request.url));
  }
  //   3단계: access token을 헤더에 넣고 get 요청을 하면 scope에 설정했던 정보를 받을 수 있다.
  const userProfileResponse = await fetch("https://api.github.com/user", {
    headers: {
      Authorization: `Bearer ${access_token}`,
    },
    // Next.js에서는 기본적으로 Get요청에 대한 cache가 이루어지기 때문에, 해당 Get요청에 대해서는 캐시를 막는다.
    cache: "no-cache",
  });
  const { id, avatar_url, login } = await userProfileResponse.json();
  const user = await db.user.findUnique({
    where: { githubId: String(id) },
    select: { id: true },
  });
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
      },
    });
    userId = newUser.id;
  }
  const session = await getSession();
  session.id = userId;
  await session.save();
  return redirect("/profile");
};
