"use client";

import { ReactNode, useEffect } from "react";

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    const initDayjsLocale = async () => {
      const locale = navigator.language;
      const { ok, error } = await (
        await fetch("/api/update-user", {
          method: "get",
          headers: {
            "accept-language": locale,
          },
        })
      ).json();
      ok && console.log(`언어 설정 성공: ${locale}`);
      error && console.log("언어 설정 실패:", error);
    };
    initDayjsLocale();
  }, []);

  return <>{children}</>;
};
