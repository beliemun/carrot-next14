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
          <FormInput name="name" icon={Icons.Email} placeholder="이름" type="text" required />
          <FormInput name="email" icon={Icons.User} placeholder="이메일" type="email" required />
          <FormInput name="password" icon={Icons.Password} placeholder="비밀번호" type="password" required />
          <FormInput name="confirm" icon={Icons.Password} placeholder="비밀번호 확인" type="password" required />
        </div>
        <div className="space-y-4 mt-4">
          <FormButton type="Link" href="#" label="계정 생성" />
          <div className="divider" />
          <FormButton type="Link" href="/" icon={Icons.Code} label="깃허브로 가입" />
          <FormButton type="Link" href="/sms" icon={Icons.ChatBubble} label="전화 번호로 가입" />
        </div>
      </div>
    </main>
  );
};
