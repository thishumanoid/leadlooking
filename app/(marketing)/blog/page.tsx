import { Metadata } from 'next';
import { getAllBlogs } from '@/lib/blog';
import { BlogCard } from '@/components/BlogCard';

export const metadata: Metadata = {
  title: 'Blog',
  description:
    'Learn the best strategies for finding high-intent leads on Reddit and growing your business with LeadLooking.',
  alternates: {
    canonical: 'https://www.leadlooking.com/blog',
  },
};

export default function BlogPage() {
  const products = getAllBlogs();

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    itemListElement: products.map((post, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        datePublished: post.date,
        url: `https://www.leadlooking.com/blog/${post.slug}`,
      },
    })),
  };

  return (
    <main className="min-h-screen">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <div className="max-w-7xl mx-auto py-20 px-4 sm:px-6 lg:px-8">
        <header className="mb-16 text-center">
          <h1 className="text-4xl md:text-6xl font-extrabold text-foreground mb-4 tracking-tight">
            Our <span className="text-primary">Blog</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Strategies, insights, and guides on how to turn Reddit into your most powerful customer
            acquisition channel.
          </p>
        </header>

        {products.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((post) => (
              <BlogCard key={post.slug} blog={post} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">No blog posts found.</p>
          </div>
        )}
      </div>
    </main>
  );
}
