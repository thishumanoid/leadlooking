'use client';

import { Rocket, Sparkles, LayoutDashboard, Mail, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { Button } from '@/components/ui/button';

export default function GuideAfterPayment() {
  return (
    <div className="min-h-screen bg-background flex items-center justify-center p-4 relative overflow-hidden">
      {/* Background Decorative Elements */}
      {/* <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-primary/10 rounded-full blur-3xl" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-primary/5 rounded-full blur-3xl" /> */}

      <div className="max-w-xl w-full relative z-10">
        <div className="bg-transparent rounded-2xl shadow-2xl border border-border p-8 md:p-12 mb-8 text-center">
          <div className="mb-6 inline-flex items-center justify-center w-20 h-20 bg-primary/10 rounded-2xl border border-primary/20 animate-in fade-in zoom-in duration-500">
            <Sparkles className="w-10 h-10 text-primary" />
          </div>

          <h1 className="text-3xl font-bold text-foreground mb-4 tracking-tight">
            You're now a Premium User!
          </h1>

          <p className="text-muted-foreground text-lg mb-8 leading-relaxed">
            Welcome to the inner circle. Your account has been upgraded, and you now have full
            access to all leads across every campaign.
          </p>

          <div className="grid gap-4 mb-10">
            <div className="flex items-center gap-4 p-4 rounded-xl bg-accent/30 border border-border text-left">
              <div className="w-10 h-10 rounded-lg bg-background flex items-center justify-center shadow-sm">
                <Rocket className="w-5 h-5 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-sm">Full Lead Access</h3>
                <p className="text-xs text-muted-foreground">
                  View every single match our AI finds for you.
                </p>
              </div>
            </div>
          </div>

          <Link href="/campaigns" className="block">
            <Button
              size="lg"
              className="w-full h-14 text-lg font-semibold shadow-lg shadow-primary/20 group"
            >
              Go to Campaigns
              <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
            </Button>
          </Link>
        </div>

        <div className="bg-muted/50 rounded-2xl p-6 border border-border">
          <h3 className="font-semibold text-foreground mb-3 flex items-center gap-2">
            <Mail className="w-5 h-5 text-primary" />
            Need help?
          </h3>
          <p className="text-muted-foreground text-sm leading-relaxed">
            If your premium benefits aren't active immediately, please refresh the page. Still
            having issues? Contact support at{' '}
            <span className="text-foreground font-semibold underline decoration-primary/30">
              neuhiman@gmail.com
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}
