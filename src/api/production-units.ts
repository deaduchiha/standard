import { api } from "@/lib/services";
import { TQueryParams } from "@/types/query-params";
import { TProductionUnits } from "@/types/validations/production-units";

export const getProductionUnits = (
  query: TQueryParams
): Promise<{
  productionUnits: (TProductionUnits & { id: number })[];
  totalPages: number;
}> =>
  api("/production-units", {
    query,
  });

export const deleteProductionUnits = (id: number) =>
  api(`/production-units/${id}`, {
    method: "DELETE",
  });

export const createProductionUnits = (body: TProductionUnits) =>
  api("/production-units", {
    body,
    method: "POST",
  });

export const editProductionUnits = (body: TProductionUnits, id: number) =>
  api(`/production-units/${id}`, {
    body,
    method: "PUT",
  });
