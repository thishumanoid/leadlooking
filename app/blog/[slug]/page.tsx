import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Metadata } from 'next';

// Helper to get post content
async function getPost(slug: string) {
  const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.mdx`);
  const fileContent = fs.readFileSync(filePath, 'utf8');
  return matter(fileContent);
}

// SEO Metadata Generation
export async function generateMetadata({ params }: { params: { slug: string } }): Promise<Metadata> {
  const { data } = await getPost(params.slug);
  return {
    title: `${data.title} | LogoFast Blog`,
    description: data.description,
  };
}

// 1. Static Generation (SSG) for fast performance
export async function generateStaticParams() {
  const files = fs.readdirSync(path.join(process.cwd(), 'content', 'blogs'));
  return files.map((filename) => ({
    slug: filename.replace('.mdx', ''),
  }));
}

export default async function BlogPost({ params }: { params: { slug: string } }) {
  const { content, data } = await getPost(params.slug);

  return (
    <article className="max-w-3xl mx-auto py-10 prose dark:prose-invert">
      <h1 className="text-4xl font-bold mb-4">{data.title}</h1>
      <div className="text-sm text-gray-500 mb-8">
        Published on {data.date}
      </div>
      {/* This renders the MDX content safely */}
      <MDXRemote source={content} />
    </article>
  );
}