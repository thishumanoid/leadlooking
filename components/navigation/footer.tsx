'use client';

import Link from 'next/link';
import AnimationContainer from '../global/animation-container';
// import { useAuth } from '@/context/AuthContext';
import Logo from '../global/YourLogo';
import config from '@/config';
const Footer = () => {
  // const { session, user } = useAuth();
  return (
    <>
      <footer className="flex flex-col relative items-center justify-center border-t border-border pt-16 pb-8 md:pb-0 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32 bg-[radial-gradient(35%_128px_at_50%_0%,theme(backgroundColor.white/8%),transparent)]">
        <div className="absolute top-0 left-1/2 right-1/2 -translate-x-1/2 -translate-y-1/2 w-8 h-1.5 bg-foreground rounded-full"></div>

        <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
          <AnimationContainer delay={0.1}>
            <div className="flex flex-col items-start justify-start md:max-w-[200px]">
              <div className="flex items-start">
                <Link href="/">
                  <Logo width="50" height="50" />
                </Link>
              </div>
              <p className="text-muted-foreground mt-4 text-sm text-start">
                {config.footerDescription ?? ''}
              </p>
            </div>
          </AnimationContainer>

          <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <AnimationContainer delay={0.2}>
                <div className="">
                  <h3 className="text-base font-medium text-white">Product</h3>
                  <ul className="mt-4 text-sm text-muted-foreground">
                    {/* <li className="mt-2">
                      <Link href="/blogs" className="hover:text-foreground transition-all duration-300">
                      Blogs
                    </Link>
                    </li> */}
                    <li className="mt-2">
                      <Link
                        href="/pricing"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Pricing
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="/feedback"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Support
                      </Link>
                    </li>
                    {/* <li className="mt-2">
                    <Link href="" className="hover:text-foreground transition-all duration-300">
                      Testimonials
                    </Link>
                  </li> */}
                    {/* <li className="mt-2">
                    <Link href="" className="hover:text-foreground transition-all duration-300">
                      Integration
                    </Link>
                  </li> */}
                  </ul>
                </div>
              </AnimationContainer>
              {/* <AnimationContainer delay={0.3}>
              <div className="mt-10 md:mt-0 flex flex-col">
                <h3 className="text-base font-medium text-white">Integrations</h3>
                <ul className="mt-4 text-sm text-muted-foreground">
                  <li className="">
                    <Link href="" className="hover:text-foreground transition-all duration-300">
                      Facebook
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="" className="hover:text-foreground transition-all duration-300">
                      Instagram
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="" className="hover:text-foreground transition-all duration-300">
                      Twitter
                    </Link>
                  </li>
                  <li className="mt-2">
                    <Link href="" className="hover:text-foreground transition-all duration-300">
                      LinkedIn
                    </Link>
                  </li>
                </ul>
              </div>
            </AnimationContainer> */}
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
              <AnimationContainer delay={0.4}>
                <div className="">
                  <h3 className="text-base font-medium text-white">Resources</h3>
                  <ul className="mt-4 text-sm text-muted-foreground">
                    <li className="mt-2">
                      <Link
                        href="/resources/help"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        FAQ
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="/feedback"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Feedback?
                      </Link>
                    </li>
                  </ul>
                </div>
              </AnimationContainer>
              <AnimationContainer delay={0.5}>
                <div className="flex flex-col">
                  <h3 className="text-base font-medium text-white">Legal</h3>
                  <ul className="text-sm text-muted-foreground">
                    {/* <li className="">
                    <Link href="" className="hover:text-foreground transition-all duration-300">
                      About Us
                    </Link>
                  </li> */}
                    <li className="mt-2">
                      <Link
                        href="/privacy"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="/terms"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="/refund"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Refund Policy
                      </Link>
                    </li>
                  </ul>
                </div>
              </AnimationContainer>
            </div>
          </div>
        </div>

        <div className="mt-8 mb-7 border-t border-border/40 pt-4 md:pt-8 md:flex md:items-center md:justify-between w-full">
          <p className="text-sm text-muted-foreground/50 mt-8 md:mt-0">
            &copy; {new Date().getFullYear()} {config.appName} inc. All rights reserved.
          </p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
