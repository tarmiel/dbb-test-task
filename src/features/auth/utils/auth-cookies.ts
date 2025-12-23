import { USER_ROLE, type UserRole } from '@/features/auth/schemas/auth-schema';

const COOKIE_KEYS = {
  role: 'role',
  email: 'email'
} as const;

function getCookie(name: string): string | null {
  if (typeof document === 'undefined') return null;
  const match = document.cookie.match(new RegExp(`(^| )${name}=([^;]+)`));
  return match ? decodeURIComponent(match[2]) : null;
}

export function getAuthFromCookies(): { email: string; role: UserRole } | null {
  const role = getCookie(COOKIE_KEYS.role);
  const email = getCookie(COOKIE_KEYS.email);

  if (!role || !email) return null;
  if (!Object.values(USER_ROLE).includes(role as UserRole)) return null;

  return { email, role: role as UserRole };
}

export function setAuthCookies(email: string, role: UserRole): void {
  document.cookie = `${COOKIE_KEYS.role}=${role}; path=/`;
  document.cookie = `${COOKIE_KEYS.email}=${encodeURIComponent(email)}; path=/`;
}

export function clearAuthCookies(): void {
  document.cookie = `${COOKIE_KEYS.role}=; path=/; max-age=0`;
  document.cookie = `${COOKIE_KEYS.email}=; path=/; max-age=0`;
}
