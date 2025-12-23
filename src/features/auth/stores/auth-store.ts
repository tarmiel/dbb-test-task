import { create } from 'zustand';
import { UserRole } from '../schemas/auth-schema';

interface User {
  email: string;
  role: UserRole;
}

interface AuthState {
  user: User | null;
}

interface AuthActions {
  setUser: (email: string, role: UserRole) => void;
  logout: () => void;
}

interface AuthStore extends AuthState {
  actions: AuthActions;
}

export const useAuthStore = create<AuthStore>((set) => ({
  user: null,
  actions: {
    setUser: (email, role) => set({ user: { email, role } }),
    logout: () => set({ user: null })
  }
}));

export const authUserSelector = (state: AuthStore) => state.user;
export const authActionsSelector = (state: AuthStore) => state.actions;
