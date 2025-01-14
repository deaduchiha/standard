import { whoami } from "@/api/users";
import { useQuery } from "@tanstack/react-query";
import { redirect } from "next/navigation";

const MINUTE = 1000 * 60;

export const useWhoami = () => {
  return useQuery({
    queryKey: ["whoami"],
    queryFn: async () => {
      const user = await whoami();

      if (!user.user) {
        redirect("/");
      }

      return user.user;
    },
    gcTime: 15 * MINUTE,
  });
};
