import type { Metadata, Viewport } from 'next';
import './globals.css';

import '@fontsource-variable/inter';

export const viewport: Viewport = {
  themeColor: '#1d4ed8',
  colorScheme: 'dark',
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_APP_URL || 'https://huston-housing-kappa.vercel.app',
  ),
  title: {
    default: 'Houston Housing — Blockchain-Powered Rentals',
    template: '%s | Houston Housing',
  },
  description:
    'Automated commissions, zero disputes. Connect with landlords and tenants on the Stellar network.',
  manifest: '/manifest.webmanifest',
};

import { RootLayoutClient } from './RootLayoutClient';

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="dns-prefetch" href="https://images.unsplash.com" />
      </head>

      <body
        suppressHydrationWarning
        className="font-sans bg-linear-to-br from-slate-900 via-blue-900 to-slate-900"
      >
        {/* Accessibility: skip link */}
        <a href="#main-content" className="skip-link">
          Skip to main content
        </a>

        <RootLayoutClient>{children}</RootLayoutClient>
      </body>
    </html>
  );
}
