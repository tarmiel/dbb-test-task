import { cookies } from 'next/headers';
import { USER_ROLE, type UserRole } from '@/features/auth/schemas/auth-schema';

export async function getRoleFromCookies(): Promise<UserRole | null> {
  const cookieStore = await cookies();
  const role = cookieStore.get('role')?.value;

  if (!role || !Object.values(USER_ROLE).includes(role as UserRole)) {
    return null;
  }

  return role as UserRole;
}

export async function isAdmin(): Promise<boolean> {
  const role = await getRoleFromCookies();
  return role === USER_ROLE.ADMIN;
}
