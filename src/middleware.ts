import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { getSession } from "./lib/session";

type Routes = {
  [key: string]: boolean;
};

// 로그인이 되어있지 않을 때만 접근이 가능한 경로
const pulbicOnlyUrls: Routes = {
  "/": true,
  "/sign-in": true,
  "/sign-in/sms": true,
  "/sign-in/github": true,
  "/sign-in/github/complete": true,
  "/sign-up": true,
};

export const middleware = async (request: NextRequest) => {
  const session = await getSession();
  const exists = pulbicOnlyUrls[request.nextUrl.pathname];
  if (!session.id) {
    // 로그인이 되어있지 않은데 public url 이외의 경로로 접근한 경우 홈으로 이동
    if (!exists) {
      return NextResponse.redirect(new URL("/", request.url));
    }
  } else {
    // 로그인 된 상태에서 public url 경로로 접근한 경우 /products로 이동
    if (exists) {
      return NextResponse.redirect(new URL("/products", request.url));
    }
  }
  // 그 외에는 접근하려는 url로 이동
};

export const config = {
  // /api, /_next/static, _next/image, favicon.ico의 경우 실행하지 않음
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};
