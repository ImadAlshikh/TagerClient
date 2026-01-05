import { create } from "zustand";

type MessageType = {
  text: string;
  sender: { name: string; surname?: string; picture?: string };
} | null;
type MessageStore = {
  message: MessageType;
  setMessage: (msg: MessageType) => void;
  closeMessage: () => void;
};

export const useNotificationStore = create<MessageStore>((set) => ({
  message: null,
  setMessage: (msg: any) => set({ message: msg }),
  closeMessage: () => set({ message: null }),
}));
