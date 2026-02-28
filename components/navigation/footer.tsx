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
      <footer className="flex flex-col relative items-center justify-center border-t border-border pt-16 pb-8 md:pb-0 px-6 lg:px-8 w-full max-w-6xl mx-auto lg:pt-32">

        <div className="grid gap-8 xl:grid-cols-3 xl:gap-8 w-full">
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

          <div className="grid-cols-2 gap-8 grid mt-16 xl:col-span-2 xl:mt-0">
            <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="">
                  <h3 className="text-base font-medium text-white">Product</h3>
                  <ul className="mt-4 text-sm text-muted-foreground">
                    <li className="mt-2">
                      <Link
                        href="https://tagfast.web.app/pricing"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Pricing
                      </Link>
                    </li>
                  </ul>
                </div>
              
            </div>
            <div className="md:grid md:grid-cols-2 md:gap-8">
                <div className="">
                  <h3 className="text-base font-medium text-white">Resources</h3>
                  <ul className="mt-4 text-sm text-muted-foreground">
                    {/* <li className="mt-2">
                      <Link
                        href="/resources/help"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        FAQ
                      </Link>
                    </li> */}
                    <li className="mt-2">
                      <Link
                        href="https://tagfast.web.app/feedback"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Feedback?
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="/tools"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Free Tools
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="/blog"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Blogs
                      </Link>
                    </li>
                  </ul>
                </div>
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
                        href="https://tagfast.web.app/privacy"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Privacy Policy
                      </Link>
                    </li>
                    <li className="mt-2">
                      <Link
                        href="https://tagfast.web.app/terms"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Terms & Conditions
                      </Link>
                    </li>
                    {/* <li className="mt-2">
                      <Link
                        href="/refund"
                        className="hover:text-foreground transition-all duration-300"
                      >
                        Refund Policy
                      </Link>
                    </li> */}
                  </ul>
                </div>
            </div>
          </div>
        </div>

        {/* <div className="mt-8 mb-7 border-t border-border/40 pt-4 md:pt-8 md:flex md:items-center md:justify-between w-full">
          <p className="text-sm text-muted-foreground/50 mt-8 md:mt-0">
            &copy; {new Date().getFullYear()} {config.appName}. All rights reserved.
          </p>
        </div> */}

        <br />
        <br />
        <br />
      </footer>
    </>
  );
};

export default Footer;
