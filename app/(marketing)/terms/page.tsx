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

        <h2 className="text-xl font-medium mt-12">1. Introductory Provisions and Basic Terms</h2>
        <p className="mt-4 text-muted-foreground">
          These Terms of Service ("Terms") govern your use of the {config.appName} platform (the
          "Service") LeadLooking.
        </p>
        <p className="mt-4 text-muted-foreground">
          {config.appName} is a SaaS platform that helps users discover high-intent leads from
          online discussions. By using the Service, you agree to these Terms.
        </p>

        <h2 className="text-xl font-medium mt-12">2. Account Registration and Access</h2>
        <ul className="list-disc ml-8 text-muted-foreground mt-4 space-y-2">
          <li>To use {config.appName}, users must create a personal account.</li>
          <li>
            Users are responsible for maintaining the confidentiality of their login credentials.
          </li>
          <li>
            Accounts are non-transferable and intended for individual or organizational use only.
          </li>
        </ul>

        <h2 className="text-xl font-medium mt-12">3. Service Description</h2>
        <p className="mt-4 text-muted-foreground">
          {config.appName} tracks public discussions on platforms like Reddit. Based on
          AI-powered keyword matching and relevance scoring, it surfaces posts likely to contain
          potential leads relevant to the user’s campaigns.
        </p>
        <ul className="list-disc ml-8 text-muted-foreground mt-4 space-y-2">
          <li>Users can create campaigns by defining a product description and target audience.</li>
          <li>Users can manually enter keywords.</li>
          <li>
            AI scans communities daily and provides a ranked list of relevant posts in a dashboard.
          </li>
          <li>
            Currently supported platforms are: Reddit and X; more platforms may be added in the
            future.
          </li>
        </ul>

        <h2 className="text-xl font-medium mt-12">4. Free Trial</h2>
        <ul className="list-disc ml-8 text-muted-foreground mt-4 space-y-2">
          <li>New subscribers are eligible for a 7-day free trial.</li>
          <li>
            You may be asked to provide a valid payment method to start the trial. You will not be
            charged during the trial.
          </li>
          <li>
            You can cancel at any time during the 7-day trial from your account settings and you
            will not be charged.
          </li>
          <li>
            Unless you cancel before the trial ends, your subscription will automatically convert to
            a paid plan and the first monthly fee will be charged at the end of the trial.
          </li>
          <li>
            Trials are intended for evaluation and may be limited to one per customer or account.
          </li>
        </ul>

        <h2 className="text-xl font-medium mt-12">5. Subscription Plans and Payment Terms</h2>
        <ul className="list-disc ml-8 text-muted-foreground mt-4 space-y-2">
          <li>
            <strong>Premium:</strong> $14/month – Includes automated scanning, AI filtering, and
            advanced features.
          </li>
          <li>Custom plans are available upon request for users needing higher limits.</li>
          <li>
            All subscriptions are billed monthly in USD. Payments are handled via secure third-party
            processors.
          </li>
          <li>
            Post-trial billing: If you do not cancel during the free trial, the first monthly fee
            will be charged automatically on the day the trial ends, and renew monthly until
            cancelled.
          </li>
          <li>
            Subscription fees are non-refundable, unless otherwise required by applicable consumer
            protection law or our{' '}
            <Link href="/refund" className="text-primary hover:underline">
              Refund Policy
            </Link>
            .
          </li>
          <li>
            {config.appName} reserves the right to adjust pricing, plan features, or billing
            structure. Users will be notified in advance of any material changes.
          </li>
        </ul>

        <h2 className="text-xl font-medium mt-12">6. User Obligations</h2>
        <ul className="list-disc ml-8 text-muted-foreground mt-4 space-y-2">
          <li>Users agree to use the Service only for lawful and intended business purposes.</li>
          <li>Users must not resell or redistribute access to the platform or lead data.</li>
          <li>
            Users may not use bots, scrapers, or automated methods to extract data from the
            platform.
          </li>
          <li>Violation of these obligations may result in suspension or termination of access.</li>
        </ul>

        <h2 className="text-xl font-medium mt-12">7. Suspension and Termination</h2>
        <p className="mt-4 text-muted-foreground">
          We reserve the right to suspend or terminate access to the Service at our discretion if a
          user violates these Terms, exceeds fair use limits, engages in fraudulent or abusive
          behavior, or disrupts the functionality or integrity of the platform.
        </p>

        <h2 className="text-xl font-medium mt-12">8. Fair Use and Abuse Prevention</h2>
        <p className="mt-4 text-muted-foreground">
          To maintain platform integrity and prevent misuse, {config.appName} enforces fair use
          limits across all plans.
        </p>
        <ul className="list-disc ml-8 text-muted-foreground mt-4 space-y-2">
          <li>Maximum of 1 campaign per day for the Premium plan.</li>
          <li>Maximum of 5 keyword generation requests per day.</li>
          <li>Free plan users inactive for more than 30 days may have syncs paused until login.</li>
        </ul>

        <h2 className="text-xl font-medium mt-12">9. Data and Privacy</h2>
        <p className="mt-4 text-muted-foreground">
          {config.appName} only collects and displays publicly available discussion data. No private
          user data from third-party platforms is accessed or stored. All user-provided data is
          handled in accordance with our{' '}
          <Link href="/privacy" className="text-primary hover:underline">
            Privacy Policy
          </Link>
          .
        </p>

        <h2 className="text-xl font-medium mt-12">10. Lead Data Retention</h2>
        <p className="mt-4 text-muted-foreground">
          {config.appName} retains discovered leads in your account for 60 days. After 60 days, lead
          records may be permanently deleted. You are responsible for exporting any data you wish to
          retain.
        </p>

        <h2 className="text-xl font-medium mt-12">11. Service Availability and Limitations</h2>
        <p className="mt-4 text-muted-foreground">
          The Provider aims to ensure uninterrupted access to the Service but makes no guarantees
          regarding uptime or data accuracy.
        </p>

        <h2 className="text-xl font-medium mt-12">12. AI Limitations and Accuracy Disclaimer</h2>
        <p className="mt-4 text-muted-foreground">
          While the AI system is designed to surface high-intent posts, it may occasionally return
          false positives or miss leads. Users are encouraged to refine their campaigns for better
          results.
        </p>

        <h2 className="text-xl font-medium mt-12">13. Third-Party Services Disclaimer</h2>
        <p className="mt-4 text-muted-foreground">
          {config.appName} interacts with third-party services and APIs (Reddit, Gemini, Groq, etc.). We
          do not control their availability. Changes or outages on these platforms may affect our
          features.
        </p>

        <h2 className="text-xl font-medium mt-12">14. Right of Withdrawal</h2>
        <p className="mt-4 text-muted-foreground">
          Users may cancel their subscription at any time from their account settings. Trial
          cancellations made before the 7-day period ends will not be charged.
        </p>

        <h2 className="text-xl font-medium mt-12">15. Limitation of Liability</h2>
        <p className="mt-4 text-muted-foreground">
          The Provider is not liable for actions taken by users based on leads surfaced by the
          Service. The Service is provided "as is" without warranties of any kind. Users are
          responsible for ensuring their outreach complies with platform rules.
        </p>

        <h2 className="text-xl font-medium mt-12">16. Governing Law</h2>
        <p className="mt-4 text-muted-foreground">
          These Terms shall be governed by and construed in accordance with the laws of India. Any
          disputes arising shall be subject to the jurisdiction of the courts in Delhi, India.
        </p>

        <h2 className="text-xl font-medium mt-12">17. Contact Us</h2>
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
