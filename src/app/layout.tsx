import "@/lib/db";
import "@/styles/globals.css";

import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
dayjs.extend(relativeTime);
import "dayjs/locale/ko";
dayjs.locale("ko");

import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Alert, ClientProvider } from "@/components/common";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: {
    template: "%s | Carrot Market",
    default: "Carrot Market",
  },
  description: "Sell and buy all the things!",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" data-theme="light" suppressHydrationWarning>
      <body className={cn(inter.className, "flex flex-col items-center bg-base-300")}>
        <div className="w-full max-w-sm bg-base-100">{children}</div>
        <ClientProvider>
          <Alert />
        </ClientProvider>
      </body>
    </html>
  );
}
