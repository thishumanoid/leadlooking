import AnimationContainer from '@/components/global/animation-container';
import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';
import Link from 'next/link';
import config from '@/config';

const TermsPage = () => {
  return (
    <MaxWidthWrapper className="max-w-3xl mx-auto px-8 mb-40">
      <AnimationContainer delay={0.1} className="w-full">
        <h1 className="text-4xl md:text-6xl font-heading font-bold my-12 text-center w-full">
          Terms and Conditions
        </h1>
        <p className="text-sm mb-2 italic mt-20">Last updated: January 6, 2026</p>
        <p className="mt-4">
          Welcome to {config.appName}. These Terms and Conditions govern your use of our website and
          lead extraction services. By accessing or using our platform, you agree to be bound by
          these terms.
        </p>

        <h2 className="text-xl font-medium mt-12">1. Acceptance of Terms</h2>
        <p className="mt-4 text-muted-foreground">
          By creating an account or using {config.appName}, you agree to these Terms and Conditions
          and our Privacy Policy. If you do not agree, please do not use our services.
        </p>

        <h2 className="text-xl font-medium mt-12">2. Service Description</h2>
        <p className="mt-4 text-muted-foreground">
          {config.appName} provides a tool that scans Reddit for specific keywords and notifies
          users of matching posts. Users can create campaigns by providing product details and
          keywords to track.
        </p>

        <h2 className="text-xl font-medium mt-12">3. User Responsibilities</h2>
        <div className="mt-4">
          As a user of {config.appName}, you agree to:
          <ul className="list-disc ml-8 text-muted-foreground mt-2">
            <li>Provide accurate information when creating campaigns.</li>
            <li>Use the tool in compliance with Reddit's User Agreement and API terms.</li>
            <li>Not use the tool for spamming, harassment, or any illegal activities.</li>
            <li>Be responsible for any comments or direct messages you send on Reddit.</li>
          </ul>
        </div>

        <h2 className="text-xl font-medium mt-12">4. Subscriptions and Payments</h2>
        <div className="mt-4">
          <ul className="list-disc ml-8 text-muted-foreground">
            <li>Subscribed users get access to automated keyword scanning and notifications.</li>
            <li>Payments are processed securely via Polar.sh.</li>
            <li>Subscriptions automatically renew unless canceled before the renewal date.</li>
            <li>
              Refunds are handled on a case-by-case basis in accordance with our refund policy.
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-medium mt-12">5. Intellectual Property</h2>
        <p className="mt-4 text-muted-foreground">
          {config.appName} and its original content, features, and functionality are owned by us.
          You retain ownership of the campaign data and product details you provide.
        </p>

        <h2 className="text-xl font-medium mt-12">6. Privacy</h2>
        <p className="mt-4 text-muted-foreground">
          Your use of {config.appName} is also governed by our{' '}
          <Link href="/privacy" className="underline">
            Privacy Policy
          </Link>
          , which explains how we handle your data.
        </p>

        <h2 className="text-xl font-medium mt-12">7. Termination</h2>
        <p className="mt-4 text-muted-foreground">
          We reserve the right to suspend or terminate your account at our sole discretion, without
          notice, for conduct that we believe violates these Terms or is harmful to other users or
          our business interests.
        </p>

        <h2 className="text-xl font-medium mt-12">8. Disclaimers and Limitation of Liability</h2>

        <h3 className="text-lg mt-8">No Warranties</h3>
        <p className="mt-2 text-muted-foreground">
          Our services are provided "as is" and "as available" without any warranties of any kind,
          either express or implied, including but not limited to the accuracy or reliability of the
          leads found.
        </p>

        <h3 className="text-lg mt-8">Limitation of Liability</h3>
        <p className="mt-2 text-muted-foreground">
          In no event shall {config.appName} be liable for any indirect, incidental, special, or
          consequential damages resulting from your use or inability to use the service.
        </p>

        <h2 className="text-xl font-medium mt-12">9. Governing Law</h2>
        <p className="mt-4 text-muted-foreground">
          These Terms shall be governed by and construed in accordance with the laws of the
          jurisdiction in which the company operates, without regard to its conflict of law
          provisions.
        </p>

        <h2 className="text-xl font-medium mt-12">10. Contact Us</h2>
        <p className="mt-4 text-muted-foreground">
          If you have any questions about these Terms, please contact us at:
        </p>
        <p className="mt-2 font-medium">Email: {config.contactEmail}</p>

        <p className="mt-12 font-medium">
          By using {config.appName}, you acknowledge that you have read and agree to these Terms and
          Conditions.
        </p>
      </AnimationContainer>
    </MaxWidthWrapper>
  );
};

export default TermsPage;
