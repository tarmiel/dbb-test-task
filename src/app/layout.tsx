import type { Metadata } from 'next';
import { Geist, Geist_Mono } from 'next/font/google';
import './globals.css';

import { Nav } from '@/components/layouts/nav';
import { ToastContainer } from '@/components/layouts/toast-container';
import { AuthProvider } from '@/features/auth/components/auth-provider';

const geistSans = Geist({
  variable: '--font-geist-sans',
  subsets: ['latin']
});

const geistMono = Geist_Mono({
  variable: '--font-geist-mono',
  subsets: ['latin']
});

export const metadata: Metadata = {
  title: {
    default: 'Forms Dashboard',
    template: '%s | Forms Dashboard'
  },
  description: 'Manage your forms with role-based access control',
  openGraph: {
    title: 'Forms Dashboard',
    description: 'Manage your forms with role-based access control',
    type: 'website'
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forms Dashboard',
    description: 'Manage your forms with role-based access control'
  }
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <AuthProvider>
          <Nav />
          <main>{children}</main>
          <ToastContainer />
        </AuthProvider>
      </body>
    </html>
  );
}
