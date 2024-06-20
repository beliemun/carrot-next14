import { Button } from "@/components/common";
import { getUser } from "@/lib/get-user";
import { signUserOut } from "@/lib/session";

export default async function Profile() {
  const user = await getUser();
  return (
    <main className="min-h-screen w-full">
      <div className="p-4">
        <h1 className="text-3xl">반갑습니다.</h1>
        {user ? <p className="mt-2">{`${user?.username}님`}</p> : null}
        <div className="divider" />
        <form action={signUserOut}>
          <Button label="로그아웃" type="Button" />
        </form>
      </div>
    </main>
  );
}
