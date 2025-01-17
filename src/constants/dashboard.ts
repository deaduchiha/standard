import {
  Building2,
  FlaskConical,
  Home,
  LucideIcon,
  SwatchBook,
  Users,
} from "lucide-react";

interface MenuItem {
  icon: LucideIcon;
  label: string;
  href: string;
  subItems?: MenuItem[]; // Optional, recursive structure for sub-items
}

export const ADMIN_DASHBOARD: MenuItem[] = [
  { icon: Home, label: "داشبورد", href: "/dashboard" },
  { icon: Users, label: "کاربران", href: "/dashboard/users" },
  {
    icon: Building2,
    label: "واحد تولیدی",
    href: "/dashboard/production-units",
  },
  { icon: SwatchBook, label: "نمونه", href: "/dashboard/samples" },
  {
    icon: FlaskConical,
    label: "آزمایشگاه",
    href: "/dashboard/collaborating-labs",
  },
  // {
  //   icon: FileText,
  //   label: "پرونده ها",
  //   href: "/dashboard/documents",
  //   subItems: [
  //     { label: "گزارشات", href: "/dashboard/documents/reports" },
  //     { label: "فاکتور ها", href: "/dashboard/documents/invoices" },
  //     { label: "مخاطبین", href: "/dashboard/documents/contracts" },
  //   ],
  // },
  // { icon: Settings, label: "تنظیمات", href: "/dashboard/settings" },
];
