'use client';

import React, { useState, useEffect, useRef } from 'react';
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

import { Loader2, Sparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useSupabase } from '@/hooks/supabase-provider';
import { scrapeMetadata } from '@/utils/functions/scrapeMetadata';
import { getKeywords } from '@/utils/functions/getKeywords'; 

interface CreateCampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onCreate: (campaign: any) => void;
}

export function CreateCampaignDialog({ open, onOpenChange, onCreate }: CreateCampaignDialogProps) {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [websiteDescription, setWebsiteDescription] = useState('');
  
  // Loading states
  const [isScrapingMetadata, setIsScrapingMetadata] = useState(false);
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
  
  const [metadataError, setMetadataError] = useState('');
  const [keywords, setKeywords] = useState(['', '', '', '', '']);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { supabase } = useSupabase();

  // Track if fields were manually edited
  const [wasManuallyEdited, setWasManuallyEdited] = useState({
    name: false,
    description: false,
    keywords: false,
  });

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);

 

  // Auto-scrape metadata and Generate Keywords
  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Debounce for 800ms
    debounceTimer.current = setTimeout(async () => {
      setIsScrapingMetadata(true);
      setMetadataError('');

      try {
        // 1. Scrape Metadata
        const metadata = await scrapeMetadata(websiteUrl);

        if (!metadata) {
          setMetadataError('');
          return;
        }
        
        let descriptionToUse = websiteDescription;

        // Auto-fill Name
        if (!wasManuallyEdited.name && metadata.name) {
          setWebsiteName(metadata.name);
        }

        // Auto-fill Description
        if (!wasManuallyEdited.description && metadata.description) {
          setWebsiteDescription(metadata.description);
          descriptionToUse = metadata.description;
        }

        // 2. Generate Keywords
        // Only run if we have a description and keywords haven't been touched yet
        if (descriptionToUse && !wasManuallyEdited.keywords) {
          setIsGeneratingKeywords(true);
          try {
            console.log('Triggering keyword generation for:', descriptionToUse);

            const combinedDescription = `${websiteName}. ${descriptionToUse}`;
            console.log('Combined description:', combinedDescription);
            const aiKeywords = await getKeywords(combinedDescription);
            
            console.log('Received keywords in component:', aiKeywords);

            if (aiKeywords && aiKeywords.length > 0) {
                // Fill the array up to 5, keeping empty strings for unused slots
                const newKeywords = [...aiKeywords, '', '', '', ''].slice(0, 5);
                setKeywords(newKeywords);
                toast.success("Keywords generated successfully!");
            }
          } catch (kwError) {
            console.error('Keyword generation failed silently:', kwError);
          } finally {
            setIsGeneratingKeywords(false);
          }
        }

      } catch (error) {
        console.error('Failed to scrape metadata:', error);
        setMetadataError('Could not fetch website details. Please enter manually.');
      } finally {
        setIsScrapingMetadata(false);
      }
    }, 800);

    return () => {
      if (debounceTimer.current) {
        clearTimeout(debounceTimer.current);
      }
    };
  }, [websiteUrl, wasManuallyEdited]); 

  
  const handleWebsiteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteName(e.target.value);
    setWasManuallyEdited((prev) => ({ ...prev, name: true }));
  };

  const handleWebsiteDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setWebsiteDescription(e.target.value);
    setWasManuallyEdited((prev) => ({ ...prev, description: true }));
  };

  useEffect(() => {
    if (!open) {
      setWebsiteName('');
      setWebsiteDescription('');
      setWebsiteUrl('');
      setKeywords(['', '', '', '', '']);
      setWasManuallyEdited({ name: false, description: false, keywords: false });
      setMetadataError('');
    }
  }, [open]);

  const handleKeywordChange = (index: number, value: string) => {
    const newKeywords = [...keywords];
    newKeywords[index] = value;
    setKeywords(newKeywords);
    setWasManuallyEdited((prev) => ({ ...prev, keywords: true }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validKeywords = keywords.filter((k) => k.trim() !== '');

      if (validKeywords.length === 0) {
        toast.error('Please add at least one keyword');
        setIsSubmitting(false);
        return;
      }

      const { data: campaign, error: campaignError } = await supabase
        .from('campaigns')
        .insert({
          name: websiteName,
          description: websiteDescription,
          website_url: websiteUrl,
        })
        .select()
        .single();

      if (campaignError) throw campaignError;

      const keywordInserts = validKeywords.map((kw) => ({ keyword: kw.trim() }));

      const { data: insertedKeywords, error: keywordsError } = await supabase
        .from('keywords')
        .upsert(keywordInserts, { onConflict: 'keyword', ignoreDuplicates: true })
        .select();

      if (keywordsError) throw keywordsError;

      const { data: allKeywords, error: fetchError } = await supabase
        .from('keywords')
        .select('id, keyword')
        .in(
          'keyword',
          validKeywords.map((k) => k.trim().toLowerCase())
        );

      if (fetchError) throw fetchError;

      const campaignKeywordInserts = allKeywords.map((kw) => ({
        campaign_id: campaign.id,
        keyword_id: kw.id,
      }));

      const { error: junctionError } = await supabase
        .from('campaign_keywords')
        .insert(campaignKeywordInserts);

      if (junctionError) throw junctionError;

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
                <Label htmlFor="websiteUrl" className="text-sm font-medium">
                  Website URL (optional)
                </Label>
                <div className="relative">
                    <Input
                    id="websiteUrl"
                    placeholder="https://example.com"
                    type="text"
                    value={websiteUrl}
                    onChange={(e) => setWebsiteUrl(e.target.value)}
                    className="bg-background/50 border-muted-foreground/20 focus-visible:ring-primary pr-10"
                    disabled={isSubmitting}
                    />
                    {isScrapingMetadata && (
                    <div className="absolute right-3 top-1/2 -translate-y-1/2">
                        <Loader2 className="h-4 w-4 animate-spin text-primary" />
                    </div>
                    )}
                </div>
              </div>
              {metadataError && <p className="text-xs text-orange-500">{metadataError}</p>}
              {isScrapingMetadata && (
                <p className="text-xs text-muted-foreground">Fetching website details...</p>
              )}

              <div className="grid gap-2">
                <Label htmlFor="websiteName" className="text-sm font-medium">
                  Website Name
                </Label>
                <Input
                  id="websiteName"
                  placeholder="e.g. My Awesome SaaS"
                  value={websiteName}
                  onChange={handleWebsiteNameChange}
                  className="bg-background/50 border-muted-foreground/20 focus-visible:ring-primary"
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
                  onChange={handleWebsiteDescriptionChange}
                  className="bg-background/50 border-muted-foreground/20 focus-visible:ring-primary min-h-[100px] resize-none"
                  required
                  disabled={isSubmitting}
                />
              </div>
            </div>

            <div className="space-y-3 pb-4">
              <div className="flex items-center justify-between">
                <Label className="text-sm font-medium flex items-center gap-2">
                  Target Keywords
                  {isGeneratingKeywords && (
                    <span className="flex items-center text-xs text-primary animate-pulse">
                        <Sparkles className="w-3 h-3 mr-1" />
                        Generating AI keywords...
                    </span>
                  )}
                </Label>
                <span className="text-[10px] text-muted-foreground uppercase tracking-wider">
                  Set up to 5
                </span>
              </div>
              <div className="grid gap-2">
                {keywords.map((keyword, index) => (
                  <div key={index} className="relative group">
                    <Input
                      placeholder={isGeneratingKeywords ? "Generating..." : `Keyword ${index + 1}`}
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
              disabled={isSubmitting || isGeneratingKeywords} 
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