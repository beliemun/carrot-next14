import { FormInput, FormButton, Icons } from "@/components";

export default () => {
  return (
    <main className="h-screen w-full">
      <div className="p-4">
        <h1 className="text-3xl">환영합니다!</h1>
        <p className="mt-2">가입을 위해 아래의 양식을 작성해주세요.</p>
      </div>
      <div className="p-4 w-full">
        <div className="space-y-4">
          <FormInput icon={Icons.Email} placeholder="이름" type="text" required />
          <FormInput icon={Icons.User} placeholder="이메일" type="email" required />
          <FormInput icon={Icons.Password} placeholder="비밀번호" type="password" required />
          <FormInput icon={Icons.Password} placeholder="비밀번호 확인" type="password" required />
        </div>
        <div className="space-y-4 mt-4">
          <FormButton href="#" label="계정 생성" />
          <div className="divider" />
          <FormButton href="/" icon={Icons.Code} label="깃허브로 가입" />
          <FormButton href="/sms" icon={Icons.ChatBubble} label="전화 번호로 가입" />
        </div>
      </div>
    </main>
  );
};
