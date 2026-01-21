// app/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';
import { notFound } from 'next/navigation';

// Update types for Next.js 15 (params is a Promise)
type Props = {
  params: Promise<{ slug: string }>;
};

async function getPost(slug: string) {
  try {
    const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.mdx`);
    
    // Safety check: If slug is undefined, throw error early
    if (!slug || slug === 'undefined') return null;

    const fileContent = fs.readFileSync(filePath, 'utf8');
    return matter(fileContent);
  } catch (e) {
    return null;
  }
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const post = await getPost(slug);
  
  if (!post) return { title: "Post Not Found" };

  return {
    title: `${post.data.title} | LogoMaker`,
    description: post.data.description,
  };
}

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;
  const post = await getPost(slug);

  if (!post) {
    notFound();
  }

  return (
    <article className="max-w-3xl mx-auto py-10 prose dark:prose-invert px-4">
      <h1 className="text-4xl font-bold mb-4">{post.data.title}</h1>
      <div className="text-sm text-muted-foreground mb-8">
        Published on {post.data.date}
      </div>
      <MDXRemote source={post.content} />
    </article>
  );
}