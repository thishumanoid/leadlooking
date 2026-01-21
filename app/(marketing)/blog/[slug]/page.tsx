// app/blog/[slug]/page.tsx
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { notFound } from 'next/navigation';
import rehypePrettyCode from 'rehype-pretty-code';
import { LeadLookingAd } from '@/components/LeadLookingAd';
import { LeadLookingBottomAd } from '@/components/LeadLookingBottomAd';
import { LeadLookingPopup } from '@/components/LeadLookingPopup';
import { LeadLookingStickyBanner } from '@/components/LeadLookingStickyBanner';
import CtaCard from '@/components/CTA';

export async function generateStaticParams() {
  const blogsDir = path.join(process.cwd(), 'content', 'blogs');
  const files = fs.readdirSync(blogsDir);

  return files
    .filter((file) => file.endsWith('.mdx'))
    .map((file) => ({
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
  LeadLookingBottomAd,
  CtaCard,
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
      <LeadLookingStickyBanner />
      <div className="max-w-4xl mx-auto py-12 px-4 sm:px-6 lg:px-8 bg-background">
        <LeadLookingPopup />
        {/* Header */}
        <header className="mb-10 pb-8 border-b border-border">
          <h1 className="text-5xl font-bold mb-4 text-foreground leading-tight">{data.title}</h1>
          <time className="text-sm text-muted-foreground">{formattedDate}</time>
        </header>

        {/* Content */}
        <article
          className="prose prose-lg dark:prose-invert max-w-none
          prose-headings:font-bold 
          prose-h1:text-4xl 
          prose-h2:text-3xl 
          prose-h3:text-2xl
          prose-p:text-foreground/80
          prose-a:text-primary
          prose-strong:text-foreground
          prose-code:text-primary
          prose-code:bg-muted
          prose-code:px-1.5 prose-code:py-0.5 prose-code:rounded
          prose-code:before:content-none prose-code:after:content-none
          prose-pre:bg-card prose-pre:border prose-pre:border-border
          prose-img:rounded-lg
          prose-blockquote:border-l-primary
          prose-li:marker:text-primary
        "
        >
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
