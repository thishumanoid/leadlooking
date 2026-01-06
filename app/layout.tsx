import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import config from '@/config';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import { Toaster } from 'sonner';
import { PostHogProvider } from '@/hooks/posthog-provider';

const inter = Inter({
  variable: '--font-inter',
  subsets: ['latin'],
});

/// SEO STUFF
export const metadata: Metadata = {
  title: {
    template: '%s | LeadLooking',
    default: 'LeadLooking - Reddit Marketing Made Easy',
  },

  description: 'LeadLooking is tool that finds leads for you from reddit',

  metadataBase: new URL(config.appUrl),
  keywords: ['marketing', 'leads', 'reddit automation'],

  openGraph: {
    title: 'LeadLooking - Reddit Marketing Made Easy',
    description: 'LeadLooking is tool that finds leads for you from reddit',
    url: config.appUrl,
  },

  twitter: {
    card: 'summary_large_image',
    title: 'LeadLooking - Reddit Marketing Made Easy',
    description: 'LeadLooking is tool that finds leads for you from reddit',
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
        <head>
          <meta name="apple-mobile-web-app-title" content="LeadLooking" />
        </head>
        <body className={`${inter.className} antialiased dark`}>
          <PostHogProvider>
            {children}
            <Toaster />
          </PostHogProvider>
        </body>
      </html>
    </ClerkProvider>
  );
}
