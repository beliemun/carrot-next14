import "./globals.css";
import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { cn } from "@/lib/utils";
import { Alert } from "@/components/common";

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
    <html lang="en" data-theme="forest" suppressHydrationWarning>
      <body className={cn(inter.className, "flex flex-col items-center bg-base-300")}>
        <div className="w-full h-screen max-w-sm bg-base-100">{children}</div>
        <Alert />
      </body>
    </html>
  );
}
