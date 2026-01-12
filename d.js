// train-and-eval.js
const fs = require('fs');
const { Classifier } = require('ml-classify-text');

const leads = [
  'looking for CRM software',
  'need a waitlist builder',
  'suggest me notion alternative',
  'anyone know a good project management tool?',
  'recommendations for a password manager?',
  'help me find a scheduling app',
  'searching for analytics dashboard',
  'does anyone have a good time tracking solution?',

  // Question formats
  'what do you use for task management?',
  'how do you handle customer support tickets?',
  'which tool should I use for invoicing?',
  'can someone recommend a good form builder?',
  'is there a better alternative to X?',
  'what are you guys using for collaboration?',
  'has anyone tried a good landing page builder?',

  // Problem statements
  'struggling to find a proper CRM',
  'tired of using spreadsheets for tracking',
  'current tool is too expensive',
  'frustrated with my current email tool',
  'my team needs something better than Slack',
  'the tool we use is missing features',
  'looking to switch from our current provider',

  // Comparative/evaluation queries
  'X vs Y - which one is better?',
  'considering between A and B',
  'evaluating different options for project management',
  'comparing several CRM solutions',
  'trying to decide on the right tool',
  'alternatives to Airtable that are cheaper',

  // Specific requirements
  'need something that integrates with Stripe',
  'looking for a tool with API access',
  'want a self-hosted solution for note-taking',
  'need a GDPR compliant analytics tool',
  'searching for a tool under $50/month',
  'require something with team collaboration features',
  'need offline support for my productivity app',

  // Casual/conversational asks
  'hey folks, what do you recommend for...?',
  'quick question - best tool for lead generation?',
  'anyone got suggestions for a booking system?',
  'thoughts on good screenshot tools?',
  'opinions on the best video editing software?',
  'what should I use for my freelance invoicing?',

  // Negative framing (complaints)
  'X sucks, what else can I use?',
  'hate my current CRM, need alternatives',
  'X is too complicated, simpler options?',
  'disappointed with Y, looking for better',

  // Request for experiences
  'what has worked for you guys?',
  'what are people using these days for...?',
  'has anyone solved this problem?',
  'how did you handle this issue?',

  // Urgent/time-sensitive
  'urgently need a solution for customer support',
  'need to find something ASAP for team chat',
  'looking for a quick fix for file sharing',
  'need recommendations before my trial ends',

  // Research/exploring phase
  'researching options for email automation',
  'exploring different tools for SEO',
  'checking out various analytics platforms',
  'investigating project management solutions',
  'doing research on bug tracking tools',

  // Specific use cases
  'need a tool for my SaaS startup',
  'looking for something for my agency',
  'what works for small teams?',
  'tool for solopreneurs?',
  'solution for enterprise needs?',
  'what do freelancers use for...?',

  // Feature-specific asks
  'need a tool with calendar integration',
  'looking for something with automation',
  'want a dashboard with custom reports',
  'need real-time collaboration features',
  'require mobile app support',

  // Budget-conscious
  'free alternatives to X?',
  'cheap options for project management?',
  'affordable CRM solutions?',
  'looking for a budget-friendly option',
  'need something under $20/month',
  'free tier that actually works?',

  // Migration scenarios
  'migrating from X, what should I use?',
  'moving away from Y, suggestions?',
  'switching from our old tool',
  'planning to leave X, alternatives?',

  /// chatgpt one
  'looking for a CRM for 3-person startup',
  'need a waitlist builder that integrates with Stripe',
  'suggest me a Notion alternative for software roadmaps',
  'anyone know an open-source appointment scheduler?',
  'how can I track subscriptions across multiple cards?',
  'need help finding a time-tracking app with offline mode',
  'is there a good notes app that supports tags + markdown?',
  'recommend an affordable analytics tool for indie devs',
  'want a tool to sync Google Calendar and Asana automatically',
  'searching for a Zapier alternative with cheaper pricing',
  'need a WordPress plugin to handle paid newsletters',
  'anyone used a multi-user password manager for teams?',
  'how to migrate data from Trello to ClickUp? looking for tools',
  'looking for devs to integrate an OAuth provider — paid gig',
  'freelancer needed for Rails bugfix, paid, DM rates',
  'I need templates for SaaS billing emails — suggestions?',
  'anyone built an automated refund system for Stripe?',
  "what's the best lightweight CRM for freelancers?",
  'looking for recommendations: invoice software that supports India',
  'want to build a chatbot — what open-source libraries to use?',
  'need help debugging a redis timeout in production',
  'searching for a subscriptions dashboard with churn analytics',
  'any suggestions for a free crash-reporting tool?',
  'is there a hosted solution to monitor webhooks? need one',
  'want a small email validator API — suggestions?',
  'need an npm package to parse cron expressions reliably',
  'anyone recommend a GDPR-compliant form service?',
  'how do you track affiliate conversions for small stores?',
  'need an onboarding flow builder that non-devs can use',
  'which OSS headless CMS works best for static sites?',
  'anyone used a low-cost push-notification service?',
  'looking for a good mock payment gateway for testing',
  "what's a simple way to schedule recurring invoices?",
  'need a hosted file uploader with virus scanning',
  "searching for an analytics SDK that doesn't log PII",
  'anyone know a tool to manage client approvals?',
  'looking for a calendar component for React + timezone support',
  'trying to find a lean helpdesk software — recommendations?',
  'I want to collect feature requests — what tools do people use?',
  'anyone with experience integrating Plaid for India?',
  'need a free PDF editor library for nodejs',
  'who offers SMS verification with low false positives?',
  'how can I auto-tag support tickets by intent?',
  'anyone used voice-to-text SDKs offline?',
  'I need a CLI tool to bulk-resize images on S3',
  'looking for a UX designer for one-off project, paid',
  'seeking beta users for a project management app (DM if interested)',
  'Anyone recommend a Shopify app for wholesale pricing?',
  'how to detect bots in comment sections? need robust suggestions',
  'which library handles high-frequency websocket reconnections well?',
  'need guidance on PCI-compliance for my SaaS',
  'any recs for onboarding analytics for new users?',
  'want a tool to A/B test onboarding flows',
  'looking for a community tool for private paid groups',
  'I need a free credit-card masking library for frontend',
  'anyone use a native iOS library for background location?',
  'searching for a scheduler that supports CRON + human-friendly times',
  'need a one-click social login with minimum setup',
  'anyone recommend a good captcha alternative?',
  'who has used a ticket routing AI for support teams?',
  'what SaaS handles recurring billing for marketplaces?',
  'need a tool to generate PDFs from HTML with custom fonts',
  'any recommendations for affordable cloud object storage?',
  'looking for an API that returns company industry from domain',
  'how do I build a waitlist with invite codes? looking for solutions',
  'anyone tried federated login across subdomains? tips?',
  'need recommendations for a dev-friendly CDN with instant purges',
];

