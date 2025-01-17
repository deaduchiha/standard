import { TProductionUnits } from "@/types/validations/production-units";
import { create } from "zustand";

type TSteps = "create" | "delete" | "edit" | null;

export type TProductionUnitData = TProductionUnits & { id: number };

interface IUserStore {
  open: boolean;
  setOpen: (open: boolean) => void;

  data: TProductionUnitData | null;
  setData: (data: TProductionUnitData | null) => void;

  step: TSteps;
  setStep: (data: TSteps) => void;
}

export const useProductUnits = create<IUserStore>()((set) => ({
  open: false,
  data: null,
  step: null,
  setOpen: (open) => set(() => ({ open })),
  setData: (data) => set(() => ({ data })),
  setStep: (step) => set(() => ({ step })),
}));
