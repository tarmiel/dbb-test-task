'use client';

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { LogOut, Menu, X } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { AppPaths } from '@/config/app-paths';
import {
  useAuthStore,
  authUserSelector,
  authActionsSelector
} from '@/features/auth/stores/auth-store';
import { USER_ROLE } from '@/features/auth/schemas/auth-schema';
import { clearAuthCookies } from '@/features/auth/utils/auth-cookies';

export function Nav() {
  const router = useRouter();
  const user = useAuthStore(authUserSelector);
  const { logout } = useAuthStore(authActionsSelector);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = () => {
    clearAuthCookies();
    logout();
    setMobileMenuOpen(false);
    router.push(AppPaths.auth.login.getHref());
  };

  return (
    <header className="border-b border-border bg-card">
      <div className="mx-auto flex h-14 container items-center justify-between px-4">
        <nav className="flex items-center gap-6">
          <Link href={AppPaths.home.getHref()} className="text-lg font-semibold">
            Forms Dashboard
          </Link>
          {user && (
            <Link
              href={AppPaths.app.forms.getHref()}
              className="text-sm text-muted-foreground hover:text-foreground transition-colors hidden sm:block"
            >
              Forms
            </Link>
          )}
        </nav>

        <div className="hidden sm:flex items-center gap-4">
          {user ? (
            <>
              <div className="text-sm text-muted-foreground">
                <span>{user.email}</span>
                {user.role === USER_ROLE.ADMIN && (
                  <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                    Admin
                  </span>
                )}
              </div>
              <Button variant="ghost" size="sm" onClick={handleLogout}>
                <LogOut className="mr-1 size-4" />
                Logout
              </Button>
            </>
          ) : (
            <Link href={AppPaths.auth.login.getHref()}>
              <Button variant="outline" size="sm">
                Login
              </Button>
            </Link>
          )}
        </div>

        <Button
          variant="ghost"
          size="icon"
          className="sm:hidden"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          aria-label={mobileMenuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={mobileMenuOpen}
        >
          {mobileMenuOpen ? <X className="size-5" /> : <Menu className="size-5" />}
        </Button>
      </div>

      {mobileMenuOpen && (
        <div className="sm:hidden border-t border-border bg-card px-4 py-3 space-y-3">
          {user && (
            <>
              <Link
                href={AppPaths.app.forms.getHref()}
                onClick={() => setMobileMenuOpen(false)}
                className="block text-sm text-muted-foreground hover:text-foreground transition-colors "
              >
                Forms
              </Link>
              <div className="flex gap-2 items-center justify-between flex-wrap">
                <div className="text-sm text-muted-foreground">
                  {user.email}
                  {user.role === USER_ROLE.ADMIN && (
                    <span className="ml-2 rounded bg-primary/10 px-1.5 py-0.5 text-xs text-primary">
                      Admin
                    </span>
                  )}
                </div>
                <Button variant="ghost" size="sm" onClick={handleLogout}>
                  <LogOut className="mr-1 size-4" />
                  Logout
                </Button>
              </div>
            </>
          )}
          {!user && (
            <Link href={AppPaths.auth.login.getHref()} onClick={() => setMobileMenuOpen(false)}>
              <Button variant="outline" size="sm" className="w-full">
                Login
              </Button>
            </Link>
          )}
        </div>
      )}
    </header>
  );
}
