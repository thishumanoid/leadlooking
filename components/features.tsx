'use client';

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Rocket,
  Building2,
  Lightbulb,
  Smartphone,
  Palette,
  CheckCircle2,
  ArrowRight,
} from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import RedditIcon from './RedditIcon';
import { cn } from '@/lib/utils'; // Assuming you have a utils file for class mixing

const caseStudies = [
  {
    id: 'saas-founders',
    label: 'SaaS Founders',
    icon: Rocket,
    quote:
      '"I built a CRM for small and medium businesses that allows deep customization for different workflows."',
    leads: [
      {
        source: '@freelanceops',
        platform: 'reddit',
        time: 'Oct 8, 2025, 05:09 PM',
        title: 'Lightweight CRM for freelancers?',
        content: null,
        score: 10,
        url: '#',
      },
      {
        source: 'r/Entrepreneur',
        user: 'u/consultflow',
        platform: 'reddit',
        time: 'Oct 8, 2025, 02:56 PM',
        title: "What's the best CRM for a consulting business?",
        content:
          "Looking for a simple CRM to manage clients and projects. Don't need anything too complex like Salesforce.",
        score: 10,
        url: '#',
      },
      {
        source: 'r/smallbusiness',
        user: 'u/whatsappops',
        platform: 'reddit',
        time: 'Oct 8, 2025, 10:41 AM',
        title: 'CRM that supports WhatsApp integration',
        content:
          "We're a small team handling leads over WhatsApp. Any CRM that syncs or automates messaging?",
        score: 10,
        url: '#',
      },
      {
        source: 'r/saas',
        user: 'u/stackrunner',
        platform: 'reddit',
        time: 'Oct 8, 2025, 09:25 AM',
        title: 'Need a CRM with API access',
        content:
          'Building a custom dashboard and need a CRM that has a good API to pull data from. Recommendations?',
        score: 10,
        url: '#',
      },
    ],
  },
  {
    id: 'agencies',
    label: 'Agencies',
    icon: Building2,
    quote:
      '"We help local businesses get more leads through targeted Facebook ads and landing pages."',
    leads: [
      {
        source: 'r/marketing',
        user: 'u/agencylife',
        platform: 'reddit',
        time: 'Oct 9, 2025, 11:00 AM',
        title: 'Best tools for local lead gen?',
        content:
          'Scaling our agency and looking for tools to help automate lead generation for local service businesses.',
        score: 10,
        url: '#',
      },
      {
        source: '@ad_wizard',
        platform: 'twitter',
        time: 'Oct 9, 2025, 01:30 PM',
        title: 'Need a white-label reporting tool',
        content: null,
        score: 9,
        url: '#',
      },
      {
        source: 'r/agency',
        user: 'u/growthhacker',
        platform: 'reddit',
        time: 'Oct 9, 2025, 03:15 PM',
        title: 'How to manage 50+ clients?',
        content:
          "We're growing fast and spreadsheets aren't cutting it anymore. What software do you use to manage client campaigns?",
        score: 10,
        url: '#',
      },
    ],
  },
  {
    id: 'consultants',
    label: 'Consultants',
    icon: Lightbulb,
    quote: '"Providing expert advice on digital transformation for enterprise clients."',
    leads: [
      {
        source: 'r/consulting',
        user: 'u/strat_consult',
        platform: 'reddit',
        time: 'Oct 10, 2025, 09:00 AM',
        title: 'Digital transformation frameworks',
        content:
          'Looking for resources or frameworks to help a client with their digital transformation journey.',
        score: 10,
        url: '#',
      },
      {
        source: '@biz_guru',
        platform: 'twitter',
        time: 'Oct 10, 2025, 02:45 PM',
        title: 'Consulting for manufacturing',
        content: null,
        score: 9,
        url: '#',
      },
    ],
  },
  {
    id: 'app-builders',
    label: 'App Builders',
    icon: Smartphone,
    quote: '"Building native mobile applications for startups and established brands."',
    leads: [
      {
        source: 'r/reactnative',
        user: 'u/mobiledev',
        platform: 'reddit',
        time: 'Oct 11, 2025, 10:15 AM',
        title: 'React Native vs Flutter for MVP?',
        content: 'Starting a new project and debating between RN and Flutter. Need to move fast.',
        score: 10,
        url: '#',
      },
      {
        source: 'r/androiddev',
        user: 'u/droidmaker',
        platform: 'reddit',
        time: 'Oct 11, 2025, 04:20 PM',
        title: 'Jetpack Compose adoption',
        content: 'Is it worth migrating our existing XML layouts to Compose now? content?',
        score: 9,
        url: '#',
      },
    ],
  },
  {
    id: 'freelancers',
    label: 'Freelancers',
    icon: Palette,
    quote: '"Delivering high-quality web design and development services on a freelance basis."',
    leads: [
      {
        source: 'r/freelance',
        user: 'u/webpro',
        platform: 'reddit',
        time: 'Oct 12, 2025, 08:30 AM',
        title: 'Pricing for landing pages',
        content: 'How much do you guys charge for a high-converting landing page with copy?',
        score: 10,
        url: '#',
      },
      {
        source: '@design_hero',
        platform: 'twitter',
        time: 'Oct 12, 2025, 12:00 PM',
        title: 'Looking for a Webflow developer',
        content: null,
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
            Real-time examples of high-intent leads we discover daily for different industries.
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
                    transition={{ type: 'spring', bounce: 0.2, duration: 0.6 }}
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
