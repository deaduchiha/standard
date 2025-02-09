import { api } from "@/lib/services";
import { TSamples } from "@/types/api/samples";
import { TQueryParams } from "@/types/query-params";
import { TCreateSample } from "@/types/validations/samples";

export const getSamples = (query: TQueryParams): Promise<TSamples> =>
  api("/sampling/samples", {
    query,
  });

export const postSample = (body: TCreateSample) =>
  api("/sampling/samples/", {
    method: "POST",
    body,
  });

export const editSample = (body: TCreateSample, id: number) =>
  api(`/sampling/samples/${id}`, {
    method: "PUT",
    body,
  });

export const deleteSample = (id: number) =>
  api(`/sampling/samples/${id}`, {
    method: "DELETE",
  });

export const getSampleByProductsUnitId = (
  id: string | number
): Promise<TSamples> => api(`samples/production-units/${id}`);
