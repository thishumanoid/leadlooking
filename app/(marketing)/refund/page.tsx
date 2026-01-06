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
        <p className="text-sm mb-2 italic mt-20">Last updated: January 6, 2026</p>
        <p className="mt-4">
          At {config.appName}, we want you to be completely satisfied with our Reddit lead
          extraction tool. This Refund Policy outlines our trial period and the conditions under
          which you can request a refund for our Premium Plan.
        </p>

        <h2 className="text-xl font-medium mt-12">1. 7-Day Free Trial</h2>
        <p className="mt-4 text-muted-foreground">
          We offer a <strong>7-day free trial</strong> for new users to explore the full
          capabilities of {config.appName}. During this period, you can access premium features
          without any charge. This trial is intended to help you determine if our tool meets your
          business needs before committing to a paid subscription.
        </p>

        <h2 className="text-xl font-medium mt-12">2. 7-Day Refund Policy</h2>
        <p className="mt-4 text-muted-foreground">
          If you subscribe to the {config.appName} Premium Plan and find that it does not meet your
          expectations, you are eligible for a <strong>full refund within 7 days</strong> of your
          initial subscription payment.
        </p>
        <p className="mt-4 text-muted-foreground">
          To be eligible for a refund, you must contact us within the first 7 days of your
          subscription. Refund requests made after this 7-day period will not be eligible for a
          refund, but you can cancel your subscription at any time to prevent future charges.
        </p>

        <h2 className="text-xl font-medium mt-12">3. How to Request a Refund</h2>
        <p className="mt-4 text-muted-foreground">
          Requesting a refund is simple. You can reach out to us through either of the following
          methods:
        </p>
        <ul className="list-disc ml-8 text-muted-foreground mt-4">
          <li className="mt-2">
            <strong>Feedback Page:</strong> Visit our{' '}
            <Link href="/feedback" className="text-primary hover:underline">
              feedback page
            </Link>{' '}
            and submit a refund request.
          </li>
          <li className="mt-2">
            <strong>Direct Email:</strong> Email us directly at{' '}
            <a href={`mailto:${config.contactEmail}`} className="text-primary hover:underline">
              {config.contactEmail}
            </a>
            .
          </li>
        </ul>
        <p className="mt-4 text-muted-foreground">
          Please include your account email and the reason for your refund request to help us
          process it as quickly as possible.
        </p>

        <h2 className="text-xl font-medium mt-12">4. Refund Processing</h2>
        <p className="mt-4 text-muted-foreground">
          Once your refund request is received and approved, we will process the refund to your
          original method of payment. Please note that it may take some time for your bank or credit
          card company to process and post the refund.
        </p>

        <h2 className="text-xl font-medium mt-12">5. Subscription Cancellation</h2>
        <p className="mt-4 text-muted-foreground">
          You can cancel your subscription at any time through your account settings. Cancellation
          will stop future billing cycles, and you will retain access to premium features until the
          end of your current billing period (unless a refund has been processed).
        </p>

        <h2 className="text-xl font-medium mt-12">6. Contact Us</h2>
        <p className="mt-4 text-muted-foreground">
          If you have any questions about our Refund Policy or need assistance, please do not
          hesitate to contact us:
        </p>
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
