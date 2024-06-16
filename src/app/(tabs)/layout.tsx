import { TabBar } from "@/components/common";
import { ReactNode } from "react";

export default function TabLayout({ children }: { children: ReactNode }) {
  return (
    <div>
      {children}
      <TabBar />
    </div>
  );
}
