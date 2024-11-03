"use client";
import { ReactNode } from "react";
import { DirectionProvider } from "@radix-ui/react-direction";

const Providers = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <DirectionProvider dir="rtl">{children}</DirectionProvider>
    </>
  );
};

export default Providers;
