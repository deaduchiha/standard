import { api } from "@/lib/services";
import { TUsers, TWhoami } from "@/types/api/users";

export const whoami = (): Promise<TWhoami> => api("users/whoami");

export const users = (): Promise<TUsers> => api("/users");
