"use client"

import React, { useState } from 'react';
import { Card } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check, Clock } from 'lucide-react';
import {
  Mail,
  CreditCard,
  UserCircle,
  Database,
  FileCheck,
  Paintbrush,
  MoreHorizontal,
} from 'lucide-react';

const features = [
  {
    id: 'emails',
    icon: Mail,
    label: 'Emails',
    title: 'Email integration',
    items: [
      'Resend/SendGrid setup',
      'Beautiful email templates',
      'Transactional emails ready',
      'Email verification flow',
    ],
    timeSaved: '3 hours',
    techStack: [
      { name: 'Resend', logo: '📧' },
      { name: 'React Email', logo: '⚛️' },
    ],
  },
  {
    id: 'payments',
    icon: CreditCard,
    label: 'Payments',
    title: 'Payment processing',
    items: [
      'Stripe integration complete',
      'Webhook handling',
      'Subscription management',
      'One-time payments',
    ],
    timeSaved: '5 hours',
    techStack: [{ name: 'Stripe', logo: '💳' }],
  },
  {
    id: 'login',
    icon: UserCircle,
    label: 'Login',
    title: 'User authentication',
    items: [
      'Magic links setup',
      'Login with Google walkthrough',
      'Save user in MongoDB/Supabase',
      'Private/protected pages & API calls',
    ],
    timeSaved: '4 hours',
    techStack: [
      { name: 'NextAuth', logo: '🔐' },
      { name: 'Supabase', logo: '⚡' },
    ],
  },
  {
    id: 'database',
    icon: Database,
    label: 'Database',
    title: 'Database setup',
    items: [
      'Prisma/Drizzle ORM configured',
      'Database schemas ready',
      'Type-safe queries',
      'Migration scripts',
    ],
    timeSaved: '4 hours',
    techStack: [
      { name: 'Prisma', logo: '🔷' },
      { name: 'PostgreSQL', logo: '🐘' },
    ],
  },
  {
    id: 'seo',
    icon: FileCheck,
    label: 'SEO',
    title: 'SEO optimization',
    items: [
      'Meta tags configured',
      'Sitemap generation',
      'Open Graph images',
      'Analytics integration',
    ],
    timeSaved: '2 hours',
    techStack: [
      { name: 'Next.js SEO', logo: '▲' },
      { name: 'Analytics', logo: '📊' },
    ],
  },
  {
    id: 'style',
    icon: Paintbrush,
    label: 'Style',
    title: 'UI components',
    items: [
      'Shadcn/ui pre-configured',
      'Dark mode support',
      'Responsive design',
      'Custom theme system',
    ],
    timeSaved: '3 hours',
    techStack: [
      { name: 'Shadcn', logo: '🎨' },
      { name: 'Tailwind', logo: '🌊' },
    ],
  },
  {
    id: 'more',
    icon: MoreHorizontal,
    label: 'More',
    title: 'Additional features',
    items: [
      'API routes structure',
      'Error handling',
      'Loading states',
      'TypeScript configured',
    ],
    timeSaved: '2 hours',
    techStack: [
      { name: 'TypeScript', logo: '📘' },
      { name: 'Zod', logo: '✅' },
    ],
  },
];

export default function Features2() {
  const [activeFeature, setActiveFeature] = useState('login');

  const activeFeatureData = features.find((f) => f.id === activeFeature);

  return (
    <div className="w-full max-w-6xl mx-auto space-y-16 py-20">
      {/* Header */}
      <div className="space-y-6 text-center">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
          Lorem ipsum dolor sit amet, consectetur,

        </h1>
        <p className="text-lg md:text-xl text-muted-foreground max-w-3xl mx-auto">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi 
        </p>
      </div>

      {/* Feature Icons Grid */}
      <div className="grid grid-cols-3 md:grid-cols-4 lg:grid-cols-7 gap-4 max-w-4xl mx-auto">
        {features.map((feature) => {
          const Icon = feature.icon;
          const isActive = activeFeature === feature.id;
          return (
            <button
              key={feature.id}
              className={`group flex flex-col items-center gap-3 p-4 rounded-xl transition-all duration-200 ${
                isActive
                  ? 'bg-primary/10 ring-2 ring-primary'
                  : 'bg-secondary/30 hover:bg-secondary/60'
              }`}
              onClick={() => setActiveFeature(feature.id)}
            >
              <div
                className={`w-12 h-12 rounded-lg flex items-center justify-center transition-colors ${
                  isActive
                    ? 'bg-primary/20'
                    : 'bg-background/50 group-hover:bg-background/80'
                }`}
              >
                <Icon
                  className={`w-6 h-6 transition-colors ${
                    isActive ? 'text-primary' : 'text-muted-foreground'
                  }`}
                />
              </div>
              <span
                className={`text-sm font-medium transition-colors ${
                  isActive ? 'text-primary' : 'text-muted-foreground'
                }`}
              >
                {feature.label}
              </span>
            </button>
          );
        })}
      </div>

      {/* Feature Details Card */}
      {activeFeatureData && (
        <Card className="p-8 md:p-10 bg-card border-border shadow-lg">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Left Column */}
            <div className="space-y-6">
              <div>
                <h2 className="text-3xl font-bold text-foreground mb-2">
                  {activeFeatureData.title}
                </h2>
                <div className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Clock className="w-4 h-4" />
                  <span>Saves you {activeFeatureData.timeSaved}</span>
                </div>
              </div>

              <div className="space-y-3">
                {activeFeatureData.items.map((item, index) => (
                  <div key={index} className="flex items-start gap-3 group">
                    <div className="w-5 h-5 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0 mt-0.5 group-hover:bg-primary/20 transition-colors">
                      <Check className="w-3 h-3 text-primary" />
                    </div>
                    <span className="text-base text-foreground/90">
                      {item}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Right Column */}
            <div className="flex flex-col justify-center space-y-6">
              <div>
                <h3 className="text-sm font-semibold text-muted-foreground uppercase tracking-wider mb-4">
                  Built with
                </h3>
                <div className="flex flex-col gap-3">
                  {activeFeatureData.techStack.map((tech, index) => (
                    <div
                      key={index}
                      className="flex items-center gap-3 px-4 py-3 rounded-lg bg-secondary/50 hover:bg-secondary/70 transition-colors border border-border/50"
                    >
                      <span className="text-2xl">{tech.logo}</span>
                      <span className="text-base font-medium text-foreground">
                        {tech.name}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              <div className="pt-4">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 border border-green-500/20">
                  <div className="w-2 h-2 rounded-full bg-green-500 animate-pulse"></div>
                  <span className="text-sm font-medium text-green-500">
                    Production ready
                  </span>
                </div>
              </div>
            </div>
          </div>
        </Card>
      )}
    </div>
  );
}