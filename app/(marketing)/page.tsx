import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';
import Hero from '@/components/hero';
import Steps from '@/components/steps';
import Features from '@/components/features';
import PricingCard from '@/components/pricingCards';
import PricingCards2 from '@/components/pricingCards2';
import FAQ from '@/components/faq';
import CTA from '@/components/CTA';
import { Testimonials } from '@/components/testimonials';

export default function LandingPage() {
  return (
    <MaxWidthWrapper>
      <Hero />
      <Steps />
      <Features />
      <PricingCard />
      <Testimonials />
      <FAQ />
      <CTA />
    </MaxWidthWrapper>
  );
}
