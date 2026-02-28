import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
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
    default: 'LeadLooking - Find Your Next Customer on Reddit',
  },

  description: 'Find high-intent Reddit leads everyday. Track keywords, get instant notifications and join conversations where people need exactly what you offer.',

  metadataBase: new URL('https://www.leadlooking.com/'),
  keywords: ['marketing', 'leads', 'reddit automation'],

  openGraph: {
    title: 'LeadLooking - Find Your Next Customer on Reddit',
    description: 'Find high-intent Reddit leads everyday. Track keywords, get instant notifications and join conversations where people need exactly what you offer.',
    url: 'https://www.leadlooking.com/',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'LeadLooking - Find Your Next Customer on Reddit',
    description: 'Find high-intent Reddit leads everyday. Track keywords, get instant notifications and join conversations where people need exactly what you offer.',
  },

  alternates: {
    canonical: 'https://www.leadlooking.com/',
  }
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
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
  );
}
