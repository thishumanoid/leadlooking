import { ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import Link from 'next/link';
import { cn } from '@/utils/functions/cn';

export default function CtaCard({ className }: { className?: string }) {
  return (
    <section className={cn('w-full py-12', className)}>
      <Card className="relative overflow-hidden border-border bg-card/30 text-card-foreground shadow-2xl">
        {/* <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
        <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" /> */}

        <CardContent className="relative z-10 flex flex-col items-center justify-center py-5 px-6 text-center">
          <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-2xl px-4 leading-tight">
            Finding Leads <br className="hidden sm:block" /> Manually is Hard. 
          </h2>

          <div className="mt-10 flex flex-col items-center justify-center gap-4">
            <Link href="/sign-up">
              <Button
                size="lg"
                className="group px-10 h-14 text-lg font-bold shadow-2xl shadow-primary/20 rounded-xl transition-all hover:scale-105 active:scale-95"
              >
                Automate it
                <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
              </Button>
            </Link>
          </div>
        </CardContent>
      </Card>
    </section>
  );
}
