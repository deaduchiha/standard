import { api } from "@/lib/services";
import { TLogin } from "@/types/api/auth";

export type TLoginBody = { username: string; password: string };

export const login = (body: TLoginBody): Promise<TLogin> =>
  api("auth/login", { method: "POST", body });
