'use client';

import {
  Rocket,
  Sparkles,
  LayoutDashboard,
  Mail,
  ArrowRight,
  UserPlus,
  ShieldCheck,
  MessageSquare,
  AlertCircle,
  ExternalLink,
  Slack,
} from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';

export default function GuideAfterPayment() {
  const steps = [
    {
      title: 'Check Inbox & Spam',
      description:
        'We\'ve sent you a welcome email. Please check your inbox (and spam folder). If it landed in spam, mark it as "Not Spam" and also Mark it as "Important" so you never miss a lead notification.',
      icon: Mail,
      color: 'text-blue-500',
      bgColor: 'bg-blue-500/10',
    },
    {
      title: 'Add to Contacts',
      description:
        'Add "hello@leadlooking.com" to your Contacts or Address Book. This ensures your email provider recognizes us as a trusted sender.',
      icon: UserPlus,
      color: 'text-purple-500',
      bgColor: 'bg-purple-500/10',
    },
    {
      title: 'Whitelist "hello@leadlooking.com"',
      description:
        'Open your email provider settings (like Gmail, Outlook, etc.), create a filter, and enter "hello@leadlooking.com" in the "From" input field. Leave other fields blank and click "Create filter". On the next screen, check "Never send it to Spam" and click "Create filter" to finish. Gmail users can simply use the link below:',
      icon: ShieldCheck,
      color: 'text-green-500',
      bgColor: 'bg-green-500/10',
      link: 'https://mail.google.com/mail/u/3/#create-filter/from=hello%40leadlooking.com&sizeoperator=s_sl&sizeunit=s_smb',
      linkText: 'Direct Gmail Filter Link',
    },
    {
      title: 'Connect Slack (Highly Recommended)',
      description:
        "Slack notifications are instant and 100% reliable. If you don't have an account, creating a workspace is free and easy. Connect it in your settings to get alerts there too.",
      icon: Slack,
      color: 'text-[#E01E5A]',
      bgColor: 'bg-[#E01E5A]/10',
      link: '/settings',
      linkText: 'Connect Slack in Settings',
      isPremium: true,
    },
  ];

  return (
    <div className="py-12 max-w-4xl mx-auto px-4">
      {/* Success Hero */}
      <div className="text-center mb-12">
        <p className="text-muted-foreground text-lg max-w-2xl mx-auto leading-relaxed">
          Your account has been upgraded with full access. To ensure you never miss a lead, please
          follow these essential delivery steps:
        </p>
      </div>

      {/* Main Action Call */}

      {/* Steps Section */}
      <div className="space-y-8">
        <div className="flex items-center gap-3 border-b border-border pb-4">
          <AlertCircle className="w-6 h-6 text-primary" />
          <h3 className="text-2xl font-bold tracking-tight">Action Required: Setup Lead Alerts</h3>
        </div>

        <div className="grid grid-cols-1 gap-6">
          {steps.map((step, index) => (
            <Card
              key={index}
              className="p-6 border-border/50 group relative overflow-hidden bg-card/50 backdrop-blur-sm"
            >
              <div className="flex flex-col md:flex-row gap-6 relative z-10">
                <div className={`p-4 rounded-2xl ${step.bgColor} h-fit shadow-sm`}>
                  <step.icon className={`w-8 h-8 ${step.color}`} />
                </div>
                <div className="flex-1">
                  <span className="text-sm text-muted-foreground/50">Step {index + 1}</span>
                  <h4 className="text-xl font-bold mb-2 mt-2 flex items-center gap-2">
                    {step.title}
                  </h4>
                  <p className="text-muted-foreground leading-relaxed mb-4 text-pretty">
                    {step.description}
                  </p>
                  {step.link && (
                    <a
                      href={step.link}
                      target={step.link.startsWith('http') ? '_blank' : '_self'}
                      rel={step.link.startsWith('http') ? 'noopener noreferrer' : undefined}
                      className="inline-flex items-center text-primary font-bold hover:underline gap-1.5 group/link text-sm"
                    >
                      {step.linkText}
                      <ExternalLink className="w-3.5 h-3.5 group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
                    </a>
                  )}
                </div>
              </div>
              {/* Subtle background number */}
              {/* <span className="absolute right-4 bottom-2 text-2xl text-foreground/10 pointer-events-none select-none">
                {index + 1}
              </span> */}
            </Card>
          ))}
        </div>
      </div>

      <br />

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-16">
        <Link href="/campaigns" className="block">
          <Button
            size="lg"
            className="w-full h-16 text-xl font-bold shadow-xl shadow-primary/20 group hover:scale-[1.02] transition-all"
          >
            Go to My Campaigns
            <ArrowRight className="ml-2 w-6 h-6 group-hover:translate-x-1 transition-transform" />
          </Button>
        </Link>
        <Link href="/settings" className="block">
          <Button
            variant="outline"
            size="lg"
            className="w-full h-16 text-xl font-bold hover:bg-muted transition-all"
          >
            Configure Notifications
          </Button>
        </Link>
      </div>

      {/* Help Footer */}
      <div className="mt-20 bg-muted/30 border border-border p-8 md:p-12 rounded-[2.5rem] text-center relative overflow-hidden">
        <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -mr-16 -mt-16" />
        <div className="absolute bottom-0 left-0 w-32 h-32 bg-primary/5 rounded-full blur-3xl -ml-16 -mb-16" />

        <h4 className="font-bold text-2xl mb-3">Still have questions?</h4>
        <p className="text-muted-foreground text-lg mb-6">
          If your premium benefits aren't active immediately, {<br />} please refresh the page or
          just reach out to me:
        </p>
        <a
          href="mailto:neuhiman@gmail.com"
          className="inline-flex items-center gap-2 text-xl font-bold text-foreground hover:text-primary transition-colors underline decoration-primary/30 underline-offset-8"
        >
          neuhiman@gmail.com
        </a>
      </div>
    </div>
  );
}
