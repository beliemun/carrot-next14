import { SmsForm } from "@/components/sms";

export default function SignInBySms() {
  return (
    <main className="min-h-screen w-full">
      <div className="p-4">
        <h1 className="text-3xl">SMS 로그인</h1>
        <p className="mt-2">전화번호를 입력하세요.</p>
      </div>
      <div className="p-4 w-full">
        <SmsForm />
      </div>
    </main>
  );
}
