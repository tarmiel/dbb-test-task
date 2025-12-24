'use server';

import { AppPaths } from '@/config/app-paths';
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function loginAction(
  data: { email: string; role: string },
  redirectTo?: string | null
) {
  const cookieStore = await cookies();

  cookieStore.set('role', data.role, { path: '/' });
  cookieStore.set('email', data.email, { path: '/' });

  redirect(redirectTo ? decodeURIComponent(redirectTo) : AppPaths.app.forms.getHref());
}

export async function logoutAction() {
  const cookieStore = await cookies();

  cookieStore.delete('role');
  cookieStore.delete('email');

  redirect(AppPaths.auth.login.getHref());
}
