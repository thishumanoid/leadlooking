'use client';

import React, { useEffect, useState } from 'react';
import { CampaignDialog } from '@/components/campaignDialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';
import { useRouter } from 'next/navigation';

export default function WelcomePage() {
  const [showCreateModal, setShowCreateModal] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Small delay to ensure smooth transition and hydration
    const timer = setTimeout(() => {
      setShowCreateModal(true);
    }, 500);

    return () => clearTimeout(timer);
  }, []);

  const handleCampaignSuccess = (campaign: any) => {
    // CampaignDialog already handles navigation, but we can have a fallback here if needed
    // or just close the modal.
    // Ideally, the dialog redirects to /campaigns/[id]
    setShowCreateModal(false);
  };

  return (
    <div className="flex-1 -mx-4 -mb-4 flex flex-col items-center justify-center bg-background relative overflow-hidden">
      {/* Background Gradients */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[100px]" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-500/10 rounded-full blur-[100px]" />
      </div>

      <MaxWidthWrapper className="relative z-10 mt-10 flex flex-col items-center text-center">
        <div className="mb-8 p-4 bg-primary/10 rounded-full">
          <Plus className="w-12 h-12 text-primary" />
        </div>

        <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-6">
          Welcome to LeadLooking
        </h1>

        <p className="text-xl text-muted-foreground max-w-2xl mb-12">
          You're one step away from finding quality leads on Reddit. Let's set up your first campaign!
        </p>

        <div className="flex flex-col sm:flex-row gap-4 items-center">
          <Button
            size="lg"
            onClick={() => setShowCreateModal(true)}
            className="text-lg px-8 py-6 rounded-full shadow-lg shadow-primary/20 hover:shadow-primary/40 transition-all duration-300 transform hover:-translate-y-1"
          >
            Create Your First Campaign
          </Button>

          <Button
            variant="ghost"
            onClick={() => router.push('/campaigns')}
            className="text-muted-foreground hover:text-foreground"
          >
            Skip for now
          </Button>
        </div>
      </MaxWidthWrapper>

      <CampaignDialog
        open={showCreateModal}
        onOpenChange={setShowCreateModal}
        onSuccess={handleCampaignSuccess}
      />
    </div>
  );
}
