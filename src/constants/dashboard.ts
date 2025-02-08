import {
  // Building2,
  FileText,
  // FlaskConical,
  Home,
  LucideIcon,
  // SwatchBook,
  Users,
} from "lucide-react";

export interface MenuItem {
  icon?: LucideIcon;
  label: string;
  href: string;
  subItems?: MenuItem[]; // Optional, recursive structure for sub-items
}

export const ADMIN_DASHBOARD: MenuItem[] = [
  { icon: Home, label: "داشبورد", href: "/dashboard" },
  { icon: Users, label: "کاربران", href: "/dashboard/users" },
  {
    icon: FileText,
    label: "نمونه برداری",
    href: "",
    subItems: [
      { label: "واحد تولیدی", href: "/dashboard/production-units" },
      { label: "نمونه", href: "/dashboard/samples" },
      { label: "آزمایشگاه همکار", href: "/dashboard/collaborating-labs" },
      { label: "عملیات", href: "/dashboard/sampling-operations" },
      { label: "مالی", href: "/dashboard/payments" },
    ],
  },
];
