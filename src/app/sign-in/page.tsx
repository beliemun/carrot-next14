import { FormInput, FormButton, Icons } from "@/components";

export default () => {
  return (
    <main className="h-screen w-full">
      <div className="p-4">
        <h1 className="text-3xl">로그인</h1>
        <p className="mt-2">로그인을 위해 이메일과 비밀번호를 입력하세요.</p>
      </div>
      <div className="p-4 w-full">
        <div className="space-y-4">
          <FormInput icon={Icons.User} placeholder="이메일" type="email" required />
          <FormInput icon={Icons.Password} placeholder="비밀번호" type="password" required />
        </div>
        <div className="space-y-4 mt-4">
          <FormButton href="#" label="로그인" />
          <div className="divider" />
          <FormButton href="/" icon={Icons.Code} label="깃허브로 계속" />
          <FormButton href="/sms" icon={Icons.ChatBubble} label="SMS로 계속" />
        </div>
      </div>
    </main>
  );
};
