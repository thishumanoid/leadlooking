'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Zap, UserStar, Handshake, CodeXml, Feather, Palette } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import RedditIcon from './global/RedditIcon';
import { cn } from '@/lib/utils';

const caseStudies = [
  {
    id: 'saas-founders',
    label: 'SaaS Founders',
    icon: Zap,
    quote:
      '"XYZ - A platform that helps founders build and manage waitlists in seconds."',
    leads: [
      {
        source: 'r/saas',
        user: 'u/launchpad_dev',
        platform: 'reddit',
        time: 'Oct 8, 2025, 05:09 PM',
        title: 'Looking for a no-code waitlist builder?',
        content:
          "I'm 2 months away from launching my B2B SaaS. What's the best no-code waitlist buidler to collect emails and build a waitlist now?",
        score: 10,
        url: '#',
      },
      {
        source: 'r/Entrepreneur',
        user: 'u/growth_mindset',
        platform: 'reddit',
        time: 'Oct 8, 2025, 02:56 PM',
        title: 'need a tool to create waitlist quickly',
        content:
          'Wanting to launch a pre-sign up page where users get moved up the line if they invite friends. Any recommendations?',
        score: 10,
        url: '#',
      },
      {
        source: 'r/startups',
        user: 'u/solo_builder',
        platform: 'reddit',
        time: 'Oct 8, 2025, 10:41 AM',
        title: 'Waitlist page vs. Landing page for validation?',
        content:
          "Should I just build a full landing page or a simple 'coming soon' waitlist to validate my idea first before building?",
        score: 9,
        url: '#',
      },
      {
        source: 'r/IndieHackers',
        user: 'u/bootstrapper_jon',
        platform: 'reddit',
        time: 'Oct 8, 2025, 09:12 AM',
        title: 'Need a viral waitlist script for my Next.js app',
        content:
          "I'm looking for a tool or script that handles referral rankings for a waitlist. Any SaaS that does this easily?",
        score: 10,
        url: '#',
      }
    ],
  },
  {
    id: 'agencies',
    label: 'Agencies',
    icon: Handshake,
    quote: '"ABC - We provide high-impact SEO and content strategy for fast-growing B2B tech companies."',
    leads: [
      {
        source: 'r/marketing',
        user: 'u/tech_marketer',
        platform: 'reddit',
        time: 'Oct 9, 2025, 11:00 AM',
        title: 'Need an SEO agency that specializes in SaaS',
        content:
          "We're looking to scale our organic traffic. Tired of generalist agencies, need someone who understands PLG and B2B funnels.",
        score: 10,
        url: '#',
      },
      {
        source: 'r/startup_growth',
        user: 'u/founder_hub',
        platform: 'reddit',
        time: 'Oct 9, 2025, 01:30 PM',
        title: 'Recommended content marketing agencies?',
        content:
          'Looking for help with long-form blog posts and case studies. Goal is quality over quantity for lead gen.',
        score: 10,
        url: '#',
      },
      {
        source: 'r/agency',
        user: 'u/growth_vp',
        platform: 'reddit',
        time: 'Oct 9, 2025, 03:15 PM',
        title: 'Budget for Series A SEO strategy?',
        content:
          'Just raised our Series A. What should we be looking to spend monthly on a solid SEO/Content retainer?',
        score: 9,
        url: '#',
      },
      {
        source: 'r/B2BMarketing',
        user: 'u/marketing_director',
        platform: 'reddit',
        time: 'Oct 9, 2025, 04:50 PM',
        title: 'Looking for a link building partner for SaaS',
        content:
          'We need high-authority backlinks in the dev-tool space. Anyone know an agency that actually delivers quality?',
        score: 10,
        url: '#',
      },
      {
        source: 'r/SaaS_Marketing',
        user: 'u/growth_lead_3',
        platform: 'reddit',
        time: 'Oct 9, 2025, 05:10 PM',
        title: 'Agency for technical content writing?',
        content:
          "Need help writing deep-dives into our API and infrastructure. General writers don't cut it. Recommendations?",
        score: 10,
        url: '#',
      },
    ],
  },
  {
    id: 'consultants',
    label: 'Consultants',
    icon: UserStar,
    quote: '"I help companies automate their manual workflows using AI and custom LLM solutions."',
    leads: [
      {
        source: 'r/operations',
        user: 'u/ops_manager_22',
        platform: 'reddit',
        time: 'Oct 10, 2025, 09:00 AM',
        title: 'How to automate customer support with AI?',
        content:
          "We're drowning in tickets. Looking for a consultant to help us implement an AI agent that can handle basic queries.",
        score: 10,
        url: '#',
      },
      {
        source: 'r/businessautomation',
        user: 'u/workflow_wiz',
        platform: 'reddit',
        time: 'Oct 10, 2025, 02:45 PM',
        title: 'Need help with Zapier/Make architecture',
        content:
          'Our current automations are breaking constantly. Need an expert to audit our setup and rebuild it reliably.',
        score: 10,
        url: '#',
      },
      {
        source: 'r/smallbusiness',
        user: 'u/local_shop_owner',
        platform: 'reddit',
        time: 'Oct 10, 2025, 04:20 PM',
        title: 'Looking for an AI consultant for local business',
        content:
          'I want to use AI to handle my appointment scheduling and follow-ups. Is there anyone who does this for small biz?',
        score: 10,
        url: '#',
      },
      {
        source: 'r/productivity',
        user: 'u/notion_power_user',
        platform: 'reddit',
        time: 'Oct 10, 2025, 05:15 PM',
        title: 'Need custom Notion + AI workflow integration',
        content:
          'Want to automate my content pipeline from idea to social post using AI. Need a consultant to set this up.',
        score: 9,
        url: '#',
      },
      {
        source: 'r/enterprisesoftware',
        user: 'u/cto_legacy',
        platform: 'reddit',
        time: 'Oct 10, 2025, 11:30 AM',
        title: 'Hiring: AI expert to audit our manual data entry',
        content:
          'We have 10 people doing manual data entry. Need a professional to see if LLMs can automate this reliably.',
        score: 10,
        url: '#',
      },
    ],
  },
  {
    id: 'app-builders',
    label: 'App Builders',
    icon: CodeXml,
    quote: '"Building high-performance mobile apps and custom software for innovative startups."',
    leads: [
      {
        source: 'r/reactnative',
        user: 'u/mvp_hunter',
        platform: 'reddit',
        time: 'Oct 11, 2025, 10:15 AM',
        title: 'Looking for developer to build iOS/Android MVP',
        content:
          'Have a validated idea and designs ready. Need a React Native pro to build the V1 in 6-8 weeks.',
        score: 10,
        url: '#',
      },
      {
        source: 'r/startups',
        user: 'u/non_tech_founder',
        platform: 'reddit',
        time: 'Oct 11, 2025, 04:20 PM',
        title: 'Cost to build a marketplace app like Airbnb?',
        content:
          'Thinking of building a platform for niche rentals. What are realistic development costs for a robust MVP?',
        score: 9,
        url: '#',
      },
      {
        source: 'r/flutterdev',
        user: 'u/app_visionary',
        platform: 'reddit',
        time: 'Oct 11, 2025, 02:10 PM',
        title: 'Need help finishing a Flutter project',
        content:
          'My previous developer left. Looking for an experienced dev to take over and ship my social networking app.',
        score: 10,
        url: '#',
      },
      {
        source: 'r/iosdev',
        user: 'u/swift_dreamer',
        platform: 'reddit',
        time: 'Oct 11, 2025, 09:30 AM',
        title: 'Hiring for a niche fitness app (Objective-C/Swift)',
        content:
          'Looking for an iOS specialist to build a custom workout tracker with heavy health-kit integration.',
        score: 10,
        url: '#',
      },
      {
        source: 'r/NoCode',
        user: 'u/bubble_novice',
        platform: 'reddit',
        time: 'Oct 11, 2025, 05:45 PM',
        title: 'Moving from Bubble to Custom Code - Need Dev',
        content:
          'Our no-code app is hitting limits. Need an engineer to rebuild our core features in React/Node.',
        score: 10,
        url: '#',
      },
    ],
  },
  {
    id: 'freelancers',
    label: 'Freelancers',
    icon: Feather,
    quote:
      '"Helping founders build their personal brand through strategic ghostwriting and social growth."',
    leads: [
      {
        source: 'r/solopreneur',
        user: 'u/brand_builder',
        platform: 'reddit',
        time: 'Oct 12, 2025, 08:30 AM',
        title: 'Need a ghostwriter for LinkedIn/X',
        content:
          "I want to build my authority but don't have time to write. Looking for someone to capture my voice and post daily.",
        score: 10,
        url: '#',
      },
      {
        source: 'r/marketing',
        user: 'u/ceo_thoughts',
        platform: 'reddit',
        time: 'Oct 12, 2025, 12:00 PM',
        title: 'How to find a good social media manager?',
        content:
          'Looking for someone who actually understands strategy, not just posting pretty pictures. Any tips for vetting?',
        score: 9,
        url: '#',
      },
      {
        source: 'r/SocialMediaMarketing',
        user: 'u/startup_founder_99',
        platform: 'reddit',
        time: 'Oct 12, 2025, 02:15 PM',
        title: 'Looking for a viral content strategist',
        content:
          'We need someone to help us go viral on TikTok and Reels. Specifically looking for a freelancer with a proven track record.',
        score: 10,
        url: '#',
      },
      {
        source: 'r/copywriting',
        user: 'u/landing_page_fail',
        platform: 'reddit',
        time: 'Oct 12, 2025, 03:40 PM',
        title: 'Need a conversion-focused copywriter',
        content:
          "Our landing page traffic isn't converting. Need a pro to rewrite our hero section and sales copy.",
        score: 10,
        url: '#',
      },
      {
        source: 'r/TwitterStrategy',
        user: 'u/blue_check_guy',
        platform: 'reddit',
        time: 'Oct 12, 2025, 09:10 AM',
        title: 'Hiring: X/Twitter manager for tech CEO',
        content:
          'Looking for a freelancer to manage my X presence, engage with peers, and grow my following organically.',
        score: 10,
        url: '#',
      },
    ],
  },
];

