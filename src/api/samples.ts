import { api } from "@/lib/services";
import { TSamples } from "@/types/api/samples";
import { TQueryParams } from "@/types/query-params";
import { TCreateSample } from "@/types/validations/samples";

export const getSamples = (query: TQueryParams): Promise<TSamples> =>
  api("/samples", {
    query,
  });

export const postSample = (body: TCreateSample) =>
  api("/samples/", {
    method: "POST",
    body,
  });

export const editSample = (body: TCreateSample, id: number) =>
  api(`/samples/${id}`, {
    method: "PUT",
    body,
  });

export const deleteSample = (id: number) =>
  api(`/samples/${id}`, {
    method: "DELETE",
  });
