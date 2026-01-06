import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';
import Hero from '@/components/hero';
import Steps from '@/components/steps';
import Features from '@/components/features';
import PricingCard from '@/components/pricingCards';
import FAQ from '@/components/faq';
import CTA from '@/components/CTA';

export default function LandingPage() {
  return (
    <MaxWidthWrapper>
      <Hero />
      <Steps />
      <Features />
      <PricingCard />
      <FAQ />
      <CTA />
    </MaxWidthWrapper>
  );
}
