import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

export interface BlogPost {
  slug: string;
  title: string;
  description: string;
  date: string;
  [key: string]: any;
}

export function getAllBlogs(): BlogPost[] {
  const blogsDir = path.join(process.cwd(), 'content', 'blogs');

  if (!fs.existsSync(blogsDir)) {
    return [];
  }

  const files = fs.readdirSync(blogsDir);

  const blogs = files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => {
      const filePath = path.join(blogsDir, file);
      const fileContent = fs.readFileSync(filePath, 'utf8');
      const { data } = matter(fileContent);

      const slug = file.replace('.mdx', '');

      const formattedDate = data.date instanceof Date ? data.date.toISOString() : String(data.date);

      return {
        slug,
        title: data.title || 'Untitled',
        description: data.description || '',
        date: formattedDate,
        ...data,
      };
    });

  // Sort by date newest first
  return blogs.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
}
