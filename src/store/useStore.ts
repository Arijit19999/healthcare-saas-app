import { create } from "zustand";
import { persist } from "zustand/middleware";
import { User } from "firebase/auth";

export type ViewMode = "grid" | "list";

interface Store {
  user: User | null;
  authReady: boolean;
  setUser: (user: User | null) => void;
  setAuthReady: (ready: boolean) => void;
  logout: () => void;

  viewMode: ViewMode;
  setViewMode: (v: ViewMode) => void;

  notificationsEnabled: boolean;
  setNotificationsEnabled: (v: boolean) => void;
}

export const useStore = create<Store>()(
  persist(
    (set) => ({
      user: null,
      authReady: false,
      setUser: (user) => set({ user }),
      setAuthReady: (authReady) => set({ authReady }),
      logout: () => set({ user: null }),

      viewMode: "grid",
      setViewMode: (viewMode) => set({ viewMode }),

      notificationsEnabled: false,
      setNotificationsEnabled: (notificationsEnabled) => set({ notificationsEnabled }),
    }),
    {
      name: "healthcare-app-store",
      partialize: (state) => ({
        viewMode: state.viewMode,
        notificationsEnabled: state.notificationsEnabled,
      }),
    }
  )
);
