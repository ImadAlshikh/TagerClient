import { create } from "zustand";

type SidebarStore = {
  showSidebar: boolean;
  toggleShowSidebar: () => void;
  setShowSidebar: (val: boolean) => void;
};

export const useSidebarStore = create<SidebarStore>((set) => ({
  showSidebar: false,
  toggleShowSidebar: () =>
    set((state) => ({ showSidebar: !state.showSidebar })),
  setShowSidebar: (val: boolean) =>
    set({
      showSidebar: val,
    }),
}));
