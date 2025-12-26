import React from 'react';
import { Zap, Shield, Sparkles, Rocket, Clock, BarChart, LucideIcon } from 'lucide-react';

interface Feature {
  icon: LucideIcon;
  title: string;
  description: string;
}

const features: Feature[] = [
  {
    icon: Zap,
    title: 'Lightning Fast',
    description:
      "Experience blazing-fast performance with optimized code that doesn't slow down your browser.",
  },
  {
    icon: Shield,
    title: 'Privacy First',
    description:
      "Your data stays yours. We don't collect, store, or share any of your personal information.",
  },
  {
    icon: Sparkles,
    title: 'Smart Automation',
    description: 'Intelligent features that learn from your workflow and adapt to save you time.',
  },
  {
    icon: Rocket,
    title: 'Boost Productivity',
    description: 'Get more done in less time with powerful tools designed for efficiency.',
  },
  {
    icon: Clock,
    title: 'Real-time Sync',
    description: 'Seamlessly sync your settings and data across all your devices instantly.',
  },
  {
    icon: BarChart,
    title: 'Detailed Analytics',
    description: 'Track your progress with comprehensive insights and beautiful visualizations.',
  },
];

export default function Features() {
  return (
    <section>
      <div className="max-w-7xl mx-auto">
        {/* Section Header */}
        <div className="mb-12 mt-15 text-center">
          <h2 className="text-3xl font-bold tracking-tight text-foreground sm:text-4xl">
            Powerful Features
          </h2>
          <p className="mt-4 text-lg text-muted-foreground">
            Lorem ipsum dolor sit ametconsectetur adipiscing elit, sed do eiusmod tempo.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard key={index} feature={feature} index={index} />
          ))}
        </div>
      </div>
    </section>
  );
}

function FeatureCard({ feature, index }: { feature: Feature; index: number }) {
  const Icon = feature.icon;

  return (
    <div
      className="group relative p-8 rounded-2xl border border-border bg-card hover:bg-accent/50 hover:border-primary transition-all duration-300 hover:shadow-lg hover:scale-105 hover:-translate-y-1"
      style={{
        animationDelay: `${index * 100}ms`,
      }}
    >
      {/* Gradient overlay on hover */}
      <div className="absolute inset-0 rounded-2xl bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

      {/* Content */}
      <div className="relative">
        {/* Icon container */}
        <div className="mb-6 inline-flex">
          <div className="p-3 rounded-xl bg-primary group-hover:bg-primary/70 transition-all duration-300 group-hover:scale-110 group-hover:rotate-3">
            <Icon className="w-6 h-6 text-primary-foreground" strokeWidth={2} />
          </div>
        </div>

        {/* Text content */}
        <h3 className="text-xl font-semibold mb-3 text-foreground  transition-colors duration-300">
          {feature.title}
        </h3>
        <p className="text-muted-foreground leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
}
