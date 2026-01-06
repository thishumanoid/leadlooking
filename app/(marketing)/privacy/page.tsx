import AnimationContainer from '@/components/global/animation-container';
import MaxWidthWrapper from '@/components/global/MaxWidthWrapper';
import React from 'react';
import config from '@/config';

const Privacy = () => {
  return (
    <MaxWidthWrapper className="max-w-3xl mx-auto px-8 mb-40">
      <AnimationContainer delay={0.1} className="w-full">
        <h1 className="text-4xl md:text-6xl font-heading font-bold my-12 text-center w-full">
          Privacy Policy
        </h1>
        <p className="text-sm mb-2 italic mt-20">Last updated: January 6, 2026</p>
        <p className="mt-4">
          At {config.appName}, we are committed to protecting your privacy. This Privacy Policy
          explains how we collect, use, and safeguard your information when you use our lead
          extraction tool.
        </p>

        <h2 className="text-xl font-medium mt-8">1. Information We Collect</h2>

        <h3 className="text-lg mt-4">Personal Information</h3>
        <p className="mt-2 text-muted-foreground">
          We collect personal information that you provide to us, such as your name and email
          address when you create an account through Clerk. We also collect payment information
          through our payment processor, Polar.sh.
        </p>

        <h3 className="text-lg font-medium mt-8">Campaign Data</h3>
        <p className="mt-2 text-muted-foreground">
          When you create a campaign, we collect details about your product, including its URL,
          description, and the keywords you wish to track on Reddit.
        </p>

        <h3 className="text-lg font-medium mt-8">Reddit Data</h3>
        <p className="mt-2 text-muted-foreground">
          Our scanner monitors public Reddit posts to find matches for your specified keywords. We
          process this public data to provide you with relevant leads. We do not store Reddit user
          data beyond what is necessary to display the lead to you.
        </p>

        <h2 className="text-xl font-medium mt-12">2. How We Use Your Information</h2>

        <div className="mt-4">
          We use the information we collect to:
          <ul className="list-disc ml-8 text-muted-foreground mt-2">
            <li>Provide and maintain our Reddit lead extraction service.</li>
            <li>Notify you via email when matching Reddit posts are found.</li>
            <li>Process your payments and manage your subscription.</li>
            <li>Improve our keyword matching algorithms and user experience.</li>
            <li>Communicate with you regarding updates, security alerts, and support.</li>
          </ul>
        </div>

        <h2 className="text-xl font-medium mt-12">3. How We Share Your Information</h2>

        <h3 className="text-lg mt-4">Service Providers</h3>
        <div className="mt-2 text-muted-foreground">
          We may share your information with third-party service providers who perform services on
          our behalf, such as:
          <ul className="list-disc ml-8 mt-2">
            <li>
              <strong>Auth:</strong> Clerk for user authentication.
            </li>
            <li>
              <strong>Database:</strong> Supabase for data storage.
            </li>
            <li>
              <strong>Payments:</strong> Polar.sh for secure payment processing.
            </li>
            <li>
              <strong>Automation:</strong> Trigger.dev for background scanning tasks.
            </li>
          </ul>
        </div>

        <h2 className="text-xl font-medium mt-12">4. Data Security</h2>
        <p className="mt-4 text-muted-foreground">
          We implement industry-standard security measures to protect your personal information from
          unauthorized access, disclosure, or destruction. However, no method of transmission over
          the internet is 100% secure.
        </p>

        <h2 className="text-xl font-medium mt-12">5. Your Rights and Choices</h2>

        <h3 className="text-lg mt-4">Access and Deletion</h3>
        <p className="mt-2 text-muted-foreground">
          You can access, update, or delete your campaign data at any time through the dashboard. If
          you wish to delete your account and all associated data, please contact us at{' '}
          {config.contactEmail}.
        </p>

        <h3 className="text-lg mt-4">Email Notifications</h3>
        <p className="mt-2 text-muted-foreground">
          You can manage your notification preferences within your account settings or by following
          the unsubscribe instructions in our emails.
        </p>

        <h2 className="text-xl font-medium mt-12">6. Cookies and Tracking</h2>
        <p className="mt-4 text-muted-foreground">
          We use cookies to maintain your session and improve your experience. You can control
          cookie settings through your browser, but disabling them may limit your use of certain
          features.
        </p>

        <h2 className="text-xl font-medium mt-12">7. Changes to This Policy</h2>
        <p className="mt-4 text-muted-foreground">
          We may update this Privacy Policy from time to time. We will notify you of any changes by
          posting the new policy on this page and updating the "Last updated" date.
        </p>

        <h2 className="text-xl font-medium mt-12">8. Contact Us</h2>
        <p className="mt-4 text-muted-foreground">
          If you have any questions about this Privacy Policy, please contact us at:
        </p>
        <p className="mt-2 font-medium">Email: {config.contactEmail}</p>
      </AnimationContainer>
    </MaxWidthWrapper>
  );
};

export default Privacy;
