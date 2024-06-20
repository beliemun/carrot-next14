import { Button } from "@/components/common";
import { SignUpForm } from "@/components/sign-up";
import { ChatBubbleLeftEllipsisIcon, CodeBracketSquareIcon } from "@heroicons/react/16/solid";

export default function SignUp() {
  return (
    <main className="min-h-screen w-full">
      <div className="p-4">
        <h1 className="text-3xl">환영합니다!</h1>
        <p className="mt-2">가입을 위해 아래의 양식을 작성해주세요.</p>
      </div>
      <div className="p-4 w-full">
        <SignUpForm />
        <div className="divider" />
        <div className="space-y-4">
          <Button
            className="w-full"
            type="Link"
            href="/sign-in/github"
            icon={<CodeBracketSquareIcon className="size-4" />}
            label="깃허브로 가입"
          />
          <Button
            className="w-full"
            type="Link"
            href="/sign-in/sms"
            icon={<ChatBubbleLeftEllipsisIcon className="size-4" />}
            label="전화 번호로 가입"
          />
        </div>
      </div>
    </main>
  );
}
