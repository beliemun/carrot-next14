import { Button } from "@/components/common";
import { SignInForm } from "@/components/sign-in";
import { ChatBubbleLeftEllipsisIcon, CodeBracketSquareIcon } from "@heroicons/react/16/solid";

export default function SignIn() {
  return (
    <main className="min-h-screen w-full">
      <div className="p-4">
        <h1 className="text-3xl">로그인</h1>
        <p className="mt-2">로그인을 위해 이메일과 비밀번호를 입력하세요.</p>
      </div>
      <div className="p-4 w-full">
        <SignInForm />
        <div className="divider" />
        <div className="space-y-4">
          <Button
            className="w-full"
            type="Link"
            href="/sign-in/github"
            icon={<CodeBracketSquareIcon className="size-4" />}
            label="깃허브로 계속"
          />
          <Button
            className="w-full"
            type="Link"
            href="/sign-in/sms"
            icon={<ChatBubbleLeftEllipsisIcon className="size-4" />}
            label="SMS로 계속"
          />
        </div>
      </div>
    </main>
  );
}
