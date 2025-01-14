"use client";
import { useWhoami } from "@/hooks/whoami";
import { LoaderCircle } from "lucide-react";
import { usePathname, useRouter } from "next/navigation";
import Cookies from "js-cookie";
import { ReactNode, useEffect } from "react";
import { queryClient } from "@/app/Providers";

const AuthGuard = ({ children }: { children: ReactNode }) => {
  const { isLoading, isError, data } = useWhoami();
  const pathname = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (isError && pathname !== "/") {
      Cookies.remove("token");
      queryClient.clear();
      router.replace("/");
    }
  }, [isError, pathname, router]);

  if (isLoading)
    return (
      <div className="absolute inset-0 w-full h-screen bg-white grid place-items-center">
        <LoaderCircle className="animate-spin size-12" />
      </div>
    );

  if (data) return children;
};

export default AuthGuard;
