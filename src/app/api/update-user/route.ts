// dayjs
import dayjs from "dayjs";
import "dayjs/locale/ko";

export const GET = async (request: Request) => {
  const locale = String(request.headers.get("accept-language"));
  dayjs.locale(locale);
  return Response.json({
    ok: true,
  });
};
