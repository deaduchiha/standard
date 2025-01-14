"use client";
import { useWhoami } from "@/hooks/whoami";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => {
  const { data } = useWhoami();
  console.log(data);

  return children;
};

export default Layout;
