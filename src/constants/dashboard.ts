import { BarChart2, FileText, Home, Settings, Users } from "lucide-react";

export const ADMIN_DASHBOARD = [
  { icon: Home, label: "داشبورد", href: "/dashboard" },
  { icon: BarChart2, label: "آنالیز", href: "/dashboard/analyze" },
  { icon: Users, label: "کاربران", href: "/dashboard/users" },
  {
    icon: FileText,
    label: "پرونده ها",
    href: "/dashboard/documents",
    subItems: [
      { label: "گزارشات", href: "/dashboard/documents/reports" },
      { label: "فاکتور ها", href: "/dashboard/documents/invoices" },
      { label: "مخاطبین", href: "/dashboard/documents/contracts" },
    ],
  },
  { icon: Settings, label: "تنظیمات", href: "/dashboard/settings" },
];
