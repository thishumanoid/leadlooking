'use client';

import { BadgeCheck } from 'lucide-react';
import GuideAfterPayment from './guideSteps';
import { Separator } from '@/components/ui/separator';
import { useSearchParams } from 'next/navigation';
import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';

import { Suspense } from 'react';

const GetURLParams = () => {
  const urlParams = useSearchParams();
  const checkoutId = urlParams.get('checkout_id') || null;

  return <div>{checkoutId}</div>;
};

export default function CheckoutSuccess() {
  const currentDate = new Date().toLocaleString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });

  return (
    <>
      <MaxWidthWrapper className="mt-15">
        <div className="flex flex-col">
          <main className="flex flex-col items-center justify-center flex-grow text-center p-4 md:p-6">
            <BadgeCheck strokeWidth={1.5} className="h-14 w-14 text-primary" />
            <h1 className="mt-4 text-2xl font-semibold">Checkout Successful</h1>
            <p className="mt-2 text-muted-foreground">Thank you for your purchase!</p>
            <div className="mt-6 border border-border rounded-lg p-4 w-full max-w-md">
              <div className="flex justify-between text-sm mt-2">
                <span>Date & Time:</span>
                <span className="font-medium">{currentDate}</span>
              </div>

              <div className="flex justify-between text-sm mt-2">
                <span>Checkout ID:</span>
                <span className="font-medium">
                  <Suspense fallback={<div>Loading...</div>}>
                    <GetURLParams />
                  </Suspense>
                </span>
              </div>
            </div>
          </main>
        </div>
        <br />
        <Separator />
        <br />
        <GuideAfterPayment />
      </MaxWidthWrapper>
    </>
  );
}
