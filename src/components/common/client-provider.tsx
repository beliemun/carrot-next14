"use client";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);

import "dayjs/locale/ko";
dayjs.locale("ko");

import { ReactNode, useEffect } from "react";

export const ClientProvider = ({ children }: { children: ReactNode }) => {
  useEffect(() => {
    // const initDayjsLocale = async () => {
    //   const locale = navigator.language;
    //   dayjs.locale(locale);
    //   await (
    //     await fetch("/api/update-user", {
    //       method: "get",
    //       headers: {
    //         "accept-language": locale,
    //       },
    //     })
    //   ).json();
    // };
    // initDayjsLocale();
  }, []);

  return <>{children}</>;
};
