// app/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';

type Props = {
  params: Promise<{ slug: string }>;
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  
  const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  // Fix: Ensure date is a string before rendering
  const formattedDate = data.date instanceof Date 
    ? data.date.toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      })
    : String(data.date);

  return (
    <article className="max-w-3xl mx-auto py-10 prose dark:prose-invert px-4">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <div className="text-sm text-muted-foreground mb-8">
        Published on {formattedDate}
      </div>
      <MDXRemote source={content} />
    </article>
  );
}