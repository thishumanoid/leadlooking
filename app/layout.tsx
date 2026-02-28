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
    default: 'LeadLooking - Track Your Leads Easily',
  },

  description:
    'Mark profiles with labels, set reminders & track your interactions across social platforms. The Chrome extension that helps marketers eliminate duplicate outreach and stay organized.',

  metadataBase: new URL('https://www.leadlooking.com/'),
  keywords: [
    'social media outreach tracking',
    'chrome extension for marketers',
    'avoid duplicate messages',
    'track social interactions',
    'outreach management tool',
    'social selling chrome extension',
    'LinkedIn outreach tracker',
    'Twitter outreach tool',
    'marketer productivity tool',
    'social media CRM',
    'contact tracking extension',
    'sales outreach organizer',
  ],

  openGraph: {
    title: 'LeadLooking - Track Your Leads Easily',
    description:
      'Mark profiles with labels, set reminders & track your interactions across social platforms. The Chrome extension that helps marketers eliminate duplicate outreach and stay organized.',
    url: 'https://www.leadlooking.com/',
  },

  twitter: {
    card: 'summary_large_image',
    title: 'LeadLooking - Track Your Leads Easily',
    description:
      'Chrome extension for smart marketers. Track interactions, mark profiles with labels, set reminders & never send duplicate messages again.',
  },

  alternates: {
    canonical: 'https://www.leadlooking.com/',
  },
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
