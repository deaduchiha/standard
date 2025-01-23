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
}

export const useSampleStore = create<ISampleStore>()((set) => ({
  open: false,
  data: null,
  step: null,
  setOpen: (open) => set(() => ({ open })),
  setData: (data) => set(() => ({ data })),
  setStep: (step) => set(() => ({ step })),
}));
