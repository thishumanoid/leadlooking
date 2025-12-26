import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';
import Hero from '@/components/hero';
import Hero2 from '@/components/hero2';
import Features from '@/components/features';
import Features2 from '@/components/features2';
import PricingCard from '@/components/pricingCards';
import PricingCards2 from '@/components/pricingCards2';
import FAQ from '@/components/faq';
import CTA from '@/components/CTA';
import { Testimonials } from '@/components/testimonials';

export default function LandingPage() {
  return (
    <MaxWidthWrapper>
      <Hero />
      {/* <Hero2 /> */}
      <Features />
      {/* <Features2 /> */}
      <PricingCard />
      <Testimonials />
      <FAQ />
      <CTA />
    </MaxWidthWrapper>
  );
}
