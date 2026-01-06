'use client';
import { useState, useEffect } from 'react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Input } from '@/components/ui/input';
import RedditIcon from '@/components/global/RedditIcon';
import {
  Search,
  Filter,
  X,
  Zap,
  CoffeeIcon,
  ExternalLink,
  ArrowRight,
  Loader2,
} from 'lucide-react';
import PostDialog from '@/components/postDialog';
import Link from 'next/link';
import { EmptyLeadState } from '@/components/empty-lead-state';
import { getUserChatURL } from '@/utils/functions/helpers';
import { useRouter } from 'next/navigation';

// Type definition for lead data
export interface Lead {
  id: string;
  platform: string;
  subreddit: string;
  author: string;
  title: string;
  preview: string;
  fullText?: string;
  timestamp: Date | string;
  matchStrength: 'strong' | 'partial';
  isNew: boolean;
  postUrl?: string;
  chatUrl?: string;
  leadScore?: number;
  leadIntent?: string;
  isPremiumLocked?: boolean;
}

interface LeadListProps {
  leads: Lead[];
  isPremium?: boolean;
}

function LeadList({ leads, isPremium = true }: LeadListProps) {
  const [filteredLeads, setFilteredLeads] = useState(leads);
  const [searchQuery, setSearchQuery] = useState('');
  const [matchFilter, setMatchFilter] = useState<'all' | 'strong' | 'partial'>('all');
  const [selectedLead, setSelectedLead] = useState<Lead | null>(null);
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [loadingLeadId, setLoadingLeadId] = useState<string | null>(null);
  const router = useRouter();

  const handleLeadClick = (lead: Lead) => {
    console.log(lead);
    setSelectedLead(lead);
    setIsDialogOpen(true);
  };

  const handleChatClick = async (lead: Lead) => {
    try {
      setLoadingLeadId(lead.id);
      console.log('selected auther', lead.author);
      const chatURL = await getUserChatURL(lead.author || '');
      if (chatURL) {
        router.push(chatURL);
      }
    } catch (error) {
      console.error('Error in handleChatClick:', error);
    } finally {
      setLoadingLeadId(null);
    }
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

  const formatTimeAgo = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diffInMs = now.getTime() - d.getTime();
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
        {leads.length === 0 ? (
          <EmptyLeadState />
        ) : filteredLeads.length === 0 ? (
          <Card>
            <CardContent className="py-12">
              <div className="text-center text-muted-foreground">
                <Search className="w-12 h-12 mx-auto mb-4 opacity-50" />
                <p className="text-lg font-medium">No leads found matching your filters</p>
                <p className="text-sm">Try adjusting your search or filters</p>
              </div>
            </CardContent>
          </Card>
        ) : (
          filteredLeads.map((lead) => (
            <Card
              key={lead.id}
              className="group hover:bg-card/80 hover:border-primary/50 transition-all duration-300 overflow-hidden hover:-translate-y-0.5"
            >
              {/* Card Header - Metadata */}
              <div className="px-6">
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
                    <Badge
                      variant="outline"
                      className={`px-2.5 py-0.5 text-xs font-medium ${
                        lead.matchStrength === 'strong'
                          ? 'text-primary bg-primary dark:text-foreground'
                          : 'border-primary/50 bg-primary/10 text-foreground'
                      }`}
                    >
                      {lead.matchStrength === 'strong' ? 'Strong Match' : 'Partial Match'}
                    </Badge>
                  </div>
                </div>
              </div>

              <div
                className={`px-6 cursor-pointer ${!isPremium ? 'pointer-events-none' : ''}`}
                onClick={() => isPremium && handleLeadClick(lead)}
              >
                <h3
                  className={`text-lg font-semibold mb-3 transition-colors leading-snug ${
                    !isPremium ? 'blur-[4px] select-none' : ''
                  }`}
                >
                  {!isPremium ? 'This is a premium lead title that is hidden' : lead.title}
                </h3>

                <p
                  className={`text-sm text-muted-foreground leading-relaxed line-clamp-3 ${
                    !isPremium ? 'blur-[6px] select-none' : ''
                  }`}
                >
                  {!isPremium
                    ? 'This is a sample lead content that is very long and detailed but is currently hidden behind a premium paywall to encourage users to upgrade and see the actual leads found by our system.'
                    : lead.preview}
                </p>
              </div>

              {/* Card Footer - Engagement & Actions */}
              <div className="px-6 py-3 border-t border-border/50 flex items-center justify-between gap-4">
                <div className="flex items-center gap-2">
                  {!isPremium ? (
                    <Button
                      size="sm"
                      className="h-9 gap-2 bg-primary hover:bg-primary/90"
                      onClick={() => router.push('/pricing')}
                    >
                      <Zap className="w-3.5 h-3.5 fill-current" />
                      Upgrade to view lead
                    </Button>
                  ) : (
                    <>
                      <Link target="_blank" href={lead.postUrl ?? '#'}>
                        <Button
                          size="sm"
                          variant="outline"
                          className="h-9 gap-2 hover:bg-background"
                        >
                          View Post
                          <ExternalLink className="w-3.5 h-3.5" />
                        </Button>
                      </Link>
                      <Button
                        onClick={() => handleChatClick(lead)}
                        size="sm"
                        className="h-9 gap-2 bg-primary hover:bg-primary/90"
                        disabled={loadingLeadId === lead.id}
                      >
                        {loadingLeadId === lead.id ? (
                          <>
                            <Loader2 className="w-3.5 h-3.5 animate-spin" />
                            Connecting...
                          </>
                        ) : (
                          <>
                            Send DM
                            <ArrowRight className="w-3.5 h-3.5" />
                          </>
                        )}
                      </Button>
                    </>
                  )}
                </div>
              </div>
            </Card>
          ))
        )}
      </div>

      {!isPremium && leads.length > 0 && (
        <Card className="mt-8 bg-primary/5 border-primary/20 overflow-hidden relative">
          <div className="absolute top-0 right-0 p-4 opacity-10">
            <Zap size={100} className="text-primary fill-current" />
          </div>
          <CardContent className="py-8 flex flex-col items-center text-center gap-4">
            <div className="bg-primary/10 p-3 rounded-full">
              <Zap className="w-8 h-8 text-primary fill-current" />
            </div>
            <div className="max-w-md">
              <h3 className="text-2xl font-bold mb-2">Unlock All Leads</h3>
              <p className="text-muted-foreground">
                Nice! You found {leads.length} lead. Upgrade to see their info and connect.
              </p>
            </div>
            <Button
              size="lg"
              className="mt-2 gap-2 bg-primary hover:bg-primary/90 text-lg h-12 px-8"
              onClick={() => router.push('/pricing')}
            >
              Get Premium Access Now
              <ArrowRight className="w-5 h-5" />
            </Button>
          </CardContent>
        </Card>
      )}

      {/* Post Detail Dialog */}
      <PostDialog lead={selectedLead} isOpen={isDialogOpen} onClose={handleCloseDialog} />
    </>
  );
}

export default LeadList;
