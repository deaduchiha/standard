import { TCollaboratingLab } from "@/types/api/collaborating-labs";
import { create } from "zustand";

type TSteps = "create" | "delete" | "edit" | null;

interface ICollaborateLab {
  open: boolean;
  setOpen: (open: boolean) => void;

  data: TCollaboratingLab | null;
  setData: (data: TCollaboratingLab | null) => void;

  step: TSteps;
  setStep: (data: TSteps) => void;
}

export const useCollaboratingLabs = create<ICollaborateLab>()((set) => ({
  open: false,
  data: null,
  step: null,
  setOpen: (open) => set(() => ({ open })),
  setData: (data) => set(() => ({ data })),
  setStep: (step) => set(() => ({ step })),
}));
