import type { Metadata } from "next";

import { LayoutProps } from "@/interfaces/layout-interface";
import { Sidebar } from "./_components/sidebar";
import { OrgSidebar } from "./_components/org-sidebar";
import { Navbar } from "./_components/navbar";

export const metadata: Metadata = {
  title: "Boardy Dashboard",
  description: "Create all content in the canva",
};

const DashboardLayout = ({ children }: LayoutProps) => {
  return (
    <main className="h-full">
      <Sidebar />
      <div className="pl-[60px] h-full">
        <div className="flex gap-x-3 h-full">
          <OrgSidebar />
          <div className="h-full flex-1">
            <Navbar />
            {children}
          </div>
        </div>
      </div>
    </main>
  );
};

export default DashboardLayout;
