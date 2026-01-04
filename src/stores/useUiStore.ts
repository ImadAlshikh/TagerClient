import { create } from "zustand";

type UiStore = {
  showSideBar: boolean;
  toggleShowSideBar: () => void;
  setShowSideBar: (val: boolean) => void;
};

export const useUiStore = create<UiStore>((set) => ({
  showSideBar: false,
  toggleShowSideBar: () =>
    set((state) => ({ showSideBar: !state.showSideBar })),
  setShowSideBar: (val: boolean) =>
    set({
      showSideBar: val,
    }),
}));
