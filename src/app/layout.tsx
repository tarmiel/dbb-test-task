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

const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';

export const metadata: Metadata = {
  metadataBase: new URL(APP_URL),
  title: {
    default: 'Forms Dashboard',
    template: '%s | Forms Dashboard'
  },
  description:
    'Manage your forms with role-based access control. Create, edit, and organize forms with an intuitive dashboard.',
  keywords: ['forms', 'dashboard', 'form builder', 'form management', 'admin panel'],
  authors: [{ name: 'Oleh Verkhusha' }],
  creator: 'Oleh Verkhusha',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1
    }
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: APP_URL,
    siteName: 'Forms Dashboard',
    title: 'Forms Dashboard',
    description:
      'Manage your forms with role-based access control. Create, edit, and organize forms with an intuitive dashboard.',
    images: [
      {
        url: '/og-image.jpg',
        width: 1200,
        height: 630,
        alt: 'Forms Dashboard'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Forms Dashboard',
    description:
      'Manage your forms with role-based access control. Create, edit, and organize forms with an intuitive dashboard.',
    images: ['/og-image.jpg']
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
