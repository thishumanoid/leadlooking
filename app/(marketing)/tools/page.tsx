import { Metadata } from 'next';
import { getAllTools } from '@/lib/tools';
import { ToolCard } from '@/components/ToolCard';

export const metadata: Metadata = {
  title: 'Free Tools for Real Estate Agents & Content Creators',
  description:
    'Boost your productivity with our suite of free tools. From LinkedIn carousel generators to content creation aids, LeadLooking helps you grow your presence.',
  alternates: {
    canonical: 'https://www.leadlooking.com/tools',
  },
  keywords: [
    'free real estate tools',
    'linkedin carousel generator',
    'real estate marketing tools',
    'content creation tools',
    'lead generation tools',
  ],
};

export default function ToolsPage() {
  const tools = getAllTools();

  // JSON-LD structured data for SEO
  const jsonLd = {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Free Marketing Tools',
    description: 'A collection of free tools for real estate agents and content creators.',
    itemListElement: tools.map((tool, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'WebApplication',
        name: tool.title,
        description: tool.description,
        url: `https://www.leadlooking.com${tool.path}`,
        applicationCategory: 'BusinessApplication',
        operatingSystem: 'All',
        offers: {
          '@type': 'Offer',
          price: '0',
          priceCurrency: 'USD',
        },
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
            Our <span className="text-primary">Free Tools</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Powerful, simple, and 100% free tools designed to help you generate more leads and
            create better content in less time.
          </p>
        </header>

        {tools.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {tools.map((tool) => (
              <ToolCard key={tool.slug} tool={tool} />
            ))}
          </div>
        ) : (
          <div className="text-center py-20">
            <p className="text-muted-foreground">
              Coming soon! We are building some amazing tools for you.
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
