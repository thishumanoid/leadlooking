import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import config from '@/config';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        theme: dark,
      }}
    >
      <html lang="en">
        <body className={`${inter.className} antialiased dark`}>
         {children}
        </body>
      </html>
    </ClerkProvider>
  );
}
