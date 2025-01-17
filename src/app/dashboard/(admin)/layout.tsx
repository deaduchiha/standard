"use client";
import { useWhoami } from "@/hooks/whoami";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  useWhoami();

  return children;
};

export default Layout;
