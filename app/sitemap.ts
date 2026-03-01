// app/sitemap.ts
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MetadataRoute } from 'next';

export default function sitemap(): MetadataRoute.Sitemap {
  const baseUrl = process.env.NEXT_PUBLIC_WEB_APP_URL || 'https://www.leadlooking.com';

  // Static pages with high priority (ONLY public pages)
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/tools`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/blog`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/terms`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
  ];

  // Dynamic blog posts
  const blogsDir = path.join(process.cwd(), 'content', 'blogs');
  const blogFiles = fs.readdirSync(blogsDir);

  const blogPages: MetadataRoute.Sitemap = blogFiles
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(blogsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);
      const slug = file.replace('.mdx', '');

      return {
        url: `${baseUrl}/blog/${slug}`,
        lastModified: data.date ? new Date(data.date) : new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.7,
      };
    });

  // Dynamic tool pages
  const toolsDir = path.join(process.cwd(), 'app', '(marketing)', 'tools');
  const toolItems = fs.readdirSync(toolsDir, { withFileTypes: true });

  const toolPages: MetadataRoute.Sitemap = toolItems
    .filter((item) => item.isDirectory())
    .map((dir) => {
      const toolSlug = dir.name;

      return {
        url: `${baseUrl}/tools/${toolSlug}`,
        lastModified: new Date(),
        changeFrequency: 'weekly' as const,
        priority: 0.8,
      };
    });

  return [...staticPages, ...blogPages, ...toolPages];
}
