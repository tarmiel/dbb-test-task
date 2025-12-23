import { create } from 'zustand';

type ToastType = 'success' | 'error';

interface Toast {
  id: number;
  message: string;
  type: ToastType;
}

interface ToastState {
  toasts: Toast[];
}

interface ToastActions {
  addToast: (message: string, type: ToastType) => void;
  removeToast: (id: number) => void;
}

interface ToastStore extends ToastState {
  actions: ToastActions;
}

export const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  actions: {
    addToast: (message, type) =>
      set((state) => ({
        toasts: [...state.toasts, { id: Date.now(), message, type }]
      })),
    removeToast: (id) =>
      set((state) => ({
        toasts: state.toasts.filter((t) => t.id !== id)
      }))
  }
}));

export const toastsSelector = (state: ToastStore) => state.toasts;
export const toastActionsSelector = (state: ToastStore) => state.actions;
