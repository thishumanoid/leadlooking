// app/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import rehypePrettyCode from 'rehype-pretty-code';
import { LeadLookingAd } from '@/components/LeadLookingAd';


export async function generateStaticParams() {
  const blogsDir = path.join(process.cwd(), 'content', 'blogs');
  const files = fs.readdirSync(blogsDir);
  
  return files
    .filter(file => file.endsWith('.mdx'))
    .map(file => ({
      slug: file.replace('.mdx', ''),
    }));
}

export async function generateMetadata({ params }: Props) {
  const { slug } = await params;
  const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.mdx`);
  
  if (!fs.existsSync(filePath)) {
    return {};
  }
  
  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data } = matter(fileContent);
  
  return {
    title: data.title,
    description: data.description || '',
  };
}



type Props = {
  params: Promise<{ slug: string }>;
};

// Make the ad component available in MDX
const components = {
  LeadLookingAd,
};

export default async function BlogPost({ params }: Props) {
  const { slug } = await params;

  const filePath = path.join(process.cwd(), 'content', 'blogs', `${slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const fileContent = fs.readFileSync(filePath, 'utf8');
  const { data, content } = matter(fileContent);

  const formattedDate =
    data.date instanceof Date
      ? data.date.toLocaleDateString('en-US', {
          year: 'numeric',
          month: 'long',
          day: 'numeric',
        })
      : String(data.date);

  return (
    <div className="min-h-screen">
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-white dark:bg-transparent">
        {/* Header */}
        <header className="mb-10 pb-8 border-b border-gray-200 dark:border-gray-800">
          <h1 className="text-5xl font-bold mb-4 text-gray-900 dark:text-white leading-tight">
            {data.title}
          </h1>
          <time className="text-sm text-gray-600 dark:text-gray-400">
            {formattedDate}
          </time>
        </header>

        {/* Content */}
        <article className="prose prose-lg dark:prose-invert max-w-none
          prose-headings:font-bold 
          prose-h1:text-4xl 
          prose-h2:text-3xl 
          prose-h3:text-2xl
          prose-p:text-gray-700 dark:prose-p:text-gray-300
          prose-a:text-blue-600 dark:prose-a:text-blue-400
          prose-strong:text-gray-900 dark:prose-strong:text-gray-100
          prose-code:text-pink-600 dark:prose-code:text-pink-400
          prose-code:bg-gray-100 dark:prose-code:bg-gray-800
          prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-gray-950 prose-pre:border prose-pre:border-gray-800
          prose-img:rounded-lg
          prose-blockquote:border-l-blue-500
          prose-li:marker:text-blue-600 dark:prose-li:marker:text-blue-400
        ">
          <MDXRemote 
            source={content}
            components={components}
            options={{
              mdxOptions: {
                rehypePlugins: [
                  [
                    rehypePrettyCode,
                    {
                      theme: 'one-dark-pro',
                      keepBackground: true,
                    },
                  ],
                ],
              },
            }}
          />
        </article>
      </div>
    </div>
  );
}