import { cookies } from "next/headers";
import { NextRequest } from "next/server";
import getSession from "./lib/session";

export const middleware = async (request: NextRequest) => {
  const session = await getSession();
  console.log(session);
  if (request.nextUrl.pathname === "/profile") {
    return Response.redirect(new URL("/", request.url));
  }
};

export const config = {
  // /api, /_next/static, _next/image, favicon.ico의 경우 실행하지 않음
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
