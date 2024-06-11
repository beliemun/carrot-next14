import { Button } from "@/components";
import { signOut } from "../actions";
import { getUser } from "@/lib/get-user";

export default async function Profile() {
  const user = await getUser();
  return (
    <main className="h-screen w-full">
      <div className="p-4">
        <h1 className="text-3xl">반갑습니다.</h1>
        {user ? <p className="mt-2">{`${user?.username}님`}</p> : null}
        <div className="divider" />
        <form action={signOut}>
          <Button label="로그아웃" type="Button" />
        </form>
      </div>
    </main>
  );
}
