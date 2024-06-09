import { FormInput, FormButton, Icons } from "@/components";

export default () => {
  return (
    <main className="h-screen w-full">
      <div className="p-4">
        <h1 className="text-3xl">SMS 로그인</h1>
        <p className="mt-2">전화번호를 입력하세요.</p>
      </div>
      <div className="p-4 w-full">
        <div className="space-y-4">
          <FormInput name="phone" icon={Icons.User} placeholder="전화번호" type="number" required />
          <FormInput name="code" icon={Icons.Password} placeholder="인증번호" type="number" required />
        </div>
        <div className="space-y-4 mt-4">
          <FormButton className="w-full" type="Button" href="#" label="인증" />
        </div>
      </div>
    </main>
  );
};
