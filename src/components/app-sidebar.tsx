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
  // useSidebar,
} from "@/components/ui/sidebar";
import { ADMIN_DASHBOARD, MenuItem } from "@/constants/dashboard";
import Link from "next/link";
import Footer from "./sidebar/footer";
import Image from "next/image";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "./ui/collapsible";
import { Button } from "./ui/button";
import { cn } from "@/lib/utils";
import { ChevronDown, ChevronLeft } from "lucide-react";
import { useState } from "react";
import { usePathname } from "next/navigation";
// import { Badge } from "./ui/badge";

export function AppSidebar() {
  // const { setOpenMobile } = useSidebar();
  return (
    <Sidebar variant="floating" side="right">
      <SidebarHeader className="p-4">
        <Image src={"/logo.svg"} alt="logo" width={100} height={64} />
      </SidebarHeader>

      <SidebarContent>
        <SidebarMenu>
          {ADMIN_DASHBOARD.map((item) => (
            <SidebarMenuItem key={item.label}>
              {item.subItems ? (
                <CollapsibleMenuItem item={item} />
              ) : (
                <SidebarMenuButton asChild>
                  <Link href={item.href}>
                    {item.icon && <item.icon className="mr-2 h-4 w-4" />}
                    <span>{item.label}</span>
                  </Link>
                </SidebarMenuButton>
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

function CollapsibleMenuItem({ item }: { item: MenuItem }) {
  const [isOpen, setIsOpen] = useState(false);
  const pathname = usePathname();

  const isActive = item.subItems?.some((subItem) => pathname === subItem.href);

  return (
    <Collapsible open={isOpen} onOpenChange={setIsOpen}>
      <CollapsibleTrigger asChild>
        <Button
          variant="ghost"
          className={cn(
            "w-full justify-between",
            isActive && "bg-accent text-accent-foreground"
          )}
        >
          <span className="flex items-center">
            {item.icon && <item.icon className="mr-0 h-4 w-4" />}
            <span>{item.label}</span>
          </span>
          {isOpen ? (
            <ChevronDown className="h-4 w-4" />
          ) : (
            <ChevronLeft className="h-4 w-4" />
          )}
        </Button>
      </CollapsibleTrigger>
      <CollapsibleContent>
        <SidebarMenuSub>
          {item.subItems?.map((subItem) => (
            <SidebarMenuSubItem key={subItem.label}>
              <SidebarMenuSubButton asChild>
                <Link href={subItem.href}>{subItem.label}</Link>
              </SidebarMenuSubButton>
            </SidebarMenuSubItem>
          ))}
        </SidebarMenuSub>
      </CollapsibleContent>
    </Collapsible>
  );
}
