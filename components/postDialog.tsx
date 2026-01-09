// LeadDetailDialog.tsx
'use client';
import { useState } from 'react';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import RedditIcon from '@/components/global/RedditIcon';
import {
  ExternalLink,
  ArrowRight,
  Send,
  Box,
  Clock,
  User,
  Zap,
  Coffee,
  Target,
  Brain,
} from 'lucide-react';
import { getUserChatURL } from '@/utils/functions/helpers';

import { Lead } from './leadList';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface LeadDetailDialogProps {
  lead: Lead | null;
  isOpen: boolean;
  onClose: () => void;
}

export default function PostDialog({ lead, isOpen, onClose }: LeadDetailDialogProps) {
  const [isGeneratingComment, setIsGeneratingComment] = useState(false);
  const [isGeneratingDM, setIsGeneratingDM] = useState(false);
  const [loadingLeadId, setLoadingLeadId] = useState<string | null>(null);
  const router = useRouter();

  if (!lead) return null;

  const handleChatClick = async () => {
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

  const formatTimeAgo = (date: Date | string) => {
    const d = new Date(date);
    const now = new Date();
    const diffInMs = now.getTime() - d.getTime();
    const diffInMins = Math.floor(diffInMs / 60000);
    const diffInHours = Math.floor(diffInMins / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInMins < 60) return `${diffInMins} minutes ago`;
    if (diffInHours < 24) return `${diffInHours} hours ago`;
    return `${diffInDays} days ago`;
  };

  const handleGenerateComment = async () => {
    setIsGeneratingComment(true);
    try {
      // TODO: Replace with your actual API call
      // const response = await generateComment(lead.id);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated delay

      // Open the post URL
      if (lead.postUrl) {
        window.open(lead.postUrl, '_blank');
      }
    } catch (error) {
      console.error('Error generating comment:', error);
    } finally {
      setIsGeneratingComment(false);
    }
  };

  const handleGenerateDM = async () => {
    setIsGeneratingDM(true);
    try {
      // TODO: Replace with your actual API call
      // const response = await generateDM(lead.id);
      await new Promise((resolve) => setTimeout(resolve, 1500)); // Simulated delay

      // Open Reddit DM page
      window.open(`https://reddit.com/user/${lead.author}`, '_blank');
    } catch (error) {
      console.error('Error generating DM:', error);
    } finally {
      setIsGeneratingDM(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="w-[95vw] max-w-[95vw] sm:w-[90vw] sm:max-w-2xl lg:max-w-4xl max-h-[85vh] sm:max-h-[90vh] p-0 gap-0">
        <div className="flex flex-col max-h-[85vh] sm:max-h-[90vh]">
          {/* Header - Fixed */}
          <DialogHeader className="px-4 sm:px-6 pt-4 sm:pt-6 pb-3 border-b shrink-0">
            <div className="flex items-start gap-2 sm:gap-3">
              {/* Hide Reddit icon on very small screens */}
              <div className=" xs:block shrink-0">
                <RedditIcon size={32} />
              </div>
              <div className="flex-1 min-w-0 pr-8">
                <DialogTitle className="text-base sm:text-lg lg:text-xl font-bold leading-tight mb-2 break-words">
                  {lead.title}
                </DialogTitle>
                <div className="flex flex-wrap items-center gap-1.5 sm:gap-2 text-sm text-muted-foreground">
                  {lead.isNew && (
                    <Badge className="bg-green-700 text-white border-0 px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs">
                      New
                    </Badge>
                  )}
                  <Badge
                    variant="outline"
                    className={`px-1.5 sm:px-2 py-0.5 text-[10px] sm:text-xs ${
                      lead.matchStrength === 'strong'
                        ? 'border-green-500/50 text-green-500 bg-green-500/5'
                        : 'border-yellow-500/50 text-yellow-500 bg-yellow-500/5'
                    }`}
                  >
                    {lead.matchStrength === 'strong' ? (
                      <>
                        <Zap className="w-3 h-3 mr-0.5 sm:mr-1 inline" />
                        <span className="hidden sm:inline">Strong Match</span>
                        <span className="sm:hidden">Strong</span>
                      </>
                    ) : (
                      <>
                        <Coffee className="w-3 h-3 mr-0.5 sm:mr-1 inline" />
                        <span className="hidden sm:inline">Partial Match</span>
                        <span className="sm:hidden">Partial</span>
                      </>
                    )}
                  </Badge>
                </div>
              </div>
            </div>
          </DialogHeader>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-4 sm:px-6 py-4 sm:py-6">
            <div className="space-y-4 sm:space-y-6">
              {/* Post Metadata */}
              <div className="flex flex-wrap gap-2 sm:gap-3 lg:gap-4 text-xs sm:text-sm">
                <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                  <Box className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="font-medium text-foreground truncate max-w-[120px] sm:max-w-none">
                    r/{lead.subreddit}
                  </span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                  <User className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="truncate max-w-[120px] sm:max-w-none">u/{lead.author}</span>
                </div>
                <div className="flex items-center gap-1.5 sm:gap-2 text-muted-foreground">
                  <Clock className="w-3.5 h-3.5 sm:w-4 sm:h-4 shrink-0" />
                  <span className="whitespace-nowrap">{formatTimeAgo(lead.timestamp)}</span>
                </div>
              </div>

              {/* Full Post Content */}
              <Card className="bg-muted/30 border-muted">
                <CardContent className="p-3 sm:p-4">
                  <h3 className="text-xs sm:text-sm font-semibold text-muted-foreground mb-2 sm:mb-3">
                    FULL POST
                  </h3>
                  <div className="prose prose-sm dark:prose-invert max-w-none">
                    <p className="whitespace-pre-wrap text-foreground leading-relaxed text-xs sm:text-sm break-words">
                      {lead.fullText}
                    </p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>

          {/* Action Buttons - Fixed at bottom */}
          <div className="px-4 sm:px-6 pb-4 sm:pb-6 pt-3 sm:pt-4 border-t shrink-0 bg-background">
            {/* Lead Analysis - Score and Intent */}
            <div className="flex flex-row items-center justify-between mb-4 border border-muted-foreground/20 rounded-xl p-3 sm:p-4 shadow-sm">
              <div className="flex items-center gap-3 sm:gap-4">
                <div className="flex flex-col">
                  <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1">
                    <Target className="w-3 h-3 text-primary" /> Lead Score
                  </span>
                  <div className="flex items-center gap-2">
                    <span className="text-xl sm:text-2xl font-bold text-primary">
                      {lead.leadScore || 0}
                    </span>
                    <div className="h-2 w-16 sm:w-32 bg-muted rounded-full overflow-hidden">
                      <div
                        className={`h-full transition-all duration-700 ${
                          (lead.leadScore || 0) >= 70 ? 'bg-primary' : 'bg-primary'
                        }`}
                        style={{ width: `${lead.leadScore || 0}%` }}
                      />
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex flex-col items-end text-right">
                <span className="text-[10px] sm:text-xs font-semibold text-muted-foreground uppercase tracking-wider mb-1 flex items-center gap-1 justify-end">
                  <Brain className="w-3 h-3 text-primary" /> Author Intent:
                </span>
                <Badge
                  variant="outline"
                  className={`px-2 sm:px-3 py-1 bg-background border-primary/20 capitalize text-xs sm:text-sm font-semibold`}
                >
                  {lead.leadIntent || 'Unclear'}
                </Badge>
              </div>
            </div>

            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 sm:justify-end">
              <Link href={lead.postUrl ?? '#'} target="_blank" className="w-full sm:w-48">
                <Button variant="outline" className="w-full h-10 sm:h-12 text-xs sm:text-sm">
                  <ExternalLink className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 shrink-0" />
                  <span className="hidden sm:inline">Open Post</span>
                  <span className="sm:hidden">Open</span>
                </Button>
              </Link>

              <Button
                onClick={handleChatClick}
                disabled={isGeneratingComment}
                className="w-full sm:w-48 h-10 sm:h-12 text-xs sm:text-sm"
              >
                <ArrowRight className="w-3.5 h-3.5 sm:w-4 sm:h-4 mr-1.5 sm:mr-2 shrink-0" />
                <span className="hidden lg:inline">Send DM</span>
                <span className="hidden sm:inline lg:hidden">Send DM</span>
                <span className="sm:hidden">Send DM</span>
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
