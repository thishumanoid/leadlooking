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
import { Loader2, Sparkles, WandSparkles } from 'lucide-react';
import { toast } from 'sonner';
import { useSupabase } from '@/hooks/supabase-provider';
import { scrapeMetadata } from '@/utils/functions/scrapeMetadata';
import { getKeywords } from '@/utils/functions/getKeywords';
import KeywordsGuide from './keywordsGuide';

interface CampaignDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  onSuccess: (campaign: any) => void;
  campaign?: any;
  existingKeywords?: string[];
}

export function CampaignDialog({
  open,
  onOpenChange,
  onSuccess,
  campaign,
  existingKeywords,
}: CampaignDialogProps) {
  const [websiteUrl, setWebsiteUrl] = useState('');
  const [websiteName, setWebsiteName] = useState('');
  const [websiteDescription, setWebsiteDescription] = useState('');
  const [isScrapingMetadata, setIsScrapingMetadata] = useState(false);
  const [isGeneratingKeywords, setIsGeneratingKeywords] = useState(false);
  const [metadataError, setMetadataError] = useState('');
  const [keywords, setKeywords] = useState(['', '', '', '', '']);
  const [hasGeneratedKeywords, setHasGeneratedKeywords] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { supabase } = useSupabase();

  const [wasManuallyEdited, setWasManuallyEdited] = useState({
    name: false,
    description: false,
    keywords: false,
  });

  const debounceTimer = useRef<NodeJS.Timeout | null>(null);
  const abortController = useRef<AbortController | null>(null);

  useEffect(() => {
    if (debounceTimer.current) {
      clearTimeout(debounceTimer.current);
    }

    // Reset states immediately
    setIsScrapingMetadata(false);
    setIsGeneratingKeywords(false);
    setMetadataError('');

    // Only proceed if URL is valid
    if (!websiteUrl.trim() || !websiteUrl.startsWith('http')) {
      return;
    }

    // Skip if manually edited or in edit mode
    if (
      campaign ||
      wasManuallyEdited.name ||
      wasManuallyEdited.description ||
      wasManuallyEdited.keywords
    ) {
      return;
    }

    debounceTimer.current = setTimeout(async () => {
      setIsScrapingMetadata(true);
      setMetadataError('');

      try {
        const metadata = await scrapeMetadata(websiteUrl);

        if (!metadata) {
          setMetadataError('');
          return;
        }

        let descriptionToUse = websiteDescription;

        if (!wasManuallyEdited.name && metadata.name) {
          setWebsiteName(metadata.name);
        }

        if (!wasManuallyEdited.description && metadata.description) {
          setWebsiteDescription(metadata.description);
          descriptionToUse = metadata.description;
        }

        // Generate keywords if we have a description
        if (descriptionToUse && !wasManuallyEdited.keywords) {
          setIsGeneratingKeywords(true);

          try {
            const combinedDescription = `${
              websiteName || metadata.name || ''
            }. ${descriptionToUse}`;
            const aiKeywords = await getKeywords(combinedDescription);

            if (aiKeywords && aiKeywords.length > 0) {
              const newKeywords = [...aiKeywords.slice(0, 5)];
              // Pad with empty strings if less than 5
              while (newKeywords.length < 5) {
                newKeywords.push('');
              }
              setKeywords(newKeywords);
              setHasGeneratedKeywords(true);
              toast.success('Keywords generated successfully!');
            }
          } catch (kwError) {
            console.error('Keyword generation failed:', kwError);
            toast.error('Failed to generate keywords');
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
  }, [websiteUrl]);

  const handleManualGenerateKeywords = async () => {
    if (!websiteDescription.trim() || isGeneratingKeywords || hasGeneratedKeywords) {
      return;
    }

    setIsGeneratingKeywords(true);
    try {
      const combinedDescription = `${websiteName ? websiteName + '. ' : ''}${websiteDescription}`;
      const aiKeywords = await getKeywords(combinedDescription);

      if (aiKeywords && aiKeywords.length > 0) {
        const newKeywords = [...aiKeywords.slice(0, 5)];
        while (newKeywords.length < 5) {
          newKeywords.push('');
        }
        setKeywords(newKeywords);
        setHasGeneratedKeywords(true);
        toast.success('Keywords generated successfully!');
      } else {
        toast.error('Could not generate keywords. Please try again or enter manually.');
      }
    } catch (error) {
      console.error('Manual keyword generation failed:', error);
      toast.error('Failed to generate keywords');
    } finally {
      setIsGeneratingKeywords(false);
    }
  };

  const handleWebsiteNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setWebsiteName(e.target.value);
    setWasManuallyEdited((prev) => ({ ...prev, name: true }));
  };

  useEffect(() => {
    if (campaign && open) {
      setWebsiteUrl(campaign.website_url || '');
      setWebsiteName(campaign.name || '');
      setWebsiteDescription(campaign.description || '');

      if (existingKeywords && existingKeywords.length > 0) {
        const paddedKeywords = [...existingKeywords];
        while (paddedKeywords.length < 5) {
          paddedKeywords.push('');
        }
        setKeywords(paddedKeywords.slice(0, 5));
      } else {
        setKeywords(['', '', '', '', '']);
      }

      setWasManuallyEdited({
        name: true,
        description: true,
        keywords: true,
      });
    }
  }, [campaign, open, existingKeywords]);

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
      setIsScrapingMetadata(false);
      setIsGeneratingKeywords(false);
      setHasGeneratedKeywords(false);

      if (abortController.current) {
        abortController.current.abort();
      }
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
      // Validate and prepare keywords
      const validKeywords = keywords.map((k) => k.trim()).filter((k) => k !== '');

      if (validKeywords.length === 0) {
        toast.error('Please add at least one keyword');
        setIsSubmitting(false);
        return;
      }

      // Remove duplicates
      const uniqueKeywords = [...new Set(validKeywords)];

      console.log('Starting campaign creation with keywords:', uniqueKeywords);

      // Step 1: Create or Update the campaign
      let campaignData;

      if (campaign?.id) {
        // Update existing campaign
        const { data: updatedCampaign, error: updateError } = await supabase
          .from('campaigns')
          .update({
            name: websiteName,
            description: websiteDescription,
            website_url: websiteUrl || null,
          })
          .eq('id', campaign.id)
          .select()
          .single();

        if (updateError) {
          console.error('Campaign update error:', updateError);
          throw new Error(`Failed to update campaign: ${updateError.message}`);
        }
        campaignData = updatedCampaign;
      } else {
        // Create new campaign
        const { data: newCampaign, error: createError } = await supabase
          .from('campaigns')
          .insert({
            name: websiteName,
            description: websiteDescription,
            website_url: websiteUrl || null,
          })
          .select()
          .single();

        if (createError) {
          console.error('Campaign creation error:', createError);
          throw new Error(`Failed to create campaign: ${createError.message}`);
        }
        campaignData = newCampaign;
      }

      if (!campaignData) {
        throw new Error('Campaign operation failed');
      }

      console.log('Campaign processed:', campaignData.id);

      // Step 2: Insert keywords linked to campaign
      // validKeywords is already defined above from uniqueKeywords

      // If updating, remove old keywords first
      if (campaign?.id) {
        const { error: deleteError } = await supabase
          .from('keywords')
          .delete()
          .eq('campaign_id', campaign.id);

        if (deleteError) {
          console.error('Error removing old keywords:', deleteError);
          throw new Error(`Failed to update keywords: ${deleteError.message}`);
        }
      }

      const keywordInserts = validKeywords.map((kw) => ({
        campaign_id: campaignData.id,
        keyword: kw,
        user_id: campaignData.user_id || campaign?.user_id,
      }));

      console.log('Inserting keywords:', keywordInserts.length);

      const { data: insertedKeywords, error: keywordsError } = await supabase
        .from('keywords')
        .insert(keywordInserts)
        .select('id, keyword');

      if (keywordsError) {
        console.error('Keywords insertion error:', keywordsError);
        // Rollback: if new campaign, delete it
        if (!campaign?.id) {
          await supabase.from('campaigns').delete().eq('id', campaignData.id);
        }
        throw new Error(`Failed to save keywords: ${keywordsError.message}`);
      }

      console.log('Keywords saved successfully:', insertedKeywords?.length);

      toast.success(`Campaign ${campaign?.id ? 'updated' : 'created'} successfully!`);

      const campaignWithKeywords = {
        ...campaignData,
        keywords: insertedKeywords || [],
      };

      onSuccess(campaignWithKeywords);
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
      <DialogContent className="max-w-[95vw] sm:max-w-[800px] max-h-[90vh] flex flex-col bg-card border-none shadow-2xl overflow-hidden p-0">
        <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-primary/5 pointer-events-none" />
        <DialogHeader className="relative px-6 pt-6">
          <DialogTitle className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-foreground to-foreground/70">
            {campaign?.id ? 'Edit Campaign' : "Let's Find Leads"}
          </DialogTitle>
          <DialogDescription className="text-muted-foreground">
            Enter your product or service details and keywords to start finding leads on Reddit
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="flex flex-col flex-1 overflow-hidden relative">
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
                    className="bg-background/50 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary pr-10"
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
                  className="bg-background/50 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary"
                  disabled={isSubmitting}
                  required
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
                  className="bg-background/50 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary min-h-[80px] sm:min-h-[100px] resize-none"
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
                    <span className="flex items-center text-xs animate-pulse">
                      <Sparkles className="w-3 h-3 mr-1" />
                      Generating keywords using AI...
                    </span>
                  )}
                </Label>
                <Button
                  type="button"
                  variant="outline"
                  size="sm"
                  onClick={handleManualGenerateKeywords}
                  disabled={
                    !!campaign ||
                    isGeneratingKeywords ||
                    hasGeneratedKeywords ||
                    !websiteDescription.trim() ||
                    isSubmitting
                  }
                  className="h-8 bg-primary hover:bg-primary/80  text-xs font-semibold"
                >
                  {isGeneratingKeywords ? (
                    <>
                      <Loader2 className="w-3 h-3 mr-1 animate-spin" />
                      Generating...
                    </>
                  ) : (
                    <>
                      <WandSparkles className="w-3 h-3 mr-1" />
                      {hasGeneratedKeywords ? 'Keywords Generated' : 'Generate Keywords'}
                    </>
                  )}
                </Button>
              </div>

              <div className="grid gap-3">
                {keywords.map((keyword, index) => (
                  <div key={index} className="relative group">
                    <Textarea
                      placeholder={isGeneratingKeywords ? 'Generating...' : `Keyword ${index + 1}`}
                      value={keyword}
                      onChange={(e) => handleKeywordChange(index, e.target.value)}
                      className="bg-background/50 border-muted-foreground/20 focus-visible:ring-1 focus-visible:ring-primary pl-10 min-h-[52px] py-[15px] resize-none overflow-hidden"
                      required={index === 0}
                      disabled={isSubmitting}
                      rows={1}
                      onInput={(e) => {
                        const target = e.target as HTMLTextAreaElement;
                        target.style.height = 'auto';
                        target.style.height = `${target.scrollHeight}px`;
                      }}
                    />
                    <div className="absolute left-4 top-[14px] text-muted-foreground/50 group-focus-within:text-primary transition-colors">
                      <span className="text-xs font-bold">{index + 1}</span>
                    </div>
                  </div>
                ))}
              </div>
              <KeywordsGuide />
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
                  {campaign?.id ? 'Updating...' : 'Creating...'}
                </>
              ) : campaign?.id ? (
                'Update Campaign'
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
