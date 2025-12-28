'use client';

import React from 'react';
import { Card } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Rocket, Building2, Lightbulb, Smartphone, Palette } from 'lucide-react';
import { FaXTwitter } from 'react-icons/fa6';
import { FaReddit } from "react-icons/fa";

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
  return (
    <div className="w-full max-w-6xl mx-auto space-y-8 py-20 px-4">
      {/* Header */}
      <div className="space-y-4 text-center mb-12">
        <h1 className="text-4xl md:text-5xl font-bold text-foreground">Case Studies</h1>
        <p className="text-lg md:text-xl text-muted-foreground">
          See real examples of what Leadverse can find for you daily.
        </p>
      </div>

      <Tabs defaultValue="saas-founders" className="w-full">
        {/* Tabs List */}
        <div className="flex justify-center mb-12 overflow-x-auto pb-4 md:pb-0 :hidden [scrollbar-width:none]">
          <TabsList className="bg-transparent gap-2 h-auto p-0 flex-wrap justify-center">
            {caseStudies.map((study) => {
              const Icon = study.icon;
              return (
                <TabsTrigger
                  key={study.id}
                  value={study.id}
                  className="data-[state=active]:bg-secondary/20 data-[state=active]:text-primary data-[state=active]:border-primary/20 border border-transparent hover:bg-secondary/10 px-6 py-3 rounded-lg gap-2 text-muted-foreground transition-all duration-300"
                >
                  <Icon className="w-4 h-4" />
                  {study.label}
                </TabsTrigger>
              );
            })}
          </TabsList>
        </div>

        {/* Tab Content */}
        {caseStudies.map((study) => (
          <TabsContent
            key={study.id}
            value={study.id}
            className="space-y-12 animate-in fade-in-50 slide-in-from-bottom-2 duration-500"
          >
            {/* Quote */}
            <div className="text-center max-w-4xl mx-auto px-4">
              <h2 className="text-2xl md:text-3xl font-medium text-green-500 leading-relaxed">
                {study.quote}
              </h2>
            </div>

            {/* Leads List */}
            <div className="space-y-4 max-w-4xl mx-auto">
              {study.leads.map((lead, index) => (
                <Card
                  key={index}
                  className="bg-card/50 border-white/5 hover:border-white/10 transition-colors p-6"
                >
                  <div className="flex flex-col gap-3">
                    {/* Header: Icon, Source, Time, Score */}
                    <div className="flex items-center justify-between text-muted-foreground text-sm">
                      <div className="flex items-center gap-3">
                        {lead.platform === 'reddit' ? (
                          <div className="relative flex items-center justify-center w-6 h-6">
                            <div className="absolute inset-[1.5px] bg-white rounded-full" />
                            <FaReddit className="relative z-10 w-6 h-6 text-[#FF4500]" />
                          </div>
                        ) : (
                          <div className="p-1 rounded bg-secondary/10">
                            <FaXTwitter className="w-4 h-4 text-white" />
                          </div>
                        )}
                        <div className="flex items-center gap-2">
                          <span className="font-medium text-foreground">{lead.source}</span>
                          {lead.user && (
                            <>
                              <span>•</span>
                              <span>{lead.user}</span>
                            </>
                          )}
                          <span>•</span>
                          <span>{lead.time}</span>
                        </div>
                      </div>
                      <div className="flex items-end gap-1">
                        <span className="text-lg font-bold text-green-500">{lead.score}</span>
                        <span className="text-xs mb-1">/10</span>
                      </div>
                    </div>

                    {/* Content */}
                    <div className="space-y-1">
                      <h3 className="text-lg font-semibold text-foreground/90">{lead.title}</h3>
                      {lead.content && (
                        <p className="text-muted-foreground text-base leading-relaxed">
                          {lead.content}
                        </p>
                      )}
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
}
