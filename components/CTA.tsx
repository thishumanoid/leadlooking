import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MaxWidthWrapper from './global/MaxWidthWrapper';

export default function CtaCard() {
  return (
    <MaxWidthWrapper>
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <Card className="relative overflow-hidden border-border bg-transparent text-card-foreground shadow-lg">
            <div className="absolute -top-24 -left-24 h-64 w-64 rounded-full bg-primary/20 blur-3xl" />
            <div className="absolute -bottom-24 -right-24 h-64 w-64 rounded-full bg-secondary/20 blur-3xl" />

            <CardContent className="relative z-10 flex flex-col items-center justify-center py-12 px-6 text-center">

              {/* Heading */}
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl max-w-2xl px-4">
                Finding leads manually {<br className="hidden sm:block" />}  is hard. Automate it.
              </h2>


              {/* Button Group */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="group px-8 h-12 text-base shadow-xl shadow-primary/20">
                  Find My Leads
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
