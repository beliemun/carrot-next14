import { getIronSession } from "iron-session";
import { cookies } from "next/headers";

interface SessionContent {
  id?: number | undefined;
}
const getSession = async () => {
  return await getIronSession<SessionContent>(cookies(), {
    // iron session은 "carrot-next14"이라는 쿠키를 찾을 것이고 없으면 새로 생성한다.
    cookieName: "carrot-next14",
    password: process.env.COOKIE_PASSWORD!,
  });
};

export default getSession;
