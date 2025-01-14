import {
  Sidebar,
  SidebarContent,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarMenuSub,
  SidebarMenuSubButton,
  SidebarMenuSubItem,
} from "@/components/ui/sidebar";
import { ADMIN_DASHBOARD } from "@/constants/dashboard";
import Link from "next/link";
import Footer from "./sidebar/footer";
import Image from "next/image";
// import { Badge } from "./ui/badge";

export function AppSidebar() {
  return (
    <Sidebar side="right">
      <SidebarHeader className="p-4">
        <Image src={"/logo.svg"} alt="logo" width={100} height={64} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {ADMIN_DASHBOARD.map((item, index) => (
            <SidebarMenuItem key={index}>
              <SidebarMenuButton asChild className="justify-between">
                <Link href={item.href} className="flex items-center gap-3 py-2">
                  <div className="flex items-center gap-3">
                    <item.icon className="h-5 w-5 text-slate-500" />
                    <span className="text-sm font-medium">{item.label}</span>
                  </div>
                  {/* {item.badge && (
                    <Badge
                      variant="secondary"
                      className="bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300"
                    >
                      {item.badge}
                    </Badge>
                  )} */}
                </Link>
              </SidebarMenuButton>
              {item.subItems && (
                <SidebarMenuSub>
                  {item.subItems.map((subItem, subIndex) => (
                    <SidebarMenuSubItem key={subIndex}>
                      <SidebarMenuSubButton asChild>
                        <Link href={subItem.href} className="text-sm">
                          {subItem.label}
                        </Link>
                      </SidebarMenuSubButton>
                    </SidebarMenuSubItem>
                  ))}
                </SidebarMenuSub>
              )}
            </SidebarMenuItem>
          ))}
        </SidebarMenu>
      </SidebarContent>

      {/* side bar footer */}
      <Footer />
    </Sidebar>
  );
}
