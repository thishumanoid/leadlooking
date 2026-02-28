'use client';

import AnimationContainer from './global/animation-container';
import Link from 'next/link';
import { FaChrome, FaFirefoxBrowser } from 'react-icons/fa6';

import MaxWidthWrapper from './global/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import config from '@/config';

function Hero() {
  return (
    <MaxWidthWrapper className="mt-8">
        <div className="md:mt-6 flex items-center justify-center">
          <div className="text-center max-w-3xl">
            <h1 className="mt-10 text-2xl xs:text-4xl sm:text-5xl md:text-6xl font-extrabold !leading-[1.2] tracking-tight">
              Track Your Leads Without Leaving The Tab
            </h1>
            <p className="mt-6 text-lg text-muted-foreground">
              Track profiles across every platform, sync with your team, {<br/>} and never send a duplicate message again.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
              <Link href={config.chromeWebStoreUrl || '#'} target="_blank">
                <Button size="lg" className="gap-2 px-8 hover:shadow-lg hover:shadow-primary/20">
                  <FaChrome className="w-5 h-5" />
                  Add to Chrome
                </Button>
              </Link>
              <Link href={config.firefoxStoreUrl || '#'} target="_blank">
                <Button size="lg" variant="outline" className="gap-2 px-8">
                  <FaFirefoxBrowser className="w-5 h-5" />
                  Add to Firefox
                </Button>
              </Link>
            </div>
          </div>
        </div>

      <AnimationContainer
        delay={0.2}
        className="relative pt-20 pb-10 md:py-32 px-2 bg-transparent w-full"
      >
        <div className="absolute md:top-[10%] left-1/2 gradient w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem] animate-image-glow"></div>
        <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
          {/* Responsive YouTube Video Container */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-md lg:rounded-xl ring-1 ring-border"
              src="https://www.youtube.com/embed/g0SrR0TprqM?si=vVrCRD1yL-G2hice"
              title="YouTube video player"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              referrerPolicy="strict-origin-when-cross-origin"
              allowFullScreen
            />
          </div>
          <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-background -z-10 pointer-events-none"></div>
        </div>
      </AnimationContainer>
    </MaxWidthWrapper>
  );
}

export default Hero;