import { api } from "@/lib/services";
import { TWhoami } from "@/types/api/users";

export const whoami = (): Promise<TWhoami> => api("users/whoami");
