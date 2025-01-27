import { TSample } from "@/types/api/samples";
import { create } from "zustand";

type TSteps = "create" | "delete" | "edit" | null;

interface ISampleStore {
  open: boolean;
  setOpen: (open: boolean) => void;

  data: TSample | null;
  setData: (data: TSample | null) => void;

  step: TSteps;
  setStep: (data: TSteps) => void;

  isSampleOperator: boolean;
  setIsSampleOperator: (isSampleOperator: boolean) => void;

  productionId: number | null;
  setProductionId: (productionId: number | null) => void;
}

export const useSampleStore = create<ISampleStore>()((set) => ({
  open: false,
  data: null,
  step: null,
  productionId: null,
  isSampleOperator: false,
  setOpen: (open) => set(() => ({ open })),
  setData: (data) => set(() => ({ data })),
  setStep: (step) => set(() => ({ step })),
  setProductionId: (productionId) => set(() => ({ productionId })),
  setIsSampleOperator: (isSampleOperator) => set(() => ({ isSampleOperator })),
}));