const advertisements = [

    // Direct promotion
  'i built a CRM software',
  'launching a waitlist builder',
  'i am working on a notes app',
  'just released my new tool',
  'check out my SaaS product',
  'created a project management tool',
  'built this over the weekend',
  'my startup just launched',
  
  // Show and tell format
  'Show HN: my new analytics platform',
  'showing off my side project',
  'thought you guys might like this',
  'sharing my latest creation',
  
  // Launch announcements
  'we just launched our beta',
  'excited to announce our new product',
  'finally launching after 6 months',
  'our tool is now live',
  'just went live with our MVP',
  'officially launching today',
  
  // Feature announcements
  'just added a new feature to our tool',
  'new version includes...',
  'rolled out dark mode for our app',
  'shipped a major update',
  
  // Feedback requests (promotional)
  'built this tool, what do you think?',
  'would love feedback on my product',
  'made this app, thoughts?',
  'check out my tool and let me know',
  'testing my new SaaS, feedback welcome',
  'roast my landing page',
  
  // Journey/story posts
  'how I built my SaaS in 3 months',
  'journey of building my startup',
  'lessons learned from launching my product',
  'from idea to launch in 30 days',
  '1 year building my side project',
  
  // Milestone celebrations
  'just hit 100 users!',
  'reached $1k MRR today',
  'celebrating our first paying customer',
  '1000 signups in first week',
  'we got our first enterprise client',
  
  // Self-promotion with context
  'I built X because I was frustrated with Y',
  'made this tool to solve my own problem',
  'created this after struggling with existing tools',
  'built something better than X',
  
  // Comparisons (self-serving)
  'our tool vs competitor X',
  'why we built an alternative to Y',
  'what makes our product unique',
  
  // Team/company announcements
  'our company just released...',
  'our team has been working on...',
  'proud to announce...',
  
  // Open source promotion
  'just open sourced my project',
  'made this open source tool',
  'sharing my GitHub project',
  'released this on GitHub',
  
  // Beta/early access
  'offering early access to our tool',
  'join our beta program',
  'looking for beta testers for our app',
  'limited spots for early adopters',
  'get early access here',
  
  // Discount/deal announcements
  'launching with 50% off',
  'lifetime deal available now',
  'special pricing for early users',
  'Black Friday sale on our tool',
  
  // Technical/development posts
  'built this with React and Node',
  'tech stack behind our product',
  'how we scaled to 10k users',
  'architecture of our system',
  'open sourcing our component library',
  
  // Problem-solution framing (promotional)
  'solved the X problem with my tool',
  'built a solution for Y issue',
  'created this to address Z pain point',
  'made a tool that fixes...',
  
  // Partnership/integration announcements
  'we now integrate with Stripe',
  'partnered with X to bring you...',
  'integration with Y is now live',
  
  // Content marketing
  'wrote a guide on using our tool',
  'tutorial on how our product works',
  'case study of how X uses our tool',
  'blog post about our new features',
  
  // Humble brags
  'overwhelmed by the response to our launch',
  'blown away by the support',
  
  // Call-to-action heavy
  'try our tool for free',
  'sign up for our waitlist',
  'join us at [website]',
  'download from our site',
  'get started today at...',
  
  // Update announcements
  'v2.0 is now available',
  'major update just dropped',
  'new release with improved features',
  'updated UI and performance',
  
  // Pivot/rebranding
  'pivoting our product to focus on...',
  'new direction for our startup',
  
  // Acquisition/funding
  'we just raised our seed round',
  'acquired by X company',
  'secured funding to build...',

    /// chatgpt one
  'I built a CRM software for small teams — check it out!',
  'Launching a waitlist builder today, free trial available',
  'I made a notes app, link in bio',
  'We just released a new analytics tool for startups',
  'My startup offers subscription tracking for Shopify stores',
  'Working on a paid SaaS: dropshipping analytics — feedback wanted',
  'Built an email tool — DM for beta access',
  'I run a dev shop, hiring React devs — apply here',
  'Our company launched a new project management app',
  'Check out my open-source library on Github: github.com/our/repo',
  'Founder here — we’re hiring customer success managers',
  'Promo: use code REDDIT20 for 20% off our product',
  'We’ve open-sourced our SDK — contributions welcome',
  'Started a newsletter about product growth — subscribe!',
  'I made a simple PDF editor web app — hosted link in profile',
  'Product update: added Stripe integration to our app',
  'We offer free migration from Asana to our tool for a limited time',
  "I wrote an article: 'How we built our billing system' — read it!",
  'We launched v2 of our API today, with better performance',
  'I provide freelance dev services — DM rates and portfolio',
  'Created a CLI tool to resize images — star on GitHub',
  'Check my demo of the scheduler I built — feedback appreciated',
  'Looking for beta testers for my SaaS (not for hire)',
  'We released a plugin that automatically syncs tasks',
  'I wrote a checklist tool for product teams — free tier',
  'Our team built a plugin for WordPress — download now',
  'Join our paid community of makers, limited seats',
  'We provide consulting on onboarding — book a call',
  'I’m promoting my new course on building SaaS apps',
  'Demo day: my startup pitches at 3pm — come watch',
  'We integrated with Shopify — merchants sign up here',
  'Working on a product, preorders open today',
  'I launched my app on Product Hunt — would appreciate upvotes',
  'We built a payment retry service — enterprise pricing',
  'Offering 1-month free trial for early users',
  'Our product reduces churn by 20% — case study inside',
  'I made a small script for converting CSVs to JSON — enjoy',
  'We just closed a funding round — press release',
  'I built an app and I’m hiring early users',
  'Free migration to our platform this month only',
  'My SaaS handles refunds automatically — contact sales',
  'We provide 24/7 support for enterprise customers',
  'Looking to partner with bloggers — outreach message',
  'Our plugin supports WooCommerce — download link',
  'I released a new NPM package — v1.0.0',
  'Trying to get feedback on my product — link below',
  'I’m the founder — AMA about building X',
  'Launch special: first 100 users get free onboarding',
  'We provide managed hosting for your app',
  'Sign up for our alpha — invite only',
  'We just added SSO to our product',
  'Promotional post: reduced pricing for educators',
  'I made an automation — hire me to integrate it for you',
  'Our team is offering a one-time migration discount',
  'Selling an Instagram growth service — DM for prices',
  'We launched a mobile app — App Store link',
  'My company provides white-label solutions',
  'Product announcement: new feature for team admins',
  'We offer a referral payout for every signup',
  'I built an affiliate plugin — try it on your store',
];

function preprocess(text) {
  if (!text) return '';
  let t = text.toLowerCase();
  // remove URLs but keep a token so model can learn presence of urls
  t = t.replace(/https?:\/\/\S+|\bwww\.\S+/g, ' __URL__ ');
  // replace email/phone
  t = t.replace(/\b[\w.+-]+@[\w-]+\.[\w.-]+\b/g, ' __EMAIL__ ');
  t = t.replace(/\+?\d[\d\s\-\(\)]{6,}\d/g, ' __PHONE__ ');
  // normalize whitespace
  t = t.replace(/\s+/g, ' ').trim();
  return t;
}

const classifier = new Classifier();

// train
classifier.train(leads.map(preprocess), 'lead');
classifier.train(advertisements.map(preprocess), 'advertisements');

// prediction helper that applies heuristics
function predictPost(text) {
  const pt = preprocess(text);
  const predictions = classifier.predict(pt);

  return predictions;
}

// usage
const sample = `
i built a tool to manage my leads
`;
const out = predictPost(sample);
console.log('Prediction:', out);
