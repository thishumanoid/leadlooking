'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import RedditIcon from '@/components/global/RedditIcon';
import { Search, Filter, X, Zap, CoffeeIcon, ExternalLink, WandSparkles } from 'lucide-react';
import PostDialog from '@/components/postDialog';

// Type definition for lead data
interface Lead {
  id: string;
  platform: string;
  subreddit: string;
  author: string;
  title: string;
  preview: string;
  fullText?: string;
  timestamp: Date;
  matchStrength: 'strong' | 'partial';
  isNew: boolean;
  upvotes: number;
  comments: number;
  postUrl?: string;
}

const SAMPLE_LEADS: Lead[] = [
  {
    id: '1',
    platform: 'Reddit',
    subreddit: 'Daily_Tech_Jobs_India',
    author: 'AdaDarysrupp',
    title: 'Looking for an SEO specialist',
    preview:
      "Hey folks, I'm working on a new web project that's somewhere between tech, content, and a bit of e-commerce magic. Can't spill all the beans yet, but it's in a space that lives...",
    fullText:
      "Hey folks, I'm working on a new web project that's somewhere between tech, content, and a bit of e-commerce magic. Can't spill all the beans yet, but it's in a space that lives at the intersection of all three.\n\nWhat I need is someone who really understands SEO—not just the basics, but someone who can help drive organic traffic from day one. I'm talking technical SEO, content optimization, keyword research, and all that good stuff.\n\nIf you've got experience working with startups or early-stage projects and know how to build traffic from scratch, I'd love to chat. Preferably someone who's worked with e-commerce or content-heavy sites before.\n\nLet me know if you're interested or if you know someone who might be a good fit. Thanks!",
    timestamp: new Date('2025-12-28T09:30:00'),
    matchStrength: 'strong',
    isNew: true,
    upvotes: 12,
    comments: 5,
    postUrl: 'https://reddit.com/r/Daily_Tech_Jobs_India/example1',
  },
  {
    id: '2',
    platform: 'Reddit',
    subreddit: 'SEO',
    author: 'webdev_pro',
    title: 'Need help improving our website rankings',
    preview:
      "Our company has been struggling with organic traffic for the past few months. We've tried basic SEO but nothing seems to work. Looking for someone who really knows their stuff...",
    fullText:
      "Our company has been struggling with organic traffic for the past few months. We've tried basic SEO tactics like meta tags, some keyword optimization, and creating blog content, but nothing seems to work. Our rankings keep dropping and we're barely getting any visibility on Google.\n\nWe're a mid-sized SaaS company in the project management space. Our competitors are ranking for keywords we should be dominating. I think we need someone who can do a comprehensive SEO audit and help us develop a proper strategy.\n\nLooking for someone who really knows their stuff—preferably with experience in the SaaS industry. We need help with technical SEO, content strategy, backlink analysis, and honestly just a fresh perspective on what we're doing wrong.\n\nBudget is flexible for the right person. Would love to hear from anyone who's helped similar companies turn things around. DM me if interested!",
    timestamp: new Date('2025-12-28T08:15:00'),
    matchStrength: 'strong',
    isNew: true,
    upvotes: 8,
    comments: 3,
    postUrl: 'https://reddit.com/r/SEO/example2',
  },
  {
    id: '3',
    platform: 'Reddit',
    subreddit: 'smallbusiness',
    author: 'startup_founder',
    title: "What's the best way to increase website traffic?",
    preview:
      'I recently launched my e-commerce site and getting visitors has been harder than I thought. Any recommendations for tools or strategies that actually work?',
    fullText:
      "I recently launched my e-commerce site and getting visitors has been harder than I thought. I've tried posting on social media, running some Facebook ads, and even tried to optimize my product pages, but I'm still only getting a trickle of traffic.\n\nAny recommendations for tools or strategies that actually work? I've heard about SEO but I'm not sure where to start. Should I hire someone or are there good tools I can use myself?\n\nMy budget is pretty limited right now, so I'm trying to figure out what gives the best ROI. Would love to hear what's worked for other small business owners!",
    timestamp: new Date('2025-12-28T07:45:00'),
    matchStrength: 'partial',
    isNew: false,
    upvotes: 15,
    comments: 12,
    postUrl: 'https://reddit.com/r/smallbusiness/example3',
  },
  {
    id: '4',
    platform: 'Reddit',
    subreddit: 'marketing',
    author: 'digital_marketer',
    title: 'SEO vs PPC - what should I focus on?',
    preview:
      'I have a limited budget and need to decide between investing in SEO or PPC campaigns. My business is in the SaaS space...',
    fullText:
      "I have a limited budget and need to decide between investing in SEO or PPC campaigns. My business is in the SaaS space, and we're trying to grow our user base.\n\nPPC gives immediate results but it's expensive and stops working the moment you stop paying. SEO takes longer but seems more sustainable. The problem is I don't have expertise in either, so I'd probably need to hire someone or an agency.\n\nFor those who've faced similar decisions, what did you choose and why? What kind of results did you see? And if you went with SEO, how long did it take before you started seeing real traffic?\n\nAny advice would be greatly appreciated!",
    timestamp: new Date('2025-12-28T06:20:00'),
    matchStrength: 'partial',
    isNew: false,
    upvotes: 23,
    comments: 18,
    postUrl: 'https://reddit.com/r/marketing/example4',
  },
  {
    id: '5',
    platform: 'Reddit',
    subreddit: 'Entrepreneur',
    author: 'growing_company',
    title: 'Looking for someone to help with search engine optimization',
    preview:
      "We're a B2B company looking to improve our online presence. We need help with technical SEO, content strategy, and link building...",
    fullText:
      "We're a B2B company in the enterprise software space, looking to significantly improve our online presence. Right now, we're practically invisible on Google for our target keywords, and that's costing us leads.\n\nWe need help with:\n- Technical SEO (our site is slow and probably has a ton of issues)\n- Content strategy (we have a blog but it's not ranking)\n- Link building (we have almost no quality backlinks)\n- Keyword research and competitive analysis\n\nWe're willing to invest properly in this - we understand it's not a quick fix. Looking for someone or an agency that has proven experience with B2B companies, preferably in the tech/software space.\n\nIf you've got case studies or examples of similar work, I'd love to see them. We're ready to get started ASAP. Please DM me with your rates and availability. Thanks!",
    timestamp: new Date('2025-12-27T15:30:00'),
    matchStrength: 'strong',
    isNew: false,
    upvotes: 31,
    comments: 9,
    postUrl: 'https://reddit.com/r/Entrepreneur/example5',
  },
];

