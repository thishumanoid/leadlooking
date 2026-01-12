
import type { Metadata } from 'next';
import AnimationContainer from '@/components/global/animation-container';
import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';
import PricingCards from '@/components/pricingCards';

export const metadata: Metadata = {
  alternates: {
    canonical: 'https://www.leadlooking.com/',
  }
};

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
