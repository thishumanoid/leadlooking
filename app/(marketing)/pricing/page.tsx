"use client"


import AnimationContainer from '@/components/global/animation-container';
import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';
import PricingCards from '@/components/pricingCards';

const PricingPage = () => {
  return (
    <MaxWidthWrapper className="mb-40">
      <AnimationContainer delay={0.2}>
        <PricingCards />
      </AnimationContainer>
    </MaxWidthWrapper>
  );
};

export default PricingPage;