function LeadList() {
  const [leads, setLeads] = useState(SAMPLE_LEADS);
  const [filteredLeads, setFilteredLeads] = useState(leads);
  const [searchQuery, setSearchQuery] = useState('');
  const [matchFilter, setMatchFilter] = useState<'all' | 'strong' | 'partial'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleLeadClick = (lead: Lead) => {
    setSelectedLead(lead);
    setIsDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setIsDialogOpen(false);
    // Optional: clear selected lead after dialog close animation
    setTimeout(() => setSelectedLead(null), 200);
  };

  // Apply filters whenever search query, match filter, or leads change
  useEffect(() => {
    let result = leads;

    // Apply match strength filter
    if (matchFilter !== 'all') {
      result = result.filter((lead) => lead.matchStrength === matchFilter);
    }

    // Apply search filter
    if (searchQuery.trim()) {
      const query = searchQuery.toLowerCase();
      result = result.filter(
        (lead) =>
          lead.title.toLowerCase().includes(query) ||
          lead.preview.toLowerCase().includes(query) ||
          lead.author.toLowerCase().includes(query) ||
          lead.subreddit.toLowerCase().includes(query)
      );
    }

    setFilteredLeads(result);
  }, [searchQuery, matchFilter, leads]);

  const formatTimeAgo = (date: Date) => {
    const now = new Date();
    const diffInMs = now.getTime() - date.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMins < 60) return `${diffInMins} min ago`;
    if (diffInHours < 24) return `${diffInHours}h ago`;
    return `${diffInDays}d ago`;
  };

  // Calculate counts for each filter
  const allCount = leads.length;

  return (
    <>
      {/* Filters and Search */}
      <Card className="bg-transparent border-transparent">
        <CardHeader className="h-2 flex items-center">
          <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center justify-between w-full">
            <div className="flex items-center gap-2">
              <Button
                variant={matchFilter === 'all' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setMatchFilter('all')}
                className="gap-2"
              >
                <Filter className="w-4 h-4" />
                All ({allCount})
              </Button>
              <Button
                variant={matchFilter === 'strong' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setMatchFilter('strong')}
                className="gap-2"
              >
                <Zap className="w-4 h-4" />
                Strong Match
              </Button>
              <Button
                variant={matchFilter === 'partial' ? 'primary' : 'outline'}
                size="sm"
                onClick={() => setMatchFilter('partial')}
                className="gap-2"
              >
                <CoffeeIcon className="w-4 h-4" />
                Partial Match
              </Button>
            </div>
            <div className="relative w-full sm:w-64 sm:ml-auto">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
              <Input
                placeholder="Search leads..."
                className="pl-9 w-full"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
              {searchQuery && (
                <button
                  onClick={() => setSearchQuery('')}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
                >
                  <X className="w-4 h-4" />
                </button>
              )}
            </div>
          </div>
        </CardHeader>
      </Card>

      <div className="space-y-4">
        {filteredLeads.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No leads found</p>
                <p className="text-sm">Try adjusting your filters or search query</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredLeads.map((lead) => (
            <Card
              key={lead.id}
              className="group hover:border-primary/50 transition-all duration-300 overflow-hidden hover:shadow-md"
            >
              {/* Card Header - Metadata */}
              <div className="px-6 pb-3">
                <div className="flex items-center justify-between gap-4 flex-wrap">
                  <div className="flex items-center gap-3">
                    <RedditIcon size={24} className="flex-shrink-0" />
                    <div className="flex items-center gap-2 text-sm text-muted-foreground flex-wrap">
                      <span className="font-semibold text-muted-foreground transition-colors cursor-pointer">
                        r/{lead.subreddit}
                      </span>
                      <span className="text-muted-foreground/50">•</span>
                      <span className="hover:underline cursor-pointer">u/{lead.author}</span>
                      <span className="text-muted-foreground/50">•</span>
                      <span>{formatTimeAgo(lead.timestamp)}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    {lead.isNew && (
                      <Badge className="bg-emerald-600 hover:bg-emerald-700 text-white border-0 px-2.5 py-0.5 text-xs font-medium">
                        New
                      </Badge>
                    )}
                    <Badge
                      variant="outline"
                      className={`px-2.5 py-0.5 text-xs font-medium ${
                        lead.matchStrength === 'strong'
                          ? 'border-emerald-500/50 text-emerald-600 bg-emerald-500/10 dark:text-emerald-400'
                          : 'border-amber-500/50 text-amber-600 bg-amber-500/10 dark:text-amber-400'
                      }`}
                    >
                      {lead.matchStrength === 'strong' ? '⚡ Strong Match' : '☕ Partial Match'}
                    </Badge>
                  </div>
                </div>
              </div>

              {/* Card Body - Content */}
              <div className="px-6 cursor-pointer" onClick={() => handleLeadClick(lead)}>
                <h3 className="text-lg font-semibold mb-3 group-hover:text-primary transition-colors leading-snug">
                  {lead.title}
                </h3>

                <p className="text-sm text-muted-foreground leading-relaxed line-clamp-3">
                  {lead.preview}
                </p>
              </div>

              {/* Card Footer - Engagement & Actions */}
              <div className="px-6 py-3  border-t border-border/50 flex items-center justify-between gap-4">
                
                <div className="flex items-center gap-2">
                  <Button
                    size="sm"
                    variant="outline"
                    className="h-9 gap-2 hover:bg-background"
                    onClick={(e) => {
                      e.stopPropagation();
                      window.open(lead.postUrl, '_blank');
                    }}
                  >
                    View Post
                    <ExternalLink className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    className="h-9 gap-2 bg-primary hover:bg-primary/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle generate reply
                    }}
                  >
                    Generate Reply
                    <WandSparkles className="w-3.5 h-3.5" />
                  </Button>
                  <Button
                    size="sm"
                    className="h-9 gap-2 bg-primary hover:bg-primary/90"
                    onClick={(e) => {
                      e.stopPropagation();
                      // Handle generate reply
                    }}
                  >
                    Generate Comment
                    <WandSparkles className="w-3.5 h-3.5" />
                  </Button>
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {/* Post Detail Dialog */}
      <PostDialog lead={selectedLead} isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
}

export default LeadList;