export default function Features() {
  const [activeTab, setActiveTab] = useState(caseStudies[0].id);

  const activeStudy = caseStudies.find((study) => study.id === activeTab);

  return (
    <section className="relative w-full py-24 overflow-hidden">
      {/* Background Decor */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full max-w-7xl pointer-events-none">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary/5 rounded-full blur-[100px]" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-[100px]" />
      </div>

      <div className="relative w-full max-w-6xl mx-auto px-4 space-y-12">
        {/* Header */}
        <div className="space-y-4 text-center max-w-3xl mx-auto">
          <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground">
            Case Studies
          </h2>
          <p className="text-lg text-muted-foreground">
            People ask for your product daily, but you're missing them.
          </p>
        </div>

        {/* Tabs */}
        <div className="flex flex-wrap justify-center gap-2">
          {caseStudies.map((study) => {
            const Icon = study.icon;
            const isActive = activeTab === study.id;
            return (
              <button
                key={study.id}
                onClick={() => setActiveTab(study.id)}
                className={cn(
                  'relative px-6 py-3 rounded-full text-sm font-medium transition-colors duration-300 flex items-center gap-2',
                  isActive ? 'text-white' : 'text-muted-foreground hover:text-foreground'
                )}
              >
                {isActive && (
                  <motion.div
                    layoutId="activeTab"
                    className="absolute inset-0 bg-primary rounded-full"
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.2 }}
                  />
                )}
                <span className="relative z-10 flex items-center gap-2">
                  <Icon className="w-4 h-4" />
                  {study.label}
                </span>
              </button>
            );
          })}
        </div>

        {/* Content Area */}
        <AnimatePresence mode="wait">
          {activeStudy && (
            <motion.div
              key={activeStudy.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.4 }}
              className="space-y-10"
            >
              {/* Quote */}
              <div className="text-center max-w-3xl mx-auto">
                <p className="text-xl md:text-2xl font-light text-foreground/90 italic leading-relaxed">
                  {activeStudy.quote}
                </p>
              </div>

              {/* List */}
              <div className="flex flex-col gap-4">
                {activeStudy.leads.map((lead, index) => (
                  <motion.div
                    key={`${activeStudy.id}-${index}`}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: index * 0.1, duration: 0.4 }}
                    className="relative overflow-hidden rounded-xl border border-white/10 bg-[#0A0A0A] p-6 hover:bg-white/[0.02] transition-colors duration-300"
                  >
                    <div className="flex flex-col gap-3">
                      {/* Card Header */}
                      <div className="flex items-start justify-between">
                        <div className="flex items-center gap-3 text-sm text-muted-foreground/60">
                          {lead.platform === 'reddit' ? (
                            <RedditIcon size={25} />
                          ) : (
                            <div className="bg-black rounded-sm p-0.5">
                              <FaXTwitter className="w-3 h-3 text-white" />
                            </div>
                          )}
                          <div className="flex items-center gap-2">
                            <span className="text-muted-foreground hover:text-foreground transition-colors font-medium">
                              {lead.source}
                            </span>
                            {lead.user && (
                              <>
                                <span className="text-muted-foreground/40">•</span>
                                <span className="text-muted-foreground">{lead.user}</span>
                              </>
                            )}
                            <span className="text-muted-foreground/40">•</span>
                            <span>{lead.time}</span>
                          </div>
                        </div>

                        <div className="flex items-baseline gap-0.5">
                          <span className="text-xl font-bold text-green-500">{lead.score}</span>
                          <span className="text-sm font-medium text-muted-foreground/40">/10</span>
                        </div>
                      </div>

                      {/* Card Content */}
                      <div className="space-y-1 mt-1">
                        <h3 className="text-base font-bold text-foreground">{lead.title}</h3>
                        {lead.content && (
                          <p className="text-sm text-muted-foreground/70 leading-relaxed font-medium">
                            {lead.content}
                          </p>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
}
