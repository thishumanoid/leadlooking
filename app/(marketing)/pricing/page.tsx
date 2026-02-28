'use client'
import type { Metadata } from 'next';
import AnimationContainer from '@/components/global/animation-container';
import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';
import PricingCards from '@/components/pricingCards';
import { useRouter } from 'next/navigation'
import { useEffect } from 'react';


const PricingPage = () => {
  const router = useRouter();

  useEffect(() => {
    router.push('https://tagfast.web.app/pricing');
  }, []);

  return (
    <MaxWidthWrapper className="mb-40">
      <AnimationContainer delay={0.2}>
        <PricingCards />
      </AnimationContainer>
    </MaxWidthWrapper>
  );
};

export default PricingPage;
