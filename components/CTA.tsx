import { ArrowRight, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import MaxWidthWrapper from './global/MaxWidthWrapper';
import Link from 'next/link';
import config from '@/config';

export default function CtaCard() {
  return (
    <MaxWidthWrapper>
      <section className="w-full py-12">
        <div className="container px-4 md:px-6">
          <Card className="relative overflow-hidden border-border bg-transparent text-card-foreground shadow-lg">
            <CardContent className="relative z-10 flex flex-col items-center justify-center py-8 px-2 text-center">
              <h2 className="text-4xl leading-tight font-extrabold md:text-5xl px-4">
                Tired of Losing Track {<br className="hidden sm:block" />}of Your Leads?
              </h2>
              <p className="text-muted-foreground mt-6 max-w-xl">
                TagFast lets you track Leads, add Labels {<br />} & set reminders, without switching
                tabs.
              </p>

              <div className="mt-8 flex flex-row items-center justify-center gap-4">
                <Link href={'/'}>
                  <Button size="lg" className="group px-8 h-12 text-base" variant={'outline'}>
                    Watch Demo
                  </Button>
                </Link>
                <Link
                  href={
                    config.chromeWebStoreUrl ||
                    'https://chromewebstore.google.com/detail/tagfast-mark-profiles-as/olohoaikbpcfhkbcolocphodjbdjnign'
                  }
                  target="_blank"
                >
                  <Button
                    size="lg"
                    className="group px-8 h-12 text-base"
                  >
                    Install Extension
                    <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </section>
    </MaxWidthWrapper>
  );
}
