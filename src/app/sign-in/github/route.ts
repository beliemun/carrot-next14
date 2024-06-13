export const GET = () => {
  const BASE_URL = "https://github.com/login/oauth/authorize";
  const params = {
    client_id: process.env.GITHUB_CLIENT_ID!,
    scope: "read:user,read:email",
    allow_signup: "true",
  };

  // URLSearchParams는 object를 URL 뒤에서 이어지는 쿼리 파라미터 형식으로 변환해준다.
  const formattedParams = new URLSearchParams(params).toString();
  const url = `${BASE_URL}?${formattedParams}`;
  return Response.redirect(url);
};
