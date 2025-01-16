import { TUser } from "@/types/api/users";
import { create } from "zustand";

type TSteps = "create" | "delete" | "edit" | "change-password" | null;

interface IUserStore {
  open: boolean;
  setOpen: (open: boolean) => void;

  data: TUser | null;
  setData: (data: TUser | null) => void;

  step: TSteps;
  setStep: (data: TSteps) => void;
}

export const useUsersStore = create<IUserStore>()((set) => ({
  open: false,
  data: null,
  step: null,
  setOpen: (open) => set(() => ({ open })),
  setData: (data) => set(() => ({ data })),
  setStep: (step) => set(() => ({ step })),
}));
