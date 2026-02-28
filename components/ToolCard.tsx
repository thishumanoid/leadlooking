import Link from 'next/link';
import { Tool } from '@/lib/tools';
import { Badge } from '@/components/ui/badge';

export function ToolCard({ tool }: { tool: Tool }) {
  return (
    <Link
      href={tool.path}
      className="group flex flex-col p-6 rounded-2xl border border-border bg-card/50 hover:border-primary/50 transition-all duration-300 hover:shadow-2xl hover:shadow-primary/10"
    >
      <div className="flex flex-col h-full">
        <div className="flex justify-between items-start mb-4">
          <h2 className="text-xl font-bold text-foreground group-hover:text-primary transition-colors">
            {tool.title}
          </h2>
          {tool.isNew && (
            <Badge variant="secondary" className="text-[10px] uppercase px-2 py-0">
              New
            </Badge>
          )}
        </div>
        <p className="text-muted-foreground line-clamp-3 mb-6 flex-grow">{tool.description}</p>
        <div className="flex items-center text-primary font-semibold group-hover:gap-2 transition-all">
          Visit
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
