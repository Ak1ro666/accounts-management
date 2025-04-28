import { create } from "zustand";

type Store = {
  isCreating: boolean;
  startCreate: () => void;
  cancelCreate: () => void;
};

export const useCreateCheck = create<Store>((set) => ({
  isCreating: false,
  startCreate: () => set({ isCreating: true }),
  cancelCreate: () => set({ isCreating: false }),
}));
