import AnimationContainer from '@/components/global/animation-container';
import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';
import React from 'react';
import config from '@/config';
import Link from 'next/link';

const RefundPolicy = () => {
  return (
    <MaxWidthWrapper className="max-w-3xl mx-auto px-8 mb-40">
      <AnimationContainer delay={0.1} className="w-full">
        <h1 className="text-4xl md:text-6xl font-heading font-bold my-12 text-center w-full">
          Refund Policy
        </h1>
        <p className="text-sm mb-2 italic mt-20">Last updated: January 7, 2026</p>
        <p className="mt-4">
          At {config.appName}, we want you to be completely satisfied with our Reddit lead
          extraction tool. This Refund Policy outlines our trial period and refund terms for our
          Premium Plan.
        </p>

        <h2 className="text-xl font-medium mt-12">1. 7-Day Free Trial</h2>
        <p className="mt-4 text-muted-foreground">
          We offer a <strong>7-day free trial</strong> for new users to explore the full
          capabilities of {config.appName}. During this period, you can access premium features
          without any charge.
        </p>

        <h2 className="text-xl font-medium mt-12">2. 14-Day Money-Back Guarantee</h2>
        <p className="mt-4 text-muted-foreground">
          If you subscribe to the {config.appName} Premium Plan, you are eligible for a{' '}
          <strong>full refund within 14 days</strong> of your initial subscription payment.
        </p>

        <h2 className="text-xl font-medium mt-12">3. How to Request a Refund</h2>
        <p className="mt-4 text-muted-foreground">
          To request a refund, contact us through:
        </p>
        <ul className="list-disc ml-8 text-muted-foreground mt-4">
          <li className="mt-2">
            <strong>Feedback Page:</strong> Visit our{' '}
            <Link href="/feedback" className="text-primary hover:underline">
              feedback page
            </Link>
          </li>
          <li className="mt-2">
            <strong>Direct Email:</strong>{' '}
            <a href={`mailto:${config.contactEmail}`} className="text-primary hover:underline">
              {config.contactEmail}
            </a>
          </li>
        </ul>
        <p className="mt-4 text-muted-foreground">
          Please include your account email address.
        </p>

        <h2 className="text-xl font-medium mt-12">4. Refund Processing</h2>
        <p className="mt-4 text-muted-foreground">
          Approved refunds will be processed to your original payment method within 5-10 business
          days.
        </p>

        <h2 className="text-xl font-medium mt-12">5. Subscription Cancellation</h2>
        <p className="mt-4 text-muted-foreground">
          You can cancel your subscription at any time through your account settings. You'll retain
          access to premium features until the end of your current billing period.
        </p>

        <h2 className="text-xl font-medium mt-12">6. Contact Us</h2>
        <p className="mt-4 font-medium italic">
          Email:{' '}
          <a href={`mailto:${config.contactEmail}`} className="text-primary hover:underline">
            {config.contactEmail}
          </a>
        </p>
      </AnimationContainer>
    </MaxWidthWrapper>
  );
};

export default RefundPolicy;