import { create } from "zustand";

type NotificationType = {
  text: string;
  sender: { name: string; surname?: string; picture?: string };
  chat: any;
  post: any;
  user: any;
  created_at: any;
} | null;
type NotificationStore = {
  notification: NotificationType;
  setNotification: (notif: NotificationType) => void;
  closeNotification: () => void;
};

export const useNotificationStore = create<NotificationStore>((set) => ({
  notification: null,
  setNotification: (notif: any) => set({ notification: notif }),
  closeNotification: () => set({ notification: null }),
}));
