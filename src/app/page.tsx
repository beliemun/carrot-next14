"use client";

import { cn } from "@/shared/utils";
import Link from "next/link";

export default () => {
  return (
    <main className="col-center h-screen">
      <div className="flex-1 col-center space-y-4">
        <p className="text-9xl">🥕</p>
        <h1 className="text-4xl text-primary font-bold">당근 마켓</h1>
        <p className="text-xl">당근 마켓에 어서오세요!</p>
      </div>
      <div className="w-full col-center p-4 space-y-4">
        <Link className="btn btn-primary" href={"/sign-up"}>
          Get Started
        </Link>
        <div className="row-center space-x-2">
          <p>이미 계정이 있나요?</p>
          <Link className="text-primary" href={"/sign-in"}>
            로그인
          </Link>
        </div>
      </div>
    </main>
  );
};
