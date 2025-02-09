import { api } from "@/lib/services";
import { TCollaboratingLabs } from "@/types/api/collaborating-labs";
import { TQueryParams } from "@/types/query-params";
import { TCreateCollaboratingLab } from "@/types/validations/collaborating-labs";

export const getCollaboratingLabs = (
  query: TQueryParams
): Promise<TCollaboratingLabs> =>
  api("/sampling/collaborating-labs", { query });

export const postCollaboratingLabs = (body: TCreateCollaboratingLab) =>
  api("/sampling/collaborating-labs", {
    method: "POST",
    body,
  });

export const editCollaboratingLabs = (
  body: TCreateCollaboratingLab,
  id: number
) =>
  api(`/sampling/collaborating-labs/${id}`, {
    method: "PUT",
    body,
  });

export const deleteCollaboratingLabs = (id: number) =>
  api(`/sampling/collaborating-labs/${id}`, {
    method: "DELETE",
  });
