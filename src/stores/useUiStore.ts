import { create } from "zustand";

export const useUiStore = create<{
  showSidebar: boolean;
  setShowSidebar: (value: boolean) => void;
}>((set) => ({
  showSidebar: true,
  setShowSidebar: (value: boolean) => set({ showSidebar: value }),
}));
