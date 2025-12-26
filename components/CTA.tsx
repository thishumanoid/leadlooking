import Link from 'next/link';
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

            <CardContent className="relative z-10 flex flex-col items-center justify-center py-5 text-center">
              <div className="mb-6 flex items-center justify-center rounded-full bg-muted p-3">
                <Sparkles strokeWidth={1.5} className="h-6 w-6 text-foreground" />
              </div>

              {/* Heading */}
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl lg:text-6xl">
                Lorem ipsum dolor sit amet, consectetur.
              </h2>

              {/* Subheading */}
              <p className="mx-auto mt-4 max-w-[700px] text-muted-foreground md:text-xl">
                Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. 
              </p>

              {/* Button Group */}
              <div className="mt-8 flex flex-col items-center justify-center gap-4 sm:flex-row">
                <Button size="lg" className="group">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                </Button>
                <Button variant="outline" size="lg">
                  View Demo
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
