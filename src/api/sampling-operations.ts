import { TFormData } from "@/components/dashboard/sampling-operations/form";
import { api } from "@/lib/services";
import { TSamplingOperation } from "@/types/api/sampling-operators";

export type TPostSamplingOperators = {
  productionUnitId: number;
  sampleLabs: TFormData["step3"];
  payment: TFormData["step4"];
};

export const postSamplingOperations = (body: TPostSamplingOperators) =>
  api("sampling-operations", {
    method: "POST",
    body,
  });

export const getSamplingOperations = (): Promise<{
  samplingOperations: TSamplingOperation[];
}> => api("sampling-operations");

export const changePaymentStatus = (id: number) =>
  api(`sampling-operations/payment-status/${id}`, {
    method: "PATCH",
  });
