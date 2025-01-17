"use client";
import { ReactNode } from "react";
import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { AppSidebar } from "@/components/app-sidebar";
import AuthGuard from "@/components/auth-guard";
import { Separator } from "@/components/ui/separator";
import BreadcrumbComponent from "@/components/breadcrumb";

const Layout = ({ children }: { children: ReactNode }) => {
  return (
    <AuthGuard>
      <SidebarProvider>
        <AppSidebar />
        <main className="w-full overflow-hidden ">
          <header className="flex h-16 shrink-0 items-center border-b gap-2 px-4">
            <SidebarTrigger />
            <Separator orientation="vertical" className="mr-2 h-4" />
            <BreadcrumbComponent />
          </header>

          <div className="p-4">{children}</div>
        </main>
      </SidebarProvider>
    </AuthGuard>
  );
};

export default Layout;
