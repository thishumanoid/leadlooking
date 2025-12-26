/** @type {import('next-sitemap').IConfig} */

/// replace this below example.com url with your real web app url

module.exports = {
  siteUrl: process.env.NEXT_PUBLIC_WEB_APP_URL,
  generateRobotsTxt: true,
  generateIndexSitemap: false,
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
  },
};