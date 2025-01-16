import { api } from "@/lib/services";
import { TUsers, TWhoami } from "@/types/api/users";
import { TUserSchema } from "@/types/validation";

type TUsersQueries = {
  search?: number;
  page?: number;
  limit?: number;
  sort?: string;
  order?: "asc" | "desc";
};

export const whoami = (): Promise<TWhoami> => api("users/whoami");

export const users = ({
  search,
  page,
  limit,
  sort,
  order,
}: TUsersQueries): Promise<TUsers> =>
  api("/users", {
    query: {
      search,
      page,
      limit,
      sort,
      order,
    },
  });

export const createUser = (data: TUserSchema) =>
  api("/users", {
    method: "POST",
    body: data,
  });

export const editUser = ({ data, id }: { data: TEdit; id: number }) =>
  api(`/users/${id}`, {
    method: "PUT",
    body: data,
  });

export type TEdit = {
  fullname: string;
  username: string;
  mobile: string;
  role: "CEO" | "technicalInspector" | "technicalManager" | "accountant";
};

export const changePassword = ({
  password,
  id,
}: {
  password: string;
  id: number;
}) =>
  api(`users/change-password/${id}`, {
    method: "PATCH",
    body: {
      password,
    },
  });

export const deleteUser = (id: number) =>
  api(`users/${id}`, {
    method: "DELETE",
  });
