/** @type {import('next-sitemap').IConfig} */

const fs = require('fs');
const path = require('path');

function getBlogSlugs() {
  const blogsDir = path.join(process.cwd(), 'content', 'blogs');
  const files = fs.readdirSync(blogsDir);

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => `/blog/${file.replace('.mdx', '')}`);
}

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_WEB_APP_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  exclude: [
    '/dashboard',
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
  additionalPaths: async (config) => {
    const blogPaths = getBlogSlugs();

    return blogPaths.map((path) => ({
      loc: path,
      changefreq: 'weekly',
      priority: 0.7,
      lastmod: new Date().toISOString(),
    }));
  },
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};
