'use client';

import AnimationContainer from './global/animation-container';
import { Globe, ArrowRight } from 'lucide-react';

import MaxWidthWrapper from './global/MaxWidthWrapper';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { Input } from './ui/input';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import GetStartedBtn from './ui/GetStartedBtn';
import { useUser } from '@clerk/nextjs';

function Hero() {
  const { push } = useRouter();
  const { isSignedIn } = useUser();

  function handleClick() {
    if (isSignedIn) {
      push('/campaigns');
    } else {
      push('/sign-up');
    }
  }

  return (
    <MaxWidthWrapper>
      <AnimationContainer className="flex flex-col items-center justify-center w-full text-center">
        <div className="md:mt-8 flex items-center justify-center">
          <div className="text-center max-w-2xl w-full">
            {/* <Badge className="bg-primary rounded-full py-1 border-primary">v2.0.0 is live!</Badge> */}
            <div className="relative mx-auto mt-6 max-w-fit flex items-center justify-center">
              <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl font-semibold !leading-[1.2] tracking-tight">
                Find Customers From Reddit on{' '}
                <span className="relative text-primary whitespace-nowrap">
                  Autopilot
                  <svg
                    className="absolute -bottom-2 sm:-bottom-3 md:-bottom-4 left-0 w-full h-3 sm:h-4 md:h-5 text-primary/70 rotate-1"
                    viewBox="0 0 200 9"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                    preserveAspectRatio="none"
                  >
                    <path
                      d="M2.00025 6.99997C25.3333 3.66664 82.8 -1.00003 198 2.00003"
                      stroke="currentColor"
                      strokeWidth="3"
                      strokeLinecap="round"
                    />
                  </svg>
                </span>
              </h1>
              <div className="absolute -right-12 sm:-right-14 md:-right-16 top-0 sm:top-1/2 sm:-translate-y-1/2 hidden sm:block rotate-12 animate-subtle-float"></div>
            </div>
            <p className="mt-6 text-muted-foreground text-lg xs:text-lg">
              We track Reddit conversations daily to identify users actively {<br />} asking for
              products and services like yours.
            </p>
            <div className="mt-8 flex flex-col items-center justify-center gap-4 w-full max-w-xs mx-auto">
              {/* <div className="relative w-full group">
                <div className="absolute left-1.5 top-1.5 bottom-1.5 w-10 bg-card border-none rounded flex items-center justify-center z-10">
                  <span className="text-muted-foreground font-semibold">
                    <Globe className="w-5 h-5" />
                  </span>
                </div>
                <Input
                  type="text"
                  placeholder="example.com"
                  className="w-full pl-14 h-12 bg-background/50 backdrop-blur-sm border-border hover:border-primary/50 transition-colors"
                />
              </div> */}
              <GetStartedBtn onClick={handleClick} className="h-12 text-base mt-3" />
            </div>

            <div className="mt-10 flex flex-col items-center justify-center gap-4">
              <p className="text-sm md:text-base text-muted-foreground">
                Join <span className="font-bold text-foreground">⭐15+</span> SaaS Founders and
                Freelancers
              </p>
              <div className="flex -space-x-4">
                {[54, 100, 2, 93].map((i) => (
                  <Avatar key={i} className="border-2 border-background w-10 h-10">
                    <AvatarImage src={`https://i.pravatar.cc/100?img=${i + 10}`} />
                    <AvatarFallback>U{i}</AvatarFallback>
                  </Avatar>
                ))}
                <div className="flex items-center justify-center w-10 h-10 rounded-full border-2 border-background bg-card text-[10px] font-bold text-muted-foreground z-10">
                  +15
                </div>
              </div>
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
          {/* Responsive YouTube Video Container */}
          <div className="relative w-full" style={{ paddingBottom: '56.25%' }}>
            <iframe
              className="absolute top-0 left-0 w-full h-full rounded-md lg:rounded-xl ring-1 ring-border"
              src="https://www.youtube.com/embed/2rkmmnwdjRA?si=txsEvEXrJ8JJIKVt"
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
