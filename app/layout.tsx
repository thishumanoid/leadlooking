import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import { AuthProvider } from '@/context/AuthContext';
// import { DemoBanner } from '@/components/demoBanner';
import config from '@/config';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

/// SEO STUFF
export const metadata: Metadata = {
  title: {
    template: '%s | extFast',
    default: '[DEMO] Web App Boilerplate | extFast',
  },

  description:
    'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',

  metadataBase: new URL(config.appUrl),
  keywords: ['boilerplate', 'starter kit', 'chrome extension'],

  openGraph: {
    title: '[DEMO] Web App Boilerplate | extFast',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
    url: config.appUrl,
  },

  twitter: {
    card: 'summary_large_image',
    title: '[DEMO] Web App Boilerplate | extFast',
    description:
      'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.',
  },
};

/// THEME: 'dark' and 'light'
export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${inter.variable} antialiased ${config.colors.theme ?? 'dark'}`}>
        {/* <DemoBanner /> */}
        <AuthProvider>
          {children}
          </AuthProvider>
      </body>
    </html>
  );
}
