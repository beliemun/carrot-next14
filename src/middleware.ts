import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import getSession from "./lib/session";

type Routes = {
  [key: string]: boolean;
};

const pulbicOnlyUrls: Routes = {
  "/": true,
  "/sign-in": true,
  "/sign-in-by-sms": true,
  "/sign-up": true,
};

export const middleware = async (request: NextRequest) => {
  const session = await getSession();
  const exists = pulbicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    // session.id가 없다는 것은 로그아웃이 되었다는 것을 뜻함
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // 로그인 된 상태의 처리
    if (exists) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }
};

export const config = {
  // /api, /_next/static, _next/image, favicon.ico의 경우 실행하지 않음
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
