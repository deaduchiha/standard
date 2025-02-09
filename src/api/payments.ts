import { api } from "@/lib/services";
import { TPayments } from "@/types/api/payments";

export const getPayments = (): Promise<TPayments> => api("sampling/payments");
