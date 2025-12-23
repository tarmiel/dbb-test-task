'use client';

import { useEffect } from 'react';

import { useAuthStore, authActionsSelector } from '@/features/auth/stores/auth-store';
import { getAuthFromCookies } from '@/features/auth/utils/auth-cookies';

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const { setUser } = useAuthStore(authActionsSelector);

  useEffect(() => {
    const auth = getAuthFromCookies();
    if (auth) {
      setUser(auth.email, auth.role);
    }
  }, [setUser]);

  return children;
}
