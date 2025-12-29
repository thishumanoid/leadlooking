'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Sparkles, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useSupabase } from '@/hooks/supabase-provider';

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (campaign: any) => void;
}

export function CreateCampaignDialog({ open, onOpenChange, onCreate }: CreateCampaignDialogProps) {
  const [websiteName, setWebsiteName] = useState('');
  const [websiteDescription, setWebsiteDescription] = useState('');
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [keywords, setKeywords] = useState(['', '', '', '', '']);
  const [replyTone, setReplyTone] = useState('friendly');
  const [replyLength, setReplyLength] = useState('medium');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { supabase } = useSupabase();

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {

      // Filter out empty keywords
      const validKeywords = keywords.filter((k) => k.trim() !== '');
      
      if (validKeywords.length === 0) {
        toast.error('Please add at least one keyword');
        setIsSubmitting(false);
        return;
      }

      // Step 1: Insert campaign
      const { data: campaign, error: campaignError } = await supabase
        .from('campaigns')
        .insert({
          name: websiteName,
          description: websiteDescription,
          website_url: websiteUrl,
          config: {
            ai_tone: replyTone.toLowerCase(),
            message_length: replyLength.toLowerCase(),
          },
        })
        .select()
        .single();

      if (campaignError) throw campaignError;

      // Step 2: Handle keywords (upsert to avoid duplicates)
      const keywordInserts = validKeywords.map((kw) => ({ keyword: kw.trim().toLowerCase() }));
      
      const { data: insertedKeywords, error: keywordsError } = await supabase
        .from('keywords')
        .upsert(keywordInserts, { onConflict: 'keyword', ignoreDuplicates: true })
        .select();

      if (keywordsError) throw keywordsError;

      // Step 3: Get all keyword IDs (including existing ones)
      const { data: allKeywords, error: fetchError } = await supabase
        .from('keywords')
        .select('id, keyword')
        .in('keyword', validKeywords.map(k => k.trim().toLowerCase()));

      if (fetchError) throw fetchError;

      // Step 4: Create campaign_keywords junction entries
      const campaignKeywordInserts = allKeywords.map((kw) => ({
        campaign_id: campaign.id,
        keyword_id: kw.id,
      }));

      const { error: junctionError } = await supabase
        .from('campaign_keywords')
        .insert(campaignKeywordInserts);

      if (junctionError) throw junctionError;

      // Success! Call onCreate callback with the campaign data
    //   onCreate({
    //     ...campaign,
    //     keywords: allKeywords,
    //   });

      // Reset form
      setWebsiteName('');
      setWebsiteDescription('');
      setWebsiteUrl('');
      setKeywords(['', '', '', '', '']);
      setReplyTone('friendly');
      setReplyLength('medium');
      
      toast.success('Campaign created successfully!');
      onOpenChange(false);
    } catch (error) {
      console.error('Error creating campaign:', error);
      toast.error(error instanceof Error ? error.message : 'Failed to create campaign');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[525px] max-h-[90vh] flex flex-col bg-card border-none shadow-2xl overflow-hidden p-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />

        <DialogHeader className="relative z-10 px-6 pt-6 pb-4">
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            Create New Campaign
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Fill in your business details and set keywords to start finding leads on Reddit.
          </DialogDescription>
        </DialogHeader>

        <form
          onSubmit={handleSubmit}
          className="flex flex-col flex-1 overflow-hidden relative z-10"
        >
          <div className="flex-1 overflow-y-auto px-6 py-2 space-y-6">
            <div className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="websiteName" className="text-sm font-medium">
                  Website Name
                </Label>
                <Input
                  id="websiteName"
                  placeholder="e.g. My Awesome SaaS"
                  value={websiteName}
                  onChange={(e) => setWebsiteName(e.target.value)}
                  className="bg-background/50 border-muted-foreground/20 focus-visible:ring-primary"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="websiteUrl" className="text-sm font-medium">
                  Website URL (optional)
                </Label>
                <Input
                  id="websiteUrl"
                  placeholder="https://example.com"
                  type="url"
                  value={websiteUrl}
                  onChange={(e) => setWebsiteUrl(e.target.value)}
                  className="bg-background/50 border-muted-foreground/20 focus-visible:ring-primary"
                  required
                  disabled={isSubmitting}
                />
              </div>

              <div className="grid gap-2">
                <Label htmlFor="description" className="text-sm font-medium">
                  Website Description
                </Label>
                <Textarea
                  id="description"
                  placeholder="Briefly describe what your business does..."
                  value={websiteDescription}
                  onChange={(e) => setWebsiteDescription(e.target.value)}
                  className="bg-background/50 border-muted-foreground/20 focus-visible:ring-primary min-h-[100px] resize-none"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-3 pb-4">
              <Label className="text-sm font-medium flex items-center justify-between">
                Target Keywords
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Set up to 5
                </span>
              </Label>
              <div className="grid gap-2">
                {keywords.map((keyword, index) => (
                  <div key={index} className="relative group">
                    <Input
                      placeholder={`Keyword ${index + 1}`}
                      value={keyword}
                      onChange={(e) => handleKeywordChange(index, e.target.value)}
                      className="bg-background/50 border-muted-foreground/20 focus-visible:ring-primary pl-9"
                      required={index === 0}
                      disabled={isSubmitting}
                    />
                    <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground/50 group-focus-within:text-primary transition-colors">
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="space-y-4 pt-4 border-t border-muted-foreground/10 pb-4">
              <div className="flex items-center gap-2">
                <Sparkles className="w-4 h-4 text-primary" />
                <h3 className="text-sm font-semibold">AI Reply Settings</h3>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="grid gap-2">
                  <Label htmlFor="replyTone" className="text-sm font-medium">
                    AI Reply Tone
                  </Label>
                  <Select value={replyTone} onValueChange={setReplyTone} disabled={isSubmitting}>
                    <SelectTrigger className="w-full bg-background/50 border-muted-foreground/20">
                      <SelectValue placeholder="Select tone" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="friendly">Friendly</SelectItem>
                      <SelectItem value="professional">Professional</SelectItem>
                      <SelectItem value="casual">Casual</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="grid gap-2">
                  <Label htmlFor="replyLength" className="text-sm font-medium">
                    Reply Length
                  </Label>
                  <Select value={replyLength} onValueChange={setReplyLength} disabled={isSubmitting}>
                    <SelectTrigger className="w-full bg-background/50 border-muted-foreground/20">
                      <SelectValue placeholder="Select length" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="short">Short</SelectItem>
                      <SelectItem value="medium">Medium</SelectItem>
                      <SelectItem value="long">Long</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
            </div>
          </div>

          <DialogFooter className="px-6 py-4 border-t border-muted-foreground/10 bg-card">
            <Button
              type="button"
              variant="ghost"
              onClick={() => onOpenChange(false)}
              className="hover:bg-muted/50"
              disabled={isSubmitting}
            >
              Cancel
            </Button>
            <Button
              type="submit"
              className="bg-primary hover:bg-primary/90 text-primary-foreground shadow-lg shadow-primary/20"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                  Creating...
                </>
              ) : (
                'Create Campaign'
              )}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
}