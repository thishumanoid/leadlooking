// app/robots.ts
import { MetadataRoute } from 'next';

export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_APP_URL || 'https://www.leadlooking.com';
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard',
        '/dashboard/*',
        '/campaigns',
        '/campaigns/*',
        '/checkout-success',
        '/checkout-success/*',
        '/feedback',
        '/settings',
        '/settings/*',
        '/upgrade',
        '/welcome',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  };
}