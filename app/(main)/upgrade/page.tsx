'use client';

import PricingCards from '@/components/pricingCards';

export default function UpgradePage() {
  return (
    <div className="relative min-h-[calc(100vh-4rem)] -mx-4 -mb-4 w-[calc(100%+2rem)] overflow-hidden bg-background">
      {/* Premium Background Background Decor */}
      <div className="absolute inset-0 z-0 pointer-events-none overflow-hidden">
        <div
          className="absolute -top-[10%] -left-[10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-[120px] animate-pulse"
          style={{ animationDuration: '8s' }}
        />
        <div
          className="absolute -bottom-[10%] -right-[10%] w-[50%] h-[50%] bg-purple-500/5 rounded-full blur-[150px] animate-pulse"
          style={{ animationDuration: '12s' }}
        />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-blue-500/5 rounded-full blur-[180px]" />
      </div>

      <div className="relative z-10 -mt-5">
        <div className="w-full">
          <PricingCards />
        </div>

        <div className="w-full">
          <p className="text-sm mt-10 text-center text-muted-foreground bg-card/50 px-4 py-4 border-y border-border w-full">
            🔒 Secure payments handled by{' '}
            <span className="font-semibold text-foreground">Polar.sh</span>. Cancel anytime.
          </p>
        </div>
      </div>
    </div>
  );
}
