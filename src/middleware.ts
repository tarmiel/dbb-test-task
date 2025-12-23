import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { USER_ROLE } from './features/auth/schemas/auth-schema';

const ROUTE_CONFIG = {
  protected: ['/forms'],
  adminOnly: ['/forms/new', '/forms/[id]'],
  public: ['/', '/login']
} as const;

const DYNAMIC_PATTERNS = {
  formEdit: /^\/forms\/[^/]+$/
} as const;

function isProtectedRoute(pathname: string): boolean {
  return ROUTE_CONFIG.protected.some((route) => pathname.startsWith(route));
}

function isAdminOnlyRoute(pathname: string): boolean {
  const adminRoutes: readonly string[] = ROUTE_CONFIG.adminOnly;
  if (adminRoutes.includes(pathname)) return true;

  if (DYNAMIC_PATTERNS.formEdit.test(pathname) && pathname !== '/forms/new') {
    return true;
  }

  return false;
}

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const role = request.cookies.get('role')?.value;

  if (!isProtectedRoute(pathname)) {
    return NextResponse.next();
  }

  if (!role) {
    const loginUrl = new URL('/login', request.url);
    loginUrl.searchParams.set('redirectTo', pathname);
    return NextResponse.redirect(loginUrl);
  }

  if (isAdminOnlyRoute(pathname) && role !== USER_ROLE.ADMIN) {
    return NextResponse.redirect(new URL('/forms', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|.*\\.).*)']
};
