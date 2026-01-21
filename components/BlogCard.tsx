import Link from 'next/link';
import { BlogPost } from '@/lib/blog';

export function BlogCard({ blog }: { blog: BlogPost }) {
  const formattedDate = new Date(blog.date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <Link
      href={`/blog/${blog.slug}`}
      className="group flex flex-col p-6 rounded-2xl border border-border bg-card/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div className="flex flex-col h-full">
        <time className="text-sm text-muted-foreground mb-3 block">{formattedDate}</time>
        <h2 className="text-xl font-bold text-foreground mb-2 group-hover:text-primary transition-colors">
          {blog.title}
        </h2>
        <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow">{blog.description}</p>
        <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
          Read Story
          <svg
            className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
          </svg>
        </div>
      </div>
    </Link>
  );
}
