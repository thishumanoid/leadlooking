'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import {
  Plus,
  ArrowRight,
} from 'lucide-react';
import { Button } from '@/components/ui/button';

const CampaignsPage = () => {
  const router = useRouter();
  const [campaigns, setCampaigns] = useState([
    {
      id: 1,
      name: 'CRM Software Leads',
      keywords: ['need CRM software', 'looking for CRM', 'best CRM for', 'CRM recommendations'],
      strongMatches: 34,
      partialMatches: 18,
      lastSync: '12 minutes ago',
      status: 'active',
    },
    {
      id: 2,
      name: 'SaaS Startups - Early Stage',
      keywords: ['building a saas', 'saas startup', 'need beta testers'],
      strongMatches: 19,
      partialMatches: 27,
      lastSync: '1 hour ago',
      status: 'active',
    },
  ]);
  const [showCreateModal, setShowCreateModal] = useState(false);

  const handleViewCampaign = (campaignId: number) => {
    router.push(`/campaigns/${campaignId}`);
  };

  return (
    <div className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <header className="bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-6 py-4 flex items-center justify-between">
          <button
            onClick={() => setShowCreateModal(true)}
            className="flex items-center gap-2 bg-primary hover:bg-primary/90 text-primary-foreground px-5 py-2.5 rounded-lg font-medium transition-colors"
          >
            <Plus className="w-4 h-4" />
            New Campaign
          </button>
        </div>
      </header>
      <div className="max-w-7xl mx-auto px-6 py-8">
        {/* Campaign Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {campaigns.map((campaign) => (
            <div
              key={campaign.id}
              onClick={() => handleViewCampaign(campaign.id)} // Add onClick to card
              className="group bg-card border rounded-xl p-6 hover:border-primary/50 transition-all duration-300 cursor-pointer" // Add cursor-pointer
            >
              {/* Campaign Header */}
              <div className="flex items-start justify-between mb-4">
                <div className="flex-1">
                  <div className="flex items-center gap-2 mb-1">
                    <div
                      className={`w-2 h-2 rounded-full ${
                        campaign.status === 'active' ? 'bg-primary' : 'bg-muted-foreground'
                      }`}
                    ></div>
                    <span className="text-xs font-medium text-muted-foreground uppercase tracking-wide">
                      {campaign.status}
                    </span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground  transition-colors">
                    {campaign.name}
                  </h3>
                </div>
              </div>
              {/* Keywords */}
              <div className="mb-4">
                <p className="text-xs text-muted-foreground mb-2 font-medium">KEYWORDS</p>
                <div className="flex flex-wrap gap-1.5">
                  {campaign.keywords.map((keyword, idx) => (
                    <span key={idx} className="px-2.5 py-1 text-xs rounded-md border  font-medium">
                      {keyword}
                    </span>
                  ))}
                </div>
              </div>
              {/* Footer */}
              <div className="flex items-center justify-between">
                <Button
                  variant="primary"
                  size="sm"
                  className="w-full text-xs font-medium rounded-md transition-colors"
                >
                  View Campaign
                  <ArrowRight className="w-3 h-3 ml-2" />
                </Button>
              </div>
            </div>
          ))}
          {/* Empty State Card */}
          <div
            className="border-2 border-dashed rounded-xl p-8 flex flex-col items-center justify-center text-center hover:border-primary/50 transition-colors cursor-pointer"
            onClick={() => setShowCreateModal(true)}
          >
            <div className="w-12 h-12 bg-muted rounded-full flex items-center justify-center mb-3">
              <Plus className="w-6 h-6 text-muted-foreground" />
            </div>
            <h3 className="text-sm font-medium text-foreground mb-1">Create New Campaign</h3>
            <p className="text-xs text-muted-foreground">Start monitoring Reddit for leads</p>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CampaignsPage;