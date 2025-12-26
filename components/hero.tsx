'use client';

import AnimationContainer from './global/animation-container';
import { ArrowUpRight, CirclePlay } from 'lucide-react';
import { Badge } from './ui/badge';
import Link from 'next/link';

import MaxWidthWrapper from './global/MaxWidthWrapper';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'next/navigation';
import GetStartedBtn from './ui/GetStartedBtn';
import config from '@/config';

function Hero() {
  const { push } = useRouter();
  const { user } = useAuth();

  function handleClick() {
    if (user) {
      push('/dashboard'); /// or push(chromeWebStoreUrl);
    } else {
      push('/auth');
    }
  }

  return (
    <MaxWidthWrapper>
      <AnimationContainer className="flex flex-col items-center justify-center w-full text-center">
        <div className="md:mt-6 flex items-center justify-center">
          <div className="text-center max-w-2xl">
            <Badge className="bg-primary rounded-full py-1 border-primary">v2.0.0 is live!</Badge>
            <h1 className="mt-6 text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-bold !leading-[1.2] tracking-tight">
             This is super cool right?
            </h1>
            <p className="mt-6 xs:text-lg">
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
              incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam.
            </p>
            <div className="mt-12 flex flex-col sm:flex-row items-center sm:justify-center gap-4">
              <GetStartedBtn onClick={handleClick} />
              <Link target='_blank' href={config.chromeWebStoreUrl ?? ''}>
              <Button
                variant="outline"
                size="lg"
                className="gap-4"
              >
                <CirclePlay className="!h-5 !w-5" /> Watch Demo
              </Button>
              </Link>
            </div>
          </div>
        </div>
      </AnimationContainer>

      <AnimationContainer
        delay={0.2}
        className="relative pt-20 pb-10 md:py-32 px-2 bg-transparent w-full"
      >
        <div className="absolute md:top-[10%] left-1/2 gradient w-3/4 -translate-x-1/2 h-1/4 md:h-1/3 inset-0 blur-[5rem] animate-image-glow"></div>
        <div className="-m-2 rounded-xl p-2 ring-1 ring-inset ring-foreground/20 lg:-m-4 lg:rounded-2xl bg-opacity-50 backdrop-blur-3xl">
          <Image
            src="/images/hero-image.jpg"
            alt="Dashboard"
            width={1200}
            height={1200}
            quality={100}
            className="rounded-md lg:rounded-xl bg-foreground/10 ring-1 ring-border"
          />
          <div className="absolute bottom-0 md:-bottom-8 inset-x-0 w-full h-1/4 bg-gradient-to-t from-background z-50"></div>
        </div>
      </AnimationContainer>
    </MaxWidthWrapper>
  );
}

export default Hero;
