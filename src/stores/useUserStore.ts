import { create } from "zustand";

interface User {
  id: string;
  name: string;
  picture?: string;
  created_at?: string;
}

interface UserState {
  user: User | null | undefined;
  setUser: (user: User | null) => void;
  loading: boolean;
  setLoading: (value: boolean) => void;
  logout: () => void;
}

export const useUserStore = create<UserState>((set) => ({
  user: undefined,
  setUser: (user: any) => set({ user }),
  logout: () => {
    set({ user: null });
    localStorage.removeItem("userPic");
  },
  loading: true,
  setLoading: (v) => set({ loading: v }),
}));
